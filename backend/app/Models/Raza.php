<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Raza extends Model
{
    use HasFactory;

    protected $fillable = ['nombre', 'caracteristicas', 'especie_id'];

    public function especie()
    {
        return $this->belongsTo(Especie::class);
    }

    public function pacientes()
    {
        return $this->hasMany(Paciente::class);
    }
}

