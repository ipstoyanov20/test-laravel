
import { type SharedData, type Car } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import ActionButtons from '@/components/ActionButtons';
import ViewModal from '@/components/ViewModal';
import EditModal from '@/components/EditModal';
import DeleteModal from '@/components/DeleteModal';
import AddModal from '@/components/AddModal';
import { PlusIcon } from '@heroicons/react/24/outline';

interface WelcomeProps {
    cars: Car[];
}

export default function Welcome({ cars: initialCars = [] }: WelcomeProps) {
    const { auth } = usePage<SharedData>().props;
    
    // Modal states
    const [viewModal, setViewModal] = useState({ isOpen: false, car: null as Car | null });
    const [editModal, setEditModal] = useState({ isOpen: false, car: null as Car | null });
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, car: null as Car | null });
    const [addModal, setAddModal] = useState({ isOpen: false });
    
    // Use cars directly from props - no local state needed
    const cars = initialCars;

    // Modal handlers
    const handleView = (car: Car) => {
        setViewModal({ isOpen: true, car });
    };

    const handleEdit = (car: Car) => {
        setEditModal({ isOpen: true, car });
    };

    const handleDelete = (car: Car) => {
        setDeleteModal({ isOpen: true, car });
    };

    const handleSaveEdit = (updatedCar: Car) => {
        const data = {
            make: updatedCar.make,
            model: updatedCar.model,
            year: updatedCar.year,
            color: updatedCar.color,
            engine: updatedCar.engine,
            transmission: updatedCar.transmission,
            fuel_type: updatedCar.fuel_type,
            mileage: updatedCar.mileage,
            price: updatedCar.price,
            vin: updatedCar.vin,
            description: updatedCar.description,
        };
        
        router.put(`/cars/${updatedCar.id}`, data, {
            onSuccess: () => {
                setEditModal({ isOpen: false, car: null });
            },
            onError: (errors) => {
                console.error('Error updating car:', errors);
            }
        });
    };

    const handleConfirmDelete = (carToDelete: Car) => {
        router.delete(`/cars/${carToDelete.id}`, {
            onSuccess: () => {
                setDeleteModal({ isOpen: false, car: null });
            },
            onError: (errors) => {
                console.error('Error deleting car:', errors);
            }
        });
    };

    const handleAddCar = (newCarData: Omit<Car, 'id' | 'created_at' | 'updated_at'>) => {
        router.post('/cars', newCarData, {
            onSuccess: () => {
                setAddModal({ isOpen: false });
            },
            onError: (errors) => {
                console.error('Error adding car:', errors);
            }
        });
    };

    const closeModals = () => {
        setViewModal({ isOpen: false, car: null });
        setEditModal({ isOpen: false, car: null });
        setDeleteModal({ isOpen: false, car: null });
        setAddModal({ isOpen: false });
    };

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header with Add Button */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Car Inventory</h1>
                        <button
                            onClick={() => setAddModal({ isOpen: true })}
                            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                        >
                            <PlusIcon className="w-5 h-5 mr-2" />
                            Add Car
                        </button>
                    </div>

                    {/* Cars Table */}
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Make</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {cars.map((car, index) => (
                                    <tr key={car.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{car.make}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{car.model}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{car.year}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{car.color || 'N/A'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                                            <ActionButtons
                                                item={car}
                                                onView={handleView}
                                                onEdit={handleEdit}
                                                onDelete={handleDelete}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                        {cars.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">No cars found.</p>
                                <p className="text-gray-400 text-sm mt-2">Click "Add Car" to get started.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            
            {/* Modals */}
            <AddModal
                isOpen={addModal.isOpen}
                onClose={closeModals}
                onSave={handleAddCar}
            />

            <ViewModal
                isOpen={viewModal.isOpen}
                onClose={closeModals}
                car={viewModal.car}
            />

            <EditModal
                isOpen={editModal.isOpen}
                onClose={closeModals}
                car={editModal.car}
                onSave={handleSaveEdit}
            />

            <DeleteModal
                isOpen={deleteModal.isOpen}
                onClose={closeModals}
                car={deleteModal.car}
                onConfirm={handleConfirmDelete}
            />
        </>
    );
}
