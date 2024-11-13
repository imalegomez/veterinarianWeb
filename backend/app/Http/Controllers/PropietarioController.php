<?php

namespace App\Http\Controllers;

use App\Models\Propietario;
use Illuminate\Http\Request;

class PropietarioController extends Controller
{
    public function index()
    {
        return Propietario::with('pacientes')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'telefono' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'direccion' => 'nullable|string|max:255',
        ]);

        return Propietario::create($validated);
    }

    public function show(Propietario $propietario)
    {
        return $propietario->load('pacientes');
    }

    public function update(Request $request, Propietario $propietario)
    {
        $validated = $request->validate([
            'nombre' => 'sometimes|required|string|max:255',
            'apellido' => 'sometimes|required|string|max:255',
            'telefono' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'direccion' => 'nullable|string|max:255',
        ]);

        $propietario->update($validated);
        return $propietario;
    }

    public function destroy(Propietario $propietario)
    {
        $propietario->delete();
        return response()->noContent();
    }
}