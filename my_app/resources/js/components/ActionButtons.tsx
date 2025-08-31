import { type ActionButtonProps } from '@/types';
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function ActionButtons({ item, onView, onEdit, onDelete }: ActionButtonProps) {
    return (
        <div className="flex items-center justify-center gap-2">
            <button 
                className="text-blue-500 hover:text-blue-700 transition-colors" 
                title="View"
                onClick={() => onView?.(item)}
            >
                <EyeIcon className="w-5 h-5" />
            </button>
            <button 
                className="text-yellow-500 hover:text-yellow-700 transition-colors" 
                title="Edit"
                onClick={() => onEdit?.(item)}
            >
                <PencilSquareIcon className="w-5 h-5" />
            </button>
            <button 
                className="text-red-500 hover:text-red-700 transition-colors" 
                title="Delete"
                onClick={() => onDelete?.(item)}
            >
                <TrashIcon className="w-5 h-5" />
            </button>
        </div>
    );
}
