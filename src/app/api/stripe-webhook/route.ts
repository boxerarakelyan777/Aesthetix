import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { DynamoDB } from 'aws-sdk';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20', 
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Initialize DynamoDB client
const dynamodb = new DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  console.log(`Received event: ${event.type}`);

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
      case 'customer.subscription.trial_will_end':
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionChange(subscription);
        break;

      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  const status = subscription.status;
  const priceId = subscription.items.data[0]?.price.id;

  // Get the price details
  const price = await stripe.prices.retrieve(priceId);
  
  // Get the product details to determine the plan name
  const product = await stripe.products.retrieve(price.product as string);
  const planName = product.name || 'Unknown Plan';
  const packageType = price.recurring?.interval === 'year' ? 'yearly' : 'monthly';

  // Get user from DynamoDB
  const params = {
    TableName: 'Users',
    IndexName: 'StripeCustomerIdIndex',
    KeyConditionExpression: 'stripeCustomerId = :customerId',
    ExpressionAttributeValues: {
      ':customerId': customerId
    }
  };

  try {
    const result = await dynamodb.query(params).promise();
    if (result.Items && result.Items.length > 0) {
      const user = result.Items[0];
      const userId = user.id;

      // Update user in DynamoDB
      const updateParams = {
        TableName: 'Users',
        Key: { id: userId },
        UpdateExpression: 'set #status = :status, priceId = :priceId, #package = :package, packageType = :packageType, updatedAt = :updatedAt',
        ExpressionAttributeNames: {
          '#status': 'status',
          '#package': 'package'
        },
        ExpressionAttributeValues: {
          ':status': status,
          ':priceId': priceId,
          ':package': planName,
          ':packageType': packageType,
          ':updatedAt': new Date().toISOString()
        }
      };

      await dynamodb.update(updateParams).promise();
      console.log(`User ${userId} subscription updated: status=${status}, priceId=${priceId}, package=${planName}, packageType=${packageType}`);
    } else {
      console.error('User not found for customer:', customerId);
    }
  } catch (error) {
    console.error('Error updating user in DynamoDB:', error);
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const customerId = session.customer as string;
  const userId = session.client_reference_id;
  const userEmail = session.customer_details?.email;

  if (!userId) {
    console.error('User ID not found in session');
    return;
  }

  if (!userEmail) {
    console.error('User email not found in session');
    return;
  }

  // Get the line items to determine the price ID
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
  const priceId = lineItems.data[0]?.price?.id;

  if (!priceId) {
    console.error('Price ID not found in session');
    return;
  }

  // Get the price details
  const price = await stripe.prices.retrieve(priceId);
  
  // Get the product details to determine the plan name
  const product = await stripe.products.retrieve(price.product as string);
  const planName = product.name || 'Unknown Plan';
  const packageType = price.recurring?.interval === 'year' ? 'yearly' : 'monthly';

  const userData = {
    id: userId,
    stripeCustomerId: customerId,
    email: userEmail,
    priceId: priceId,
    package: planName,
    packageType: packageType,
    status: 'active',
    updatedAt: new Date().toISOString(),
  };

  // Update or create user in DynamoDB
  const params = {
    TableName: 'Users',
    Item: userData,
    ConditionExpression: 'attribute_not_exists(id) OR id = :userId',
    ExpressionAttributeValues: {
      ':userId': userId
    }
  };

  try {
    await dynamodb.put(params).promise();
    console.log(`User ${userId} updated or created in DynamoDB`);
  } catch (error) {
    console.error('Error updating or creating user in DynamoDB:', error);
  }
}
