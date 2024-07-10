<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DefaultController extends Controller
{
    public function index(Request $request)
    {
        $file = $request->getContent();
        Log::info($file);
        return true;
    }
}
