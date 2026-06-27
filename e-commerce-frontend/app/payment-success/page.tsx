import Link from "next/link";
import { CheckCircle } from "lucide-react";

interface Props {
  searchParams: Promise<{
    session_id?: string;
  }>;
}

export default async function PaymentSuccess({
  searchParams,
}: Props) {
  const { session_id } = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">

        <CheckCircle
          className="mx-auto text-green-600"
          size={70}
        />

        <h1 className="text-3xl font-bold mt-5">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-600 mt-4">
          Thank you for your purchase.
          Your payment has been processed successfully.
        </p>

        {session_id && (
          <div className="mt-6 rounded-lg bg-gray-100 p-3">
            <p className="text-sm text-gray-500">
              Session ID
            </p>

            <p className="font-mono text-sm break-all">
              {session_id}
            </p>
          </div>
        )}

        <div className="mt-8">
          <Link
            href="/"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Continue Shopping
          </Link>
        </div>

      </div>
    </main>
  );
}
