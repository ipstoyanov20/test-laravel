<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    protected $fillable = [
        'make',
        'model',
        'year',
        'color',
        'engine',
        'transmission',
        'fuel_type',
        'mileage',
        'price',
        'vin',
        'description',
    ];

    protected $casts = [
        'year' => 'integer',
        'mileage' => 'integer',
        'price' => 'decimal:2',
    ];
}
