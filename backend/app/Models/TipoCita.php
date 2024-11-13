<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TipoCita extends Model
{
    protected $fillable = [
        'nombre',
        'duracion_estimada',
        'costo_base',
        'color'
    ];

    protected $casts = [
        'duracion_estimada' => 'integer',
        'costo_base' => 'decimal:2'
    ];

    public function citas(): HasMany
    {
        return $this->hasMany(Cita::class);
    }
}