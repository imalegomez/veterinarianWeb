<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Procedimiento extends Model
{
    use HasFactory;

    protected $fillable = ['tipo', 'descripcion', 'estado', 'costo', 'notas_medicas', 'cita_id'];

    public function cita()
    {
        return $this->belongsTo(Cita::class);
    }

    public function vacunas()
    {
        return $this->hasMany(Vacuna::class);
    }
}

