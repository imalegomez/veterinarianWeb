<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoCita extends Model
{
    use HasFactory;

    protected $fillable = ['nombre', 'duracion_estimada', 'costo_base', 'color'];

    public function citas()
    {
        return $this->hasMany(Cita::class);
    }
}
