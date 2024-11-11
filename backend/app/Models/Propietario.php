<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Propietario extends Model
{
    use HasFactory;

    protected $fillable = ['nombre', 'apellido', 'telefono', 'email', 'direccion', 'fecha_registro'];

    public function pacientes()
    {
        return $this->hasMany(Paciente::class);
    }
}
