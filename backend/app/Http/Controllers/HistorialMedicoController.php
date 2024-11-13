<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HistorialMedico;

class HistorialMedicoController extends Controller
{
    public function index()
    {
        return HistorialMedico::with('paciente')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'paciente_id' => 'required|exists:pacientes,id',
            'alergias' => 'nullable|string',
            'condiciones_cronicas' => 'nullable|string',
            'cirugias_previas' => 'nullable|string'
        ]);

        return HistorialMedico::create($validated);
    }

    public function show(HistorialMedico $historialMedico)
    {
        return $historialMedico->load('paciente');
    }

    public function update(Request $request, HistorialMedico $historialMedico)
    {
        $validated = $request->validate([
            'paciente_id' => 'sometimes|required|exists:pacientes,id',
            'alergias' => 'nullable|string',
            'condiciones_cronicas' => 'nullable|string',
            'cirugias_previas' => 'nullable|string'
        ]);

        $historialMedico->update($validated);
        return $historialMedico;
    }

    public function destroy(HistorialMedico $historialMedico)
    {
        $historialMedico->delete();
        return response()->noContent();
    }
}
