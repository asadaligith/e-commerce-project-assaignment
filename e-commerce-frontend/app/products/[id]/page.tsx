
import Image from "next/image";
import Link from "next/link";

import { getProductById } from "@/lib/api";
import CheckoutButton from "./CheckoutButton";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetails({
  params,
}: Props) {
  const { id } = await params;

  const product = await getProductById(id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Product Not Found
        </h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <Link
          href="/"
          className="text-green-600 font-semibold"
        >
          ← Back
        </Link>

        <div className="bg-white rounded-3xl shadow-lg p-6 mt-6">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="relative h-[450px]">
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                className="object-cover rounded-2xl"
              />
            </div>

            <div>
              <h1 className="text-5xl font-bold">
                {product.title}
              </h1>

              <p className="mt-6 text-gray-600">
                {product.description}
              </p>

              <h2 className="mt-8 text-4xl font-bold text-green-600">
                ${product.price}
              </h2>
              <button className="mt-10 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
                Add to Cart
              </button>
           <CheckoutButton productId={product._id} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}