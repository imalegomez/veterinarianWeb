<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vacuna extends Model
{
    use HasFactory;

    protected $fillable = ['nombre', 'lote', 'fecha_aplicacion', 'fecha_proxima', 'notas', 'procedimiento_id'];

    public function procedimiento()
    {
        return $this->belongsTo(Procedimiento::class);
    }
}

