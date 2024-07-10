<?php

namespace App\Library;

use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Library\Helper;

/**
 * Undocumented class
 */
class Activity
{
    /**
     * Log a change into the activity table
     *
     * @param int $id
     * @param string $action
     * @param array $arguments
     * @return array
     */
    public function log($id, $action = '', $arguments = [], $type = 1, $token = false)
    {
        if(!$token){
            $esaUserID = \Auth::user()->esa_user_id;
            $name = '';
    
            if (is_null($esaUserID)) {
                $esaUserID = 0;
                $name = 'SYSTEM(USER NOT RECOGNIZED)';
            } else {
                $esaUserDetails = DB::table('User')->where('UserID', $esaUserID)->first();
                $name = $esaUserDetails->Name . ' ' . $esaUserDetails->Surname;
            }
        } else {
            $pxpuser = DB::table('PharmacyUser')->where('token', $token)->first();

            if(!$pxpuser){
                return false;
            }

            $esaUserID = $pxpuser->id;
            $esaUserDetails = DB::table('User')->where('UserID', $pxpuser->esa_user_id)->first();
            $name = $esaUserDetails->Name . ' ' . $esaUserDetails->Surname;
        }

        $date = Carbon::now()->format('d/m/Y H:i');

        $data = [
            'UserID' => $esaUserID,
            'Name' => $name,
            'OrderID' => $id,
            'Date' => $date,
            'Action' => $action,
            'Arguments' => json_encode($arguments),
            'Type' => $type,
            'Status' => 1,
            'Date2' => Carbon::now()->format('Y-m-d'),
            'Min' => (new Helper)->round(),
            'Hour' => (int) Carbon::now()->format('H'),
        ];

        return DB::table('Activity')->insert($data);
    }

    /**
     * Undocumented function
     *
     * @param [type] $id
     * @param [type] $log
     * @return void
     */
    public function deactivateLog($id, $log)
    {
        DB::table('Activity')->where('OrderID', $id)->where('Action', $log)->update([
            'Status' => 0,
        ]);
    }

    /**
     * Get list of activities for the order
     *
     * @param int $id
     * @return array
     */
    public function list($id)
    {
        return DB::table('Activity')->where('OrderID', $id)->get();
    }

    /**
     * Check if the label was previously printed
     *
     * @param int $id
     * @return bool
     */
    public function alreadyPrinted($id)
    {
        return DB::table('Activity')->where(['OrderID' => $id, 'Type' => 2])->count() > 0;
    }
}
