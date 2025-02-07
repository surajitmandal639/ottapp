<?php

namespace App\Http\Controllers;

use App\Models\Gateway;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class GatewayController extends Controller
{
    public function gateways()
    {
        $gateways = Gateway::where('status', '!=', 0)->get();
        foreach ($gateways as $key => $gateway) {
            $gateway->image_url = getImageUrl('gateways', $gateway->image ?? null);
        }
        return Inertia::render('Admin/Gateways/Index', [
            'title' => 'Payment Gateways',
            'gateways' => $gateways
        ]);
    }

    public function edit($id)
    {
        return Inertia::render('Admin/Gateways/Create', [
            'title' => 'Edit Payment Gateway',
            'gateway' => Gateway::find($id),
        ]);
    }

    public function save(Request $request, $id = null)
    {
        $rules = [
            'name' => 'required|string|max:50|unique:gateways,name' . ($id ? ",$id" : ''),
            'short_info' => 'nullable|string|max:100',
            'api_key' => 'required|string|max:255|unique:gateways,api_key' . ($id ? ",$id" : ''),
            'api_secret' => 'nullable|string|max:255',
            'status' => 'required|in:1,2',
        ];

        $validatedData = $request->validate($rules);

        if ($id) {
            $gateway = Gateway::findOrFail($id);
            $gateway->update($validatedData);
            $message = 'Gateway updated successfully.';
        } else {
            Gateway::create($validatedData);
            $message = 'Gateway created successfully.';
        }

        return redirect()->route('gateways')->with('success', $message);
    }

    public function checkUnique(Request $request)
    {
        $field = $request->field;
        $value = $request->value;
        $id = decryptString($request->id);

        $query = Gateway::query();

        if ($id) {
            $query->where('id', '!=', $id);
        }

        $exists = $query->where($field, $value)->exists();

        return response()->json($exists);
    }

    public function status(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|boolean'
        ]);

        $v = Gateway::findOrFail($id);
        $v->status = $request->status ? 1 : 2;
        $v->save();

        return redirect()->back()->with('success', 'Gateway status changed to ' . ($request->status ? 'active' : 'inactive') . ' successfully.');
    }
}
