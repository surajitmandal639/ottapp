import { showErrorAlert, showSuccessAlert } from '@/Components/SweetAlert';
import Authenticated from '@/Layouts/Admin/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';

export default function Menu({ title, errors: propErrors, menus }) {
    const { errors: formErrors, setError, clearErrors, data, setData, processing } = useForm({
        menus: menus || []
    });

    const [showLoader, setShowLoader] = useState(false);
    // const [newProvider, setNewProvider] = useState({
    //     provider_name: '',
    //     client_id: '',
    //     client_secret: '',
    //     status: 1,
    // });

    // const errors = { ...propErrors, ...formErrors };

    // const validateFields = (field, value) => {
    //     let valid = true;
    //     switch (field) {
    //         case 'name':    //
    //             if (typeof value === 'string' && !value.trim()) {
    //                 setError(field, `${field.replace('_', ' ')} is required.`);
    //                 valid = false;
    //             }
    //             break;
    //         case 'status':
    //             if (![1, 2].includes(value)) {
    //                 setError(field, 'Status must be either ON or OFF.');
    //                 valid = false;
    //             }
    //             break;
    //         default:
    //             break;
    //     }
    //     if (valid) clearErrors(field);
    //     return valid;
    // };

    // const handleChange = (e, index) => {
    //     const { name, value } = e.target;
    //     setData((prevData) => ({
    //         ...prevData,
    //         menus: prevData.menus.map((menu, i) =>
    //             i === index ? { ...menu, [name]: value } : menu
    //         ),
    //     }));
    //     validateFields(name, value);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const isValid = data.menus.every(provider =>
        //     Object.keys(provider).every(key => validateFields(key, provider[key]))
        // );

        // if (isValid) {
        //     setShowLoader(true);
        //     try {
        //         await router.post(route('social-login.save'),
        //             { menus: data.menus },
        //             {
        //                 onSuccess: () => {
        //                     setShowLoader(false);
        //                     showSuccessAlert('Social login settings updated successfully');
        //                 },
        //                 onError: () => {
        //                     setShowLoader(false);
        //                     showErrorAlert('An error occurred while submitting the form.');
        //                 }
        //             }
        //         );
        //     } catch (error) {
        //         setShowLoader(false);
        //         showErrorAlert('An error occurred while submitting the form.');
        //     }
        // }
    };

    return (
        <Authenticated isLoading={showLoader}>
            <Head title={title} />
            <div className="card-box">

                <form onSubmit={handleSubmit} className="form-horizontal">

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Shows</label>
                        <div className="col-sm-9">
                                <select className="form-control" name="menu_shows">

                                    <option value="1" selected="">ON</option>
                                    <option value="0">OFF</option>

                                </select>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Movies</label>
                        <div className="col-sm-9">
                                <select className="form-control" name="menu_movies">

                                    <option value="1" selected="">ON</option>
                                    <option value="0">OFF</option>

                                </select>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Sports</label>
                        <div className="col-sm-9">
                                <select className="form-control" name="menu_sports">

                                    <option value="1" selected="">ON</option>
                                    <option value="0">OFF</option>

                                </select>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Live TV</label>
                        <div className="col-sm-9">
                                <select className="form-control" name="menu_livetv">

                                    <option value="1" selected="">ON</option>
                                    <option value="0">OFF</option>

                                </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="offset-sm-2 col-sm-9 pl-1">
                            <button type="submit" className="btn btn-primary waves-effect waves-light" disabled={processing}>
                                {processing ? 'Saving...' : 'Save Settings'}
                            </button>
                        </div>
                    </div>

                </form>
            </div>


        </Authenticated>
    );
}
