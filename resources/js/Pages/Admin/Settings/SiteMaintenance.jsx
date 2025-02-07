// resources/js/Pages/Settings/SiteMaintenance.jsx

import { showConfirmAlert, showErrorAlert, showSuccessAlert } from '@/Components/SweetAlert';
import Authenticated from '@/Layouts/Admin/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import axios from 'axios';

export default function SiteMaintenance({ auth, title, errors: propErrors, maintenance }) {
    const { data, setData, processing, errors: formErrors } = useForm({
        title: maintenance.title,
        description: maintenance.description,
        secret: maintenance.secret,
        status: maintenance.status,
    });

    const errors = { ...propErrors, ...formErrors };
    const [showLoader, setShowLoader] = useState(false);

    const handleChangeMode = async (mode) => {
        // Show the confirmation alert before proceeding
        const isConfirmed = await showConfirmAlert('Do you want to enable maintenance mode?');

        if (isConfirmed) {
            setShowLoader(true);
            try {
                const response = await axios.post(route('maintenance-mode.change', mode));
                if (response.data.status == 'success') {
                    setData((prev) => ({ ...prev, status: mode }));
                    showSuccessAlert(response.data.message, null); // timer null
                }
            } catch (error) {
                console.log(error);
                showErrorAlert('Failed to update maintenance mode.');
            } finally {
                setShowLoader(false);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowLoader(true);
        try {
            await router.post(route('site-maintenance.save'), data, {
                onSuccess: () => {
                    setShowLoader(false);
                    showSuccessAlert('Site maintenance settings updated successfully');
                },
                onError: () => {
                    setShowLoader(false);
                    showErrorAlert('An error occurred while submitting the form.');
                }
            });
        } catch (error) {
            setShowLoader(false);
            showErrorAlert('An error occurred while submitting the form.');
        }
    };

    return (
        <Authenticated isLoading={showLoader}>
            <Head title={title} />

            <div className="card-box">
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">&nbsp;</label>
                    <div className="col-sm-8">
                        <button className="btn btn-success btn-md waves-effect waves-light m-b-20 mt-2 pull-right" onClick={() => handleChangeMode(data.status === 1 ? 0 : 1)}>
                            <i className="fa fa-bullseye"></i>
                            {data.status === 1 ? 'Maintenance Mode On' : 'Maintenance Mode Off'}
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} acceptCharset="UTF-8" className="form-horizontal">
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Title <span className='text-danger'>*</span></label>
                        <div className="col-sm-8">
                            <input
                                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                type="text"
                                name="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Maintenance Title"
                            />
                            {errors.title && <span className="invalid-feedback">{errors.title}</span>}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-8">
                            <textarea
                                name="description"
                                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                style={{ height: '300px' }}
                            />
                            {errors.description && <span className="invalid-feedback">{errors.description}</span>}
                        </div>
                    </div>

                    <hr />

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Maintenance Secret <span className='text-danger'>*</span></label>
                        <div className="col-sm-8">
                            <input
                                className={`form-control ${errors.secret ? 'is-invalid' : ''}`}
                                type="text"
                                name="secret"
                                required
                                value={data.secret}
                                onChange={(e) => setData('secret', e.target.value)}
                                placeholder="Maintenance Secret"
                            />
                            <small className="form-text text-muted" style={{ fontSize: '14px' }}>
                                After placing the site in maintenance mode, you may navigate to the site URL matching this secret token and script will issue a maintenance mode bypass cookie to your browser.
                                <br />
                                Once the cookie has been issued to your browser, you will be able to browse the application normally as if it was not in maintenance mode.
                            </small>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-8 offset-sm-2">
                            <button type="submit" className="btn btn-primary" disabled={processing}>
                                {processing ? 'Updating...' : 'Update Maintenance Settings'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
}
