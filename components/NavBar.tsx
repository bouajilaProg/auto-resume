import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-black cursor-pointer">
              AutoResume
            </Link>
            <Link href="/modules" className="text-black hover:text-gray-700 font-medium transition-colors active:scale-95 cursor-pointer">
              Modules
            </Link>
          </div>

          {/* Right side */}
          <Link href="/create-resume" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium active:scale-95 cursor-pointer">
            Create Resume
          </Link>
        </div>
      </div>
    </nav>
  );
}
