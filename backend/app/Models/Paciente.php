<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paciente extends Model
{
    use HasFactory;

    protected $fillable = ['nombre', 'fecha_nacimiento', 'sexo', 'peso', 'ultima_visita', 'activo', 'propietario_id', 'especie_id', 'raza_id'];

    public function propietario()
    {
        return $this->belongsTo(Propietario::class);
    }

    public function especie()
    {
        return $this->belongsTo(Especie::class);
    }

    public function raza()
    {
        return $this->belongsTo(Raza::class);
    }

    public function citas()
    {
        return $this->hasMany(Cita::class);
    }

    public function historialMedico()
    {
        return $this->hasOne(HistorialMedico::class);
    }
}

