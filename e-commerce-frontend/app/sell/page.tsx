"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface FormState {
  title: string;
  description: string;
  price: string;
  phoneNumber: string;
}

export default function SellPage() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormState>({
    title: "",
    description: "",
    price: "",
    phoneNumber: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

  const submitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("image", image);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:4000/products/create",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      alert("Product Published Successfully");

      setFormData({
        title: "",
        description: "",
        price: "",
        phoneNumber: "",
      });

      setImage(null);
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">

        <button
        onClick={() => router.push("/")}
        className="flex items-center gap-2 mb-6 bg-white px-4 py-2 rounded-xl shadow hover:bg-slate-50 transition text-slate-700 font-medium"
      >
        ← Back
      </button>

          <h1 className="text-4xl font-bold text-slate-900">
            Sell Your Product
          </h1>

          <p className="text-slate-500 mt-2">
            Create your listing and start selling today
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          
          {/* Top Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
            <h2 className="text-2xl font-semibold text-white">
              Product Information
            </h2>

            <p className="text-blue-100 mt-1">
              Fill in the details below
            </p>
          </div>

          <form
            onSubmit={submitHandler}
            className="p-8 space-y-6"
          >
            {/* Title */}
            <div>
              <label className="block font-medium text-slate-700 mb-2">
                Product Title
              </label>

              <input
                type="text"
                placeholder="iPhone 15 Pro Max"
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium text-slate-700 mb-2">
                Description
              </label>

              <textarea
                rows={5}
                placeholder="Describe your product..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                className="w-full border border-slate-300 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
            </div>

            {/* Price + Phone */}
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block font-medium text-slate-700 mb-2">
                  Price
                </label>

                <input
                  type="number"
                  placeholder="50000"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: e.target.value,
                    })
                  }
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-2">
                  Phone Number
                </label>

                <input
                  type="tel"
                  placeholder="03XXXXXXXXX"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phoneNumber: e.target.value,
                    })
                  }
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  required
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block font-medium text-slate-700 mb-2">
                Product Image
              </label>

              <label className="flex flex-col items-center justify-center w-full h-52 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer hover:border-blue-500 transition">
                <div className="text-center">
                  <div className="text-5xl mb-2">📷</div>

                  <p className="font-medium">
                    Click to upload image
                  </p>

                  <p className="text-sm text-slate-500">
                    JPG, PNG, WEBP
                  </p>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setImage(e.target.files[0]);
                    }
                  }}
                />
              </label>
            </div>

            {/* Image Preview */}
            {image && (
              <div>
                <h3 className="font-medium text-slate-700 mb-3">
                  Image Preview
                </h3>

                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="w-full h-80 object-cover rounded-2xl border"
                />
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-4 rounded-xl font-semibold text-lg disabled:bg-slate-400"
            >
              {loading
                ? "Publishing Product..."
                : "Publish Product"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}