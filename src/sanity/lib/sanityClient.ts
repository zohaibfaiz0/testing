// src/sanity/lib/sanityClient.ts
import { createClient } from '@sanity/client';
import { ProductType } from '../schemaTypes/productType';


export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2021-03-25',
});
// Fetch all products
export const fetchAllProducts = async (): Promise<ProductType[]> => {
  const query = '*[_type == "product"]{ _id, name }'; // Fetching only _id and name for search
  return await client.fetch(query);
};
// for new products
export const fetchProducts = async (): Promise<ProductType[]> => {
  const query = '*[_type == "product" && category == "New"]';
  return await client.fetch(query);
};
export const fetchProductById = async (id: string): Promise<ProductType | null> => {
  const query = '*[_type == "product" && _id == $id][0]';
  return await client.fetch(query, { id });
};
// for best products
export const fetchBestProducts = async (): Promise<ProductType[]> => {
  const query = '*[_type == "product" && category == "Best"]';
  return await client.fetch(query);
};
export const fetchBestProductById = async (id: string): Promise<ProductType | null> => {
  const query = '*[_type == "product" && _id == $id][0]';
  return await client.fetch(query, { id });
};
// for Dresses products
export const fetchDressProducts = async (): Promise<ProductType[]> => {
  const query = '*[_type == "product" && category == "Dress"]';
  return await client.fetch(query);
};
export const fetchDressProductById = async (id: string): Promise<ProductType | null> => {
  const query = '*[_type == "product" && _id == $id][0]';
  return await client.fetch(query, { id });
};
//Tops
export const fetchTopsProducts = async (): Promise<ProductType[]> => {
  const query = '*[_type == "product" && category == "Tops"]';
  return await client.fetch(query);
};
export const fetchTopsProductById = async (id: string): Promise<ProductType | null> => {
  const query = '*[_type == "product" && _id == $id][0]';
  return await client.fetch(query, { id });
};
//stuff
export const fetchStuffProducts = async (): Promise<ProductType[]> => {
  const query = '*[_type == "product" && category == "Stuff"]';
  return await client.fetch(query);
};
export const fetchStuffProductById = async (id: string): Promise<ProductType | null> => {
  const query = '*[_type == "product" && _id == $id][0]';
  return await client.fetch(query, { id });
};
