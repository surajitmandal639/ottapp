import MyImage from "@/Components/MyImage";
import MyPagination from "@/Components/MyPagination";
import { showConfirmAlert, showSuccessAlert, showErrorAlert } from "@/Components/SweetAlert"; // Ensure you import the necessary alerts
import { encryptString } from "@/helper";
import Authenticated from "@/Layouts/Admin/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react"; 
import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";

export default function Index ({ title, actors }) {
    const [search, setSearch] = useState("");
    const [selectedActors, setSelectedActors] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route("actors"), { s: search });
    };

    const handleDelete = async () => {
        const isMultiple = selectedActors.length > 1;

        // Encrypt selected IDs
        const encryptedIds = selectedActors.map(id => id);
    
        // Confirm deletion
        const confirmed = await showConfirmAlert(`Are you sure you want to delete ${isMultiple ? 'these actors' : 'this actor'}?`);
        if (!confirmed) return;
        
        // Send the delete request
        await router.post(route("actors.delete"), { ids: encryptedIds }, {
            onSuccess: () => {
                showSuccessAlert(`Actor${isMultiple ? 's' : ''} deleted successfully.`);
                setSelectedActors([]); // Clear selection after successful deletion
            },
            onError: () => {
                showErrorAlert(`Failed to delete the actor${isMultiple ? 's' : ''}. Please try again.`);
            }
        });
    };

    const handlePageChange = (page) => {
        router.get(route("actors"), { page }, { preserveState: true });
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedActors(actors.data.map(actor => actor.id));
        } else {
            setSelectedActors([]);
        }
    };

    const handleCheckboxChange = (id) => {
        setSelectedActors(prev =>
            prev.includes(id)
                ? prev.filter(actorId => actorId !== id)
                : [...prev, id]
        );
    };

    useEffect(() => {
        // Reset selected actors when actors data changes
        setSelectedActors([]);
    }, [actors]);

    return (
        <Authenticated>
            <Head title={title}></Head>
            <div className="card-box table-responsive">
                <div className="row">
                    <div className="wall-filter-block">
                        <div className="row" style={{ alignItems: "center", justifyContent: "space-between" }}>
                            <div className="col-sm-3">
                                <form onSubmit={handleSearch} className="app-search" id="search" role="form">
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
                            <div className="col-sm-3">&nbsp;</div>
                            <div className="col-sm-4">
                                <div className="checkbox checkbox-success pull-right">
                                    <input
                                        id="select_all"
                                        type="checkbox"
                                        name="select_all"
                                        checked={selectedActors.length === actors.data.length}
                                        onChange={handleSelectAll}
                                    />
                                    <label htmlFor="select_all">Select All</label>
                                    &nbsp;&nbsp;
                                    <Dropdown className="btn-group">
                                        <Dropdown.Toggle className="btn btn-info dropdown-toggle waves-effect">
                                            Action
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item
                                                href="#"
                                                onClick={handleDelete} // Call handleDelete directly
                                                disabled={selectedActors.length === 0} // Disable if no actors are selected
                                            >
                                                Delete
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    &nbsp;&nbsp;&nbsp;
                                    <Link
                                        href={route("admin.actors.create")}
                                        className="btn btn-success btn-md waves-effect waves-light pull-right"
                                        data-toggle="tooltip"
                                        title="Add Actor"
                                    >
                                        <i className="fa fa-plus"></i> Add Actor
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <br />

                <div className="row">
                    {actors.data.map((actor, index) => (
                        <div key={actor.id} className="col-lg-2 col-md-3 col-sm-3 col-xs-6">
                            <div className="card m-b-20">
                                <div className="wall-list-item">
                                    <div className="checkbox checkbox-success wall_check">
                                        <input
                                            type="checkbox"
                                            name="post_ids[]"
                                            id={`checkbox${index}`}
                                            value={actor.id}
                                            className="post_ids"
                                            checked={selectedActors.includes(actor.id)}
                                            onChange={() => handleCheckboxChange(actor.id)}
                                        />
                                        <label htmlFor={`checkbox${index}`}></label>
                                    </div>
                                    <p className="wall_sub_text">{actor.name}</p>
                                    {actor.images.length > 0 ? (
                                        <MyImage
                                            type="actors"
                                            filename={actor.images[0].filename}
                                            fallbackImage="actor.jpg"
                                            className="card-img-top thumb-xs img-fluid"
                                            altText={`First image for ${actor.name}`}
                                        />
                                    ) : (
                                        <MyImage
                                            type="actors"
                                            filename={null}
                                            fallbackImage="actor.jpg"
                                            className="card-img-top thumb-xs img-fluid"
                                            altText="Default actor image"
                                        />
                                    )}
                                </div>
                                <div className="card-body p-3">
                                    <Link
                                        href={route("admin.actors.create", encryptString(actor.id))}
                                        className="btn btn-icon waves-effect waves-light btn-success m-r-5"
                                        data-toggle="tooltip"
                                        title="Edit"
                                    >
                                        <i className="fa fa-edit"></i>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(encryptString(actor.id))}
                                        className="btn btn-icon waves-effect waves-light btn-danger"
                                        data-toggle="tooltip"
                                        title="Remove"
                                    >
                                        <i className="fa fa-remove"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <MyPagination
                    currentPage={actors.current_page}
                    lastPage={actors.last_page}
                    onPageChange={handlePageChange}
                />
            </div>
        </Authenticated>
    );
}
