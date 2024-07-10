<?php

namespace App\Http\Middleware;

use Closure;
use App\Helpers\Generic;
use Illuminate\Support\Facades\DB;

/**
 * Check if the incoming ip is in the safeIP list
 */
class CheckIP
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $ipaddress = Generic::getIP();

        $safeip = DB::table('SafeIP')->where('Status', 1)->where('SafeIP', $ipaddress)->select('SafeIP')->first();

        if (!isset($safeip->SafeIP) || $ipaddress != $safeip->SafeIP) {
            return redirect(config('app.esa') . '/restricted');
        }

        return $next($request);
    }
}