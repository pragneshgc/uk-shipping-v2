<?php

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

if (!function_exists('sendResponse')) {
    /**
     * Success response method.
     *
     * @return JsonResponse
     */
    function sendResponse($result, $message = '', $success = true): JsonResponse
    {
        $response = [
            'success' => $success,
            'data' => $result,
            'message' => $message,
        ];

        return response()->json($response, 200);
    }
}

if (!function_exists('sendError')) {
    /**
     * Return error response.
     *
     * @return JsonResponse
     */
    function sendError($errors, $errorMessages = [], $code = 404): JsonResponse
    {
        $response = [
            'success' => false,
            'message' => $errors,
        ];

        if (!empty($errorMessages)) {
            $response['data'] = $errorMessages;
        }

        return response()->json($response, $code);
    }
}

if (!function_exists('base64Image')) {
    function base64Image($path)
    {
        $extension = 'png';

        if (Storage::exists($path)) {
            $path = Storage::path($path);
        } else if (file_exists(public_path($path))) {
            $path = public_path($path);
        } else {
            return false;
        }

        $pathInfo = pathinfo($path);
        $extension = $pathInfo['extension'];
        $img = file_get_contents($path);
        return "data:image/$extension;base64," . str_replace("\n", "", base64_encode($img));
    }
}

if (!function_exists('moneyFormat')) {
    /**
     * Convert Amount to String with Currency
     * eg: 10 => $10 / 10 => £10
     *
     * @param mixed $amount
     * @param string $currency
     * @return string
     */
    function moneyFormat(mixed $amount, string $currency = ''): string
    {
        if (empty($currency)) {
            $currency = config('app.currency');
        }

        return $currency . $amount;
    }
}

if (!function_exists('downloadRemoteFile')) {
    /**
     * download remote file
     *
     * @param string $path
     * @param string $fileName
     * @param string $disk
     * @return Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    function downloadRemoteFile(string $path, string $fileName = '', string $disk = 'azure')
    {
        $url = Storage::disk($disk)->url($path);

        $fileName ??= basename($path);
        $tempImage = tempnam(sys_get_temp_dir(), $fileName);
        copy($url, $tempImage);

        return response()->download($tempImage, $fileName);
    }
}

if (!function_exists('URLToBase64')) {
    /**
     * convert URL to base64 string
     *
     * @param string $url
     * @return string
     */
    function URLToBase64($url)
    {
        $path = strtok($url, "?");
        $base64 = base64_encode(file_get_contents($url));
        $type = pathinfo($path, PATHINFO_EXTENSION);

        return 'data:image/' . $type . ';base64,' . $base64;
    }
}

if (!function_exists('saveToStorage')) {
    /**
     * Store file to Remote storage if configured otherwise store to local storage.
     *
     * @param string $filename
     * @param Illuminate\Http\File|Illuminate\Http\UploadedFile|Psr\Http\Message\StreamInterface|resource|string $contents,
     * @param string $filename name of file to store on server
     * @param string $disk default 'azure'
     * @return bool
     */
    function saveToStorage(string $path, $contents, string $filename, string $disk = 'azure')
    {
        $filePath = $path . $filename;
        if (isAzureStorageEnabled() && $disk == 'azure') {
            return Storage::disk('azure')->put($filePath, $contents);
        }
        return Storage::put($filePath, $contents);
    }
}

if (!function_exists('getXMLFromStorage')) {
    function getXMLFromStorage(string $filename, $disk = 'azure')
    {
        if (config('filesystems.disks.azure.container') != '' && $disk == 'azure') {
            $files = Storage::disk('azure')->allFiles('xml/');
            $matchFiles = collect(preg_grep("/{$filename}/i", $files));
            return $matchFiles->first();
        } else {
            $files = File::glob(storage_path() . "/app/public/xml/$filename*.xml");
            if (count($files) > 0) {
                return $files[0];
            }
        }
        return false;
    }
}

if (!function_exists('isAzureStorageEnabled')) {
    /**
     * Check if azure storage enabled or not
     *
     * @return boolean
     */
    function isAzureStorageEnabled()
    {
        return config('filesystems.disks.azure.key') != '' ? true : false;
    }
}

if (!function_exists('isFridgeProduct')) {
    /**
     * check if product is fridge product or not
     *
     * @param string $prescriptionId
     * @return boolean
     */
    function isFridgeProduct(string $prescriptionId)
    {
        if (DB::table('product as p')
            ->select('pc.Fridge')
            ->join('productcode as pc', 'p.Code', '=', 'pc.Code', 'inner')
            ->where('p.PrescriptionID', $prescriptionId)
            ->where('pc.Fridge', 1)
            ->exists()
        ) {
            return true;
        }
        return false;
    }
}


// Check if the given client ID indicates JSON usage
if (!function_exists('isJSONClient')) {
    function isJSONClient($clientID)
    {        
        $jsonClients[] = env('JSON_CLIENTS');       
        return in_array($clientID, $jsonClients);
    }
}