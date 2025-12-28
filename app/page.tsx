import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">
          Welcome to <span className="text-primary">Module Name</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your module description goes here. Replace this with your actual content.
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            href="/explore"
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition"
          >
            Explore
          </Link>
          <Link 
            href="/dashboard"
            className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-blue-50 transition"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

