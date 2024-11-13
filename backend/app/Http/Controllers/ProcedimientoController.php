<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Procedimiento;

class ProcedimientoController extends Controller
{
    public function index()
    {
        return Procedimiento::with('cita')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'cita_id' => 'required|exists:citas,id',
            'tipo' => 'required|in:Vacunación,Cirugía,Revisión,Tratamiento',
            'descripcion' => 'nullable|string',
            'estado' => 'required|in:Completado,En proceso,Pendiente',
            'costo' => 'nullable|numeric|min:0',
            'notas_medicas' => 'nullable|string'
        ]);

        return Procedimiento::create($validated);
    }

    public function show(Procedimiento $procedimiento)
    {
        return $procedimiento->load(['cita', 'vacunas']);
    }

    public function update(Request $request, Procedimiento $procedimiento)
    {
        $validated = $request->validate([
            'cita_id' => 'sometimes|required|exists:citas,id',
            'tipo' => 'sometimes|required|in:Vacunación,Cirugía,Revisión,Tratamiento',
            'descripcion' => 'nullable|string',
            'estado' => 'sometimes|required|in:Completado,En proceso,Pendiente',
            'costo' => 'nullable|numeric|min:0',
            'notas_medicas' => 'nullable|string'
        ]);

        $procedimiento->update($validated);
        return $procedimiento;
    }

    public function destroy(Procedimiento $procedimiento)
    {
        $procedimiento->delete();
        return response()->noContent();
    }
}
