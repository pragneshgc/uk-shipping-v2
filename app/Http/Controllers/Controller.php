<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public $r = 30; // range (in days) to search by
    public $q = ''; // string query to search by
    public $s; // column to sort by
    public $o; // order to sort by
    public $l; // limit of records to show
    public $p; // page to show
    public $f; // filters

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Request $request)
    {
        $this->r = $request->input('range') ? $request->input('range') : 30;
        $this->q = $request->input('q') ? $request->input('q') : '';
        $this->s = $request->input('orderBy') ? $request->input('orderBy') : '';
        $this->o = $request->input('orderDirection') ? $request->input('orderDirection') : '';
        $this->l = $request->input('limit') ? $request->input('limit') : 10;
        $this->p = $request->input('page') ? $request->input('page') : 1;
        $this->f = $request->input('f') ? $request->input('f') : '';
    }

    /**
     * success response method.
     *
     * @return JsonResponse
     */
    public function sendResponse($result, $message)
    {
        $response = [
            'success' => true,
            'data' => $result,
            'message' => $message,
        ];

        return response()->json($response, 200);
    }

    /**
     * return error response.
     *
     * @return JsonResponse
     */
    public function sendError($errors, $errorMessages = [], $code = 404)
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