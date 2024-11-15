<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HistorialMedico extends Model
{

    protected $table = 'historial_medico';
    protected $fillable = [
        'paciente_id',
        'alergias',
        'condiciones_cronicas',
        'cirugias_previas',
        'ultima_actualizacion'
    ];

    protected $casts = [
        'ultima_actualizacion' => 'datetime'
    ];

    public function paciente(): BelongsTo
    {
        return $this->belongsTo(Paciente::class);
    }
}