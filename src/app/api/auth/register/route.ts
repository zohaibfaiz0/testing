// Import necessary modules
import { NextResponse } from 'next/server'; // Utility to create API responses in Next.js
import { createClient } from '@sanity/client'; // Sanity client to interact with the database
import bcrypt from 'bcryptjs'; // Library to securely hash passwords

// Initialize Sanity client
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Sanity project ID from environment variables
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, // Sanity dataset name (e.g., production, staging)
  useCdn: process.env.NODE_ENV === 'production', // Use Sanity's CDN for faster, read-only access in production
  apiVersion: '2023-05-26', // Specify the Sanity API version to use
  token: process.env.SANITY_API_TOKEN, // Token to authenticate and authorize API requests
});

// Define the POST handler for user registration
export async function POST(request: Request) {
  // Parse the incoming JSON request body
  const { username, email, password } = await request.json();

  // Hash the user's password with a salt round of 10 for secure storage
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a user document to be stored in the Sanity database
  const userDocument = {
    _type: 'user', // Document type in Sanity
    username, // Username provided by the user
    email, // Email address provided by the user
    password: hashedPassword, // Store the hashed password instead of the plain text
    role: 'user', // Assign a default role (e.g., 'user')
    createdAt: new Date().toISOString(), // Add a timestamp for when the user is registered
  };

  try {
    // Attempt to create the user document in the Sanity database
    const result = await sanityClient.create(userDocument);

    // Respond with success and the created user data
    return NextResponse.json({ message: 'User registered successfully', user: result });
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Registration error:', error);

    // Respond with an error message and a 400 Bad Request status
    return NextResponse.json({ error: 'User registration failed' }, { status: 400 });
  }
}
