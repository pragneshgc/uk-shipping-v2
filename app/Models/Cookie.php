<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property string $CKey
 * @property string $Hostname
 * @property int    $UserID
 * @property int    $EDate
 */
class Cookie extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'Cookie';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'CKey';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = [
        'UserID',
        'EDate',
        'Hostname'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'CKey' => 'string',
        'UserID' => 'int',
        'EDate' => 'int',
        'Hostname' => 'string'
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