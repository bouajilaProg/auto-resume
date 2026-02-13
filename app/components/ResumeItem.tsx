import { FaTrash, FaCopy, FaExternalLinkAlt } from 'react-icons/fa';
import Link from 'next/link';

interface ResumeItemProps {
  id: string;
  name: string;
  description?: string;
  lastUpdate?: string;
  onDelete?: (id: string) => void;
  onCopy?: (id: string) => void;
}

function ResumeItem({ id, name, description, lastUpdate, onDelete, onCopy }: ResumeItemProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all flex flex-col h-full group">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-gray-900 truncate">{name}</h3>
        <Link 
          href={`/main?id=${id}`}
          className="text-gray-400 hover:text-indigo-600 transition-colors"
        >
          <FaExternalLinkAlt size={14} />
        </Link>
      </div>
      
      {lastUpdate && (
        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-4">
          Last updated: {lastUpdate}
        </p>
      )}
      
      <p className="text-gray-600 text-sm mb-6 line-clamp-2 flex-grow font-medium">
        {description || "No description provided for this resume version."}
      </p>

      <div className="flex items-center gap-2 w-full pt-4 border-t border-gray-50">
        <Link 
          href={`/main?id=${id}`}
          className="flex-[0.7] py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-bold text-sm active:scale-95 flex items-center justify-center gap-2"
        >
          Open Editor
        </Link>
        <button 
          onClick={() => onCopy?.(id)}
          className="flex-[0.15] py-2.5 bg-gray-50 text-gray-500 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all active:scale-95 flex items-center justify-center border border-transparent hover:border-indigo-100"
          title="Duplicate"
        >
          <FaCopy size={14} />
        </button>
        <button 
          onClick={() => onDelete?.(id)}
          className="flex-[0.15] py-2.5 bg-gray-50 text-gray-500 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all active:scale-95 flex items-center justify-center border border-transparent hover:border-red-100"
          title="Delete"
        >
          <FaTrash size={14} />
        </button>
      </div>
    </div>
  );
} export default ResumeItem;
