<?php

namespace App\Http\Controllers;

use App\Models\Gateway;
use App\Models\SubscriptionPlan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MembershipController extends Controller
{
    // Frontend 
    public function memberships()
    {
        if (auth()->check() && auth()->user()->hasRole(['admin', 'editor'])) {
            return redirect()->route('admin.dashboard');
        }

        $breadcrumbData = [
            ['name' => 'Home', 'url' => route('home')],
            ['name' => 'Membership Plan', 'url' => route('memberships')],
        ];

        return Inertia::render('Membership/Index', [
            'title' => 'Subscription Plan',
            'breadcrumb' => $breadcrumbData,
            'memberships' => SubscriptionPlan::where('status', '!=', 0)->get()
        ]);
    }

    public function paymentMethods($id){
        
        $breadcrumbData = [
            ['name' => 'Home', 'url' => route('home')],
            ['name' => 'Membership Plan', 'url' => route('memberships')],
            ['name' => 'Payment Method', 'url' => route('payment-methods', $id)],
        ];

        $plan = SubscriptionPlan::where('id', decryptString($id))->first();
        $methods = Gateway::where('status', '!=', 0)->get();

        return Inertia::render('Membership/PaymetMethod', [
            'title' => 'Payment Method',
            'breadcrumb' => $breadcrumbData,
            'methods' => $methods,
            'plan' => $plan
        ]);
    }

    public function subscribe(Request $request, $id)
    {
        $subscriptionId = decryptString($id);

        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        auth()->user()->subscriptions()->attach($subscriptionId, [
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'status' => 'active',
        ]);

        return redirect()->route('memberships')->with('success', 'Subscribed successfully!');
    }

    public function cancel(SubscriptionPlan $subscription)
    {
        auth()->user()->subscriptions()->updateExistingPivot($subscription->id, [
            'status' => 'canceled',
        ]);

        return redirect()->route('memberships')->with('success', 'Subscription plan canceled.');
    }
}
