import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { showErrorAlert, showSuccessAlert } from '@/Components/SweetAlert';
import Authenticated from '@/Layouts/Admin/AuthenticatedLayout';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function Setting({ title, errors: propErrors, androidSetting }) {
    const { errors: formErrors, setError, clearErrors, data: formData, setData, processing } = useForm({
        app_name: androidSetting?.app_name || '',
        app_logo: null,
        app_email: androidSetting?.app_email || '',
        app_company: androidSetting?.app_company || '',
        app_website: androidSetting?.app_website || '',
        app_contact: androidSetting?.app_contact || '',
        app_version: androidSetting?.app_version || '',
        about_us: androidSetting?.about_us || '',
        privacy_policy: androidSetting?.privacy_policy || '',
        onesignal_app_id: androidSetting?.onesignal_app_id || '',
        onesignal_rest_key: androidSetting?.onesignal_rest_key || '',
        app_update_popup: androidSetting?.app_update_popup || false,
        app_update_version_code: androidSetting?.app_update_version_code || '',
        app_update_desc: androidSetting?.app_update_desc || '',
        app_update_link: androidSetting?.app_update_link || '',
        app_update_cancel_option: androidSetting?.app_update_cancel_option || false,
        terms_of_use: androidSetting?.terms_of_use || '',
    });

    const [showLoader, setShowLoader] = useState(false);
    const errors = { ...propErrors, ...formErrors };
    const data = { ...androidSetting, ...formData }

    const validateFields = async (field, value) => {
        let valid = true;
        
        const formattedField = field.replace('_', ' ').toUpperCase();
    
        switch (field) {
            case 'app_name':
                if (!value.trim()) {
                    setError(field, `${formattedField} is required.`);
                    valid = false;
                } else if (value.length > 255) {
                    setError(field, `${formattedField} must be less than 255 characters.`);
                    valid = false;
                }
                break;
    
            case 'app_logo':
                if (value && !['image/jpeg', 'image/png'].includes(value.type)) {
                    setError(field, `${formattedField} must be a JPEG or PNG image.`);
                    valid = false;
                } else if (value && value.size > 2048 * 1024) { // 2048KB = 2MB
                    setError(field, `${formattedField} must be less than 2MB.`);
                    valid = false;
                }
                break;
    
            case 'app_email':
                if (!value.trim()) {
                    setError(field, `${formattedField} is required.`);
                    valid = false;
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    setError(field, `${formattedField} must be a valid email.`);
                    valid = false;
                } else if (value.length > 255) {
                    setError(field, `${formattedField} must be less than 255 characters.`);
                    valid = false;
                }
                break;
    
            case 'app_company':
            case 'app_website':
            case 'app_contact':
            case 'app_version':
            case 'onesignal_app_id':
            case 'onesignal_rest_key':
                if (value.length > 255) {
                    setError(field, `${formattedField} must be less than 255 characters.`);
                    valid = false;
                }
                break;
    
            case 'app_update_popup':
               
            case 'app_update_version_code':
                if (value && isNaN(value)) {
                    setError(field, `${formattedField} must be a numeric value.`);
                    valid = false;
                }
                break;
    
            case 'app_website':
            case 'app_update_link':
                if (value && !/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(value)) {
                    setError(field, `${formattedField} must be a valid URL.`);
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
                await router.post(route('android-setting.save'), data, {
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

    console.log('Data : ', data);    

    return (
        <Authenticated isLoading={showLoader}>
            <Head title={title} />
            <div className="card-box">
                <form onSubmit={handleSubmit} className="form-horizontal">
                    <div  className="row">
                        <div  className="col-md-6"> 
                            <h4  className="m-t-0 m-b-30 header-title" style={{fontSize: '20px'}}>App Settings</h4>
                        
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">App Name <span className="text-danger"> *</span></label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        name="app_name"
                                        value={data.app_name}
                                        onChange={handleChange}
                                        className={`form-control ${errors.app_name ? 'is-invalid' : ''}`}
                                    />
                                    {errors.app_name && <div className="invalid-feedback">{errors.app_name}</div>}
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">App Logo <span className="text-danger"> *</span></label>
                                <div className="col-sm-8">
                                    <input
                                        className="form-control"
                                        type="file"
                                        name="app_logo"
                                        onChange={handleImageFileChange}
                                        required={!androidSetting?.app_logo}
                                    />
                                    {errors && errors.app_logo && (<span className="text-danger">{errors.app_logo}</span>)}
                                    <small className="form-text text-muted">(Recommended resolution: 180x50)</small>
                                </div>
                            </div>

                            {data.app_logo && (
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">&nbsp;</label>
                                    <div className="col-sm-8">
                                        <img
                                            style={{width: '160px'}}
                                            className="img-thumbnail"
                                            src={URL.createObjectURL(data.app_logo)}
                                            alt="Site Logo"
                                        />
                                    </div>
                                </div>
                            )}

                            {androidSetting?.app_logo && (
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">&nbsp;</label>
                                    <div className="col-sm-8">
                                        <img
                                            style={{width: '110px'}}
                                            className="img-thumbnail"
                                            src={`/storage/upload/images/android_setting/${androidSetting.app_logo}`}
                                            alt="video thumb"
                                        />
                                    </div>
                                </div>
                            )}       

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">App Email <span className="text-danger"> *</span></label>
                                <div className="col-sm-8">
                                    <input
                                        type="email"
                                        name="app_email"
                                        value={data.app_email}
                                        onChange={handleChange}
                                        className={`form-control ${errors.app_email ? 'is-invalid' : ''}`}
                                    />
                                    {errors.app_email && <div className="invalid-feedback">{errors.app_email}</div>}
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">App Company</label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        name="app_company"
                                        value={data.app_company}
                                        onChange={handleChange}
                                        className={`form-control ${errors.app_company ? 'is-invalid' : ''}`}
                                    />
                                    {errors.app_company && <div className="invalid-feedback">{errors.app_company}</div>}
                                </div>
                            </div>  
                            
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">App Website</label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        name="app_website"
                                        value={data.app_website}
                                        onChange={handleChange}
                                        className={`form-control ${errors.app_website ? 'is-invalid' : ''}`}
                                    />
                                    {errors.app_website && <div className="invalid-feedback">{errors.app_website}</div>}
                                </div>
                            </div>  
                            
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">App Contact</label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        name="app_contact"
                                        value={data.app_contact}
                                        onChange={handleChange}
                                        className={`form-control ${errors.app_contact ? 'is-invalid' : ''}`}
                                    />
                                    {errors.app_contact && <div className="invalid-feedback">{errors.app_contact}</div>}
                                </div>
                            </div>  

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">App Version</label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        name="app_version"
                                        value={data.app_version}
                                        onChange={handleChange}
                                        className={`form-control ${errors.app_version ? 'is-invalid' : ''}`}
                                    />
                                    {errors.app_version && <div className="invalid-feedback">{errors.app_version}</div>}
                                </div>
                            </div>  
                            
                            <hr />    
                            
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">About Us</label>
                                <div className="col-sm-8">
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={data.about_us}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setData("about_us", data);
                                        }}
                                    />
                                    {errors && errors.about_us && (<span className="text-danger">{errors.about_us}</span>)}
                                </div>
                            </div>
                        
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Privacy Policy</label>
                                <div className="col-sm-8">
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={data.privacy_policy}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setData("privacy_policy", data);
                                        }}
                                    />
                                    {errors && errors.privacy_policy && (<span className="text-danger">{errors.description}</span>)}
                                </div>
                            </div>
                        </div>
                        
                        <div  className="col-md-6">
                            <h4  className="m-t-0 m-b-30 header-title" style={{fontSize: '20px' }}>OneSignal Settings</h4>
                           
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">OneSignal App ID</label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        name="onesignal_app_id"
                                        value={data.onesignal_app_id}
                                        onChange={handleChange}
                                        className={`form-control ${errors.onesignal_app_id ? 'is-invalid' : ''}`}
                                    />
                                    {errors.onesignal_app_id && <div className="invalid-feedback">{errors.onesignal_app_id}</div>}
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Onesignal Rest Key</label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        name="onesignal_rest_key"
                                        value={data.onesignal_rest_key}
                                        onChange={handleChange}
                                        className={`form-control ${errors.onesignal_rest_key ? 'is-invalid' : ''}`}
                                    />
                                    {errors.onesignal_rest_key && <div className="invalid-feedback">{errors.onesignal_rest_key}</div>}
                                </div>
                            </div>
                            
                            <hr />
                    
                            <h4  className="m-t-0 m-b-30 header-title" style={{fontSize: '20px'}}>App Update</h4>
                            
                            <div  className="form-group row">
                                <label  className="col-sm-3 col-form-label">App Update Popup</label>
                                <div  className="col-sm-8">
                                    <select
                                        className="form-control"
                                        name="app_update_popup"
                                        value={data.app_update_popup}
                                        onChange={(e) =>
                                            setData("app_update_popup", e.target.value)
                                        }
                                    >
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">New App Version Code</label>
                                <div className="col-sm-8">
                                    <input
                                        type="number"
                                        name="app_update_version_code"
                                        value={data.app_update_version_code}
                                        onChange={handleChange}
                                        className={`form-control ${errors.app_update_version_code ? 'is-invalid' : ''}`}
                                        min="1"
                                    />
                                    {errors.app_update_version_code && <div className="invalid-feedback">{errors.app_update_version_code}</div>}
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Description</label>
                                <div className="col-sm-8">
                                <textarea
                                    name="app_update_desc"
                                    value={data.app_update_desc}
                                    onChange={handleChange}
                                    className="form-control"
                                    cols="30"
                                    rows="4"
                                    placeholder="Your Description..."
                                ></textarea>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">App Link</label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        name="app_update_link"
                                        value={data.app_update_link}
                                        onChange={handleChange}
                                        className={`form-control ${errors.app_update_link ? 'is-invalid' : ''}`}
                                    />
                                    {errors.app_update_link && <div className="invalid-feedback">{errors.app_update_link}</div>}
                                </div>
                            </div>
                            
                            <div  className="form-group row">
                                <label  className="col-sm-3 col-form-label">Cancel Option</label>
                                <div  className="col-sm-8">
                                    <select
                                        className={`form-control ${errors.app_update_cancel_option ? 'is-invalid' : ''}`}
                                        name="app_update_cancel_option"
                                        value={data.app_update_cancel_option}
                                        onChange={(e) =>
                                            setData("app_update_cancel_option", e.target.value)
                                        }
                                    >
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                    {/* {errors.app_update_cancel_option && <div className="invalid-feedback">{errors.app_update_cancel_option}</div>} */}

                                </div>
                            </div>
                            
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Terms Of Use</label>
                                <div className="col-sm-8">
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={data.terms_of_use}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setData("terms_of_use", data);
                                        }}
                                    />
                                    {errors && errors.terms_of_use && (<span className="text-danger">{errors.terms_of_use}</span>)}
                                </div>
                            </div>
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
