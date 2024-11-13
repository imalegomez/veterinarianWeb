<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Especie;

class EspecieController extends Controller
{
    public function index()
    {
        return Especie::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string'
        ]);

        return Especie::create($validated);
    }

    public function show(Especie $especie)
    {
        return $especie;
    }

    public function update(Request $request, Especie $especie)
    {
        $validated = $request->validate([
            'nombre' => 'sometimes|required|string|max:255',
            'descripcion' => 'nullable|string'
        ]);

        $especie->update($validated);
        return $especie;
    }

    public function destroy(Especie $especie)
    {
        $especie->delete();
        return response()->noContent();
    }
}
