<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Veterinario extends Model
{
    protected $fillable = [
        'nombre',
        'apellido',
        'especialidad',
        'num_licencia',
        'email',
        'telefono',
        'activo'
    ];

    protected $casts = [
        'activo' => 'boolean'
    ];

    public function citas(): HasMany
    {
        return $this->hasMany(Cita::class);
    }
}