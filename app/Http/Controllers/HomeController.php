<?php

namespace App\Http\Controllers;

use App\Models\Prescription;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    /**
     * Show root page
     *
     * @return \Illuminate\Http\Response
     */
    public function welcome(Request $request)
    {
        return view('welcome');
    }

    /**
     * Show the application dashboard.
     *
     */
    public function index(Request $request)
    {
        $hidden = DB::table('Setting')->where('Type', 900)->value('Value');
        $hidden = explode(',', $hidden);

        $app = \App\Models\App::where('name', 'Shipping')->with(['active_modules', 'active_modules.roles'])->first();
        $modules = $app->active_modules;
        $active_module_roles = [];
        foreach ($modules as $module) {
            $roles = $module->roles;
            foreach ($roles as $role) {
                $active_module_roles[$module->id][] = $role->id;
            }
        }
        $active_modules = $app->active_modules->pluck('name', 'id');

        if ($request->user()->shipping_role <= 0) {
            return 'Not Allowed';
        }

        return view('home', [
            'hidden' => json_encode($hidden),
            'active_modules' => json_encode($active_modules),
            'active_module_roles' => json_encode($active_module_roles),
        ]);
    }

    /**
     * Get statistics
     *
     * @return JsonResponse
     */
    public function statistics()
    {
        $first = Prescription::query()
            ->selectRaw("Status, Exemption, DeliveryID, count(1) AS Count")
            ->whereRaw("Status IN(1,2,7,8,9)
                AND UpdatedDate>=UNIX_TIMESTAMP(CURDATE())
                AND UpdatedDate<UNIX_TIMESTAMP(DATE_ADD(CURDATE(),INTERVAL 1 DAY))
        ")
            ->groupByRaw("DeliveryID, Status");
        $second = Prescription::query()
            ->selectRaw("Status, Exemption, DeliveryID, count(1) AS Count")
            ->whereRaw("Status IN(1)
                    AND CreatedDate<=UNIX_TIMESTAMP(DATE_ADD(CURDATE(),INTERVAL 1 DAY))
                ")
            ->groupByRaw("DeliveryID, Status");

        $statuses = Prescription::query()
            ->selectRaw("Status, Exemption, DeliveryID, count(1) AS Count")
            ->whereRaw("Status IN(1,2,7,9)")
            ->groupByRaw("(CASE WHEN Status=7 AND Exemption=3 THEN Exemption ELSE Status END), DeliveryID, Status")
            ->union($first)
            ->union($second)
            ->orderBy('Status')
            ->get();

        $statistics = [
            'processing' => 0,
            'ready' => 0,
            'import' => 0,
            'shipped' => 0,
            'dpd' => 0,
            'ups' => 0,
            'dhl' => 0,
            'rml' => 0,
        ];

        foreach ($statuses as $status) {
            switch ($status->Status) {
                case '1':
                    $statistics['processing'] += (int) $status->Count;
                    break;
                case '2':
                    $statistics['processing'] += (int) $status->Count;
                    break;
                case '9':
                    $statistics['processing'] += (int) $status->Count;
                    break;
                case '7':
                    if ($status->Exemption != 3) {
                        $statistics['ready'] += (int) $status->Count;
                    } else if ($status->Exemption == 3) {
                        // $statistics['ready'] -= (int) $status->Count;
                        $statistics['import'] += (int) $status->Count;
                    }

                    if ($status->DeliveryID == 4) {
                        $statistics['dpd'] += (int) $status->Count;
                    } else if ($status->DeliveryID == 7) {
                        $statistics['ups'] += (int) $status->Count;
                    } else if ($status->DeliveryID == 10) {
                        $statistics['dhl'] += (int) $status->Count;
                    } else if ($status->DeliveryID == 5) {
                        $statistics['rml'] += (int) $status->Count;
                    }

                    break;
                case '8':
                    $statistics['shipped'] += (int) $status->Count;
                    break;
                default:
                    break;
            }
        }

        $total = (int) $statistics['processing'] + (int) $statistics['ready'] + (int) $statistics['import'] + (int) $statistics['shipped'];

        $data = [
            'statistics' => $statistics,
            'shipped' => $statistics['shipped'],
            'total' => $total,
        ];

        return $this->sendResponse($data, 'statistics');
    }

    public function countries()
    {
        return $this->sendResponse(DB::table('Country') /*->where('Status', 1)*/->get(), 'Countries');
    }

    public function deliveryCompanies()
    {
        return $this->sendResponse(DB::table('Setting')->where('Type', 2)->get(), 'Companies');
    }

    public function doctors()
    {
        return $this->sendResponse(DB::table('Doctor')->get(), 'Doctors');
    }

    public function products()
    {
        $products = DB::table('ProductCode')->selectRaw("ProductCode.Code,
        CONCAT(ProductCode.Name, ' (',ProductCode.Quantity,' ', ProductCode.Units,')', ' - ', ProductCode.Code) AS Name")
            ->where('Type', '1')->orderBy('Name', 'ASC')->get();

        return $this->sendResponse($products, 'Products');
    }

    public function clients()
    {
        return $this->sendResponse(DB::table('Client')->where('Status', 1)->get(), 'Clients');
    }
}
