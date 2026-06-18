import Image from "next/image";
import Link from "next/link";

import { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductCard({product,}: Props) {


  return (
    <Link href={`/products/${product._id}`}>
      <div
        className="
          bg-white
          rounded-2xl
          shadow-md
          overflow-hidden
          hover:shadow-xl
          transition
          duration-300
          cursor-pointer
        "
      >
        <div className="relative h-56 w-full">
          console.log(product);
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-800">
            {product.title}
          </h2>

          <p className="text-sm text-gray-500 mt-2 line-clamp-2">
            {product.description}
          </p>

          <div className="flex justify-between items-center mt-4">
            <span className="text-2xl font-bold text-green-600">
              ${product.price}
            </span>

            <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-blue-600">
              {product.phoneNumber}
            </span>

          </div>
        </div>
      </div>
    </Link>
  );
}