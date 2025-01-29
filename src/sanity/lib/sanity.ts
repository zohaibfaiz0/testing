import { createClient } from '@sanity/client';

 const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Your Sanity project ID
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, // Your dataset name
  useCdn: true, // Enable the CDN for faster queries in production
  apiVersion: '2023-01-01', // or the latest version available
 // API version
});
export default client;