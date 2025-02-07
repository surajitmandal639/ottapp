import { showErrorAlert, showSuccessAlert } from '@/Components/SweetAlert';
import Authenticated from '@/Layouts/Admin/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';

export default function Recaptcha({ title, errors: propErrors, menus }) {
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

                 <h5 className="mb-4" style={{ color: '#f9f9f9' }}><i className="fa fa-refresh pr-2"></i> <b>reCAPTCHA Settings</b></h5>

                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Site Key</label>
                    <div className="col-sm-8">
                      <input type="text" name="recaptcha_site_key" value="Hidden in Demo" className="form-control" />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Secret Key</label>
                    <div className="col-sm-8">
                      <input type="text" name="recaptcha_secret_key" value="Hidden in Demo" className="form-control" />
                    </div>
                  </div>
                  <hr />

                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Display on Login</label>
                      <div className="col-sm-8">
                            <select className="form-control" name="recaptcha_on_login">

                                <option value="1">ON</option>
                                <option value="0" selected="">OFF</option>

                            </select>
                      </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Display on Signup</label>
                      <div className="col-sm-8">
                            <select className="form-control" name="recaptcha_on_signup">

                                <option value="1">ON</option>
                                <option value="0" selected="">OFF</option>

                            </select>
                      </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Display on Forgot Password</label>
                      <div className="col-sm-8">
                            <select className="form-control" name="recaptcha_on_forgot_pass">

                                <option value="1">ON</option>
                                <option value="0" selected="">OFF</option>

                            </select>
                      </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Display on Contact Us</label>
                      <div className="col-sm-8">
                            <select className="form-control" name="recaptcha_on_contact_us">

                                <option value="1" selected="">ON</option>
                                <option value="0">OFF</option>

                            </select>
                      </div>
                  </div>

                  <div className="form-group">
                    <div className="offset-sm-3 col-sm-9 pl-1">
                      <button type="submit" className="btn btn-primary waves-effect waves-light"> Save Settings </button>
                    </div>
                  </div>


                </form>
            </div>


        </Authenticated>
    );
}
