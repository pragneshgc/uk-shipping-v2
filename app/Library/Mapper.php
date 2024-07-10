<?php

namespace App\Library;

use App\Library\Helper;
use Illuminate\Support\Str;

/**
 * Maps arrays or XML objects for various API's
 */
class Mapper
{
    private $h;

    public function __construct()
    {
        $this->h = new Helper;
    }

    public function UPSValidationMap()
    {
        # code...
    }

    /**
     * DPD shipment validation endpoint map
     *
     * @param object $order
     * @param object $shipper
     * @return array
     */
    public function DPDValidationMap($order, $shipper): array
    {
        $phone = $this->h->formatPhone($order->Telephone);
        if ($phone == '') {
            $phone = $this->h->formatPhone($order->Mobile);
        }

        $reference = $order->PrescriptionID . '-' . $order->ReferenceNumber;

        if ($order->Repeats != '0' && $order->Repeats != '') {
            $repeats = explode(' ', $order->Repeats);
            $amount = $repeats[1];
            $currency = $repeats[0];
        } else {
            $amount = '20';
            $currency = 'GBP';
        }

        $collectionDate = date('Y-m-d\TH:i:s', strtotime('+0 hours'));

        //DPD specific delivery type code
        //also check if the order is not eveadam or treated
        if (in_array($order->DCountryCode, ['23', '74', '107', '162'])) {
            $deliveryTypeCode = '1^19'; //outside UK delivery
        } else {
            $deliveryTypeCode = '1^32'; //inside UK delivery
        }

        if ($order->SaturdayDelivery == '1') {
            $deliveryTypeCode = '1^16'; //saturday delivery
        }

        //If Fridge and Postcode starts with 'BT' then Network Code should be 11.
        if (isFridgeProduct($order->PrescriptionID) && Str::startsWith($order->DPostcode, 'BT')) {
            $deliveryTypeCode = '1^11';
        }

        return [
            "jobId" => null,
            "collectionOnDelivery" => false,
            "generateCustomsData" => "N", //this is for international air shipments
            "collectionDate" => $collectionDate,
            "consolidate" => false,
            "consignment" => [
                [
                    "consignmentNumber" => null, // ours or theirs?
                    "consignmentRef" => null, // ours or theirs?
                    "networkCode" => $deliveryTypeCode, // see above
                    "numberOfParcels" => 1, // always 1 package
                    "totalWeight" => 0.5, //in kg
                    "shippingRef1" => $reference,
                    "customsValue" => $amount, // needs to be GBP
                    "deliveryInstructions" => "", //gate number etc.
                    "parcelDescription" => "Medicine",
                    "liabilityValue" => null,
                    "liability" => false,
                    "parcel" => [
                        [
                            "packageNumber" => 1, //we would only be sending 1 parcel
                            "parcelProduct" => [
                                [
                                    "productTypeDescription" => "Medicine",
                                    "productItemsDescription" => "Medicine",
                                    "countryOfOrigin" => "GB",
                                    "unitWeight" => 0.5,
                                    "numberOfItems" => 1,
                                    "unitValue" => $amount,
                                ]
                            ]
                        ]
                    ],
                    "collectionDetails" => [
                        "contactDetails" => [
                            "contactName" => " Dispatch",
                            "telephone" => $shipper->Telephone
                        ],
                        "address" => [
                            "organisation" => "HR Healthcare",
                            "countryCode" => "GB",
                            "postcode" => $shipper->Postcode,
                            "street" => $shipper->Address3 . ' ',
                            "locality" => $shipper->Address2 . ' ' . $shipper->Address1,
                            "town" => $shipper->Address4,
                            "county" => $shipper->CountryName
                        ]
                    ],
                    "deliveryDetails" => [
                        "contactDetails" => [
                            "contactName" => $order->Name . ' ' . $order->Surname,
                            "telephone" => $phone
                        ],
                        "address" => [
                            "organisation" => $order->Name . ' ' . $order->Surname,
                            "countryCode" => $order->CountryCodeName,
                            "postcode" => $order->DPostcode,
                            "street" => $order->DAddress1,
                            "locality" => $order->DAddress2,
                            "town" => $order->DAddress3,
                            "county" => $order->CountryName
                        ],
                        "notificationDetails" => [
                            "email" => $order->Email,
                            "mobile" => $phone
                        ]
                    ],
                ]
            ],

            "invoice" => [
                "countryOfOrigin" => "GB",
                "invoiceExportReason" => "Sale",
                "invoiceReference" => $reference,
                "invoiceType" => 2,
                "shippingCost" => '0.00', //Note: We highly recommend populating this with ‘0.00’
            ],
        ];
    }

    /**
     * Royal mail validation endpoint mapping
     *
     * @param [type] $order
     * @param [type] $shipper
     * @param [type] $products
     * @param [type] $vars
     * @return array
     */
    public function RMLValidationMap($order, $shipper, $products, $vars, $fridge): array
    {
        $phone = $this->h->formatPhone($order->Telephone);
        if ($phone == '') {
            $phone = $this->h->formatPhone($order->Mobile);
        }

        $reference = $order->PrescriptionID . '-' . $order->ReferenceNumber;

        $amount = '20';
        $currency = 'GBP';

        if ($order->Repeats != '0' && $order->Repeats != '') {
            $repeats = explode(' ', $order->Repeats);
            $amount = $repeats[1];
            $currency = $repeats[0];
        }

        $collectionDate = date('Y-m-d\TH:i:s', strtotime('+0 hours'));

        $commercialInvoice = false;

        if ($order->DCountryCode == 245 || $order->DCountryCode == 244) {
            $commercialInvoice = true;
        }

        $numberOfProducts = count($products);
        $perProductValue = round($amount / $numberOfProducts, 2);
        $perProductWeight = round(500 / $numberOfProducts, 2);
        $contents = [];

        array_push($contents, [
            "name" => 'Medicine',
            "SKU" => $products[0]->Code, //using the internal product code for indentification
            "quantity" => 1,
            "unitValue" => $amount, //this is important for Jersey and Guernsey, we can either calculate it or fix it to a certain value
            "unitWeightInGrams" => $fridge ? 1500 : 500,
            "customsDescription" => "Medicine",
            "extendedCustomsDescription" => $products[0]->Description,
            "customsCode" => $products[0]->TariffCode, //these are just product codes
            "originCountryCode" => "GB",
            "customsDeclarationCategory" => "saleOfGoods",
            "requiresExportLicence" => false
        ]);

        return [
            "items" => [
                [
                    "orderReference" => $reference,
                    "recipient" => [
                        "address" => [
                            "fullName" => $order->Name . ' ' . $order->Surname,
                            "companyName" => "",
                            "addressLine1" => $order->DAddress1,
                            "addressLine2" => $order->DAddress2,
                            "addressLine3" => "",
                            "city" => $order->DAddress3,
                            "county" => $order->CountryName,
                            "postcode" => $order->DPostcode,
                            "countryCode" => $order->CountryCodeName
                        ],
                        "phoneNumber" => $phone,
                        "emailAddress" => $order->Email != '' ? $order->Email : 'customercare-uk@treated.com',
                        "addressBookReference" => "" //probably not relevant
                    ],
                    "sender" => [
                        "tradingName" => "HR Healthcare",
                        "phoneNumber" => $shipper->Telephone,
                        "emailAddress" => "yasin@hrhealthcare.group"
                    ],
                    "billing" => [
                        "address" => [
                            "fullName" => "HR Healthcare",
                            "companyName" => "HR Healthcare",
                            "addressLine1" => $shipper->Address1,
                            "addressLine2" => $shipper->Address2,
                            "addressLine3" => $shipper->Address3,
                            "city" => $shipper->Address4,
                            "county" => $shipper->CountryName,
                            "postcode" => $shipper->Postcode,
                            "countryCode" => "GB"
                        ],
                        "phoneNumber" => $shipper->Telephone,
                        "emailAddress" => "yasin@hrhealthcare.group"
                    ],
                    "packages" => [
                        [
                            "weightInGrams" => $fridge ? 1500 : 500,
                            "packageFormatIdentifier" => "Parcel",
                            "customPackageFormatIdentifier" => "parcel",
                            "dimensions" => [
                                "heightInMms" => 230,
                                "widthInMms" => 150,
                                "depthInMms" => 40
                            ],
                            "contents" => $contents
                        ]
                    ],
                    "orderDate" => $collectionDate,
                    "plannedDespatchDate" => $collectionDate,
                    "specialInstructions" => "",
                    "subtotal" => $amount,
                    "shippingCostCharged" => 0,
                    "otherCosts" => 0,
                    "total" => $amount,
                    "currencyCode" => $currency,
                    "postageDetails" => [
                        "sendNotificationsTo" => "recipient",
                        "serviceCode" => $vars['serviceCode'],
                        "consequentialLoss" => 0,
                        "receiveEmailNotification" => true,
                        "receiveSmsNotification" => true,
                        "guaranteedSaturdayDelivery" => false,
                        "requestSignatureUponDelivery" => false,
                        "isLocalCollect" => false,
                        "safePlace" => "",
                        "department" => "",
                        "AIRNumber" => "",
                        "IOSSNumber" => "",
                        "requiresExportLicense" => $commercialInvoice ? true : false, //jersey and guernsey
                        "commercialInvoiceNumber" => $commercialInvoice ? "" : "", //jersey and guernsey
                        "commercialInvoiceDate" => $commercialInvoice ? "" : "" //jersey and guernsey
                    ],
                    "label" => [
                        "includeLabelInResponse" => true,
                        "includeCN" => true, //cn22 is included, cn23 has to be requested separately
                        "includeReturnsLabel" => true
                    ]
                ]
            ]
        ];
    }
}
