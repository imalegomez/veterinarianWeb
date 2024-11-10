<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProcedimientosTable extends Migration
{
    public function up()
    {
        Schema::create('procedimientos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cita_id')->constrained('citas')->onDelete('cascade');
            $table->enum('tipo', ['Vacunación', 'Cirugía', 'Revisión', 'Tratamiento']);
            $table->text('descripcion')->nullable();
            $table->enum('estado', ['Completado', 'En proceso', 'Pendiente']);
            $table->decimal('costo', 8, 2)->nullable();
            $table->text('notas_medicas')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('procedimientos');
    }
}
