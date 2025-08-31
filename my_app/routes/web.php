<?php

use App\Http\Controllers\CarController;
use Illuminate\Support\Facades\Route;

Route::get('/', [CarController::class, 'index'])->name('home');

// Car CRUD routes
Route::post('/cars', [CarController::class, 'store'])->name('cars.store');
Route::put('/cars/{car}', [CarController::class, 'update'])->name('cars.update');
Route::delete('/cars/{car}', [CarController::class, 'destroy'])->name('cars.destroy');
