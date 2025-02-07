// resources\js\Pages\Users\Index.jsx

import MyPagination from "@/Components/MyPagination";
import { showConfirmAlert, showSuccessAlert } from "@/Components/SweetAlert";
import Authenticated from "@/Layouts/Admin/AuthenticatedLayout";
import { Head, router, Link } from "@inertiajs/react";
import React, { useState } from "react";

export default function DeletedUsers({ auth, title, users }) {
    const [search, setSearch] = useState(
        new URLSearchParams(window.location.search).get("s") || ""
    );

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route("users.deleted"),
            { s: search },
            { preserveState: true }
        );
    };

    const handleDelete = async (id) => {
        const isConfirmed = await showConfirmAlert(
            "Are you sure? You will not be able to recover this."
        );
        if (isConfirmed) {
            await router.post(route("users.delete", id), {
                onSuccess: () => {
                    showSuccessAlert("User delete permanetly successful.");
                },
            });
        }
    };

    const handlePageChange = async (page) => {
        await router.get(
            route("users.index"),
            { page, s: search },
            { preserveState: true }
        );
    };

    const handleRecovery = async (id) => {
        const isConfirmed = await showConfirmAlert(
            "You want to restore this user."
        );
        if (isConfirmed) {
            await router.put(
                route("users.recovery", id),
                {
                    onSuccess: () => {
                        showSuccessAlert("User Recovery successful.");
                    },
                }
            );
        }
    };

    return (
        <>
            <Authenticated user={auth.user}>
                <Head title={title} />

                <div className="card-box table-responsive">
                    <div className="row">
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
                                    placeholder="Search by name or email"
                                    className="form-control"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <button type="submit">
                                    <i className="fa fa-search"></i>
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="table-responsive pt-3">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
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
                                            <Link
                                                href="#"
                                                onClick={() =>
                                                    handleRecovery(user.id)
                                                }
                                                className="btn btn-icon waves-effect waves-light btn-success m-b-5"
                                                data-toggle="tooltip"
                                                title="Recovery"
                                                data-original-title="Restore"
                                            >
                                                <i className="fa fa-mail-reply"></i>
                                            </Link>
                                            <Link
                                                href="#"
                                                onClick={() =>
                                                    handleDelete(user.id)
                                                }
                                                className="btn btn-icon waves-effect waves-light btn-danger m-b-5 ml-1"
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
}
