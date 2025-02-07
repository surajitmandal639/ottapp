import { showErrorAlert, showSuccessAlert } from '@/Components/SweetAlert';
import Authenticated from '@/Layouts/Admin/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';

export default function BannerAd({ title, errors: propErrors, menus }) {
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

            <form onSubmit={handleSubmit} acceptCharset="UTF-8" className="form-horizontal" >


                 <h5 className="mb-4" style={{ color: '#f9f9f9' }}><i className="fa fa-buysellads pr-2"></i> <b>Banner Ads</b></h5>

                  <div className="alert alert-info"><b>Note:</b> Leave empty if not want to display</div>

                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Home Top</label>
                    <div className="col-sm-8">

                    <textarea name="home_top" className="form-control">&lt;a href="https://1.envato.market/JakrN" target="_blank"&gt;&lt;img src="https://videoportal.viavilab.com/upload/ad-conent-one1.png" alt="banner_ads" title="Banner Ads"&gt;&lt;/a&gt;</textarea>

                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Home Bottom</label>
                    <div className="col-sm-8">

                    <textarea name="home_bottom" className="form-control">&lt;a href="https://1.envato.market/JakrN" target="_blank"&gt;&lt;img src="https://videoportal.viavilab.com/upload/ad-conent-one1.png" alt="banner_ads" title="Banner Ads"&gt;&lt;/a&gt;</textarea>

                    </div>
                  </div>

                  <hr />

                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">List Top</label>
                    <div className="col-sm-8">

                    <textarea name="list_top" className="form-control">&lt;a href="https://1.envato.market/JakrN" target="_blank"&gt;&lt;img src="https://videoportal.viavilab.com/upload/ad-conent-one1.png" alt="banner_ads" title="Banner Ads"&gt;&lt;/a&gt;</textarea>

                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">List Bottom</label>
                    <div className="col-sm-8">

                    <textarea name="list_bottom" className="form-control">&lt;a href="https://1.envato.market/JakrN" target="_blank"&gt;&lt;img src="https://videoportal.viavilab.com/upload/ad-conent-one1.png" alt="banner_ads" title="Banner Ads"&gt;&lt;/a&gt;</textarea>

                    </div>
                  </div>

                  <hr />

                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Details Top</label>
                    <div className="col-sm-8">

                    <textarea name="details_top" className="form-control"></textarea>

                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Details Bottom</label>
                    <div className="col-sm-8">

                    <textarea name="details_bottom" className="form-control">&lt;a href="https://1.envato.market/JakrN" target="_blank"&gt;&lt;img src="https://videoportal.viavilab.com/upload/ad-conent-one1.png" alt="banner_ads" title="Banner Ads"&gt;&lt;/a&gt;</textarea>

                    </div>
                  </div>

                  <hr />

                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Other Pages Top</label>
                    <div className="col-sm-8">

                    <textarea name="other_page_top" className="form-control">&lt;a href="https://1.envato.market/JakrN" target="_blank"&gt;&lt;img src="https://videoportal.viavilab.com/upload/ad-conent-one1.png" alt="banner_ads" title="Banner Ads"&gt;&lt;/a&gt;</textarea>

                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Other Pages Bottom</label>
                    <div className="col-sm-8">

                    <textarea name="other_page_bottom" className="form-control">&lt;a href="https://1.envato.market/JakrN" target="_blank"&gt;&lt;img src="https://videoportal.viavilab.com/upload/ad-conent-one1.png" alt="banner_ads" title="Banner Ads"&gt;&lt;/a&gt;</textarea>

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
