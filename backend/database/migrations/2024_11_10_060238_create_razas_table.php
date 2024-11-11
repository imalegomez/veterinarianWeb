<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRazasTable extends Migration
{
    public function up()
    {
        Schema::create('razas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('especie_id')->constrained()->onDelete('cascade');
            $table->string('nombre');
            $table->text('caracteristicas')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('razas');
    }
}
