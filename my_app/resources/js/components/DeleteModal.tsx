import { type Car } from '@/types';
import Modal from './Modal';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    car: Car | null;
    onConfirm: (car: Car) => void;
}

export default function DeleteModal({ isOpen, onClose, car, onConfirm }: DeleteModalProps) {
    const handleConfirm = () => {
        if (car) {
            onConfirm(car);
        }
    };

    if (!car) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Delete Car">
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                    <ExclamationTriangleIcon className="h-8 w-8 text-red-500" />
                </div>
                <div className="flex-1">
                    <p className="text-sm text-gray-700 mb-4">
                        Are you sure you want to delete this <strong>{car.year} {car.make} {car.model}</strong>? 
                        This action cannot be undone.
                    </p>
                    
                    <div className="bg-gray-50 p-3 rounded-md">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Car Details:</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                            <li><strong>Make:</strong> {car.make}</li>
                            <li><strong>Model:</strong> {car.model}</li>
                            <li><strong>Year:</strong> {car.year}</li>
                            {car.color && <li><strong>Color:</strong> {car.color}</li>}
                            {car.vin && <li><strong>VIN:</strong> {car.vin}</li>}
                        </ul>
                    </div>
                </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-6">
                <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleConfirm}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                >
                    Delete Car
                </button>
            </div>
        </Modal>
    );
}
