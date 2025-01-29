// Import necessary modules
import { NextRequest, NextResponse } from 'next/server'; // Modules for handling requests and responses in Next.js
import { client } from '@/sanity/lib/sanityClient'; // Import the Sanity client for database operations
import bcrypt from 'bcryptjs'; // Library for hashing and verifying passwords
import jwt from 'jsonwebtoken'; // Library for generating and verifying JSON Web Tokens (JWTs)

// Define the JWT secret key, using an environment variable or a fallback
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';

// Define the POST method for handling login requests
export async function POST(req: NextRequest) {
  // Parse the JSON body to extract email and password
  const { email, password } = await req.json();

  // Check if email and password are provided
  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 }); // Return a 400 Bad Request response
  }

  try {
    // Query the Sanity database for a user with the given email
    const user = await client.fetch(
      `*[_type == "user" && email == $email][0]`, // Fetch the first matching user
      { email } // Pass the email parameter to the query
    );

    // If no user is found, return a 404 Not Found response
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the password is invalid, return a 401 Unauthorized response
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign(
      {
        userId: user._id, // Add the user ID to the payload
        username: user.username, // Add the username to the payload
        email: user.email, // Add the email to the payload
      },
      JWT_SECRET, // Use the secret key to sign the token
      { expiresIn: '1h' } // Set the token to expire in 1 hour
    );

    // Respond with a success message and the token
    return NextResponse.json({ message: 'Login successful', token }, { status: 200 });
  } catch (error) {
    // Handle any errors that occur during the process
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Login failed', error: errorMessage }, { status: 500 }); // Return a 500 Internal Server Error response
  }
}
