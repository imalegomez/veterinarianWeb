<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Paciente;

class PacienteController extends Controller
{
    public function index()
    {
        $query = Paciente::query();
        
        if (request()->has('with')) {
            $query->with(explode(',', request()->with));
        }
        
        if (request()->has('nombre')) {
            $query->where('nombre', 'like', '%' . request()->nombre . '%');
        }
        
        if (request()->has('activo')) {
            $query->where('activo', request()->activo);
        }
        
        return $query->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'propietario_id' => 'required|exists:propietarios,id',
            'especie_id' => 'required|exists:especies,id',
            'nombre' => 'required|string|max:255',
            'fecha_nacimiento' => 'nullable|date',
            'sexo' => 'nullable|string|in:Macho,Hembra',
            'peso' => 'nullable|numeric|min:0',
            'activo' => 'boolean'
        ]);

        return Paciente::create($validated);
    }

    public function show(Paciente $paciente)
    {
        if (request()->has('with')) {
            $paciente->load(explode(',', request()->with));
        }
        return $paciente;
    }

    public function update(Request $request, Paciente $paciente)
    {
        $validated = $request->validate([
            'propietario_id' => 'sometimes|required|exists:propietarios,id',
            'especie_id' => 'sometimes|required|exists:especies,id',
            'nombre' => 'sometimes|required|string|max:255',
            'fecha_nacimiento' => 'nullable|date',
            'sexo' => 'nullable|string|in:Macho,Hembra',
            'peso' => 'nullable|numeric|min:0',
            'activo' => 'boolean'
        ]);

        $paciente->update($validated);
        return $paciente;
    }

    public function destroy(Paciente $paciente)
    {
        $paciente->delete();
        return response()->noContent();
    }
}
