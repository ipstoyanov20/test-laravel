import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';




export interface SharedData {
    cars?: Car[];
    [key: string]: unknown;
}


export interface Car {
    id: number;
    make: string;
    model: string;
    year: number;
    color?: string;
    engine?: string;
    transmission?: string;
    fuel_type?: string;
    mileage?: number;
    price?: number;
    vin?: string;
    description?: string;
    created_at?: string;
    updated_at?: string;
}

export interface ActionButtonProps {
    item: Car;
    onView?: (item: Car) => void;
    onEdit?: (item: Car) => void;
    onDelete?: (item: Car) => void;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}
