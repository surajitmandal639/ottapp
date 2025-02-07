// resources\js\Pages\Users\Index.jsx

import MyPagination from "@/Components/MyPagination";
import { showConfirmAlert, showSuccessAlert } from "@/Components/SweetAlert";
import Authenticated from "@/Layouts/Admin/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React, { useState } from "react";

const Index = ({ auth, title, users }) => {
    const [search, setSearch] = useState(
        new URLSearchParams(window.location.search).get("s") || ""
    );
    const [planId, setPlanId] = useState(
        new URLSearchParams(window.location.search).get("plan_id") || ""
    );

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route("users.index"),
            { s: search, plan_id: planId },
            { preserveState: true }
        );
    };

    const handlePlanChange = (e) => {
        setPlanId(e.target.value);
        router.get(
            route("users.index"),
            { s: search, plan_id: e.target.value },
            { preserveState: true }
        );
    };

    const handleDelete = async (id) => {
        const isConfirmed = await showConfirmAlert(
            "Are you sure you want to delete this user?"
        );
        if (isConfirmed) {
            await router.delete(route("users.destroy", id), {
                onSuccess: () => {
                    showSuccessAlert("User deleted successfully.");
                },
            });
        }
    };

    const handlePageChange = async (page) => {
        await router.get(
            route("users.index"),
            { page, s: search, plan_id: planId },
            { preserveState: true }
        );
    };

    const handleStatusChange = async (id, status) => {
        await router.put(
            route("users.status", id),
            { status },
            {
                onSuccess: () => {
                    showSuccessAlert("User status changed successfully.");
                },
            }
        );
    };

    return (
        <>
            <Authenticated user={auth.user} title={title}>
                <Head title={title} />
                <div className="card-box table-responsive">
                    <div className="row">
                        <div className="col-sm-3">
                            <select
                                className="form-control"
                                name="plan_select"
                                id="plan_select"
                                value={planId}
                                onChange={handlePlanChange}
                            >
                                <option value="">Filter by Plan</option>
                                <option value="1">Basic Plan</option>
                                <option value="2">Premium Plan</option>
                                <option value="3">Platinum Plan</option>
                                <option value="4">Diamond Plan</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <form
                                onSubmit={handleSearch}
                                className="app-search"
                                id="search"
                                role="form"
                            >
                                <input
                                    type="text"
                                    name="s"
                                    placeholder="Search by name"
                                    className="form-control"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <button type="submit">
                                    <i className="fa fa-search"></i>
                                </button>
                            </form>
                        </div>
                        <div className="col-md-3">
                            <Link
                                href={route("admin.users.create")}
                                className="btn btn-success btn-md waves-effect waves-light m-b-20 mt-2"
                                data-toggle="tooltip"
                                title="Add User"
                            >
                                <i className="fa fa-plus"></i> Add User
                            </Link>
                        </div>
                        <div className="col-md-3">
                            <Link
                                href="#"
                                className="btn btn-info btn-md waves-effect waves-light m-b-20 mt-2 pull-right"
                                data-toggle="tooltip"
                                title="Export Users"
                            >
                                <i className="fa fa-file-excel-o"></i> Export
                                Users
                            </Link>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.data.map((user) => (
                                    <tr
                                        key={user.id}
                                        id={`card_box_id_${user.id}`}
                                    >
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone || "-"}</td>
                                        <td>
                                            <span
                                                className={`badge badge-${
                                                    user.status === 1
                                                        ? "success"
                                                        : "danger"
                                                }`}
                                            >
                                                {user.status === 1
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>
                                        </td>
                                        <td>
                                            <Link
                                                href={route("admin.users.show", user.id)}
                                                className="btn btn-icon waves-effect waves-light btn-primary m-b-5 m-r-5"
                                                data-toggle="tooltip"
                                                title="User History"
                                            >
                                                <i className="fa fa-eye"></i>
                                            </Link>
                                            <Link
                                                href={route("admin.users.edit", user.id)}
                                                className="btn btn-icon waves-effect waves-light btn-success m-b-5 m-r-5"
                                                data-toggle="tooltip"
                                                title="Edit"
                                            >
                                                <i className="fa fa-edit"></i>
                                            </Link>
                                            <Link
                                                href="#"
                                                onClick={() =>
                                                    handleDelete(user.id)
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

                    <MyPagination
                        currentPage={users.current_page}
                        lastPage={users.last_page}
                        onPageChange={handlePageChange}
                    />
                </div>
            </Authenticated>
        </>
    );
};

export default Index;
