<?php

namespace Database\Seeders;

use App\Models\Car;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Car::create([
            'make' => 'Toyota',
            'model' => 'Camry',
            'year' => 2023,
            'color' => 'Silver',
            'engine' => '2.5L 4-Cylinder',
            'transmission' => 'Automatic',
            'fuel_type' => 'Gasoline',
            'mileage' => 15000,
            'price' => 28500,
            'vin' => '4T1C11AK5NU123456',
            'description' => 'Excellent condition, single owner, all maintenance records available.',
        ]);

        Car::create([
            'make' => 'Honda',
            'model' => 'Civic',
            'year' => 2022,
            'color' => 'Blue',
            'engine' => '2.0L 4-Cylinder',
            'transmission' => 'CVT',
            'fuel_type' => 'Gasoline',
            'mileage' => 25000,
            'price' => 24500,
            'vin' => '2HGFC2F59NH123789',
            'description' => 'Great fuel economy, reliable daily driver with modern features.',
        ]);

        Car::create([
            'make' => 'Tesla',
            'model' => 'Model 3',
            'year' => 2024,
            'color' => 'White',
            'engine' => 'Electric Motor',
            'transmission' => 'Single-Speed',
            'fuel_type' => 'Electric',
            'mileage' => 8000,
            'price' => 42000,
            'vin' => '5YJ3E1EA9PF123456',
            'description' => 'Latest model with enhanced autopilot and premium interior.',
        ]);
    }
}
