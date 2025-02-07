// resources\js\Pages\Admin\Videos\Index.jsx

import MyPagination from "@/Components/MyPagination";
import { showConfirmAlert, showSuccessAlert } from "@/Components/SweetAlert";
import { encryptString } from "@/helper";
import Authenticated from "@/Layouts/Admin/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import ReactSwitch from "react-switch";

const Index = ({ auth, title, videos, languages, languageId, genres, genreId }) => {
    const [search, setSearch] = useState("");
    const [currentLanguageId, setLanguageId] = useState(languageId || '');
    const [currentGenreId, setGenreId] = useState(genreId || '');
    const [selectedVideos, setSelectedVideos] = useState([]);

    // // Inside your component
    // const handleEditLink = (videoId) => {
    //     const encryptedId = encryptString(videoId.toString());
    //     return encryptedId;
    // };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedVideos(videos.data.map(video => video.id));
        } else {
            setSelectedVideos([]);
        }
    };

    const handleCheckboxChange = (id) => {
        setSelectedVideos(prev =>
            prev.includes(id)
                ? prev.filter(videoId => videoId !== id)
                : [...prev, id]
        );
    };

    const handleDeleteSelected = async () => {
        const isConfirmed = await showConfirmAlert(
            "Are you sure you want to delete the selected videos?"
        );
        if (isConfirmed) {
            await router.post(route("admin.videos.deleteMultiple"), { ids: encryptString(selectedVideos) },
            {
                onSuccess: () => {
                    showSuccessAlert("Selected videos deleted successfully.");
                    setSelectedVideos([]);
                }
            });
        }
    };

    const handleSearch = (e, filterType = null, filterValue = null) => {
        e.preventDefault();

        const queryParams = {
            s: search,
            language_id: currentLanguageId,
            genre_id: currentGenreId,
        };

        if (filterType) {
            queryParams[filterType] = filterValue;
        }

        router.get(route("admin.videos"), queryParams, { preserveState: true });
    };

    const handleDelete = async (id) => {
        const isConfirmed = await showConfirmAlert(
            "Are you sure you want to delete this video?"
        );
        if (isConfirmed) {
            router.delete(route("admin.videos.destroy", id));
        }
    };

    const handlePageChange = (page) => {
        router.get(route("admin.videos"), { page }, { preserveState: true });
    };

    const handleStatusChange = async (id, status) => {
        await router.put(route("admin.videos.status", id), { status }, {
            onSuccess: () => {
                showSuccessAlert("Video status changed successfully.");
            }
        });
    };
    

    return (
        <>
            <Authenticated user={auth.user}>
                <Head title={title}></Head>
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
                                    placeholder="Search by title..."
                                    className="form-control"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <button type="submit">
                                    <i className="fa fa-search"></i>
                                </button>
                            </form>
                        </div>
                        <div className="col-sm-6">&nbsp;</div>
                        <div className="col-md-3">
                            <Link
                                href={route("admin.videos.create")}
                                className="btn btn-success btn-md waves-effect waves-light m-b-20 mt-2 pull-right"
                                data-toggle="tooltip"
                                title="Add Video"
                                data-original-title="Add Video"
                            >
                                <i className="fa fa-plus"></i> Add Video
                            </Link>
                        </div>
                    </div>

                    <div className="row">
                        <div className="wall-filter-block">
                            <div
                                className="row"
                                style={{
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div className="col-sm-3">
                                    <select
                                        className="form-control select2"
                                        name="language_id"
                                        id="filter_language_id"
                                        defaultValue={currentLanguageId}
                                        onChange={(e) => {
                                            setLanguageId(e.target.value);
                                            handleSearch(e, "language_id", e.target.value);
                                        }}
                                    >
                                        <option value="">
                                            Filter by Language
                                        </option>
                                        {languages &&
                                            Object.keys(languages).map((id) => (
                                                <option key={id} value={id}>
                                                    {languages[id]}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <div className="col-sm-3">
                                    <select
                                        className="form-control select2"
                                        name="genre_id"
                                        id="filter_genre_id"
                                        defaultValue={currentGenreId}
                                        onChange={(e) => {
                                            setGenreId(e.target.value);
                                            handleSearch(e, "genre_id", e.target.value);
                                        }}
                                    >
                                        <option value="">
                                            Filter by Genre
                                        </option>
                                        {genres &&
                                            Object.keys(genres).map((id) => (
                                                <option key={id} value={id}>
                                                    {genres[id]}
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                <div className="col-sm-4">
                                    <div className="checkbox checkbox-success pull-right">
                                        <input id="select_all" type="checkbox" name="select_all" checked={selectedVideos.length === videos.data.length} onChange={handleSelectAll} />
                                        <label htmlFor="select_all">
                                            Select All
                                        </label>
                                        &nbsp;&nbsp;
                                        
                                        <div className="dropdown btn-group">
                                            <button
                                                type="button"
                                                className="btn btn-info dropdown-toggle waves-effect"
                                                data-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                Action
                                                <span className="caret"></span>
                                            </button>
                                            <div className="dropdown-menu">
                                                <Link
                                                    href="#"
                                                    className="dropdown-item"
                                                    data-action="delete"
                                                    id="data_remove_selected"
                                                    onClick={handleDeleteSelected}
                                                >
                                                    Delete
                                                </Link>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <br />

                    <div className="row">
                        {videos.data.map((video) => (
                            <div
                                key={video.id}
                                className="col-lg-3 col-md-3 col-sm-3 col-xs-6"
                            >
                                <div className="card m-b-20">
                                    <div className="wall-list-item">
                                        <div className="checkbox checkbox-success wall_check">
                                            <input
                                                type="checkbox"
                                                name="post_ids[]"
                                                id={`checkbox_${video.id}`}
                                                value={video.id} // Using consistent key for encryption
                                                checked={selectedVideos.includes(video.id)}
                                                onChange={() => handleCheckboxChange(video.id)}
                                            />
                                            <label
                                                htmlFor={`checkbox_${video.id}`}></label>
                                        </div>
                                        <p className="wall_sub_text">
                                            {video.name}
                                        </p>
                                        <img
                                            className="card-img-top thumb-xs img-fluid"
                                            src={video.thumbnail_url}
                                            alt={video.name}
                                        />
                                    </div>
                                    <div className="card-body p-3">
                                        <Link
                                            href={route("admin.videos.create", encryptString(video.id))}
                                            className="btn btn-icon waves-effect waves-light btn-success m-r-5"
                                            data-toggle="tooltip"
                                            title="Edit"
                                        >
                                            <i className="fa fa-edit"></i>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(encryptString(video.id))}
                                            className="btn btn-icon waves-effect waves-light btn-danger"
                                            data-toggle="tooltip"
                                            title="Remove"
                                        >
                                            <i className="fa fa-remove"></i>
                                        </button>
                                        <label className="switch-toggle m-0 p-0 fl-right">
                                            <ReactSwitch
                                                checked={video.status === 1}
                                                onChange={(newState) => {
                                                    handleStatusChange(
                                                        video.id,
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
                        currentPage={videos.current_page}
                        lastPage={videos.last_page}
                        onPageChange={handlePageChange}
                    />
                </div>
            </Authenticated>
        </>
    );
};

export default Index;
