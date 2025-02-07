<?php

namespace App\Http\Controllers;

use App\Exports\TransactionsExport;
use App\Models\Gateway;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class TransactionController extends Controller
{
    public function transactions(Request $request)
    {
        // dd($request->all());
        $search = $request->query('s', '');
        $gateway = $request->query('gateway', '');
        $date = $request->query('date', '');

        $transactions = Transaction::with('user', 'user.subscriptionPlan', 'gateway')
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('transaction_id', 'like', '%' . $search . '%')
                        ->orWhereHas('user', function ($q) use ($search) {
                            $q->where('email', 'like', '%' . $search . '%');
                        });
                });
            })
            ->when($gateway, function ($query, $gateway) {
                $query->whereHas('gateway', function ($q) use ($gateway) {
                    $q->where('name', $gateway);
                });
            })
            ->when($date, function ($query, $date) {
                $query->where(function ($query) use ($date) {
                    $query->where('created_at', 'like', '%' . $date . '%');
                });
            })
            ->paginate(10);
        return Inertia::render('Admin/Transactions/Index', [
            'title' => 'Transactions',
            'transactions' => $transactions,
            'gateways' => Gateway::where('status', 1)->get()
        ]);
    }

    public function export(Request $request)
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        return Excel::download(new TransactionsExport($startDate, $endDate), 'transactions_export.xlsx');
    }
}
