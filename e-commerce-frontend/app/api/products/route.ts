import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } =
      new URL(request.url);

    const query = searchParams.get("q");

    const endpoint = query
      ? `https://dummyjson.com/products/search?q=${query}`
      : "https://dummyjson.com/products";

    const response = await fetch(endpoint, {
      cache: "no-store",
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        products: [],
        error: "Failed to fetch products",
      },
      { status: 500 }
    );
  }
}