<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Propietario extends Model
{
    protected $fillable = [
        'nombre',
        'apellido',
        'telefono',
        'email',
        'direccion',
        'fecha_registro'
    ];

    protected $casts = [
        'fecha_registro' => 'datetime'
    ];

    public function pacientes(): HasMany
    {
        return $this->hasMany(Paciente::class);
    }
}