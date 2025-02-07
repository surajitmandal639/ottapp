import MyImage from "@/Components/MyImage";
import MyPagination from "@/Components/MyPagination";
import { showConfirmAlert, showSuccessAlert } from "@/Components/SweetAlert";
import { encryptString } from "@/helper";
import Authenticated from "@/Layouts/Admin/AuthenticatedLayout";
import { Head, Link, router, } from "@inertiajs/react";
import React, { useState } from "react";
import ReactSwitch from "react-switch";

const Index = ({ auth, title, sliders }) => {

    const handleDelete = async (id) => {
        const isConfrimed = await showConfirmAlert(
            "Are you sure you want to delete this slider?"
        );
        if (isConfrimed) {
            router.delete(route("sliders.destroy", id));
        }
    };

    const handlePageChange = (page) => {
        router.get(route("admin.sliders.index"), { page }, { preserveState: true });
    };

    const handleStatusChange = async (id, status) => {
        await router.put(route("admin.sliders.status", id), { status }, {
            onSuccess: () => {
                showSuccessAlert("Slider status changed successfully.");
            }
        });
    };
    
    return (
        <>
            <Authenticated user={auth.user} title={title}>
                <Head title={title}></Head>
                <div className="card-box table-responsive">
                    <div  className="row">
                        <div  className="col-md-3">
                            <Link
                                href={route('admin.home-sliders.create')}
                                 className="btn btn-success btn-md waves-effect waves-light m-b-20"
                                data-toggle="tooltip"
                                title="Add Slider"
                                data-original-title="Add Slider"
                                aria-describedby="tooltip693717"
                            >
                                <i  className="fa fa-plus"></i> Add Slider
                            </Link>
                        </div>
                    </div>

                    <div className="row">
                        {sliders.data.map((slider, index) => (
                            
                            <div
                                key={index}
                                className="col-lg-6 col-md-6 col-sm-6 col-xs-6"
                                id={`card_box_id_${index}`}
                            >
                                <div className="card m-b-20 slider-img-item">
                                    <MyImage type="sliders" filename={slider.image} fallbackImage="slider.jpg" altText={slider.title} className="card-img-top thumb-lg img-fluid" />
                                    <div className="card-body p-3">
                                        <h4 className="card-title mb-3">
                                            {slider.title}
                                        </h4>
                                        <Link
                                            href={route("admin.home-sliders.create", encryptString(slider.id))}
                                            className="btn btn-icon waves-effect waves-light btn-success m-r-5"
                                            data-toggle="tooltip"
                                            title="Edit"
                                        >
                                            <i className="fa fa-edit"></i>
                                        </Link>
                                        <Link                                            
                                            href="#"
                                            onClick={() =>
                                                handleDelete(encryptString(slider.id))
                                            }
                                            className="btn btn-icon waves-effect waves-light btn-danger"
                                            data-toggle="tooltip"
                                            title="Remove"
                                        >
                                            <i className="fa fa-remove"></i>
                                        </Link>
                                        <label className="switch-toggle m-0 p-0 fl-right">
                                            <ReactSwitch
                                                checked={slider.status === 1}
                                                onChange={(newState) => {
                                                    handleStatusChange(encryptString(slider.id), newState);
                                                }}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <MyPagination
                        currentPage={sliders.current_page}
                        lastPage={sliders.last_page}
                        onPageChange={handlePageChange}
                    />
                </div>
            </Authenticated>
        </>
    );
};

export default Index;
