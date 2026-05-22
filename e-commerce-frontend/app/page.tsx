"use client";

import { useEffect, useState } from "react";

import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import Navbar from "@/components/Navbar";

import {
  getProducts,
  searchProducts,
} from "@/lib/api";

import { Product } from "@/types/product";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Initial Fetch
  useEffect(() => {
    fetchProducts();
  }, []);

  // Search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProducts();

      setProducts(data);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (
    query: string
  ) => {
    try {
      setLoading(true);
      setError("");

      const data = await searchProducts(query);

      setProducts(data);
    } catch (err) {
      setError("Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
      <Navbar/>
        {/* <div
          className="
            max-w-7xl
            mx-auto
            px-4
            py-4
            flex
            items-center
            justify-between
          "
        >
          <h1 className="text-3xl font-bold text-green-600">
            OLX Clone
          </h1>

          <button
            className="
              bg-green-600
              text-white
              px-5
              py-2
              rounded-lg
              hover:bg-green-700
            "
          >
            Sell
          </button>
        </div> */}
      </header>

      {/* Hero */}
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl font-bold">
            Buy & Sell Anything
          </h2>

          <p className="mt-4 text-lg text-green-100">
            Discover amazing deals near you.
          </p>

          {/* Search */}
          <div className="mt-8">
            <SearchBar
              value={search}
              onChange={setSearch}
            />
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h3 className="text-3xl font-bold text-gray-800">
            Fresh Recommendations
          </h3>
        </div>

        {/* Error */}
        {error && (
          <div className="text-center py-10">
            <p className="text-red-500 text-lg">
              {error}
            </p>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              gap-6
            "
          >
            {Array.from({ length: 8 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="
                    bg-white
                    rounded-2xl
                    p-4
                    animate-pulse
                  "
                >
                  <div className="h-52 bg-gray-200 rounded-xl"></div>

                  <div className="mt-4 h-5 bg-gray-200 rounded"></div>

                  <div className="mt-2 h-4 bg-gray-200 rounded"></div>

                  <div className="mt-6 h-6 w-24 bg-gray-200 rounded"></div>
                </div>
              )
            )}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-gray-500">
              No products found.
            </p>
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              gap-6
            "
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}