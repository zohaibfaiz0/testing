// Import necessary modules for NextAuth and Sanity client
import { NextAuthOptions } from "next-auth"; // Type for configuring NextAuth
import CredentialsProvider from "next-auth/providers/credentials"; // Provider for custom email/password login
import { createClient } from '@sanity/client'; // Sanity client for querying the database

// Configure Sanity client to connect to your Sanity project
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Project ID from environment variables
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, // Dataset name from environment variables
  useCdn: process.env.NODE_ENV === 'production', // Use Sanity's CDN in production for faster read operations
  apiVersion: '2021-03-25', // Sanity API version for querying data
});

// Define authentication options for NextAuth
export const authOptions: NextAuthOptions = {
  // Configure authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials", // Name of the provider
      credentials: {
        email: { label: "Email", type: "email" }, // Input field for email
        password: { label: "Password", type: "password" }, // Input field for password
      },
      // Custom authorization logic
      async authorize(credentials, req) {
        console.log('Authorizing credentials:', credentials);

        // Validate if both email and password are provided
        if (!credentials?.email || !credentials?.password) {
          console.error('Missing email or password');
          return null; // Authorization fails if any field is missing
        }

        // Query Sanity database for a user matching the provided email
        const query = `*[_type == "user" && email == $email]{
          _id,          // User ID
          email,        // User email
          password,     // User password (stored hashed)
          name          // User's name
        }`;

        // Execute the query with the provided email as a parameter
        const users = await sanityClient.fetch(query, { email: credentials.email });

        console.log('Sanity authorization query result:', users);

        // Check if any user was found
        if (!users || users.length === 0) {
          console.error('No user found');
          return null; // Authorization fails if no user is found
        }

        const user = users[0]; // Get the first (and only) user from the result

        // Compare the provided password with the user's stored password
        const isPasswordValid = user.password === credentials.password;

        console.log('Password validation:', isPasswordValid);

        // If the password is invalid, authorization fails
        if (!isPasswordValid) {
          console.error('Invalid password');
          return null;
        }

        // Return user object if authorization is successful
        return {
          id: user._id, // User ID
          email: user.email, // User email
          name: user.name, // User name
          username: user.name || "DefaultUsername", // Ensure 'username' is present
        };
      },
    }),
  ],
  // Configure session management
  session: {
    strategy: "jwt", // Use JSON Web Tokens (JWT) to manage sessions
  },
  // Define custom callback functions for session and token management
  callbacks: {
    // Customize the session object sent to the client
    async session({ session, token }) {
      session.user.id = token.sub || ''; // Attach the user ID to the session
      return session; // Return the updated session object
    },
  },
  // Define custom pages for authentication
  pages: {
    signIn: "/login", // Redirect to this page for signing in
  },
};
