import { showErrorAlert, showSuccessAlert } from '@/Components/SweetAlert';
import Authenticated from '@/Layouts/Admin/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';

export default function SmtpEmail({ errors: propErrors, smtp }) {
    const { errors: formErrors, setError, clearErrors, data: formData, setData } = useForm();
    const [testEmail, setTestEmail] = useState('');
    const [testEmailError, setTestEmailError] = useState('');
    const [showLoader, setShowLoader] = useState(false);

    const errors = { ...propErrors, ...formErrors };
    const data = { ...smtp, ...formData };

    const handleTestEmailChange = (e) => {
        setTestEmailError('');
        setTestEmail(e.target.value);
    }

    const validateFields = (field, value) => {
        let valid = true;

        switch (field) {
            case 'test_email':
                const emailRegex = /\S+@\S+\.\S+/;
                if (!emailRegex.test(value)) {
                    setError(field, 'Invalid email format.');
                    valid = false;
                }
                break;
            case 'host':
            case 'port':
            case 'email':
            case 'password':
                if (!value.trim()) {
                    setError(field, `${field} is required.`);
                    valid = false;
                }
                break;
            default:
                break;
        }

        if (valid) clearErrors(field);
        return valid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
        validateFields(name, value);
    };

    const handleTestSubmit = async () => {
        try {
            setShowLoader(true);
            const resp = await axios.post(route('smtp.test'), { test_email: testEmail });

            if (resp.data.status == 'success') {
                showSuccessAlert(resp.data.message);
                setTestEmailError('');
                setShowLoader(false);
                $('#test_model').modal('hide');

            }
            if (resp.data.status == 'error' && resp.data.errors) {
                console.log(resp.data.errors);
                setTestEmailError(resp.data.errors);
                setShowLoader(false);
                // $('#test_model').modal('hide');

            }
        } catch (error) {
            console.error(error);
        } finally {
            setShowLoader(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = Object.keys(data).every((key) => validateFields(key, data[key]));

        if (isValid) {
            const successMessage = smtp ? 'SMTP settings updated successfully' : 'SMTP settings created successfully';

            setShowLoader(true); // Show loader when starting the request

            try {
                await router.post(route('smtp.save'),
                    { ...data },
                    {
                        onSuccess: () => {
                            setShowLoader(false);
                            showSuccessAlert(successMessage);
                        }

                    }
                );
            } catch (error) {
                console.error('Error submitting form:', error);
                showErrorAlert('An error occurred while submitting the form. Please try again.');
            }
        }
    };


    return (
        <>

        <Authenticated isLoading={showLoader}>
            <Head title='SMTP Settings' />
            <div className="card-box">
                {/* Test SMTP Modal */}
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">&nbsp;</label>
                    <div className="col-sm-8">
                        <Link href="#" className="btn btn-info btn-md pull-right" data-toggle="modal" data-target="#test_model">
                            <i className="fa fa-send"></i> Test SMTP
                        </Link>
                    </div>
                    <div id="test_model" className="modal fade" tabIndex="-1" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Test SMTP</h4>
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Test Email</label>
                                        <div className="col-sm-9">
                                            <input
                                                type="email"
                                                name="test_email"
                                                placeholder="Email"
                                                className="form-control"
                                                value={testEmail}
                                                onChange={handleTestEmailChange}
                                            />
                                        {testEmailError && (<span className='text-danger'>{testEmailError}</span>)}
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-primary" onClick={handleTestSubmit}>
                                        {showLoader ? 'Sending...' : 'Send' }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SMTP Form */}
                <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Host *</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                name="host"
                                className="form-control"
                                value={data.host || ''}
                                onChange={handleChange}
                            />
                            {errors && errors?.host && (<span className='text-danger'>{errors.host}</span>)}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Port *</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                name="port"
                                className="form-control"
                                value={data.port || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Email *</label>
                        <div className="col-sm-8">
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={data.email || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Password *</label>
                        <div className="col-sm-8">
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                value={data.password || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Encryption</label>
                        <div className="col-sm-8">
                            <select
                                name="encryption"
                                className="form-control"
                                value={data.encryption || 'SSL'}
                                onChange={handleChange}
                            >
                                <option value="TLS">TLS</option>
                                <option value="SSL">SSL</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-8 offset-sm-2">
                            <button type="submit" className="btn btn-primary">
                                Save Settings
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </Authenticated>
        </>
    );
}
