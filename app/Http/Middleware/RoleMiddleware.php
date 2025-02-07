<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $role
     * @return mixed
     */
    public function handle($request, Closure $next, $role)
    {
        if (!Auth::check() || !Auth::user()->hasRole($role)) {
            if (in_array($role, ['admin', 'editor'])) {
                return redirect()->route('admin.login')->with('error', 'Access denied.');
            }
            return redirect()->route('home')->with('error', 'Access denied.');
        }

        return $next($request);
    }
}
