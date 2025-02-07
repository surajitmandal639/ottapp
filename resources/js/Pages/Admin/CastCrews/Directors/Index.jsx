import MyImage from "@/Components/MyImage";
import MyPagination from "@/Components/MyPagination";
import { showConfirmAlert, showSuccessAlert, showErrorAlert } from "@/Components/SweetAlert"; // Ensure you import the necessary alerts
import Authenticated from "@/Layouts/Admin/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react"; 
import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";

export default function Index ({ title, directors }) {
    const [search, setSearch] = useState("");
    const [selectedActors, setSelectedActors] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route("directors"), { s: search });
    };

    const handleDelete = async () => {
        const isMultiple = selectedActors.length > 1;

        // Encrypt selected IDs
        const encryptedIds = selectedActors.map(id => encryptString(id));
    
        // Confirm deletion
        const confirmed = await showConfirmAlert(`Are you sure you want to delete ${isMultiple ? 'these directors' : 'this director'}?`);
        if (!confirmed) return;
        
        // Send the delete request
        await router.post(route("admin.directors.delete"), { ids: encryptedIds }, {
            onSuccess: () => {
                showSuccessAlert(`Director${isMultiple ? 's' : ''} deleted successfully.`);
                setSelectedActors([]); // Clear selection after successful deletion
            },
            onError: () => {
                showErrorAlert(`Failed to delete the director${isMultiple ? 's' : ''}. Please try again.`);
            }
        });
    };

    const handlePageChange = (page) => {
        router.get(route("admin.directors"), { page }, { preserveState: true });
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedActors(directors.data.map(director => director.id));
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
        // Reset selected directors when directors data changes
        setSelectedActors([]);
    }, [directors]);

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
                                        checked={selectedActors.length === directors.data.length}
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
                                                disabled={selectedActors.length === 0} // Disable if no directors are selected
                                            >
                                                Delete
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    &nbsp;&nbsp;&nbsp;
                                    <Link
                                        href={route("admin.directors.create", null)}
                                        className="btn btn-success btn-md waves-effect waves-light pull-right"
                                        data-toggle="tooltip"
                                        title="Add Director"
                                    >
                                        <i className="fa fa-plus"></i> Add Director
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <br />

                <div className="row">
                    {directors.data.map((director, index) => (
                        <div key={director.id} className="col-lg-2 col-md-3 col-sm-3 col-xs-6">
                            <div className="card m-b-20">
                                <div className="wall-list-item">
                                    <div className="checkbox checkbox-success wall_check">
                                        <input
                                            type="checkbox"
                                            name="post_ids[]"
                                            id={`checkbox${index}`}
                                            value={director.id}
                                            className="post_ids"
                                            checked={selectedActors.includes(director.id)}
                                            onChange={() => handleCheckboxChange(director.id)}
                                        />
                                        <label htmlFor={`checkbox${index}`}></label>
                                    </div>
                                    <p className="wall_sub_text">{director.name}</p>
                                    {director.images.length > 0 ? (
                                        <MyImage
                                            type="actors"
                                            filename={director.images[0].filename}
                                            fallbackImage="director.jpg"
                                            className="card-img-top thumb-xs img-fluid"
                                            altText={`First image for ${director.name}`}
                                        />
                                    ) : (
                                        <MyImage
                                            type="directors"
                                            filename={null}
                                            fallbackImage="director.jpg"
                                            className="card-img-top thumb-xs img-fluid"
                                            altText="Default director image"
                                        />
                                    )}
                                </div>
                                <div className="card-body p-3">
                                    <Link
                                        href={route("admin.directors.create", encryptString(director.id))}
                                        className="btn btn-icon waves-effect waves-light btn-success m-r-5"
                                        data-toggle="tooltip"
                                        title="Edit"
                                    >
                                        <i className="fa fa-edit"></i>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(director.id)}
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
                    currentPage={directors.current_page}
                    lastPage={directors.last_page}
                    onPageChange={handlePageChange}
                />
            </div>
        </Authenticated>
    );
}
