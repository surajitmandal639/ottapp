import MyPagination from "@/Components/MyPagination";
import { showConfirmAlert, showSuccessAlert } from "@/Components/SweetAlert";
import Authenticated from "@/Layouts/Admin/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";

const Index = ({ auth, title, coupons }) => {
    const handleDelete = async (id) => {
        const isConfirmed = await showConfirmAlert(
            "Are you sure you want to delete this coupon?"
        );
        if (isConfirmed) {
            await router.delete(route("coupons.destroy", id), {
                onSuccess: () => {
                    showSuccessAlert("Coupon deleted successfully.");
                },
            });
        }
    };

    return (
        <Authenticated user={auth.user}>
            <Head title={title} />
            <div className="card-box table-responsive">
                <div className="row">
                    <div className="col-md-3">
                        <Link
                            href={route("admin.coupons.create")}
                            className="btn btn-success btn-md waves-effect waves-light m-b-20 mt-2"
                            data-toggle="tooltip"
                            title="Add Coupon"
                        >
                            <i className="fa fa-plus"></i> Add Coupon
                        </Link>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Coupon Code</th>
                                <th>Discount</th>
                                <th>Number of Users Allow</th>
                                <th>Coupon Used</th>
                                <th>Expiry Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coupons.map((coupon) => (
                                <tr key={coupon.id} id={`card_box_id_${coupon.id}`}>
                                    <td>{coupon.code}</td>
                                    <td>
                                        {coupon.type === 'fixed' ? (
                                            <>₹ {coupon?.value}</>
                                        ) : (
                                            <>{coupon?.value} %</>
                                        )}
                                    </td>
                                    <td>{coupon.usage_limit}</td>
                                    <td>{coupon.used_count || 0}</td>
                                    <td>
                                        {new Date(coupon.exp_date).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                        })}

                                    </td>
                                    <td>
                                        <span
                                            className={`badge badge-${coupon.status === 1 ? "success" : "danger"}`}
                                        >
                                            {coupon.status === 1 ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td>
                                        <Link
                                            href={route("admin.coupons.create", coupon.id)}
                                            className="btn btn-icon waves-effect waves-light btn-success m-b-5 m-r-5"
                                            data-toggle="tooltip"
                                            title="Edit"
                                        >
                                            <i className="fa fa-edit"></i>
                                        </Link>
                                        <Link
                                            href="#"
                                            onClick={() => handleDelete(coupon.id)}
                                            className="btn btn-icon waves-effect waves-light btn-danger m-b-5"
                                            data-toggle="tooltip"
                                            title="Remove"
                                        >
                                            <i className="fa fa-remove"></i>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Authenticated>
    );
};

export default Index;
