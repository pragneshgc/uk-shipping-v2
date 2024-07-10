<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\APIController;
use App\Http\Controllers\DHLController;
use App\Http\Controllers\HelpController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\DefaultController;
use App\Http\Controllers\Auth\LoginController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Route::get('/api/ups/invoice/{id}', 'APIController@getInvoiceUPS');
// Route::get('/api/ups/label/{id}', 'APIController@getLabelUPS');

Route::get('/token/ups/invoice/{id}', [APIController::class, 'getInvoiceUPS']);
Route::get('/token/rml/label/{id}', [APIController::class, 'getRMLabel']);
Route::get('/token/ups/cod/{id}', [APIController::class, 'getCOD']);
Route::get('/api/ups/gif/{id}', [APIController::class, 'getLabelGifUPS']);
Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');

Route::post('/default-return', [DefaultController::class, 'index'])->name('default_return');

Route::group(['middleware' => ['checkip']], function () {
    Auth::routes();
    Route::post('/login/code', [LoginController::class, 'code'])->name('login_code');
});
Route::group(['middleware' => ['auth']], function () {
    Route::get('/logout', [LoginController::class, 'logout']);
    Route::get('/', [HomeController::class, 'index']);
    Route::get('/statistics', [HomeController::class, 'statistics']);
    Route::get('/countries', [HomeController::class, 'countries']);
    Route::get('/delivery-companies', [HomeController::class, 'deliveryCompanies']);
    Route::get('/products', [HomeController::class, 'products']);
    Route::get('/clients', [HomeController::class, 'clients']);
    Route::get('/doctors', [HomeController::class, 'doctors']);

    Route::get('/reset-order/{id}', [OrderController::class, 'reset']);
    Route::get('/order/{id}', [OrderController::class, 'details']);
    Route::get('/order/{id}/check-document', [OrderController::class, 'checkDocument']);
    Route::get('/order/{id}/download-document', [OrderController::class, 'downloadDocument']);
    Route::get('/order/{id}/activity', [OrderController::class, 'getActivity']);
    Route::post('/resend-authorization', [OrderController::class, 'checkAuthorizationCode']);
    Route::get('/delivery-companies', [OrderController::class, 'deliveryCompanies']);
    Route::post('/import-tracking', [OrderController::class, 'importTracking']);
    Route::post('/log-reprint', [OrderController::class, 'logReprint']);
    Route::get('/orders/search', [OrderController::class, 'search']);
    Route::get('/reports/hourly', [OrderController::class, 'hourly']);
    Route::get('/reports/csv', [OrderController::class, 'csv']);
    //UPS routes
    Route::get('/api/ups/shipment-validation/{id}', [APIController::class, 'shipmentValidationUPS']);
    Route::get('/api/ups/label/{id}', [APIController::class, 'getLabelUPS']);
    // Route::get('/api/ups/invoice/{id}', [APIController::class,'getInvoiceUPS']);
    Route::get('/api/ups/manual/{id}', [APIController::class, 'UPSmanual']);
    //DHL routes
    Route::get('/api/dhl/shipment-validation/{id}', [APIController::class, 'shipmentValidationDHL']);
    Route::get('/api/dhl/label/{id}', [APIController::class, 'getLabelDHL']);
    Route::get('/api/dhl/manual/{id}', [APIController::class, 'DHLmanual']);
    Route::post('/api/dhl/{id}/resend-pdf', [APIController::class, 'DHLResendPDF']);

    //TNT routes
    Route::get('/api/tnt/manual/{id}', [APIController::class, 'TNTmanual']);
    //RM routes
    Route::get('/api/rmail/manual/{id}', [APIController::class, 'RMmanual']);
    Route::get('/api/rmail/label/{id}', [APIController::class, 'getLabelRML']);
    Route::get('/api/rmail/shipment-validation/{id}', [APIController::class, 'shipmentValidationRML']);
    //DPD routes
    Route::get('/api/dpd/manual/{id}', [APIController::class, 'DPDmanual']);
    Route::get('/api/dpd/shipment-validation/{id}', [APIController::class, 'shipmentValidationDPD']);
    Route::get('/api/dpd/label/{id}', [APIController::class, 'getLabelDPD']);
    //Order editing
    Route::get('/order-edit/{id}', [OrderController::class, 'editAddress']);
    Route::post('/order-edit/{id}', [OrderController::class, 'updateAddress']);
    Route::post('/order-edit/check/{id}', [OrderController::class, 'checkUpdateDetail']);

    //users
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{id}/authorizable', [UserController::class, 'authorizable']);
    Route::post('/users/{id}/authorizable', [UserController::class, 'toggleAuthorizable']);
    Route::get('/users/{id}', [UserController::class, 'user']);
    Route::get('/esa_login_status', [UserController::class, 'loggedToEsa']);
    Route::post('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'delete']);
    Route::put('/users', [UserController::class, 'create']);
    Route::get('/login_as/{id}', [UserController::class, 'loginAs']);

    //TEST
    Route::get('/test/dhl/shipment-validation/{id}', [DHLController::class, 'shipmentValidationDHL']);
    Route::get('/test/dhl/book-pickup-global/{id}', [DHLController::class, 'BookPickupGlobal']);
    Route::get('/test/dhl/capability-eu/{id}', [DHLController::class, 'CapabilityEU']);
    Route::get('/test/dhl/book-pickup-eu/{id}', [DHLController::class, 'BookPickupEU']);
    Route::get('/test/dhl/tracking/{id}', [DHLController::class, 'Tracking']);
    Route::get('/test/dhl/tracking-awb/{id}', [DHLController::class, 'TrackingAWB']);
    Route::get('/test/dhl/test', [DHLController::class, 'test']);

    /*HELP*/
    Route::get('/info', [HelpController::class, 'info']); // index of help entries
});
