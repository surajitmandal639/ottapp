<?php

namespace App\Http\Controllers;

use App\Models\Coupon;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CouponController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function coupons()
    {
        return Inertia::render('Admin/Coupons/Index', [
            'title' => 'Coupons',
            'coupons' => Coupon::select('coupons.*')
                ->withCount('uses as used_count')
                ->where('status', '!=', 0)
                ->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($id = null)
    {
        return Inertia::render('Admin/Coupons/Create', [
            'title' => $id ? 'Edit Coupon' : 'Add Coupon',
            'coupon' => $id ? Coupon::find($id) : null
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    

    public function saveCoupon(Request $request, $id = null)
    {
        // Validate the incoming request data
        $request->validate([
            'code' => [
                'required',
                'string',
                'max:255',
                Rule::unique('coupons', 'code')->ignore($id), // Ensure the coupon code is unique, ignoring the current record if updating
            ],
            'value' => 'required|numeric|min:0', // Coupon value should be a number greater than or equal to 0
            'type' => 'required|in:percent,fixed', // Type should be 1 (Percentage) or 2 (Fixed)
            'user_limit' => 'required|integer|min:0', // User limit must be a number greater than or equal to 0
            'exp_date' => 'required|date|after_or_equal:today', // Expiration date must be today or later
            'status' => 'required|in:1,2', // Status should be either 1 (Active) or 2 (Inactive)
        ]);

        // Retrieve the coupon by id, or create a new instance if id is null
        $coupon = $id ? Coupon::findOrFail($id) : new Coupon;

        // Assign form data to the coupon
        $coupon->code = $request->code;
        $coupon->value = $request->value; // Value for discount (either percentage or fixed amount)
        $coupon->type = $request->type;   // Type of coupon: 1 for percentage, 2 for fixed value
        $coupon->usage_limit = $request->usage_limit;
        $coupon->exp_date = $request->exp_date;
        $coupon->status = $request->status;

        // Save the coupon to the database
        $coupon->save();

        // Prepare a success message
        $msg = $id ? 'Coupon updated successfully' : 'Coupon created successfully';

        // Return a success response to the frontend
        return redirect()->back()->with('success', $msg);
    }


    public function applyCoupon(Request $request)
    {
        $request->validate([
            'coupon_code' => 'required|string',
            'total_price' => 'required|numeric|min:0', // Ensure total price is sent
        ]);

        $coupon = Coupon::where('code', $request->coupon_code)->first();

        if (!$coupon) {
            return response()->json(['status' => 'error', 'message' => 'Invalid coupon code.']);
        }

        if (!$coupon->isValid()) {
            return response()->json(['status' => 'error', 'message' => 'Coupon is expired or usage limit reached.'], 400);
        }

        $user = Auth::user();

        $hasUsedCoupon = $user->coupons()->where('coupon_id', $coupon->id)->exists();

        if ($hasUsedCoupon) {
            return response()->json(['status' => 'error', 'message' => 'Coupon already used.']);
        }

        $totalPrice = $request->total_price;
        $discount = $coupon->calculateDiscount($totalPrice);
        $finalPrice = max(0, $totalPrice - $discount);

        // Save coupon usage for the user
        $user = Auth::user();
        $user->coupons()->attach($coupon->id, ['used_at' => Carbon::now()]);

        return response()->json([
            'status' => 'success',
            'message' => 'Coupon applied successfully.',
            'discount' => $discount,
            'final_price' => $finalPrice,
        ]);
    }

    public function checkCouponUsage($couponId)
    {
        $user = Auth::user();

        $hasUsedCoupon = $user->coupons()->where('coupon_id', $couponId)->exists();

        if ($hasUsedCoupon) {
            return response()->json(['status' => 'success', 'message' => 'Coupon already used.']);
        } else {
            return response()->json(['status' => 'error', 'message' => 'Coupon not used.']);
        }
    }

    public function getUsedCoupons()
    {
        $user = Auth::user();

        $usedCoupons = $user->coupons()->whereNotNull('used_at')->get();

        return view('used-coupons', compact('usedCoupons'));
    }
}
