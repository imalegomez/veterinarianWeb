<?php

use App\Http\Controllers\PropietarioController;
use App\Http\Controllers\PacienteController;
use App\Http\Controllers\VeterinarioController;
use App\Http\Controllers\CitaController;
use App\Http\Controllers\ProcedimientoController;
use App\Http\Controllers\VacunaController;
use App\Http\Controllers\HistorialMedicoController;
use App\Http\Controllers\EspecieController;
use Illuminate\Support\Facades\Route;

Route::apiResource('propietarios', PropietarioController::class);
Route::apiResource('especies', EspecieController::class);
Route::apiResource('pacientes', PacienteController::class);
Route::apiResource('veterinarios', VeterinarioController::class);
Route::apiResource('citas', CitaController::class);
Route::apiResource('procedimientos', ProcedimientoController::class);
Route::apiResource('vacunas', VacunaController::class);
Route::apiResource('historial-medico', HistorialMedicoController::class);

// Rutas adicionales específicas
Route::get('pacientes/{paciente}/historial', [PacienteController::class, 'historial']);
Route::get('veterinarios/{veterinario}/citas', [VeterinarioController::class, 'citas']);
Route::get('propietarios/{propietario}/pacientes', [PropietarioController::class, 'pacientes']);