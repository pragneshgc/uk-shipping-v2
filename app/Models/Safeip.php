<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int    $SafeIPID
 * @property int    $Status
 * @property string $SafeIP
 * @property string $SafeKey
 */
class Safeip extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'SafeIP';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'SafeIPID';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = [
        'SafeIP',
        'SafeKey',
        'Status'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'SafeIPID' => 'int',
        'SafeIP' => 'string',
        'SafeKey' => 'string',
        'Status' => 'int'
    ];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var boolean
     */
    public $timestamps = false;

    // Scopes...

    // Functions ...

    // Relations ...
}