<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistorialMedico extends Model
{
    use HasFactory;

    protected $fillable = ['alergias', 'condiciones_cronicas', 'cirugias_previas', 'ultima_actualizacion', 'paciente_id'];

    public function paciente()
    {
        return $this->belongsTo(Paciente::class);
    }
}

