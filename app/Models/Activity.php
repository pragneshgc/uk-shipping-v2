<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int    $ActivityID
 * @property int    $UserID
 * @property int    $OrderID
 * @property int    $Hour
 * @property int    $Status
 * @property int    $Type
 * @property string $Arguments
 * @property string $Name
 * @property string $Date
 * @property string $Action
 * @property string $Min
 * @property string $Date2
 */
class Activity extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'Activity';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'ActivityID';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = [
        'Arguments',
        'UserID',
        'Name',
        'OrderID',
        'Date',
        'Action',
        'Min',
        'Hour',
        'Date2',
        'Status',
        'Type'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'ActivityID' => 'int',
        'Arguments' => 'string',
        'UserID' => 'int',
        'Name' => 'string',
        'OrderID' => 'int',
        'Date' => 'string',
        'Action' => 'string',
        'Min' => 'string',
        'Hour' => 'int',
        'Date2' => 'string',
        'Status' => 'int',
        'Type' => 'int'
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