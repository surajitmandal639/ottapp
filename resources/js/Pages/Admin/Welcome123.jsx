
import React, { useState } from 'react';
import GuestLayout from "@/Layouts/Admin/GuestLayout";
import { Head, Link, useForm, router } from '@inertiajs/react';
import { showErrorAlert, showSuccessAlert } from '@/Components/SweetAlert';

export default function CombinedForm({ title, status, canResetPassword, errors: propErrors, androidAd }) {
    const { data, setData, processing, errors: formErrors, setError, clearErrors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const [showLoader, setShowLoader] = useState(false);
    const errors = { ...propErrors, ...formErrors };

    // Unified validation function
    const validateFields = (field, value) => {
        let valid = true;
       
        switch (field) {
            case 'email':
                if (!value || !/\S+@\S+\.\S+/.test(value)) {
                    setError(field, "A valid email address is required.");
                    valid = false;
                } else {
                    clearErrors(field);
                }
                break;

            case 'password':
                if (!value || value.length < 6) {
                    setError(field, "Password must be at least 6 characters long.");
                    valid = false;
                } else {
                    clearErrors(field);
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

    // Handle both login and ad form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = Object.keys(data).every((key) => validateFields(key, data[key]));

        if (isValid) {
            setShowLoader(true);
            try {
                await router.post(route('login'), data, {
                    onSuccess: () => {
                        setShowLoader(false);
                        showSuccessAlert("Logged in successfully.");
                    },
                    onError: () => {
                        setShowLoader(false);
                        showErrorAlert('An error occurred while submitting the form.');
                    }
                });
            } catch (error) {
                setShowLoader(false);
                showErrorAlert('An error occurred while submitting the form.');
            } finally{
                reset("password");
            }
        }
    };

    return (
        <GuestLayout>
            <Head title="Admin Log in" />

            <div className="text-center mb-4">
                <h3 className="text-uppercase font-weight-bold text-light">Sign In</h3>
            </div>

            {status && (
                <div className="mb-4 text-success">
                    {status}
                </div>
            )}

            <div className="container">
                <form onSubmit={handleSubmit} method="POST" id="loginform" role="form">
                    <div className="form-group mb-3">
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            autoComplete="username"
                            onChange={handleChange}
                            placeholder="Email"
                        />
                        {errors.email && ( <div className="invalid-feedback"> {errors.email} </div> )}
                    </div>

                    <div className="form-group mb-3">
                        <input
                            type="password"
                            name="password"
                            value={data.password}
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            autoComplete="current-password"
                            onChange={handleChange}
                            placeholder="Password"
                        />
                        {errors.password && (
                            <div className="invalid-feedback">
                                {errors.password}
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <div className="col-xs-12">
                            <div className="checkbox checkbox-custom">
                                <input 
                                    id="checkbox-signup" 
                                    type="checkbox" 
                                    name="remember" 
                                    checked={data.remember}
                                    onChange={handleChange}
                                />
                                <label htmlFor="checkbox-signup"> Remember me </label>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mb-4">
                        <button className="btn btn-custom btn-bordred btn-block waves-effect waves-light" type="submit" disabled={processing}>
                            Login
                        </button>
                    </div>

                    {canResetPassword && (
                        <div className="text-center">
                            <Link href={route("admin.password.request")} className="text-muted">
                                <i className="fa fa-lock mr-2"></i> Forgot your password?
                            </Link>
                        </div>
                    )}
                </form>
            </div>
        </GuestLayout>
    );
}
