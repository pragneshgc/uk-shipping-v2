<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class UserController extends Controller
{
    private $table = 'PharmacyUser';

    public function __construct(Request $request)
    {
        parent::__construct($request);
    }

    /**
     * Return a list of active users
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = DB::table($this->table . ' AS i')
            ->selectRaw("i.id AS 'ID',i.name AS 'Name', i.surname AS 'Surname', i.code AS 'Code', i.email AS 'Email', i.shipping_role AS 'Role'")
            ->selectRaw("CASE COALESCE(deleted_at, 0) WHEN 0 THEN 'Active' ELSE 'Inactive' END AS 'Status'");

        $data = $data->whereNull("i.deleted_at");

        if ($this->q != '') {
            $data = $data->where('Name', 'LIKE', '%' . $this->q . '%')
                ->orWhere('Email', 'LIKE', '%' . $this->q . '%');
        }

        if ($this->s != '') {
            $data = $data->orderBy($this->s, $this->o);
        }

        $data = $data->paginate($this->l);

        return $this->sendResponse($data, 'Successfull query');
    }

    /**
     * Return user details by id
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function user($id)
    {
        $data = DB::table($this->table)->select('name', 'surname', 'email', 'shipping_role AS role', 'esa_user_id', 'code')
        ->where('id', '=', $id)->first();
        $esaUsers = DB::table('User')->select('UserID', 'Username')->get();

        return $this->sendResponse(['userData' => $data, 'esaUsers' => $esaUsers], 'Successfull query');
    }

    /**
     * Update an existing user with a specified id
     *
     * @param int $id
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {
        if (\Auth::id() != $id && \Auth::user()->shipping_role < 50) {
            return $this->sendError('You are not allowed to update this users information.');
        }

        $input = $request->validate([
            'name' => 'required|max:255',
            'surname' => 'required|max:255',
            'role' => 'required',
            'esa_user_id' => 'nullable',
            'code' => 'nullable|unique:InventoryUser,code,' . $id
        ]);

        $password = $request->input('password');
        if (isset($password)) {
            $input['password'] = bcrypt($request->input('password'));
        }

        $email = $request->input('email');
        if (isset($email)) {
            $input['email'] = $request->input('email');
        }

        $code = $request->input('code');
        if (isset($code)) {
            $input['code'] = $request->input('code');
        }

        $data = DB::table($this->table)->where('id', $id)->update($input); // 0 on no changes, 1 on success

        return $this->sendResponse($data, 'User information updated.');
    }

    /**
     * Create a new user from the request
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        if (\Auth::user()->shipping_role < 50) {
            return $this->sendError('You are not allowed to create a new user.');
        }

        $input = $request->validate([
            'name' => 'required|max:255',
            'surname' => 'required|max:255',
            'email' => "required|email|unique:$this->table,email",
            'role' => 'required',
            'password' => 'required|required_with:passwordRepeat|same:passwordRepeat',
            'passwordRepeat' => 'required'
        ]);

        $user = array(
            'name' => $input['name'],
            'surname' => $input['surname'],
            'email' => $input['email'],
            'role' => $input['role'],
            'password' => bcrypt($input['password']),
            'created_at' =>  \Carbon\Carbon::now()
        );

        $data = DB::table($this->table)->insert($user); // 0 on no changes, 1 on success

        return $this->sendResponse($data, 'New user added');
    }

    /**
     * Login as a user
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function loginAs($id)
    {
        if (\Auth::user()->shipping_role == 60) {
            return $this->sendResponse(\Auth::loginUsingId($id, true), 'login successful');
        }

        return $this->sendError('You are not allowed to login as another user.');
    }

    /**
     * Delete a user
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        DB::table($this->table)->where('id', $id)->update(
            [
                'deleted_at' => \Carbon\Carbon::now()
            ]
        );

        return $this->sendResponse([], 'User deleted');
    }

    /**
     * Check if the user is logged into old ESA
     *
     * @return \Illuminate\Http\Response
     */
    public function loggedToEsa()
    {
        $isLoggedCookie = DB::table('Cookie')->where('UserID', \Auth::user()->esa_user_id)->first();

        if ($isLoggedCookie && $isLoggedCookie->EDate > time()) {
            return $this->sendResponse($isLoggedCookie->CKey, 'Logged in');
        } else {
            $string = substr(str_shuffle(str_repeat($x = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil(32 / strlen($x)))), 1, 32);
            DB::table('Cookie')->insert(['CKey' => $string, 'UserID' => \Auth::user()->esa_user_id, 'EDate' => time() + (60 * 10), 'Hostname' => 'inventory']);
            return $this->sendResponse($string, 'Not logged in');
        }
    }

    /**
     * Check if the user can authorize via authorization code
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function authorizable($id)
    {
        return $this->sendResponse(DB::table('AuthorizationCode')->where('UserID', $id)->whereNull('DeletedAt')->exists(), 'authorizable');
    }

    public function toggleAuthorizable($id, Request $request)
    {
        $authorizable = $request->authorizable;

        if($authorizable){
            if(DB::table('AuthorizationCode')->where('UserID', $id)->whereNotNull('DeletedAt')->exists()){
                DB::table('AuthorizationCode')->where('UserID', $id)->update(['DeletedAt' => NULL]);
            } else {
                DB::table('AuthorizationCode')->insert([
                    'UserID' => $id,
                    'Code' => rand(pow(10, 4-1), pow(10, 4)-1),
                    'Type' => 1
                ]);
            }
        } else {
            DB::table('AuthorizationCode')->where('UserID', $id)->update(['DeletedAt' => \Carbon\Carbon::now()]);
        }

        return $this->sendResponse($authorizable, 'Authorization privileges of user changed to '.($authorizable ? 'true' : 'false'));
    }
}
