<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Vacuna extends Model
{
    protected $fillable = [
        'procedimiento_id',
        'nombre',
        'lote',
        'fecha_aplicacion',
        'fecha_proxima',
        'notas'
    ];

    protected $casts = [
        'fecha_aplicacion' => 'date',
        'fecha_proxima' => 'date'
    ];

    public function procedimiento(): BelongsTo
    {
        return $this->belongsTo(Procedimiento::class);
    }
}