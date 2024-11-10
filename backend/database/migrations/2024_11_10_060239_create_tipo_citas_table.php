<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTipoCitasTable extends Migration
{
    public function up()
    {
        Schema::create('tipo_citas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->integer('duracion_estimada')->nullable(); // minutos
            $table->decimal('costo_base', 8, 2)->nullable();
            $table->string('color')->nullable(); // Para UI
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('tipo_citas');
    }
}
