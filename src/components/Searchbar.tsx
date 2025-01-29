// src/components/SearchBar.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAllProducts } from '@/sanity/lib/sanityClient'; // Adjust the import based on your project structure
import { BsSearch } from 'react-icons/bs';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const router = useRouter();

  // Debounce the query input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300); // Adjust the debounce delay as needed

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!debouncedQuery) return;

    try {
      // Fetch all products from Sanity
      const products = await fetchAllProducts();

      // Find the product that matches the query
      const matchedProduct = products.find(product => 
        product.name.toLowerCase().includes(debouncedQuery.toLowerCase())
      );

      if (matchedProduct) {
        // Redirect to the product detail page using its ID
        router.push(`/product/${matchedProduct._id}`);
      } else {
        alert('No products found');
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      alert('An error occurred while searching for products.');
    }
  };

  return (
    <form onSubmit={handleSearch} className='w-full sm:max-w-md relative' role="search" aria-label="Product Search">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search products"
        className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-full 
        focus:outline-none focus:ring-2 focus:ring-pink-200 
        text-sm transition-all duration-300 
        hover:border-pink-100"
      />
      <BsSearch 
        className='absolute left-3 top-1/2 transform -translate-y-1/2 
        text-gray-400 hover:text-pink-500 transition-colors' 
        size={22} 
        aria-hidden="true"
      />
    </form>
  );
};

export default SearchBar;