import { showErrorAlert, showSuccessAlert } from '@/Components/SweetAlert';
import Authenticated from '@/Layouts/Admin/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';

export default function Purchase({ title, errors: propErrors, purchase }) {
    const { errors: formErrors, setError, clearErrors, data:formData, setData, processing } = useForm({
        buyer_name: purchase?.buyer_name || '',
        purchase_code: purchase?.purchase_code || '',
        app_package_name: purchase?.app_package_name || '',
    });

    const [showLoader, setShowLoader] = useState(false);
    const errors = { ...propErrors, ...formErrors };
    const data = { ...purchase, ...formData }

    const validateFields = async (field, value) => {
        let valid = true;
        switch (field) {
            case 'buyer_name':
            case 'app_package_name':
            case 'purchase_code':
                if (!value.trim()) {
                    setError(field, `${field.replace('_', ' ')} is required.`);
                    valid = false;
                }
                break;
            case 'purchase_code':
                if (value.trim()) {
                    valid = await checkUniqueness(field, value);
                }
                break;
            default:
                break;
        }
        if (valid) clearErrors(field);
        return valid;
    };

    const checkUniqueness = async (field, value) => {
        let unique = true;
        try {
            const response = await axios.post(route('verify-purchase-app.checkUnique'), { field, value, id: purchase?.id || null });

            if (response) {
                setError(field, `${field.charAt(0).toUpperCase() + field.slice(1)} must be unique.`);
            }
        } catch (error) {
            console.error("Error checking uniqueness", error);
        }
        return unique;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
        validateFields(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = Object.keys(data).every((key) => validateFields(key, data[key]));

        if (isValid) {
            setShowLoader(true);
            try {
                await router.post(route('verify-purchase-app.save'), data, {
                    onSuccess: () => {
                        setShowLoader(false);
                        showSuccessAlert('Purchase details updated successfully.');
                    },
                    onError: () => {
                        setShowLoader(false);
                        showErrorAlert('An error occurred while submitting the form.');
                    }
                });
            } catch (error) {
                setShowLoader(false);
                console.log(error);
                
                showErrorAlert('An error occurred while submitting the form.');
            }
        }
    };

    return (
        <Authenticated isLoading={showLoader}>
            <Head title={title} />
            <div className="card-box">
                <form onSubmit={handleSubmit} className="form-horizontal">
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Envato Username <span className="text-danger"> *</span></label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                name="buyer_name"
                                value={data.buyer_name}
                                onChange={handleChange}
                                className={`form-control ${errors.buyer_name ? 'is-invalid' : ''}`}
                            />
                            {errors.buyer_name && <div className="invalid-feedback">{errors.buyer_name}</div>}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Buyer Purchase Code <span className="text-danger"> *</span></label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                name="purchase_code"
                                value={data.purchase_code}
                                onChange={handleChange}
                                className={`form-control ${errors.purchase_code ? 'is-invalid' : ''}`}
                            />
                            {errors.purchase_code && <div className="invalid-feedback">{errors.purchase_code}</div>}
                            <small className="form-text text-muted">
                                If you don't know, <Link href="#" target="_blank" rel="noopener noreferrer">click here</Link>
                            </small>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">App Package Name <span className="text-danger"> *</span></label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                name="app_package_name"
                                value={data.app_package_name}
                                onChange={handleChange}
                                className={`form-control ${errors.app_package_name ? 'is-invalid' : ''}`}
                            />
                            {errors.app_package_name && <div className="invalid-feedback">{errors.app_package_name}</div>}
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="offset-sm-3 col-sm-9 pl-1">
                            <button type="submit" className="btn btn-primary waves-effect waves-light" disabled={processing}> Save </button>
                        </div>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
}
