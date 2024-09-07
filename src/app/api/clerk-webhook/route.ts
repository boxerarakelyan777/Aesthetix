import { NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { db } from '../../../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

export async function POST(req: Request) {
	console.log('Webhook received');
	
	const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

	if (!WEBHOOK_SECRET) {
		console.error('CLERK_WEBHOOK_SECRET is not set');
		return NextResponse.json({ error: 'Webhook secret is not set' }, { status: 500 });
	}

	// Get the headers
	const headerPayload = headers();
	const svix_id = headerPayload.get("svix-id");
	const svix_timestamp = headerPayload.get("svix-timestamp");
	const svix_signature = headerPayload.get("svix-signature");

	// If there are no headers, error out
	if (!svix_id || !svix_timestamp || !svix_signature) {
		console.error('Missing svix headers');
		return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 });
	}

	// Get the body
	const payload = await req.json();
	const body = JSON.stringify(payload);

	// Create a new Svix instance with your secret.
	const wh = new Webhook(WEBHOOK_SECRET);

	let evt: WebhookEvent;

	// Verify the payload with the headers
	try {
		evt = wh.verify(body, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		}) as WebhookEvent;
	} catch (err) {
		console.error('Error verifying webhook:', err);
		return NextResponse.json({ error: 'Error verifying webhook' }, { status: 400 });
	}

	// Handle the webhook
	const eventType = evt.type;
	console.log('Event type:', eventType);

	if (eventType === 'user.created') {
		const { id, email_addresses } = evt.data;

		console.log('User data:', { id, email_addresses });

		// Create a new user document in Firestore
		try {
			console.log('Attempting to create user in Firestore');
			const now = new Date().toISOString();
			await setDoc(doc(db, 'users', id), {
				id: id,
				userId: id,
				email: email_addresses[0]?.email_address || null, // Store the first email address
				createdAt: now,
				updatedAt: now,
				stripeCustomerId: null,
				package: null,
				packageType: null,
				status: 'inactive'
			});
			console.log('User created in Firestore');
		} catch (error) {
			console.error('Error creating user in Firestore:', error);
			return NextResponse.json({ error: 'Error creating user in Firestore' }, { status: 500 });
		}
	}

	console.log('Webhook processed successfully');
	return NextResponse.json({ message: 'Webhook processed' }, { status: 200 });
}