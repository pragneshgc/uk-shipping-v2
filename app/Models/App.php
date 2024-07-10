<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property string $name
 */
class App extends Model
{
    use HasFactory;

    public function roles()
    {
        return $this->belongsToMany(Role::class)->using(AppRole::class);
    }

    public function modules()
    {
        return $this->belongsToMany(Module::class)->using(AppModule::class);
    }

    public function active_modules()
    {
        return $this->belongsToMany(Module::class)->using(AppModule::class)->where('status', 1);
    }
}