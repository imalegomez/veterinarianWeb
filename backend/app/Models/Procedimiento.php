<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Procedimiento extends Model
{
    protected $fillable = [
        'cita_id',
        'tipo',
        'descripcion',
        'estado',
        'costo',
        'notas_medicas'
    ];

    protected $casts = [
        'costo' => 'decimal:2'
    ];

    public function cita(): BelongsTo
    {
        return $this->belongsTo(Cita::class);
    }

    public function vacunas(): HasMany
    {
        return $this->hasMany(Vacuna::class);
    }
}