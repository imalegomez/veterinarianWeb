<?php

namespace App\Http\Controllers;

use App\Models\TipoCita;
use Illuminate\Http\Request;

class TipoCitaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tipoCitas = TipoCita::all();
        return response()->json($tipoCitas);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'duracion_estimada' => 'required|integer',
            'costo_base' => 'required|numeric',
            'color' => 'required|string|max:7'
        ]);

        $tipoCita = TipoCita::create($validatedData);
        return response()->json($tipoCita, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $tipoCita = TipoCita::findOrFail($id);
        return response()->json($tipoCita);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'nombre' => 'sometimes|required|string|max:255',
            'duracion_estimada' => 'sometimes|required|integer',
            'costo_base' => 'sometimes|required|numeric',
            'color' => 'sometimes|required|string|max:7'
        ]);

        $tipoCita = TipoCita::findOrFail($id);
        $tipoCita->update($validatedData);
        return response()->json($tipoCita);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $tipoCita = TipoCita::findOrFail($id);
        $tipoCita->delete();
        return response()->json(['message' => 'Tipo de cita eliminado correctamente']);
    }
}
