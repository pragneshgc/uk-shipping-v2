<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property string $name
 */
class Role extends Model
{
    use HasFactory;

    public function modules()
    {
        return $this->belongsToMany(Module::class)->using(ModuleRole::class);
    }

    public function apps()
    {
        return $this->belongsToMany(App::class)->using(AppRole::class);
    }
}