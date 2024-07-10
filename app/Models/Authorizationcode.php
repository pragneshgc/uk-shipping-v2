<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $AuthorizationCodeID
 * @property int $UserID
 * @property int $Type
 * @property int $CreatedAt
 * @property int $UpdatedAt
 * @property int $DeletedAt
 */
class Authorizationcode extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'AuthorizationCode';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'AuthorizationCodeID';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = [
        'UserID',
        'Code',
        'Type',
        'CreatedAt',
        'UpdatedAt',
        'DeletedAt'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'AuthorizationCodeID' => 'int',
        'UserID' => 'int',
        'Type' => 'int',
        'CreatedAt' => 'timestamp',
        'UpdatedAt' => 'timestamp',
        'DeletedAt' => 'timestamp'
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
        'CreatedAt',
        'UpdatedAt',
        'DeletedAt'
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