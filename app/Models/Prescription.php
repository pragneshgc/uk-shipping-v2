<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int    $PrescriptionID
 * @property int    $DoctorID
 * @property int    $ClientID
 * @property int    $CountryCode
 * @property int    $DCountryCode
 * @property int    $PaymentMethod
 * @property int    $Exemption
 * @property int    $CreatedDate
 * @property int    $Status
 * @property int    $SubStatus
 * @property int    $JVM
 * @property int    $PaymentStatus
 * @property int    $UpdatedDate
 * @property int    $UserID
 * @property int    $SaturdayDelivery
 * @property int    $UPSAccessPointAddress
 * @property int    $TrackingSent
 * @property int    $DoctorAddressID
 * @property int    $CustomerID
 * @property string $GMCNO
 * @property string $DoctorName
 * @property string $ReferenceNumber
 * @property string $Email
 * @property string $GUID
 * @property string $TokenID
 * @property string $Title
 * @property string $Name
 * @property string $Middlename
 * @property string $Surname
 * @property string $DOB
 * @property string $Sex
 * @property string $Address1
 * @property string $Address2
 * @property string $Address3
 * @property string $Address4
 * @property string $Postcode
 * @property string $DAddress1
 * @property string $DAddress2
 * @property string $DAddress3
 * @property string $DAddress4
 * @property string $DPostcode
 * @property string $Telephone
 * @property string $Mobile
 * @property string $Notes
 * @property string $Repeats
 * @property string $TrackingCode
 * @property string $AirwayBillNumber
 * @property string $DeliveryID
 * @property string $Message
 * @property string $CSNotes
 * @property string $Company
 * @property float  $BMI
 */
class Prescription extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'Prescription';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'PrescriptionID';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = [
        'DoctorID',
        'GMCNO',
        'DoctorName',
        'ClientID',
        'ReferenceNumber',
        'Email',
        'GUID',
        'TokenID',
        'Title',
        'Name',
        'Middlename',
        'Surname',
        'DOB',
        'Sex',
        'BMI',
        'Address1',
        'Address2',
        'Address3',
        'Address4',
        'Postcode',
        'CountryCode',
        'DAddress1',
        'DAddress2',
        'DAddress3',
        'DAddress4',
        'DPostcode',
        'DCountryCode',
        'Telephone',
        'Mobile',
        'PaymentMethod',
        'Exemption',
        'CreatedDate',
        'Notes',
        'Repeats',
        'Status',
        'SubStatus',
        'JVM',
        'TrackingCode',
        'AirwayBillNumber',
        'PaymentStatus',
        'DeliveryID',
        'UpdatedDate',
        'UserID',
        'Message',
        'SaturdayDelivery',
        'UPSAccessPointAddress',
        'TrackingSent',
        'CSNotes',
        'DoctorAddressID',
        'Company',
        'CustomerID'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'PrescriptionID' => 'int',
        'DoctorID' => 'int',
        'GMCNO' => 'string',
        'DoctorName' => 'string',
        'ClientID' => 'int',
        'ReferenceNumber' => 'string',
        'Email' => 'string',
        'GUID' => 'string',
        'TokenID' => 'string',
        'Title' => 'string',
        'Name' => 'string',
        'Middlename' => 'string',
        'Surname' => 'string',
        'DOB' => 'string',
        'Sex' => 'string',
        'BMI' => 'float',
        'Address1' => 'string',
        'Address2' => 'string',
        'Address3' => 'string',
        'Address4' => 'string',
        'Postcode' => 'string',
        'CountryCode' => 'int',
        'DAddress1' => 'string',
        'DAddress2' => 'string',
        'DAddress3' => 'string',
        'DAddress4' => 'string',
        'DPostcode' => 'string',
        'DCountryCode' => 'int',
        'Telephone' => 'string',
        'Mobile' => 'string',
        'PaymentMethod' => 'int',
        'Exemption' => 'int',
        'CreatedDate' => 'int',
        'Notes' => 'string',
        'Repeats' => 'string',
        'Status' => 'int',
        'SubStatus' => 'int',
        'JVM' => 'int',
        'TrackingCode' => 'string',
        'AirwayBillNumber' => 'string',
        'PaymentStatus' => 'int',
        'DeliveryID' => 'string',
        'UpdatedDate' => 'int',
        'UserID' => 'int',
        'Message' => 'string',
        'SaturdayDelivery' => 'int',
        'UPSAccessPointAddress' => 'int',
        'TrackingSent' => 'int',
        'CSNotes' => 'string',
        'DoctorAddressID' => 'int',
        'Company' => 'string',
        'CustomerID' => 'int'
    ];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var boolean
     */
    public $timestamps = false;

    // Scopes...

    // Functions ...

    /**
     * Update Order Status
     * @param int $id
     * @param string $code
     * @param string $message
     * @param int $status
     * @param string $awb
     * @return int
     */
    public static function updateStatus(int $id, string $code, string $message, int $status = 8, string $awb = ''): int
    {
        $update = [
            'TrackingCode' => str_replace([' ', "\n", "\t", "\r"], '', $code),
            'Status' => $status,
            'Message' => $message,
            'AirwayBillNumber' => $awb,
            'UpdatedDate' => time(),
            'TrackingSent' => 1
        ];

        if ($status == 8) {
            $update['Email'] = '';
        }
        Prescriptionhistory::updateHistory($id, $status);
        return self::where('PrescriptionID', $id)->update($update);
    }

    // Relations ...
}