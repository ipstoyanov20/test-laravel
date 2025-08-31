import { type Car } from '@/types';
import Modal from './Modal';
import { useState, useEffect } from 'react';

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    car: Car | null;
    onSave: (car: Car) => void;
}

export default function EditModal({ isOpen, onClose, car, onSave }: EditModalProps) {
    const [formData, setFormData] = useState<Partial<Car>>({});

    useEffect(() => {
        if (car) {
            setFormData({
                make: car.make || '',
                model: car.model || '',
                year: car.year || new Date().getFullYear(),
                color: car.color || '',
                engine: car.engine || '',
                transmission: car.transmission || '',
                fuel_type: car.fuel_type || '',
                mileage: car.mileage || 0,
                price: car.price || 0,
                vin: car.vin || '',
                description: car.description || '',
            });
        }
    }, [car]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (car) {
            onSave({ ...car, ...formData } as Car);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: type === 'number' ? (value === '' ? 0 : Number(value)) : value 
        }));
    };

    if (!car) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Car">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="make" className="block text-sm font-medium text-gray-700">
                            Make *
                        </label>
                        <input
                            type="text"
                            id="make"
                            name="make"
                            value={formData.make || ''}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="model" className="block text-sm font-medium text-gray-700">
                            Model *
                        </label>
                        <input
                            type="text"
                            id="model"
                            name="model"
                            value={formData.model || ''}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                            Year *
                        </label>
                        <input
                            type="number"
                            id="year"
                            name="year"
                            min="1900"
                            max={new Date().getFullYear() + 1}
                            value={formData.year || ''}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                            Color
                        </label>
                        <input
                            type="text"
                            id="color"
                            name="color"
                            value={formData.color || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="engine" className="block text-sm font-medium text-gray-700">
                        Engine
                    </label>
                    <input
                        type="text"
                        id="engine"
                        name="engine"
                        value={formData.engine || ''}
                        onChange={handleChange}
                        placeholder="e.g., 2.0L Turbo, V6 3.5L"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="transmission" className="block text-sm font-medium text-gray-700">
                            Transmission
                        </label>
                        <select
                            id="transmission"
                            name="transmission"
                            value={formData.transmission || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select transmission</option>
                            <option value="Manual">Manual</option>
                            <option value="Automatic">Automatic</option>
                            <option value="CVT">CVT</option>
                            <option value="Semi-Automatic">Semi-Automatic</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="fuel_type" className="block text-sm font-medium text-gray-700">
                            Fuel Type
                        </label>
                        <select
                            id="fuel_type"
                            name="fuel_type"
                            value={formData.fuel_type || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select fuel type</option>
                            <option value="Gasoline">Gasoline</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Electric">Electric</option>
                            <option value="Plug-in Hybrid">Plug-in Hybrid</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="mileage" className="block text-sm font-medium text-gray-700">
                            Mileage
                        </label>
                        <input
                            type="number"
                            id="mileage"
                            name="mileage"
                            min="0"
                            value={formData.mileage || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                            Price ($)
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            min="0"
                            step="0.01"
                            value={formData.price || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="vin" className="block text-sm font-medium text-gray-700">
                        VIN (Vehicle Identification Number)
                    </label>
                    <input
                        type="text"
                        id="vin"
                        name="vin"
                        maxLength={17}
                        value={formData.vin || ''}
                        onChange={handleChange}
                        placeholder="17-character VIN"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-mono"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={3}
                        value={formData.description || ''}
                        onChange={handleChange}
                        placeholder="Additional details about the car..."
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </Modal>
    );
}
