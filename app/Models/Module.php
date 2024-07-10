<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property string $name
 * @property int $status
 */
class Module extends Model
{
    use HasFactory;

    public function app()
    {
        return $this->hasMany(App::class);
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class)->using(ModuleRole::class);
    }
}