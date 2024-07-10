<?php

namespace App\Library;

use GuzzleHttp;
use App\Library\Order;
use App\Library\Client;
use App\Library\Setting;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

/**
 * Undocumented class
 */
class Tracking
{
    private $order;
    private $setting;
    private $client;
    private $invoiceEndpoint = 'https://www.esasys.co.uk/invoices/generate/';

    public function __construct()
    {
        $this->order = new Order;
        $this->setting = new Setting;
        $this->client = new Client;

        if (config('app.esa')) {
            $this->invoiceEndpoint = config('app.esa') . '/invoices/generate/';
        }
    }

    /**
     * Send tracking
     *
     * @param int $id
     * @param boolean $request
     * @return bool|string
     */
    public function sendTracking($id, $request = true)
    {
        $order = $this->order->getOrderDetails($id);
        $setting = $this->setting->getSetting($order->DeliveryID);
        $client = $this->client->getClient($order->ClientID);

        if (!$order || !$setting || !$client) {
            return false;
        }


        // Check if the client ID is such that JSON should be used
        if (isJSONClient($client->ClientID)) {
            
            $json = json_decode(file_get_contents('xml_return/general.json'), true);

            // Fill in the JSON template with actual data
            $json['ESATracking']['DeliveryCompany'] = $setting->Name;
            $json['ESATracking']['TrackingLink'] = $setting->Value;
            $json['ESATracking']['TrackingCode'] = $order->TrackingCode;
            $json['ESATracking']['RefID'] = $order->ReferenceNumber;
            $json['ESATracking']['TrackingRef'] = $order->ReferenceNumber . '-' . $order->PrescriptionID;
            $json['ESATracking']['Username'] = $client->ReturnUsername;
            $json['ESATracking']['Password'] = $client->ReturnPassword;

            $body = json_encode($json);
            $contentType = 'application/json';
           
        } else {

            $xml = simplexml_load_file('xml_return/general.xml');
            
            $xml->DeliveryCompany = $setting->Name;
            $xml->TrackingLink = $setting->Value;
            $xml->TrackingCode = $order->TrackingCode;
            $xml->RefID = $order->ReferenceNumber;
            $xml->TrackingRef = $order->ReferenceNumber . '-' . $order->PrescriptionID;
            $xml->Username = $client->ReturnUsername;
            $xml->Password = $client->ReturnPassword;
            
            $body = $xml->asXML();
            $contentType = 'text/xml; charset=UTF8';
        }

        // Set options array
        $options = [
            'headers' => [
                'Content-Type' => $contentType,
            ],
            'body' => $body,
        ];


        if (isAzureStorageEnabled()) {
            Storage::disk('azure')->put('ups_xml/tracking-code-send-' . $id . '.xml', $body);
        } else {
            Storage::put('ups_xml/tracking-code-send-' . $id . '.xml', $body);
        }

        if (App::environment('local') || empty($client->ReturnURL)) {
            $returnURL = route('default_return');
        } else {
            $returnURL = $client->ReturnURL;
        }
        

        if ($request) {
            //call external endpoint
            try {
                $req = new GuzzleHttp\Client($options);
                $req->request('POST', $returnURL, $options)->getBody()->getContents();            

            } catch (GuzzleHttp\Exception\RequestException $exception) {
                if ($exception->getResponse() != null) {                    
                    return $exception->getResponse()->getBody()->getContents();
                } else {                    
                    return 'Empty Response';
                }
            }
            
            //call ESA invoice endpoint
            try {
                $req = new GuzzleHttp\Client();
                $req->request('GET', $this->invoiceEndpoint . $id);
            } catch (GuzzleHttp\Exception\RequestException $exception) {
                Log::error($returnURL);
                Log::error($exception->getMessage());
                return $exception->getResponse()->getBody()->getContents();
            }
        }

        return true;
    }

}
