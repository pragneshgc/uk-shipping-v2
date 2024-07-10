<?php

namespace App\Services;

use App\Helpers\Generic;
use App\Models\Prescription;
use App\Models\Prescriptionhistory;

class OrderService
{
    /**
     * check if it allow to update status
     */
    public function canUpdateOrderStatus($id, $newStatus)
    {
        $statusHistory = Prescriptionhistory::where('PrescriptionID', $id)
            ->orderBy('UpdatedDate', 'ASC')
            ->pluck('Status');
        $prescription = Prescription::findOrFail($id);

        //allow older order to proceed without status check
        if ($prescription->CreatedDate < strtotime('2023-05-23')) {
            return true;
        }

        $currentStatus = $prescription->Status;

        $byPassStatus = [1, 9];
        $matchAny = [10, 6];

        if (in_array($newStatus, $byPassStatus)) {
            return true;
        } else if (in_array($newStatus, $matchAny)) {
            $prevStatus = match ($newStatus) {
                10 => [1, 2, 7, 6],
                6 => [9, 1, 2, 7, 10],
            };

            if (in_array($currentStatus, $prevStatus)) {
                return true;
            }
            return false;
        } else {
            $prevStatus = match ($newStatus) {
                2 => [1],
                7 => [1, 2],
                8 => [1, 2, 7],
                //10 => [1, 2, 7, 6],
                4 => [1],
                12 => [1, 4],
                13 => [1, 4],
                3 => [1],
                //6 => [9, 1, 2, 7, 10],
                16 => [8],
            };
            $historyArray = array_unique($statusHistory->toArray());
            return Generic::hasAllElements($historyArray, $prevStatus);
        }
    }
}
