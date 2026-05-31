"use client";

import {
  // signIn,
  signOut,
  useSession,
} from "next-auth/react";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold text-green-600">
          OLX Clone
        </h1>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          

          {/* Sell Button */}
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
            + Sell
          </button>
          {/* Auth Section */}
          {!session ? (
            <Link href="/login">
            <button
              // onClick={() => signIn("google")}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Login 
            </button>
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              
              {/* Avatar */}
              {session.user?.image && (
                <Image
                  src={session.user.image}
                  alt="user"
                  width={35}
                  height={35}
                  className="rounded-full"
                />
              )}

              {/* Name */}
              <span className="text-sm font-medium">
                {session.user?.name}
              </span>

              {/* Logout */}
              <button
                onClick={() => signOut()}
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