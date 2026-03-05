"use client";

import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex w-full flex-col items-center justify-center bg-bg text-black px-4 py-40 text-center">
            {/* 404 Text */}
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-xl mb-6">
                Oops! Looks like this field is empty. The page you're looking for doesn't exist.
            </p>

            {/* Back Home Button */}
            <Link
                href="/"
                className="rounded-lg bg-primary hover:bg-primary-hover text-muted px-6 py-3 font-semibold transition-colors"
            >
                Go back home
            </Link>
        </div>
    );
}