import { showConfirmAlert, showSuccessAlert } from "@/Components/SweetAlert";
import { encryptString } from "@/helper";
import Authenticated from "@/Layouts/Admin/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";

const Index = ({ auth, title, pages }) => {
    const handleStatusChange = async (id) => {
        const isConfirmed = await showConfirmAlert(
            "Are you sure you want to change this status?"
        );
        if (isConfirmed) {
            await router.post(route("pages.status", id), {
                onSuccess: () => {
                    showSuccessAlert("Page status changed successfully.");
                },
            });
        }
    };

    return (
        <Authenticated user={auth.user}>
            <Head title={title} />
            <div className="card-box table-responsive">
                <div className="d-flex justify-content-between mb-4">
                    <Link
                        href={route('admin.pages.create')}
                        className="btn btn-success"
                        title="Add Page"
                    >
                        <i className="fa fa-plus"></i> Add Page
                    </Link>
                </div>

                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                            <th>Page Title</th>
                            <th>Status</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {pages && pages.map((page, index) => (
                            <tr key={index} id={`card_box_id_${index}`}>
                                <td>{page.title}</td>
                                <td><span className={`badge badge-${ page?.status == 1 ? "success" : "danger" }`}>{page?.status == 1 ? "Active" : "Inactive"}</span> </td>

                                <td>
                                    <Link target="_blank" href={route('admin.page', page.slug)} className="btn btn-icon waves-effect waves-light btn-success m-b-5 m-r-5" data-toggle="tooltip" title="View"> <i className="fa fa-eye"></i> </Link>
                                    <Link href={route('admin.pages.create', encryptString(page.id))} className="btn btn-icon waves-effect waves-light btn-success m-b-5 m-r-5" data-toggle="tooltip" title="Edit"> <i className="fa fa-edit"></i> </Link>
                                    {page.status != '0' && (
                                        <Link
                                            href="#" className="btn btn-icon waves-effect waves-light btn-danger m-b-5 data_remove" data-toggle="tooltip" title="Remove"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleStatusChange(encryptString(page.id));
                                            }}
                                        >
                                            <i className="fa fa-remove"></i>
                                        </Link>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* // <div className="table-responsive">
                //     <table className="table table-bordered">
                //         <thead>
                //             <tr>
                //                 <th>Page Title</th>
                //                 <th>Status</th>
                //                 <th>Action</th>
                //             </tr>
                //         </thead>
                //         <tbody>
                //             {pages.map((page) => (
                //                 <tr key={page.id}>
                //                     <td>{page.title}</td>
                //                     <td>
                //                         <span className={`badge badge-${ page?.status != 1 ? "success" : "danger" }`}>
                //                             {page?.status == 1 ? "Active" : "Inactive"}
                //                         </span>
                //                     </td>

                //                     <td>
                //                         <Link
                //                             target="_blank"
                //                             href={route('admin.pages.slug', page.slug)}
                //                             className="btn btn-success me-2"
                //                             title="View"
                //                         >
                //                             <i className="fa fa-eye"></i>
                //                         </Link>
                //                         <Link
                //                             href={route('admin.pages.create', page.id)}
                //                             className="btn btn-success me-2"
                //                             title="Edit"
                //                         >
                //                             <i className="fa fa-edit"></i>
                //                         </Link>
                //                         {page.status != '0' && (
                //                             <Link
                //                                 href="#"
                //                                 className="btn btn-danger"
                //                                 data-id={page.id}
                //                                 title="Remove"
                //                                 onClick={(e) => {
                //                                     e.preventDefault();
                //                                     handleStatusChange(page.id);
                //                                 }}
                //                             >
                //                                 <i className="fa fa-remove"></i>
                //                             </Link>
                //                         )}
                //                     </td>
                //                 </tr>
                //             ))}
                //         </tbody>
                //     </table>
                // </div> */}

            </div>
        </Authenticated>
    );
};

export default Index;
