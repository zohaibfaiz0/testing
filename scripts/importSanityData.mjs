import { createClient } from '@sanity/client';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-05-25', // Use current date
});

async function importData() {
  try {
    console.log('Fetching products from API...');
    
    // Replace with your actual API endpoint
    const response = await axios.get('https://678bc3461a6b89b27a2b5cd2.mockapi.io/products');
    const products = Array.isArray(response.data) ? response.data : [response.data];
    
    console.log(`Fetched ${products.length} products`);

    for (const product of products) {
      try {
        console.log(`Processing product: ${product.name}`);

        // Directly use the product object as it matches the schema
        const sanityProduct = {
          _type: 'product',
          ...product  // Spread the entire product object
        };

        console.log('Uploading product to Sanity:', sanityProduct.name);
        
        const result = await client.create(sanityProduct);
        console.log(`Product uploaded successfully: ${result._id}`);
      } catch (productError) {
        console.error(`Error processing product ${product.name}:`, productError.message);
      }
    }

    console.log('Data import completed successfully!');
  } catch (error) {
    console.error('Error importing data:', error.message);
  }
}

// Optional: Add a delay between imports to avoid rate limiting
async function importWithDelay() {
  try {
    await importData();
  } catch (error) {
    console.error('Import failed:', error);
  }
}

importWithDelay();