import MyPagination from "@/Components/MyPagination";
import { showConfirmAlert, showSuccessAlert } from "@/Components/SweetAlert";
import Authenticated from "@/Layouts/Admin/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import React, { useState } from "react";

const Index = ({ auth, title, transactions, gateways }) => {
    const [search, setSearch] = useState(
        new URLSearchParams(window.location.search).get("s") || ""
    );
    const [gateway, setGateway] = useState(
        new URLSearchParams(window.location.search).get("gateway") || ""
    );
    const [date, setDate] = useState(
        new URLSearchParams(window.location.search).get("date") || ""
    );
    const [exportStartDate, setExportStartDate] = useState(""); // Add state for export start date
    const [exportEndDate, setExportEndDate] = useState(""); // Add state for export end date
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSearch = (e, filterType = null, filterValue = null) => {
        e.preventDefault();

        const queryParams = {
            gateway: gateway,
            s: search,
            date: date,
        };

        if (filterType) {
            queryParams[filterType] = filterValue;
        }

        router.get(route("transactions"), queryParams, { preserveState: true });
    };

    const handlePageChange = async (page) => {
        await router.get(
            route("transactions"),
            { page, s: search, gateway: gateway },
            { preserveState: true }
        );
    };

    const handleExport = async () => {
        try {
            setLoading(true); // Set loading to true before making the request
            setShowModal(true);
            const response = await axios.post(
                route('transactions.export'),
                {
                    start_date: exportStartDate,
                    end_date: exportEndDate,
                },
                {
                    responseType: 'blob',
                }
            );

            // Create a temporary link element
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
            const a = document.createElement('a');
            a.href = url;
            a.download = 'transactions_export.xlsx'; // or use the file extension as needed
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Error exporting transactions:', error);
        } finally {
            setLoading(false);
            setShowModal(false);
        }

    };
    return (
        <Authenticated user={auth.user}>
            <Head title={title} />
            <div className="card-box table-responsive">
                <div className="row">
                    <div className="col-sm-3 app-search">
                        <select
                            className="form-control"
                            name="gateway"
                            defaultValue={gateway}
                            onChange={(e) => {
                                setGateway(e.target.value);
                                handleSearch(e, "gateway", e.target.value);
                            }}
                        >
                            <option value="">Filter by gateway</option>
                            {gateways && gateways.map((gateway) => (
                                <option key={gateway?.id} value={gateway?.name}>{gateway?.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <form
                            className="app-search"
                            onSubmit={(e) => handleSearch(e, "s", search)}
                            role="form"
                        >
                            <input
                                className="form-control"
                                type="text"
                                name="s"
                                placeholder="Search By Payment ID OR Email..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button type="submit">
                                <i className="fa fa-search"></i>
                            </button>
                        </form>
                    </div>
                    <div className="col-md-2 app-search">
                        <input
                            style={{ paddingRight: '10px' }}
                            className="form-control"
                            type="date"
                            name="date"
                            placeholder="Search by date"
                            value={date}
                            onChange={(e) => {
                                setDate(e.target.value);
                                handleSearch(e, "date", e.target.value);
                            }}
                        />
                    </div>

                    <div className="col-md-3">
                        <button
                            onClick={() => setShowModal(true)} // Show modal
                            className="btn btn-info btn-md waves-effect waves-light m-b-20 mt-2 pull-right"
                        >
                            <i className="fa fa-file-excel-o"></i> Export Transactions
                        </button>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Plan</th>
                                <th>Amount</th>
                                <th>Payment Gateway</th>
                                <th>Payment ID</th>
                                <th>Payment Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.data.map((transaction) => (
                                <tr key={transaction?.id}>
                                    <td>
                                        <Link style={{ color: '#007bff' }} href={route('admin.users.show', transaction?.user_id)}>
                                            {transaction?.user?.name}
                                        </Link>
                                    </td>
                                    <td>{transaction?.user?.email}</td>
                                    <td>{transaction?.user?.subscription_plan?.name}</td>
                                    <td>{transaction.amount}</td>
                                    <td>{transaction?.gateway?.name}</td>
                                    <td>{transaction?.transaction_id}</td>
                                    <td>{new Date(transaction?.created_at).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <MyPagination
                    currentPage={transactions.current_page}
                    lastPage={transactions.last_page}
                    onPageChange={handlePageChange}
                />

                {/* Export Modal */}
                {showModal && (
                    <div id="export_model" className="modal fade show" style={{ display: 'block' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Export Transactions</h4>
                                    <button
                                        type="button"
                                        className="close"
                                        onClick={() => setShowModal(false)}
                                    >
                                        &times;
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Start Date</label>
                                        <div className="col-sm-9">
                                            <input
                                                type="date"
                                                name="start_date"
                                                placeholder="Start Date"
                                                className="form-control"
                                                value={exportStartDate}
                                                onChange={(e) => setExportStartDate(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-0">
                                        <label className="col-sm-3 col-form-label">End Date</label>
                                        <div className="col-sm-9">
                                            <input
                                                type="date"
                                                name="end_date"
                                                placeholder="End Date"
                                                className="form-control"
                                                value={exportEndDate}
                                                onChange={(e) => setExportEndDate(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleExport}
                                        disabled={loading}
                                    >
                                        {loading ? 'Exporting...' : 'Export'}

                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Authenticated>
    );
};

export default Index;
