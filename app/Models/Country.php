<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int    $CountryID
 * @property int    $RegionID
 * @property int    $Status
 * @property string $Name
 * @property string $CodeName2
 * @property string $CodeName3
 * @property float  $Digital
 * @property float  $Physical
 */
class Country extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'Country';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'CountryID';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = [
        'Name',
        'RegionID',
        'Status',
        'CodeName2',
        'CodeName3',
        'Digital',
        'Physical'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'CountryID' => 'int',
        'Name' => 'string',
        'RegionID' => 'int',
        'Status' => 'int',
        'CodeName2' => 'string',
        'CodeName3' => 'string',
        'Digital' => 'float',
        'Physical' => 'float'
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