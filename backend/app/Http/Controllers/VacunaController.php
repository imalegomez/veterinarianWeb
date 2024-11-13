<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vacuna;

class VacunaController extends Controller
{
    public function index()
    {
        return Vacuna::with('procedimiento')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'procedimiento_id' => 'required|exists:procedimientos,id',
            'nombre' => 'required|string|max:255',
            'lote' => 'nullable|string|max:255',
            'fecha_aplicacion' => 'required|date',
            'fecha_proxima' => 'nullable|date|after:fecha_aplicacion',
            'notas' => 'nullable|string'
        ]);

        return Vacuna::create($validated);
    }

    public function show(Vacuna $vacuna)
    {
        return $vacuna->load('procedimiento');
    }

    public function update(Request $request, Vacuna $vacuna)
    {
        $validated = $request->validate([
            'procedimiento_id' => 'sometimes|required|exists:procedimientos,id',
            'nombre' => 'sometimes|required|string|max:255',
            'lote' => 'nullable|string|max:255',
            'fecha_aplicacion' => 'sometimes|required|date',
            'fecha_proxima' => 'nullable|date|after:fecha_aplicacion',
            'notas' => 'nullable|string'
        ]);

        $vacuna->update($validated);
        return $vacuna;
    }

    public function destroy(Vacuna $vacuna)
    {
        $vacuna->delete();
        return response()->noContent();
    }
}