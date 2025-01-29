// Export the default middleware from NextAuth
export { default } from "next-auth/middleware";

// Define the configuration object for the middleware
export const config = { 
  // Specify the routes where the middleware should apply
  matcher: [
    "/dashboard", // Protects the "/dashboard" route
    "/profile"    // Protects the "/profile" route
  ] 
};
