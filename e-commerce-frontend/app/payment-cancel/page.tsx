import Link from "next/link";
import { XCircle } from "lucide-react";

export default function PaymentCancel() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">

        <XCircle
          className="mx-auto text-red-500"
          size={70}
        />

        <h1 className="text-3xl font-bold mt-5">
          Payment Cancelled
        </h1>

        <p className="text-gray-600 mt-4">
          Your payment was cancelled.
          No money has been charged.
        </p>

        <div className="mt-8 flex justify-center gap-4">

          <Link
            href="/"
            className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>

        </div>

      </div>

    </main>
  );
}