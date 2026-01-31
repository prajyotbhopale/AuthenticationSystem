import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold tracking-wide">MyApp</h1>
        <div className="space-x-6 text-gray-300">
          <Link href="/login" className="hover:text-white transition">
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Secure Authentication <br /> Made Simple
        </h2>

        <p className="text-gray-400 max-w-xl mb-8">
          A modern authentication system with email verification, password reset,
          and secure user sessions — built with Next.js.
        </p>

        <div className="flex gap-4">
          <Link
            href="/signup"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="border border-gray-500 hover:border-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-2">🔐 Secure Auth</h3>
          <p className="text-gray-400">
            Industry-standard authentication with hashed tokens and expiry.
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-2">📧 Email Verification</h3>
          <p className="text-gray-400">
            Verify user emails securely before allowing access.
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-2">🔄 Password Reset</h3>
          <p className="text-gray-400">
            Safe and easy password recovery using expiring tokens.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700 py-6 text-center text-gray-400">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </footer>
    </main>
  );
}
