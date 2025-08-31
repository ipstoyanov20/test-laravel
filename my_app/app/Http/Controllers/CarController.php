<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CarController extends Controller
{
    /**
     * Display a listing of the cars.
     */
    public function index()
    {
        $cars = Car::latest()->get();
        
        return Inertia::render('welcome', [
            'cars' => $cars
        ]);
    }

    /**
     * Store a newly created car in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'make' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'color' => 'nullable|string|max:255',
            'engine' => 'nullable|string|max:255',
            'transmission' => 'nullable|string|max:255',
            'fuel_type' => 'nullable|string|max:255',
            'mileage' => 'nullable|integer|min:0',
            'price' => 'nullable|numeric|min:0',
            'vin' => 'nullable|string|max:17|unique:cars,vin',
            'description' => 'nullable|string',
        ]);

        $car = Car::create($validated);

        return redirect()->back()->with('success', 'Car added successfully!');
    }

    /**
     * Update the specified car in storage.
     */
    public function update(Request $request, Car $car)
    {
        $validated = $request->validate([
            'make' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'color' => 'nullable|string|max:255',
            'engine' => 'nullable|string|max:255',
            'transmission' => 'nullable|string|max:255',
            'fuel_type' => 'nullable|string|max:255',
            'mileage' => 'nullable|integer|min:0',
            'price' => 'nullable|numeric|min:0',
            'vin' => 'nullable|string|max:17|unique:cars,vin,' . $car->id,
            'description' => 'nullable|string',
        ]);

        $car->update($validated);

        return redirect()->back()->with('success', 'Car updated successfully!');
    }

    /**
     * Remove the specified car from storage.
     */
    public function destroy(Car $car)
    {
        $car->delete();

        return redirect()->back()->with('success', 'Car deleted successfully!');
    }
}
