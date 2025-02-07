import React, { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { showErrorAlert, showSuccessAlert } from '@/Components/SweetAlert';
import Authenticated from '@/Layouts/Admin/AuthenticatedLayout';
import { Form } from 'react-bootstrap';

export default function AdCreate({ title, errors: propErrors, androidAd }) {
    const { errors: formErrors, setError, clearErrors, data: formData, setData, processing, reset } = useForm({
        ads_name: androidAd?.ads_name || '',
        publisher_id: androidAd?.publisher_id || '',
        banner_on: androidAd?.banner_on || false,
        banner_id: androidAd?.banner_id || '',
        interstitial_on: androidAd?.interstitial_on || false,
        interstitial_id: androidAd?.interstitial_id || '',
        interstitial_clicks: androidAd?.interstitial_clicks || 1,
        status: androidAd?.status || '2',
    });

    const [showLoader, setShowLoader] = useState(false);
    const errors = { ...propErrors, ...formErrors };
    const data = { ...androidAd, ...formData };

    // Validation function
    const validateFields = (field, value) => {
        let valid = true;
        const formattedField = field.replace('_', ' ').charAt(0).toUpperCase() + field.replace('_', ' ').slice(1);

        switch (field) {
            case 'ads_name':
                if (!value.trim()) {
                    setError(field, `${formattedField} is required.`);
                    valid = false;
                } else if (value.length > 255) {
                    setError(field, `${formattedField} must be less than 255 characters.`);
                    valid = false;
                }
                break;
            case 'publisher_id':
                if (value && value.length > 50) {
                    setError(field, `${formattedField} must be less than 50 characters.`);
                    valid = false;
                }
                break;
            // case 'banner_id':
            // case 'interstitial_id':
            //     if (!value.trim()) {
            //         setError(field, `${formattedField} is required.`);
            //         valid = false;
            //     } else if (value.length > 100) {
            //         setError(field, `${formattedField} must be less than 100 characters.`);
            //         valid = false;
            //     }
            //     break;
            case 'interstitial_clicks':
                if (isNaN(value) || value < 1) {
                    setError(field, `${formattedField} must be a valid number greater than or equal to 1.`);
                    valid = false;
                }
                break;
            default:
                break;
        }

        if (valid) {
            clearErrors(field);
        }

        return valid;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData(name, type === 'checkbox' ? checked : value);
        validateFields(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = Object.keys(data).every((key) => validateFields(key, data[key]));

        if (isValid) {
            setShowLoader(true);
            try {
                await router.post(route('android-ad.save', androidAd?.id), data, {
                    onSuccess: () => {
                        setShowLoader(false);
                        showSuccessAlert(`Ad settings ${androidAd?.id ? 'update' : 'create'} successfully.`);
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
        }
    };

    return (
        <Authenticated isLoading={showLoader}>
            <Head title={title} />
            <div className="card-box">
                <nav aria-label="breadcrumb ">
                    <ol className="breadcrumb text-primary" style={{justifyContent: 'flex-end'}}>
                        <li className="breadcrumb-item"><Link href={route('admin.dashboard')}>Dashboard</Link></li>
                        <li className="breadcrumb-item"><Link href={route('admin.android-ad-list')}>Android Ads</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{androidAd ? 'Update Ad' : 'Create Ad'}</li>
                    </ol>
                </nav>

                <form onSubmit={handleSubmit} className="form-horizontal">
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Title <span className="text-danger"> *</span></label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                name="ads_name"
                                value={data.ads_name}
                                onChange={handleChange}
                                className={`form-control ${errors.ads_name ? 'is-invalid' : ''}`}
                            />
                            {errors.ads_name && <div className="invalid-feedback">{errors.ads_name}</div>}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Publisher ID</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                name="publisher_id"
                                value={data.publisher_id}
                                onChange={handleChange}
                                className={`form-control ${errors.publisher_id ? 'is-invalid' : ''}`}
                            />
                            {errors.publisher_id && <div className="invalid-feedback">{errors.publisher_id}</div>}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Banner ON/OFF</label>
                        <div className="col-sm-8">
                            <Form.Check
                                type="switch"
                                label="Banner ON/OFF"
                                checked={data.banner_on == 1} // Control the checkbox based on the data state
                                onChange={(e) => setData('banner_on', e.target.checked ? 1 : 0)} // Toggle between 1 and 0
                                className={errors.banner_on ? 'is-invalid' : ''}
                            />
                            {errors.banner_on && <div className="invalid-feedback">{errors.banner_on}</div>}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Banner Ad ID</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                name="banner_id"
                                value={data.banner_id}
                                onChange={handleChange}
                                className={`form-control ${errors.banner_id ? 'is-invalid' : ''}`}
                            />
                            {errors.banner_id && <div className="invalid-feedback">{errors.banner_id}</div>}
                        </div>
                    </div>

                    <hr />

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Interstitial ON/OFF</label>
                        <div className="col-sm-8">
                            <Form.Check
                                type="switch"
                                id="interstitial-switch"
                                label="Interstitial ON/OFF"
                                checked={data.interstitial_on == 1} // Control the checkbox based on the data state
                                onChange={(e) => setData('interstitial_on', e.target.checked ? 1 : 0)} // Toggle between 1 and 0
                                className={errors.interstitial_on ? 'is-invalid' : ''}
                            />
                            {errors.interstitial_on && <div className="invalid-feedback">{errors.interstitial_on}</div>}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Interstitial Ad ID</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                name="interstitial_id"
                                value={data.interstitial_id}
                                onChange={handleChange}
                                className={`form-control ${errors.interstitial_id ? 'is-invalid' : ''}`}
                            />
                            {errors.interstitial_id && <div className="invalid-feedback">{errors.interstitial_id}</div>}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Interstitial Ad Clicks</label>
                        <div className="col-sm-8">
                            <input
                                type="number"
                                name="interstitial_clicks"
                                min={1}
                                value={data.interstitial_clicks}
                                onChange={handleChange}
                                className={`form-control ${errors.interstitial_clicks ? 'is-invalid' : ''}`}
                            />
                            {errors.interstitial_clicks && <div className="invalid-feedback">{errors.interstitial_clicks}</div>}
                        </div>
                    </div>

                    <hr />

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Status</label>
                        <div className="col-sm-8">
                            <select
                                className="form-control"
                                name="status"
                                value={data.status}
                                onChange={handleChange}
                            >
                                <option value="1">Active</option>
                                <option value="2">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-8 offset-sm-3">
                            <button type="submit" className="btn btn-primary" disabled={processing}>
                                {androidAd ? "Update" : "Create"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
}
