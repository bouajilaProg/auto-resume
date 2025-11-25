export default function Loading() {
  return (
    <div className="flex-1 w-full bg-white flex flex-col items-center justify-center gap-8">

      <div className="relative w-32 h-32">
        <div className="absolute top-0 left-0 w-full h-full border-8 border-gray-100 rounded-full"></div>

        <div className="absolute top-0 left-0 w-full h-full border-8 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      </div>

      <div className="text-center">
        <h2 className="text-gray-900 font-bold text-3xl mb-3">
          Loading...
        </h2>
        <p className="text-gray-500 text-lg font-medium">
          Getting things ready for you.
        </p>
      </div>

    </div>
  );
}
