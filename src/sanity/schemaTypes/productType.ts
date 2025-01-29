export interface ProductType {
  _id: string;
  _type: 'product';
  id: number; // Required, must be a positive integer
  name: string; // Required, between 3 to 100 characters
  shortdesc: string; // Required, between 10 to 150 characters
  fulldesc: string; // Required, between 10 to 500 characters
  price: number; // Required, must be a positive number
  rating: number; // Required, between 1 to 5
  image: string; // Required, must be a valid URL (http or https)
  category: string; // Required
}
