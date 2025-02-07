import { showErrorAlert, showSuccessAlert } from '@/Components/SweetAlert';
import Authenticated from '@/Layouts/Admin/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';

export default function SocialLogin({ title, errors: propErrors, providers }) {
    const { errors: formErrors, setError, clearErrors, data, setData, processing } = useForm({
        providers: providers || []
    });

    const [showLoader, setShowLoader] = useState(false);
    const [newProvider, setNewProvider] = useState({
        provider_name: '',
        client_id: '',
        client_secret: '',
        status: 1,
    });

    const errors = { ...propErrors, ...formErrors };

    const validateFields = (field, value) => {
        let valid = true;
        switch (field) {
            case 'provider_name':
            case 'client_id':
            case 'client_secret':
                if (typeof value === 'string' && !value.trim()) {
                    setError(field, `${field.replace('_', ' ')} is required.`);
                    valid = false;
                }
                break;
            case 'status':
                if (![1, 2].includes(value)) {
                    setError(field, 'Status must be either ON or OFF.');
                    valid = false;
                }
                break;
            default:
                break;
        }
        if (valid) clearErrors(field);
        return valid;
    };

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            providers: prevData.providers.map((provider, i) =>
                i === index ? { ...provider, [name]: value } : provider
            ),
        }));
        validateFields(name, value);
    };

    const handleCreateChange = (e) => {
        const { name, value } = e.target;
        setNewProvider((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = data.providers.every(provider =>
            Object.keys(provider).every(key => validateFields(key, provider[key]))
        );

        if (isValid) {
            setShowLoader(true);
            try {
                await router.post(route('social-login.save'),
                    { providers: data.providers },
                    {
                        onSuccess: () => {
                            setShowLoader(false);
                            showSuccessAlert('Social login settings updated successfully');
                        },
                        onError: () => {
                            setShowLoader(false);
                            showErrorAlert('An error occurred while submitting the form.');
                        }
                    }
                );
            } catch (error) {
                setShowLoader(false);
                showErrorAlert('An error occurred while submitting the form.');
            }
        }
    };

    const handleCreateSubmit = async (e) => {
        console.log(101);

        e.preventDefault();
        const isValid = Object.keys(newProvider).every((key) =>
            validateFields(key, newProvider[key])
        );

        if (isValid) {
            setShowLoader(true);
            try {
                // Send the new provider data to the server
                await router.post(route('social-login.save'),
                    { providers: [newProvider] },
                    {
                        onSuccess: () => {
                            $('.modal').modal('hide');
                            setShowLoader(false);
                            showSuccessAlert('New provider added successfully');
                        },
                        onError: () => {
                            setShowLoader(false);
                            showErrorAlert('An error occurred while adding the provider.');
                        }
                    }
                );

                // Reset new provider after adding
                setNewProvider({ provider_name: '', client_id: '', client_secret: '', status: 1 });
            } catch (error) {
                setShowLoader(false);
                showErrorAlert('An error occurred while adding the provider.');
            }
        }
    };


    return (
        <Authenticated isLoading={showLoader}>
            <Head title={title} />
            <div className="card-box">
                <button
                    className="btn btn-success float-right"
                    title="Add Provider"
                    data-toggle="modal" data-target="#createModal"
                >
                    <i className="fa fa-plus"></i> Add Provider
                </button>

                <form onSubmit={handleSubmit} className="form-horizontal">
                    {data.providers.map((provider, index) => (
                        <div key={provider.provider_name}>
                            <h5 className="mb-4" style={{ color: '#f9f9f9' }}>
                            <i className={`fa fa-${provider.provider_name} pr-2`}></i>
                                <b>{`${provider.provider_name.charAt(0).toUpperCase() + provider.provider_name.slice(1)} Settings`}</b>
                            </h5>

                            <input type="hidden" name="provider_name" value={provider.provider_name} />

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">{`${provider.provider_name.charAt(0).toUpperCase() + provider.provider_name.slice(1)} Login`}</label>
                                <div className="col-sm-8">
                                    <select
                                        className={`form-control ${errors[`providers.${index}.status`] ? 'is-invalid' : ''}`}
                                        name="status"
                                        value={provider.status}
                                        onChange={(e) => handleChange(e, index)}
                                    >
                                        <option value="1">ON</option>
                                        <option value="2">OFF</option>
                                    </select>
                                    {errors[`providers.${index}.status`] && (
                                        <span className="invalid-feedback">{errors[`providers.${index}.status`]}</span>
                                    )}
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Client ID</label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        name="client_id"
                                        value={provider.client_id}
                                        onChange={(e) => handleChange(e, index)}
                                        className={`form-control ${errors[`providers.${index}.client_id`] ? 'is-invalid' : ''}`}
                                    />
                                    {errors[`providers.${index}.client_id`] && (
                                        <span className="invalid-feedback">{errors[`providers.${index}.client_id`]}</span>
                                    )}
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Client Secret</label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        name="client_secret"
                                        value={provider.client_secret}
                                        onChange={(e) => handleChange(e, index)}
                                        className={`form-control ${errors[`providers.${index}.client_secret`] ? 'is-invalid' : ''}`}
                                    />
                                    {errors[`providers.${index}.client_secret`] && (
                                        <span className="invalid-feedback">{errors[`providers.${index}.client_secret`]}</span>
                                    )}
                                </div>
                            </div>

                            <hr className="mt-4 mb-4" />
                        </div>
                    ))}

                    <div className="form-group">
                        <div className="offset-sm-3 col-sm-9 pl-1">
                            <button type="submit" className="btn btn-primary waves-effect waves-light" disabled={processing}>
                                {processing ? 'Saving...' : 'Save Settings'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="modal fade" id='createModal' tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content pt-3 pb-3 pl-0 pr-0">
                        <div className="modal-header pl-3 pr-3">
                            <h4 className="modal-title mt-0">Add Provider</h4>
                            <button type="button" className="close">×</button>
                        </div>

                        <div className="modal-body pl-3 pr-3 pt-3 pb-0">
                            <form onSubmit={handleCreateSubmit} className="form-horizontal">
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Provider Name</label>
                                    <div className="col-sm-8">
                                        <input
                                            type="text"
                                            name="provider_name"
                                            value={newProvider.provider_name}
                                            onChange={handleCreateChange}
                                            className={`form-control ${errors.provider_name ? 'is-invalid' : ''}`}
                                        />
                                        {errors?.provider_name && (
                                            <span className="invalid-feedback">{errors?.provider_name}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Status</label>
                                    <div className="col-sm-8">
                                        <select
                                            className="form-control"
                                            name="status"
                                            value={newProvider.status}
                                            onChange={handleCreateChange}
                                        >
                                            <option value="1">ON</option>
                                            <option value="2">OFF</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Client ID</label>
                                    <div className="col-sm-8">
                                        <input
                                            type="text"
                                            name="client_id"
                                            value={newProvider.client_id}
                                            onChange={handleCreateChange}
                                            className={`form-control ${errors.client_id ? 'is-invalid' : ''}`}
                                        />
                                        {errors?.client_id && (
                                            <span className="invalid-feedback">{errors?.client_id}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Client Secret</label>
                                    <div className="col-sm-8">
                                        <input
                                            type="text"
                                            name="client_secret"
                                            value={newProvider.client_secret}
                                            onChange={handleCreateChange}
                                            className={`form-control ${errors.client_secret ? 'is-invalid' : ''}`}
                                        />
                                        {errors?.client_secret && (
                                            <span className="invalid-feedback">{errors?.client_secret}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="modal-footer" style={{marginLeft: '-15px', marginRight: '-15px'}}>
                                    <button type="submit" className="btn btn-primary waves-effect waves-light"> Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
