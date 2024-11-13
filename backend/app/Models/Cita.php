<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cita extends Model
{
    protected $fillable = [
        'paciente_id',
        'veterinario_id',
        'tipo_cita_id',
        'fecha_hora',
        'estado',
        'motivo',
        'notas'
    ];

    protected $casts = [
        'fecha_hora' => 'datetime'
    ];

    public function paciente(): BelongsTo
    {
        return $this->belongsTo(Paciente::class);
    }

    public function veterinario(): BelongsTo
    {
        return $this->belongsTo(Veterinario::class);
    }

    public function tipoCita(): BelongsTo
    {
        return $this->belongsTo(TipoCita::class);
    }

    public function procedimientos(): HasMany
    {
        return $this->hasMany(Procedimiento::class);
    }
}