import { type Car } from '@/types';
import Modal from './Modal';

interface ViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    car: Car | null;
}

export default function ViewModal({ isOpen, onClose, car }: ViewModalProps) {
    if (!car) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Car Details">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Make</label>
                    <p className="mt-1 text-sm text-gray-900">{car.make}</p>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Model</label>
                    <p className="mt-1 text-sm text-gray-900">{car.model}</p>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Year</label>
                    <p className="mt-1 text-sm text-gray-900">{car.year}</p>
                </div>
                
                {car.color && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Color</label>
                        <p className="mt-1 text-sm text-gray-900">{car.color}</p>
                    </div>
                )}
                
                {car.engine && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Engine</label>
                        <p className="mt-1 text-sm text-gray-900">{car.engine}</p>
                    </div>
                )}
                
                {car.transmission && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Transmission</label>
                        <p className="mt-1 text-sm text-gray-900">{car.transmission}</p>
                    </div>
                )}
                
                {car.fuel_type && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Fuel Type</label>
                        <p className="mt-1 text-sm text-gray-900">{car.fuel_type}</p>
                    </div>
                )}
                
                {car.mileage && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mileage</label>
                        <p className="mt-1 text-sm text-gray-900">{car.mileage.toLocaleString()} miles</p>
                    </div>
                )}
                
                {car.price && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <p className="mt-1 text-sm text-gray-900">${car.price.toLocaleString()}</p>
                    </div>
                )}
                
                {car.vin && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">VIN</label>
                        <p className="mt-1 text-sm text-gray-900 font-mono">{car.vin}</p>
                    </div>
                )}
                
                {car.description && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <p className="mt-1 text-sm text-gray-900">{car.description}</p>
                    </div>
                )}
                
                {car.created_at && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Added On</label>
                        <p className="mt-1 text-sm text-gray-900">
                            {new Date(car.created_at).toLocaleDateString()}
                        </p>
                    </div>
                )}
            </div>
            
            <div className="mt-6 flex justify-end">
                <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                    Close
                </button>
            </div>
        </Modal>
    );
}
