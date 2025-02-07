import MyPagination from "@/Components/MyPagination";
import { showConfirmAlert, showSuccessAlert, showErrorAlert } from "@/Components/SweetAlert";
import Authenticated from "@/Layouts/Admin/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import ReactSwitch from "react-switch";
import { Modal } from 'react-bootstrap';

const Genres = ({ auth, genres, errors: propErrors }) => {
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentGenreId, setCurrentGenreId] = useState(null);

    const { data, setData, errors: formErrors, clearErrors, reset, processing } = useForm({
        name: '',
        status: 1,
    });

    const [editErrors, setEditErrors] = useState({});
    const [addErrors, setAddErrors] = useState({});

    useEffect(() => {
        if (showModal) {
            setEditErrors({});
            setAddErrors({});
        }

        return () => {
            //
        };
    }, [showModal]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const successMessage = isEditing ? "Genre updated successfully." : "Genre created successfully.";

        await router.post(
            route('admin.genres.save', encryptString(data?.id)),
            { ...data },
            {
                onSuccess: () => {
                    showSuccessAlert(successMessage);
                    setShowModal(false);
                    reset();
                    setAddErrors({});
                    setEditErrors({});
                },
                onError: (errors) => {
                    isEditing ? setEditErrors(errors) : setAddErrors(errors);
                }
            }
        );
    };

    const handleStatus = async (id, status) => {
        const confirmed = await showConfirmAlert(`Are you sure you want to ${status} this genre?`);

        if (!confirmed) return;

        const action = status === 'delete' ? 'delete' : status === 'active' ? 'activate' : 'inactivate';
        const newStatus = status === 'delete' ? 0 : status === 'active' ? 1 : 2;

        await router.post(route("admin.genres.status", encryptString(id)), { status: newStatus }, {
            onSuccess: () => {
                showSuccessAlert(`Genre ${action}d successfully.`);
            },
            onError: () => {
                showErrorAlert(`Failed to ${action} the genre. Please try again.`);
            }
        });
    };

    const openModal = (genre = null) => {
        clearErrors();
        reset({
            name: genre?.name || '',
            status: genre?.status || 1,
        });

        setData({ ...genre });
        setIsEditing(!!genre);
        setCurrentGenreId(genre?.id || null);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        reset();
        setCurrentGenreId(null);
    };

    const handlePageChange = (page) => {
        router.get(route("admin.genres"), { page }, { preserveState: true });
    };

    return (
        <>
            <Head title="Genres" />
            <Authenticated user={auth.user}>
                <div className="card-box table-responsive">
                    <div className="row mb-3">
                        <div className="col-md-3">
                            <button className="btn btn-success" onClick={() => openModal(null)}>
                                <i className="fa fa-plus"></i> Add Genre
                            </button>
                        </div>
                    </div>

                    <div className="row">
                        {genres.data.map((genre, index) => (
                            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-6" key={index}>
                                <div className="card m-b-20 p-3 lng_item_grid">
                                    
                                    <div className="card-body p-0">
                                        <div className="item_latter" title={genre.name}>
                                            {genre.name}
                                        </div>
                                        
                                        <button className="btn waves-effect waves-light btn-success m-r-5" onClick={() => openModal(genre)}>
                                            <i className="fa fa-edit"></i>
                                        </button>
                                        <button className="btn waves-effect waves-light btn-danger" onClick={() => handleStatus(genre.id, 'delete')}>
                                            <i className="fa fa-remove"></i>
                                        </button>
                                        <label className="switch-toggle m-0 p-0 fl-right">
                                            <ReactSwitch
                                                checked={genre.status === 1}
                                                onChange={(checked) => handleStatus(genre.id, checked ? 'active' : 'inactive')}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <MyPagination
                    currentPage={genres.current_page}
                    lastPage={genres.last_page}
                    onPageChange={handlePageChange}
                />

                <Modal show={showModal} onHide={closeModal} centered style={{ paddingRight: '17px' }}>
                    <div className="modal-header pl-3 pr-3">
                        <h4 className="modal-title mt-0">{isEditing ? "Edit Genre" : "Add Genre"}</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={closeModal}>×</button>
                    </div>
                    <div className="modal-body pl-3 pr-3 pt-3 pb-0">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">Genre Name</label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        name="name"
                                        value={data?.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className={`form-control ${isEditing ? (editErrors.name ? 'is-invalid' : '') : (addErrors.name ? 'is-invalid' : '')}`}
                                    />
                                    {(isEditing ? editErrors.name : addErrors.name) && (
                                        <div className="invalid-feedback">
                                            {isEditing ? editErrors.name : addErrors.name}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">Status</label>
                                <div className="col-sm-8">
                                    <select
                                        name="status"
                                        value={data?.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className={`form-control ${isEditing ? (editErrors.status ? 'is-invalid' : '') : (addErrors.status ? 'is-invalid' : '')}`}
                                    >
                                        <option value={1}>Active</option>
                                        <option value={2}>Inactive</option>
                                    </select>
                                    {(isEditing ? editErrors.status : addErrors.status) && (
                                        <div className="invalid-feedback">
                                            {isEditing ? editErrors.status : addErrors.status}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="modal-footer pl-3 pr-3 pb-0">
                        <button type="button" className="btn btn-primary waves-effect waves-light" disabled={processing} onClick={handleSubmit}>
                            {isEditing ? "Update" : "Save"}
                        </button>
                    </div>
                </Modal>
            </Authenticated>
        </>
    );
};

export default Genres;
