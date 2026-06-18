"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-green-600">
          OLX Clone
        </h1>

        <div className="flex items-center gap-4">

          {/* Sell Button */}
          <Link href="/sell">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
              + Sell
            </button>
          </Link>

          {/* AUTH SECTION */}
          {!user ? (
            <Link href="/login">
              <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                Login
              </button>
            </Link>
          ) : (
            <div className="flex items-center gap-3">

              {/* Avatar */}
              {user.image && (
                <Image
                  src={user.image}
                  alt="user"
                  width={35}
                  height={35}
                  className="rounded-full"
                />
              )}

              {/* Name from MongoDB */}
              <span className="text-sm font-medium">
                {user.name}
              </span>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="text-red-500 text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}