import MyPagination from "@/Components/MyPagination";
import { showConfirmAlert, showSuccessAlert } from "@/Components/SweetAlert";
import Authenticated from "@/Layouts/Admin/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";
import ReactSwitch from "react-switch";

const Index = ({ auth, title, gateways }) => {
    const handleStatusChange = async (id) => {
        const isConfirmed = await showConfirmAlert(
            "Are you sure you want to change this status?"
        );
        if (isConfirmed) {
            await router.post(route("gateways.status", id), {
                onSuccess: () => {
                    showSuccessAlert("Gateways status changed successfully.");
                },
            });
        }
    };

    return (
        <Authenticated user={auth.user}>
            <Head title={title} />
            <div className="card-box">
                <div className="row">
                    {gateways.map((gateway) => (
                            <div
                                className="col-lg-3 col-md-4 col-sm-6 col-xs-6"
                                key={gateway.id}
                            >
                                <div className="card m-b-20 p-3 payment_block">
                                    <div className="ads_logo_item" style={{background: "rgba(255, 255, 255, 0.9)"}}>
                                        <img
                                            className="card-img-top thumb-lg img-fluid"
                                            src={gateway.image_url || "https://via.placeholder.com/150"}
                                            alt={gateway.name}
                                        />
                                    </div>
                                    <div className="card-body p-0">
                                        <h4 className="card-title mb-3">{gateway.name}</h4>
                                        <Link
                                            href={route('admin.gateways.edit', gateway.id)}
                                            className="btn waves-effect waves-light btn-success m-r-5"
                                            data-toggle="tooltip"
                                            title="Edit"
                                        >
                                            <i className="fa fa-edit"></i>
                                        </Link>
                                        <label className="switch-toggle m-0 p-0 fl-right">
                                            <ReactSwitch
                                                checked={gateway.status === 1}
                                                onChange={(newState) => handleStatusChange(gateway.id, newState)}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </Authenticated>
    );
};

export default Index;
