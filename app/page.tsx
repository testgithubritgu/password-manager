"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4  py-14 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
          Secure Your Digital Life
        </h1>
        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mb-10">
          Store and manage your passwords and credit cards safely in one place.
          Never forget a password again.
        </p>

        <Link
          href={isSignedIn ? "/password-manager" : "/sign-in"}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition"
        >
          {isSignedIn ? "Go to Dashboard" : "Get Started"}
        </Link>
      </section>

      {/* Features Section */}
      <section className="px-4 py-14 max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
          Why Choose Us?
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-gray-900 p-6 rounded-xl">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Storage</h3>
            <p className="text-gray-400">
              Your data is encrypted and stored securely. Only you can access your information.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-900 p-6 rounded-xl">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Card Management</h3>
            <p className="text-gray-400">
              Store your credit card details safely and access them whenever you need.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-900 p-6 rounded-xl">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Password Vault</h3>
            <p className="text-gray-400">
              Keep all your passwords organized by website. Quick access when you need them.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 text-center">
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 max-w-4xl mx-auto rounded-2xl p-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to secure your passwords?
          </h2>
          <p className="text-purple-200 mb-8">
            Join now and take control of your digital security.
          </p>
          <Link
            href={isSignedIn ? "/password-manager" : "/sign-in"}
            className="bg-white text-purple-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            {isSignedIn ? "Open Dashboard" : "Sign Up Free"}
          </Link>
        </div>
      </section>
    </div>
  );
}
