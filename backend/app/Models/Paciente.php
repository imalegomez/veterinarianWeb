<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Paciente extends Model
{
    protected $fillable = [
        'propietario_id',
        'especie_id',
        'nombre',
        'fecha_nacimiento',
        'sexo',
        'peso',
        'ultima_visita',
        'activo'
    ];

    protected $casts = [
        'fecha_nacimiento' => 'date',
        'ultima_visita' => 'datetime',
        'activo' => 'boolean',
        'peso' => 'float'
    ];

    public function propietario(): BelongsTo
    {
        return $this->belongsTo(Propietario::class);
    }

    public function especie(): BelongsTo
    {
        return $this->belongsTo(Especie::class);
    }

    public function citas(): HasMany
    {
        return $this->hasMany(Cita::class);
    }

    public function historialMedico(): HasOne
    {
        return $this->hasOne(HistorialMedico::class);
    }
}