import { type Car } from '@/types';
import Modal from './Modal';
import { useState } from 'react';

interface AddModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (car: Omit<Car, 'id' | 'created_at' | 'updated_at'>) => void;
}

export default function AddModal({ isOpen, onClose, onSave }: AddModalProps) {
    const [formData, setFormData] = useState({
        make: '',
        model: '',
        year: new Date().getFullYear(),
        color: '',
        engine: '',
        transmission: '',
        fuel_type: '',
        mileage: 0,
        price: 0,
        vin: '',
        description: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Basic validation
        const newErrors: Record<string, string> = {};
        if (!formData.make.trim()) newErrors.make = 'Make is required';
        if (!formData.model.trim()) newErrors.model = 'Model is required';
        if (!formData.year || formData.year < 1900 || formData.year > new Date().getFullYear() + 1) {
            newErrors.year = 'Please enter a valid year';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onSave(formData);
        
        // Reset form
        setFormData({
            make: '',
            model: '',
            year: new Date().getFullYear(),
            color: '',
            engine: '',
            transmission: '',
            fuel_type: '',
            mileage: 0,
            price: 0,
            vin: '',
            description: '',
        });
        setErrors({});
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: type === 'number' ? (value === '' ? 0 : Number(value)) : value 
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleClose = () => {
        // Reset form when closing
        setFormData({
            make: '',
            model: '',
            year: new Date().getFullYear(),
            color: '',
            engine: '',
            transmission: '',
            fuel_type: '',
            mileage: 0,
            price: 0,
            vin: '',
            description: '',
        });
        setErrors({});
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Add New Car">
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
                            value={formData.make}
                            onChange={handleChange}
                            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                                errors.make ? 'border-red-300' : 'border-gray-300'
                            }`}
                        />
                        {errors.make && <p className="mt-1 text-sm text-red-600">{errors.make}</p>}
                    </div>

                    <div>
                        <label htmlFor="model" className="block text-sm font-medium text-gray-700">
                            Model *
                        </label>
                        <input
                            type="text"
                            id="model"
                            name="model"
                            value={formData.model}
                            onChange={handleChange}
                            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                                errors.model ? 'border-red-300' : 'border-gray-300'
                            }`}
                        />
                        {errors.model && <p className="mt-1 text-sm text-red-600">{errors.model}</p>}
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
                            value={formData.year}
                            onChange={handleChange}
                            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                                errors.year ? 'border-red-300' : 'border-gray-300'
                            }`}
                        />
                        {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year}</p>}
                    </div>

                    <div>
                        <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                            Color
                        </label>
                        <input
                            type="text"
                            id="color"
                            name="color"
                            value={formData.color}
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
                        value={formData.engine}
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
                            value={formData.transmission}
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
                            value={formData.fuel_type}
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
                            value={formData.mileage}
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
                            value={formData.price}
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
                        value={formData.vin}
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
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Additional details about the car..."
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors"
                    >
                        Add Car
                    </button>
                </div>
            </form>
        </Modal>
    );
}
