<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Veterinario;

class VeterinarioController extends Controller
{
    public function index()
    {
        return Veterinario::when(request()->has('activo'), function($query) {
            return $query->where('activo', request()->activo);
        })->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'especialidad' => 'nullable|string|max:255',
            'num_licencia' => 'required|string|unique:veterinarios,num_licencia',
            'email' => 'nullable|email|max:255',
            'telefono' => 'nullable|string|max:20',
            'activo' => 'boolean'
        ]);

        return Veterinario::create($validated);
    }

    public function show(Veterinario $veterinario)
    {
        return $veterinario->load('citas');
    }

    public function update(Request $request, Veterinario $veterinario)
    {
        $validated = $request->validate([
            'nombre' => 'sometimes|required|string|max:255',
            'apellido' => 'sometimes|required|string|max:255',
            'especialidad' => 'nullable|string|max:255',
            'num_licencia' => 'sometimes|required|string|unique:veterinarios,num_licencia,' . $veterinario->id,
            'email' => 'nullable|email|max:255',
            'telefono' => 'nullable|string|max:20',
            'activo' => 'boolean'
        ]);

        $veterinario->update($validated);
        return $veterinario;
    }

    public function destroy(Veterinario $veterinario)
    {
        $veterinario->delete();
        return response()->noContent();
    }
}
