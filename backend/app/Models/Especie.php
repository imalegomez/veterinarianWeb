<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Especie extends Model
{
    protected $fillable = [
        'nombre',
        'descripcion'
    ];

    public function pacientes(): HasMany
    {
        return $this->hasMany(Paciente::class);
    }
}