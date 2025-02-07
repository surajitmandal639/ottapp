import MyPagination from "@/Components/MyPagination";
import { showConfirmAlert, showSuccessAlert } from "@/Components/SweetAlert";
import Authenticated from "@/Layouts/Admin/AuthenticatedLayout";
import { Head, router, Link} from "@inertiajs/react";
import React, { useState } from "react";
import ReactSwitch from "react-switch";

const Index = ({ auth, title, sections }) => {

    const handleDelete = async (id) => {
        const isConfrimed = await showConfirmAlert(
            "Are you sure you want to delete this section?"
        );
        if (isConfrimed) {
            router.delete(route("sections.destroy", id));
        }
    };

    const handlePageChange = (page) => {
        router.get(route("sections.index"), { page }, { preserveState: true });
    };

    const handleStatusChange = async (id, status) => {
        console.log(101);

        await router.put(route("sections.status", id),{ status }, {
            onSuccess: () => {
                showSuccessAlert("Section status changed successfully.");
            }
        ,});
    };

    return (
        <>
            <Authenticated user={auth.user} title={title}>
                <Head title={title}></Head>
                <div className="card-box table-responsive">
                    <div  className="row">
                        <div  className="col-md-3">
                            <Link
                                href={route('admin.sections.create')}
                                 className="btn btn-success btn-md waves-effect waves-light m-b-20"
                                data-toggle="tooltip"
                                title="Add Section"
                                data-original-title="Add Section"
                                aria-describedby="tooltip693717"
                            >
                                <i  className="fa fa-plus"></i> Add Section
                            </Link>
                        </div>
                    </div>

                    <div className="row">
                        {sections.data.map((section) => (
                            <div
                                key={section.id}
                                className="col-lg-3 col-md-4 col-sm-6 col-xs-6"
                                id={`card_box_id_${section.id}`}
                            >
                                <div className="card m-b-20 p-3 lng_item_grid">

                                    <div className="card-body p-0">
                                        <div className="item_latter">
                                            {section.title}
                                        </div>
                                        <Link
                                            href={route(
                                                "sections.edit",
                                                section.id
                                            )}
                                            className="btn btn-icon waves-effect waves-light btn-success m-r-5"
                                            data-toggle="tooltip"
                                            title="Edit"
                                        >
                                            <i className="fa fa-edit"></i>
                                        </Link>
                                        <Link
                                            href="#"
                                            onClick={() =>
                                                handleDelete(section.id)
                                            }
                                            className="btn btn-icon waves-effect waves-light btn-danger"
                                            data-toggle="tooltip"
                                            title="Remove"
                                        >
                                            <i className="fa fa-remove"></i>
                                        </Link>
                                        <label className="switch-toggle m-0 p-0 fl-right">
                                            <ReactSwitch
                                                checked={section.status === 1}
                                                onChange={(newState) => {
                                                    handleStatusChange(
                                                        section.id,
                                                        newState
                                                    );
                                                }}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <MyPagination
                        currentPage={sections.current_page}
                        lastPage={sections.last_page}
                        onPageChange={handlePageChange}
                    />
                </div>
            </Authenticated>
        </>
    );
};

export default Index;
