<?php
namespace App\Exports;

use App\Models\Transaction;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStrictNullComparison;

class TransactionsExport implements FromCollection, WithHeadings, WithMapping, WithStrictNullComparison
{
    protected $startDate;
    protected $endDate;

    public function __construct($startDate, $endDate)
    {
        $this->startDate = $startDate;
        $this->endDate = $endDate;
    }

    public function collection()
    {
        return Transaction::whereBetween('created_at', [$this->startDate, $this->endDate])->get();
    }

    public function map($transaction): array
    {
        return [
            $transaction->user->name,
            $transaction->user->email,
            $transaction->user->subscriptionPlan->name ?? 'N/A',
            $transaction->amount,
            $transaction->gateway->name ?? 'N/A',
            $transaction->transaction_id,
            $transaction->created_at->format('Y-m-d H:i:s'),
        ];
    }

    public function headings(): array
    {
        return [
            'Name',
            'Email',
            'Plan',
            'Amount',
            'Payment Gateway',
            'Payment ID',
            'Payment Date',
        ];
    }
}
