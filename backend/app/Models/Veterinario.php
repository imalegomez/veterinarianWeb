<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Veterinario extends Model
{
    use HasFactory;

    protected $fillable = ['nombre', 'apellido', 'especialidad', 'num_licencia', 'email', 'telefono', 'activo'];

    public function citas()
    {
        return $this->hasMany(Cita::class);
    }
}
