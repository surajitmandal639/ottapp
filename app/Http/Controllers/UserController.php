<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\SubscriptionPlan;
use App\Models\UploadImage;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('s', '');
        $planId = $request->query('plan_id', '');

        $users = User::with(['subscriptionPlan'])
            ->where('status', '!=', 0)
            ->where('id', '!=', auth()->id())
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', '%' . $search . '%')
                        ->orWhere('email', 'like', '%' . $search . '%');
                });
            })
            ->when($planId, function ($query, $planId) {
                $query->whereHas('subscriptionPlan', function($q) use ($planId) {
                    $q->where('subscription_plans.id', $planId);
                });
            })
            ->paginate(5);

        return Inertia::render('Admin/Users/Index', [
            'title' => 'Users',
            'users' => $users,
        ]);
    }

    public function create()
    {
        $subscription_plans = SubscriptionPlan::where('status', 1)->get();
        return Inertia::render('Admin/Users/Create', [
            'title' => 'Add User',
            'roles' => Role::where('status', '!=', 0)->get(),
            'subscription_plans' => $subscription_plans,

        ]);
    }

    public function store(Request $request, $id = null)
    {
        // Check if we are updating an existing user
        $user = $id ? User::findOrFail($id) : new User;
        $oldAvatar = $user->avatar ?? null;
    
        // Validation rules
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'phone' => ['nullable', 'string', 'max:15', 'min:10', 'regex:/^[\d\+\-\(\)\/\s]*$/', Rule::unique('users')->ignore($user->id)],
            'password' => $id ? 'nullable|string|min:8' : 'required|string|min:8',
            'subscription_plan' => 'nullable|exists:subscription_plans,id',
            'user_expiry_date' => 'nullable|date',
            'status' => 'nullable|integer|between:0,2',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
    
        // Update user details
        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
    
        // Update password only if provided
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }
    
        $user->user_expiry_date = $request->user_expiry_date;
        $user->subscription_plan_id = $request->subscription_plan;
        $user->status = $request->status;
        $user->save();
    
        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            $filename = 'avatar_' . time() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/upload/images/users', $filename);
            $user->avatar = $filename;

            // Delete the old avatar file if it exists
            if ($oldAvatar && Storage::exists('public/users/' . $oldAvatar)) {
                Storage::delete('public/upload/images/users/' . $oldAvatar);
            }
        }
    
        // Sync roles, default to 'user' if no roles are provided
        if ($request->roles) {
            $user->roles()->sync($request->roles);
        } else {
            $defaultRole = Role::where('name', 'user')->first();
            if ($defaultRole) {
                $user->roles()->sync([$defaultRole->id]);
            }
        }
    
        $message = $id ? 'User updated successfully.' : 'User created successfully.';
    
        return redirect()->back()->with('success', $message);
    }
    
    public function show($id = null)
    {
        // Load user with relations if ID is provided, otherwise null
        $user = $id ? User::with(['subscriptionPlan', 'roles', 'transactions', 'transactions.gateway'])->findOrFail($id) : null;

        // Load subscription plans
        $subscription_plans = SubscriptionPlan::where('status', 1)->get();

        // Check if user and avatars exist before accessing image URL
        // if ($user && $user->avatars->isNotEmpty()) {
        //     $user->image_url = getImageUrl('users', $user->avatars->first()->filename);
        // }

        return Inertia::render('Admin/Users/Show', [
            'title' => 'User History',
            'user' => $user,
            'subscription_plans' => $subscription_plans,
        ]);
    }


    public function edit(User $user)
    {
        $subscription_plans = SubscriptionPlan::where('status', 1)->get();
        $user->load(['subscriptionPlan', 'roles']);
        // $user->image_url = getImageUrl('users', $user->avatars->first()->filename);
        $user->user_expiry_date = formatDate($user->user_expiry_date);
        return Inertia::render('Admin/Users/Create', [
            'title' => 'Edit User',
            'user' => $user,
            'roles' => Role::where('status', '!=', 0)->get(),
            'subscription_plans' => $subscription_plans,
        ]);
    }

    public function update(Request $request, $id)
    {
        // Validate the request
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'phone' => 'nullable|string|max:15|min:10|regex:/^[\d\+\-\(\)\/\s]*$/|unique:users,phone,' . $id,
            'password' => 'nullable|string|min:8',
            'subscription_plan' => 'nullable|exists:subscription_plans,id',
            'user_expiry_date' => 'nullable|date',
            'status' => 'nullable|integer|between:0,2',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',

        ]);

        // Find the user by ID
        $user = User::findOrFail($id);
        $oldAvatar = $user->avatar ?? null;

        // Update user details
        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;

        // Update password only if provided
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->user_expiry_date = $request->user_expiry_date;
        $user->subscription_plan_id = $request->subscription_plan;
        $user->status = $request->status;
        $user->save();

        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            $filename = 'avatar_' . time() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/upload/images/users', $filename);
            $user->avatar = $filename;

            // Delete the old avatar file if it exists
            if ($oldAvatar && Storage::exists('public/users/' . $oldAvatar) && $oldAvatar != 'default_avatar.png') {
                Storage::delete('public/upload/images/users/' . $oldAvatar);
            }
        }

        if ($request->roles) {
            $user->roles()->sync($request->roles);
        }

        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }

    public function destroy(User $user)
    {
        $user->update(['status' => 0]);

        return redirect()->back()->with('success', 'User deleted successfully.');
    }

    public function deletedUsers(Request $request)
    {
        $search = $request->query('s', '');
        return Inertia::render('Admin/Users/DeletedUsers', [
            'title' => 'Deleted Users',
            'users' => User::with(['subscriptionPlan'])
                ->where('status', 0)
                ->when($search, function ($query, $search) {
                    $query->where('name', 'like', '%' . $search . '%')
                        ->orWhere('email', 'like', '%' . $search . '%');
                })
                ->paginate(5)
        ]);
    }

    public function usersRecovery($id)
    {
        $user = User::find($id);
        $user->update(['status' => 1]);

        return redirect()->back()->with('success', 'User recovery successful.');
    }

    public function deletedDelete($id)
    {
        $user = User::find($id);
        $user->delete();
        return redirect()->back()->with('success', 'User delete permanetly successful.');
    }
}
