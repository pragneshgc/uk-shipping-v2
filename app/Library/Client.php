<?php

namespace App\Library;

use Illuminate\Support\Facades\DB;

// use Carbon\Carbon;

/**
 * Undocumented class
 */
class Client
{
    /**
     * Undocumented function
     *
     * @param [type] $id
     */
    public function getClient($id)
    {
        return DB::table('Client')->where('ClientID', $id)->first();
    }
}