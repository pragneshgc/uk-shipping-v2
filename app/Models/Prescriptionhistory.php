<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $PrescriptionHistoryID
 * @property int $PrescriptionID
 * @property int $Status
 * @property int $SubStatus
 * @property int $UpdatedDate
 * @property int $UpdatedBy
 */
class Prescriptionhistory extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'PrescriptionHistory';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'PrescriptionHistoryID';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = [
        'PrescriptionID',
        'Status',
        'SubStatus',
        'UpdatedDate',
        'UpdatedBy'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'PrescriptionHistoryID' => 'int',
        'PrescriptionID' => 'int',
        'Status' => 'int',
        'SubStatus' => 'int',
        'UpdatedDate' => 'int',
        'UpdatedBy' => 'int'
    ];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var boolean
     */
    public $timestamps = false;

    // Scopes...

    // Functions ...
    public static function updateHistory($id, $status, $substatus = NULL, $user = true)
    {
        self::insert([
            'PrescriptionID' => $id,
            'Status' => $status,
            'SubStatus' => $substatus,
            'UpdatedBy' => $user ? Auth::id() : 0,
            'UpdatedDate' => time()
        ]);
    }

    // Relations ...
}