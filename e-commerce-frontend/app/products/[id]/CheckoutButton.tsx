"use client";

interface CheckoutButtonProps {
  productId: string;
}

export default function CheckoutButton({
  productId,
}: CheckoutButtonProps) {

  const handleCheckout = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      window.location.href = data.url;

    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Something went wrong.");
      }
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="mt-10 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
    >
      Checkout
    </button>
  );
}