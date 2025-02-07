// resources\js\Pages\Users\Index.jsx

import MyPagination from "@/Components/MyPagination";
import { showConfirmAlert, showSuccessAlert } from "@/Components/SweetAlert";
import Authenticated from "@/Layouts/Admin/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React, { useState } from "react";

const Index = ({ auth, title, subscription_plans }) => {


    const handleDelete = async (id) => {
        const isConfirmed = await showConfirmAlert(
            "Are you sure you want to delete this subscription plan?"
        );
        if (isConfirmed) {
            // await router.delete(route("subscription-plans.destroy", id), {
            //     onSuccess: (response) => {
            //         console.log(response);
            //         showSuccessAlert("Subscription plan deleted successfully.");
            //     },
            // });
        }
    };

    return (
        <>
            <Authenticated user={auth.user} title={title}>
                <Head title={title} />
                <div className="card-box table-responsive">
                    <div className="row">

                        <div className="col-md-3">
                            <Link
                                // href={route("admin.subscriptions.create")}
                                className="btn btn-success btn-md waves-effect waves-light m-b-20 mt-2"
                                data-toggle="tooltip"
                                title="Add User"
                            >
                                <i className="fa fa-plus"></i> Add Plan
                            </Link>
                        </div>

                    </div>

                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Plan Name</th>
                                    <th>Duration</th>
                                    <th>Price</th>
                                    <th>Device Limit</th>
                                    <th>Ads</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subscription_plans.map((subscription_plan) => (
                                    <tr
                                        key={subscription_plan.id}
                                        id={`card_box_id_${subscription_plan?.id}`}
                                    >
                                        <td>{subscription_plan?.name}</td>
                                        <td>{`${subscription_plan?.duration} ${subscription_plan?.duration_type}`}</td>
                                        <td>{subscription_plan?.price}</td>
                                        <td>{subscription_plan?.device_limit}</td>
                                        <td>
                                            <span
                                                className={`badge badge-${
                                                    subscription_plan?.ads === 1
                                                        ? "success"
                                                        : "danger"
                                                }`}
                                            >
                                                {subscription_plan?.ads == 1
                                                    ? "ON"
                                                    : "OFF"}
                                            </span>
                                        </td>

                                        <td>
                                            <span
                                                className={`badge badge-${
                                                    subscription_plan?.status === 1
                                                        ? "success"
                                                        : "danger"
                                                }`}
                                            >
                                                {subscription_plan?.status === 1
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>
                                        </td>
                                        <td>
                                            <Link
                                                // href={route(
                                                //     "subscriptions.create",
                                                //     encryptString(subscription_plan.id)
                                                // )}
                                                className="btn btn-icon waves-effect waves-light btn-success m-b-5 m-r-5"
                                                data-toggle="tooltip"
                                                title="Edit"
                                            >
                                                <i className="fa fa-edit"></i>
                                            </Link>
                                            <Link
                                                href="#"
                                                onClick={() =>
                                                    handleDelete(subscription_plan?.id)
                                                }
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
        </>
    );
};

export default Index;
