import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { LRUCache } from 'lru-cache';

const systemPrompt = `
Welcome to LookMate! I'm here to answer any questions you have about our services, features, pricing, and more. Whether you're wondering how to use the app, curious about our subscription plans, or need help with a specific issue, I'm here to help!

Key Areas I Can Assist You With:

1. **App Features:**
   - Describe the functionality of the app, including outfit recommendations, mood-based suggestions, and wardrobe management.
   
2. **Pricing Plans:**
   - Provide details about the Basic, Pro, and Premium plans, including monthly and yearly pricing.

3. **Subscription & Billing:**
   - Explain how subscriptions work, the differences between monthly and yearly billing, and the benefits of upgrading to Pro or Premium.
   
4. **Troubleshooting:**
   - Help with common issues, such as signing in, saving outfits, and account management.

5. **Waitlist and Discounts:**
   - Inform users about the current waitlist, special discounts, and how they can join or benefit from them.

6. **General FAQs:**
   - Answer frequently asked questions about the app, how it works, and what users can expect.

Tone:
   - **Friendly:** Be approachable and conversational.
   - **Helpful:** Provide clear and concise answers to user inquiries.
   - **Supportive:** Ensure the user feels supported and informed.
   - **Professional:** Keep the tone appropriate to the service provided by LookMate.

Example Responses:

1. **Pricing Plan:**
   "LookMate offers three subscription tiers: Basic, Pro, and Premium. The Basic plan starts at $9.99/month, while Pro offers additional features like mood-based outfit customization at $19.99/month."

2. **Waitlist Information:**
   "The first 1,000 users to join the waitlist will get 40% off their first month. Share your referral code to earn more discounts!"

3. **App Features:**
   "LookMate helps you generate outfits based on the items in your wardrobe, and you can customize suggestions based on your mood and occasion."

4. **Troubleshooting:**
   "If you're having trouble saving outfits, try refreshing the page or ensure you’re connected to the internet. Still need help? Contact our support team!"

Thank you for using LookMate's chatbot! Let me know how I can assist you further.
`;


const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || ''
});

// Initialize a cache
const cache = new LRUCache<string, string>({
  max: 100, // Maximum number of items to store in the cache
  ttl: 1000 * 60 * 5, // Time to live: 5 minutes
});

export const POST = async (request: Request) => {
  try {
    const data = await request.json();

    // Define the structure of each message
    type Message = {
      role: "system" | "user" | "assistant";
      content: string;
    };

    const messages: Message[] = [
      {
        role: "system",
        content: systemPrompt,
      },
      ...data,
    ];

    // The last system message will contain the language instruction
    const lastMessage = messages[messages.length - 1];
    const isRegenerationRequest = lastMessage.role === "system" && lastMessage.content.includes("The previous response was not satisfactory");

    let languageInstruction = "";
    if (isRegenerationRequest) {
      languageInstruction = lastMessage.content;
      // Remove the last message (regeneration instruction) from the messages array
      messages.pop();
    } else {
      languageInstruction = lastMessage.content;
    }

    // Create a cache key from the messages
    const cacheKey = JSON.stringify(messages);

    // Check if we have a cached response
    const cachedResponse = cache.get(cacheKey);
    if (cachedResponse && !isRegenerationRequest) {
      return new NextResponse(cachedResponse);
    }

    const result = await groq.chat.completions.create({
      model: "llama-3.1-70b-versatile", // Consider using a faster model if available
      messages: [
        ...messages.slice(0, -1), // All messages except the last one
        { 
          role: "system", 
          content: isRegenerationRequest
            ? `${systemPrompt}\n\n${languageInstruction}\nPlease provide an improved and more detailed answer.`
            : `${systemPrompt}\n\n${languageInstruction}`
        }
      ],
      stream: true,
      max_tokens: 150, // Limit the response length
      temperature: 0.7, // Adjust for faster responses (lower value) or more creative responses (higher value)
    });

    let fullResponse = '';

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of result) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              fullResponse += content;
              const text = encoder.encode(content);
              controller.enqueue(text);
            }
          }
        } catch (error) {
          controller.error(error);
        } finally {
          // Cache the full response if it's not a regeneration request
          if (!isRegenerationRequest) {
            cache.set(cacheKey, fullResponse);
          }
          controller.close();
        }
      },
    });

    return new NextResponse(stream);
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};