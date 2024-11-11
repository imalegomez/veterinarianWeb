<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cita extends Model
{
    use HasFactory;

    protected $fillable = ['fecha_hora', 'estado', 'motivo', 'notas', 'paciente_id', 'veterinario_id', 'tipo_cita_id'];

    public function paciente()
    {
        return $this->belongsTo(Paciente::class);
    }

    public function veterinario()
    {
        return $this->belongsTo(Veterinario::class);
    }

    public function tipoCita()
    {
        return $this->belongsTo(TipoCita::class);
    }

    public function procedimientos()
    {
        return $this->hasMany(Procedimiento::class);
    }
}

