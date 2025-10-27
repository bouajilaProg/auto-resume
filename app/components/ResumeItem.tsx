import { FaTrash, FaCopy } from 'react-icons/fa';

interface ResumeItemProps {
  name: string;
  description: string;
  lastUpdate: string;
}

function ResumeItem({ name, description, lastUpdate }: ResumeItemProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow flex flex-col h-full">
      <h3 className="text-xl font-semibold text-black mb-2 truncate">{name}</h3>
      <p className="text-gray-400 text-xs mb-4">Last updated: {lastUpdate}</p>
      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{description}</p>

      <div className="flex items-center gap-2 w-full mt-auto">
        <button className="flex-[0.7] py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium active:scale-95 cursor-pointer">
          Open
        </button>
        <button className="flex-[0.15] py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all active:scale-95 cursor-pointer flex items-center justify-center">
          <FaCopy size={16} />
        </button>
        <button className="flex-[0.15] py-2 bg-gray-100 text-red-500 rounded-lg hover:bg-gray-200 transition-all active:scale-95 cursor-pointer flex items-center justify-center">
          <FaTrash size={16} />
        </button>
      </div>
    </div>
  );
} export default ResumeItem;
