<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cita;

class CitaController extends Controller
{
    public function index()
    {
        $query = Cita::query();
        
        if (request()->has('estado')) {
            $query->where('estado', request()->estado);
        }
        
        if (request()->has('fecha')) {
            $query->whereDate('fecha_hora', request()->fecha);
        }
        
        return $query->with(['paciente', 'veterinario', 'tipoCita'])->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'paciente_id' => 'required|exists:pacientes,id',
            'veterinario_id' => 'required|exists:veterinarios,id',
            'tipo_cita_id' => 'required|exists:tipo_citas,id',
            'fecha_hora' => 'required|date',
            'estado' => 'required|in:Programada,En Proceso,Completada,Cancelada',
            'motivo' => 'nullable|string',
            'notas' => 'nullable|string'
        ]);

        return Cita::create($validated);
    }

    public function show(Cita $cita)
    {
        return $cita->load(['paciente', 'veterinario', 'tipoCita', 'procedimientos']);
    }

    public function update(Request $request, Cita $cita)
    {
        $validated = $request->validate([
            'paciente_id' => 'sometimes|required|exists:pacientes,id',
            'veterinario_id' => 'sometimes|required|exists:veterinarios,id',
            'tipo_cita_id' => 'sometimes|required|exists:tipo_citas,id',
            'fecha_hora' => 'sometimes|required|date',
            'estado' => 'sometimes|required|in:Programada,En Proceso,Completada,Cancelada',
            'motivo' => 'nullable|string',
            'notas' => 'nullable|string'
        ]);

        $cita->update($validated);
        return $cita;
    }

    public function destroy(Cita $cita)
    {
        $cita->delete();
        return response()->noContent();
    }
}
