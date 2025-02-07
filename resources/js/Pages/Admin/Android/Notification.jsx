import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { showErrorAlert, showSuccessAlert } from '@/Components/SweetAlert';
import Authenticated from '@/Layouts/Admin/AuthenticatedLayout';
import MySelect from '@/Components/MySelect'; // Assuming MySelect is a custom select component

export default function AdCreate({ title, errors:propErrors, videos }) {
    const { errors: formErrors, setError, clearErrors, data, setData, processing, reset } = useForm({
        title: '',
        message: '',
        image: null,
        video_id: '',
        external_link: ''
    });

    const [showLoader, setShowLoader] = useState(false);
    const errors = { ...propErrors, ...formErrors };

    // Validation function
    const validateFields = (field, value) => {
        let valid = true;
        const formattedField = field.replace('_', ' ').charAt(0).toUpperCase() + field.replace('_', ' ').slice(1);

        switch (field) {
            case 'title':
            case 'message':
                if (!value.trim()) {
                    setError(field, `${formattedField} is required.`);
                    valid = false;
                } else if (value.length > 255) {
                    setError(field, `${formattedField} must be less than 255 characters.`);
                    valid = false;
                } else {
                    clearErrors(field);
                }
                break;

            case 'image':
                if (value && !['image/jpeg', 'image/png'].includes(value.type)) {
                    setError(field, 'Only JPEG and PNG files are allowed.');
                    valid = false;
                } else {
                    clearErrors(field);
                }
                break;

            case 'video_id':
                if (!value) {
                    setError(field, 'A video must be selected if you choose this option.');
                    valid = false;
                } else {
                    clearErrors(field);
                }
                break;

            case 'external_link':
                const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
                if (value && !urlPattern.test(value)) {
                    setError(field, 'Please provide a valid URL.');
                    valid = false;
                } else {
                    clearErrors(field);
                }
                break;

            default:
                break;
        }

        return valid;
    };

    // Handle text input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
        validateFields(name, value);
    };

    // Handle image file change
    const handleImageFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];

        if (file && !['image/jpeg', 'image/png'].includes(file.type)) {
            setError(name, 'Only JPEG and PNG files are allowed.');
        } else {
            clearErrors(name);
        }
        setData(name, file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = Object.keys(data).every((key) => validateFields(key, data[key]));

        // if (isValid) {
        //     setShowLoader(true);
        //     try {
        //         await router.post(route('android-ad.save', androidAd?.id), data, {
        //             onSuccess: () => {
        //                 setShowLoader(false);
        //                 showSuccessAlert(`Ad settings ${androidAd?.id ? 'updated' : 'created'} successfully.`);
        //             },
        //             onError: () => {
        //                 setShowLoader(false);
        //                 showErrorAlert('An error occurred while submitting the form.');
        //             }
        //         });
        //     } catch (error) {
        //         setShowLoader(false);
        //         showErrorAlert('An error occurred while submitting the form.');
        //     }
        // }
    };
console.log(errors.message);

    return (
        <Authenticated isLoading={showLoader}>
            <Head title={title} />
            <div className="card-box">
                <form onSubmit={handleSubmit} className="form-horizontal">
                    {/* Title */}
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Title <span className="text-danger">*</span></label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                name="title"
                                value={data.title}
                                onChange={handleChange}
                                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                            />
                            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                        </div>
                    </div>

                    {/* Message */}
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Message <span className="text-danger">*</span></label>
                        <div className="col-sm-8">
                            <textarea
                                name="message"
                                value={data.message}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Your Description..."
                                className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                            ></textarea>
                            {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                        </div>
                    </div>

                    {/* Image */}
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Image </label>
                        <div className="col-sm-8">
                            <input
                                type="file"
                                name="image"
                                onChange={handleImageFileChange}
                                className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                            />
                            {errors.image && (<div className="text-danger">{errors.image}</div>)}
                            <small className="form-text text-muted">(Recommended resolution: 600x293 to 750x366)</small>
                        </div>
                    </div>

                    {/* Display image if selected */}
                    {data.image && (
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">&nbsp;</label>
                            <div className="col-sm-8">
                                <img
                                    style={{ width: '160px' }}
                                    className="img-thumbnail"
                                    src={URL.createObjectURL(data.image)}
                                    alt="Ad logo preview"
                                />
                            </div>
                        </div>
                    )}

                    {/* Display existing image
                    {androidSetting?.image && (
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">&nbsp;</label>
                            <div className="col-sm-8">
                                <img
                                    style={{ width: '110px' }}
                                    className="img-thumbnail"
                                    src={`/storage/upload/images/android_setting/${androidSetting.image}`}
                                    alt="Existing Ad Logo"
                                />
                            </div>
                        </div>
                    )} */}

                    <h4 className="m-t-0 m-b-30 header-title" style={{ fontSize: '18px' }}>OR</h4>

                    {/* Video Selector */}
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Videos <small className="form-text text-muted">(Optional)</small></label>
                        <div className="col-sm-8">
                            <MySelect
                                name="video_id"
                                options={videos.map((video) => ({
                                    value: video.id,
                                    label: video.name,
                                }))}
                                value={data.video_id ? {
                                    value: data.video_id,
                                    label: videos.find(v => v.id === data.video_id)?.name
                                } : null}
                                onChange={(selected) => setData('video_id', selected.value)}
                                placeholder="Select a video"
                                isClearable={false}
                                isSearchable={true}
                                className={`${errors.video_id ? 'is-invalid' : ''}`}
                            />
                            {errors.video_id && (<div className="invalid-feedback">{errors.video_id}</div>)}
                            <small className="form-text text-muted">(To directly open single video when clicked)</small>
                        </div>
                    </div>

                    <h4 className="m-t-0 m-b-30 header-title" style={{ fontSize: '18px' }}>OR</h4>

                    {/* External Link */}
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">External Link <small className="form-text text-muted">(Optional)</small></label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                name="external_link"
                                placeholder="https://example.com"
                                value={data.external_link}
                                onChange={handleChange}
                                className={`form-control ${errors.external_link ? 'is-invalid' : ''}`}
                            />
                            {errors.external_link && <div className="invalid-feedback">{errors.external_link}</div>}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="form-group row">
                        <div className="col-sm-8 offset-sm-3">
                            <button type="submit" className="btn btn-primary" disabled={processing}>
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
}
