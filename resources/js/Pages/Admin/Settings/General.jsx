import { Head, Link, router, useForm } from "@inertiajs/react";
import { showSuccessAlert } from "@/Components/SweetAlert";
import Authenticated from "@/Layouts/Admin/AuthenticatedLayout";
import { useState } from "react";
import MySelect from "@/Components/MySelect";

export default function General({ errors: propErrors, generalSetting, timeZones, languages, currencies }) {
    const { errors: formErrors, setError, clearErrors, data: formData, setData } = useForm({
        ...generalSetting,
        description: generalSetting?.description || '',
        keywords: generalSetting?.keywords || '',
        header_code: generalSetting?.header_code || '',
        footer_code: generalSetting?.footer_code || '',
        copyright_text: generalSetting?.copyright_text || '',
        logo: null,
        favicon: null,
    });

    const errors = { ...propErrors, ...formErrors };
    const data = { ...generalSetting, ...formData };
    const [logoPreview, setLogoPreview] = useState(null);
    const [faviconPreview, setFaviconPreview] = useState(null);

    const validateFields = (field, value) => {
        let valid = true;

        switch (field) {
            // Validate files
            case 'logo':
            case 'favicon':
                if (!value && (!generalSetting.logo && !generalSetting.favicon)) {
                    setError(field, "File is required.");
                    valid = false;
                    break;
                }

                if (value instanceof File) {
                    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
                    const maxSize = 5 * 1024 * 1024; // 5 MB
                    const invalidChars = /[<>:"/\\|?*]/;
                    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

                    if (!allowedTypes.includes(value.type)) {
                        setError(field, "Invalid file type. Only JPEG, PNG, and GIF are allowed.");
                        valid = false;
                    }

                    if (value.size > maxSize) {
                        setError(field, "File size exceeds 5 MB.");
                        valid = false;
                    }

                    const fileName = value.name;
                    if (invalidChars.test(fileName)) {
                        setError(field, "File name contains invalid characters.");
                        valid = false;
                    }

                    const fileExtension = fileName.split('.').pop().toLowerCase();
                    if (!allowedExtensions.includes(fileExtension)) {
                        setError(field, "Invalid file extension. Only JPG, JPEG, PNG, and GIF are allowed.");
                        valid = false;
                    }
                }
                break;

                case 'email':
                    const emailRegex = /\S+@\S+\.\S+/;
                    if (!emailRegex.test(value)) {
                        setError(field, "Invalid email format.");
                        valid = false;
                    }
                    break;

                case 'name':
                    if (!value.trim()) {
                        setError(field, "Name is required.");
                        valid = false;
                    }
                    break;

                case 'description':
                case 'keywords':
                    if (value.length > 500) { // Example length constraint
                        setError(field, "Text is too long. Maximum length is 500 characters.");
                        valid = false;
                    }
                    break;

                case 'facebook_url':
                case 'twitter_url':
                case 'instagram_url':
                case 'google_play_url':
                case 'apple_store_url':
                    if (value) {
                        const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ;,./?%&=]*)?$/;
                        if (!urlRegex.test(value)) {
                            setError(field, "Invalid URL format.");
                            valid = false;
                        }
                    }
                    break;

            default:
                break;
        }

        // Clear error if validation passes
        if (valid) {
            clearErrors(field, null); // Clear error for the specific field
        }

        return valid;
    };


    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0]; // Get the first file if multiple files are allowed

        if (file) {
            // Validate the file
            if (validateFields(name, file)) {
                // Update state if validation passes
                setData(prevData => ({ ...prevData, [name]: file }));

                // Set preview for the file if needed
                if (name === 'logo') {
                    setLogoPreview(URL.createObjectURL(file)); // Set logo preview
                } else if (name === 'favicon') {
                    setFaviconPreview(URL.createObjectURL(file)); // Set favicon preview
                }
            }
        }
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }));
        validateFields(name, value);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields
        const isValid = Object.keys(data).every(key => validateFields(key, data[key]));
        console.log(101, isValid);

        if (isValid) {
            const successMessage = generalSetting ? "General settings updated successfully" : "General settings created successfully";

            await router.post(
                route('general-settings.save'),
                { ...data },
                {
                    onSuccess: () => {
                        showSuccessAlert(successMessage);
                    },
                }
            );
        }
    };

    console.log('DATA : ', data);


    return (
        <>
            <Authenticated>
                <Head title="General Settings" />
                <div className="card-box">

                    <form onSubmit={handleSubmit} acceptCharset="UTF-8" className="form-horizontal" name="settings_form" id="settings_form" role="form" encType="multipart/form-data">
                        <div className="row">
                            <div className="col-md-6">


                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Site Name</label>
                                        <div className="col-sm-8">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            onChange={handleChange}
                                            />
                                            {errors && errors?.name && (<span className="text-danger">{errors?.name}</span>)}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Site Logo</label>
                                        <div className="col-sm-8">
                                            <input
                                                className="form-control"
                                                type="file"
                                                name="logo"
                                                onChange={handleFileChange}
                                            />
                                            {errors.logo && <div className="text-danger">{errors.logo}</div>}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label"></label>
                                        <div className="col-sm-8">
                                            {logoPreview ? (
                                                <img className="img-thumbnail" src={logoPreview} alt="site logo" srcSet="" />
                                            ) : (
                                                <img className="img-thumbnail" src={`/storage/upload/images/general_ettings/${generalSetting?.logo}`} alt="site logo" srcSet="" />
                                            )}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Site Favicon</label>
                                        <div className="col-sm-8">
                                            <input
                                                className="form-control"
                                                type="file"
                                                name="favicon"
                                                onChange={handleFileChange}
                                            />
                                            {errors.favicon && <div className="text-danger">{errors.favicon}</div>}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label"></label>
                                        <div className="col-sm-8">
                                            {faviconPreview ? (
                                                <img className="img-thumbnail" src={faviconPreview} alt="site logo" srcSet="" />
                                            ) : (
                                                <img className="img-thumbnail" src={`/storage/upload/images/general_ettings/${generalSetting?.favicon}`} alt="site favicon" srcSet="" />
                                            )}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Email</label>
                                        <div className="col-sm-8">
                                            <input
                                                className="form-control"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                onChange={handleChange}
                                                required
                                            />
                                            {errors && errors?.email && (<span className="text-danger">{errors?.email}</span>)}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Description</label>
                                        <div className="col-sm-8">
                                            <textarea
                                                className="form-control"
                                                name="description"
                                                value={data.description} // use value here
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Site Keywords</label>
                                        <div className="col-sm-8">
                                            <textarea
                                                name="keywords"
                                                className="form-control"
                                                value={data.keywords} // use value here
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        {/* Empty div can be removed if not needed */}
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Header Code</label>
                                        <div className="col-sm-8">
                                            <textarea
                                                className="form-control"
                                                name="header_code"
                                                value={data.header_code} // use value here
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Footer Code</label>
                                        <div className="col-sm-8">
                                            <textarea
                                                className="form-control"
                                                name="footer_code"
                                                value={data.footer_code} // use value here
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Copyright Text</label>
                                        <div className="col-sm-8">
                                            <textarea
                                                className="form-control"
                                                name="copyright_text"
                                                value={data.copyright_text}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>


                            </div>

                            <div className="col-md-6">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Default Timezone</label>
                                    <div className="col-sm-8">
                                        <MySelect
                                            name="default_timezone"
                                            options={Object.keys(timeZones).map((key) => ({
                                                value: key,
                                                label: timeZones[key],
                                            }))}
                                            value={data.default_timezone ? {
                                                value: data.default_timezone,
                                                label: timeZones[data.default_timezone]
                                            } : null}
                                            onChange={(selected) => setData('default_timezone', selected.value)}
                                            placeholder="Select a timezone"
                                            isClearable={false}
                                            isSearchable={true}
                                            className={`${errors.default_timezone ? 'is-invalid' : ''}`}
                                            
                                        />
                                        {errors && errors.default_timezone && (
                                            <span className="invalid-feedback">{errors.default_timezone}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Default Language</label>
                                    <div className="col-sm-8">
                                        <MySelect
                                            name="default_language"
                                            options={Object.keys(languages).map((key) => ({
                                                value: key,
                                                label: `${languages[key].isoName} (${languages[key].nativeName})`,
                                            }))}
                                            value={data.default_language ? {
                                                value: data.default_language,
                                                label: `${languages[data.default_language].isoName} (${languages[data.default_language].nativeName})`
                                            } : null}
                                            onChange={(selected) => setData('default_language', selected.value)}
                                            placeholder="Select a language"
                                            isClearable={false}
                                            isSearchable={true}
                                            className={`${errors.default_language ? 'is-invalid' : ''}`}
                                        />
                                        {errors && errors.default_language && (
                                            <span className="invalid-feedback">{errors.default_language}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Site Styling</label>
                                    <div className="col-sm-8">
                                        <MySelect
                                            className={`${errors.styling ? 'is-invalid' : ''}`}
                                            name="styling"
                                            options={[
                                                { value: 'style-one', label: 'Style 1' },
                                                { value: 'style-two', label: 'Style 2' },
                                                { value: 'style-three', label: 'Style 3' },
                                                { value: 'style-four', label: 'Style 4' },
                                                { value: 'style-five', label: 'Style 5' },
                                                { value: 'style-six', label: 'Style 6' },
                                            ]}
                                            value={data.styling ? {
                                                value: data.styling,
                                                label: `Style ${data.styling.split('-')[1]}`,
                                            } : null}
                                            onChange={(selectedOption) => setData('styling', selectedOption.value)}
                                            isClearable={false}
                                            isSearchable={false}
                                        />
                                        {errors.styling && (
                                            <span className="invalid-feedback">{errors.styling}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Currency Code* </label>
                                    <div className="col-sm-8">
                                        <MySelect
                                            name="currency_code"
                                            options={currencies.map((currency) => ({
                                                value: currency.alphabetic_code, // or use currency for more details
                                                label: `${currency.alphabetic_code} (${currency.name})`, // format label as needed
                                            }))}
                                            value={data.currency_code ? {
                                                value: data.currency_code, // match currency.code with the selected value
                                                label: `${currencies.find(c => c.alphabetic_code == data.currency_code)?.alphabetic_code} (${currencies.find(c => c.alphabetic_code === data.currency_code)?.name})`
                                            } : null}
                                            onChange={(selected) => setData('currency_code', selected.value)}
                                            placeholder="Select a currency"
                                            isClearable={false}
                                            isSearchable={true}
                                            className={`${errors.currency_code ? 'is-invalid' : ''}`}
                                        />

                                        {errors && errors.currency_code && (
                                            <span className="invalid-feedback">{errors.currency_code}</span>
                                        )}

                                    </div>
                                </div>
                                <hr />
                                <h4 className="m-t-0 header-title" id="tmdbapi_id">TMDB API</h4>
                                <br />
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">API Read Access Token</label>
                                    <div className="col-sm-8">
                                        <textarea
                                            className="form-control"
                                            name="tmdb_api_key"
                                            value={data.tmdb_api_key}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>


                                <hr />
                                <h4 className="m-t-0 header-title">Footer Icon
                                <small className="form-text text-muted pt-1">Leave empty if you don't want to display the social icon.</small>
                                </h4>

                                <br />
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Facebook URL</label>
                                    <div className="col-sm-8">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="facebook_url"
                                            value={data.facebook_url}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Twitter URL</label>
                                    <div className="col-sm-8">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="twitter_url"
                                            value={data.twitter_url}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Instagram URL</label>
                                    <div className="col-sm-8">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="instagram_url"
                                            value={data.instagram_url}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <hr />
                                <h4 className="m-t-0 header-title">Apps <small className="form-text text-muted pt-1">Leave empty if you don't want to display the app download button.</small></h4>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Google Play URL</label>
                                    <div className="col-sm-8">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="google_play_url"
                                            value={data.google_play_url}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Apple Store URL</label>
                                    <div className="col-sm-8">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="apple_store_url"
                                            value={data.apple_store_url}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>


                            </div>
                        </div>


                        <hr />
                        <h4 className="m-t-0 mb-4 header-title">GDPR Cookie Consent</h4>

                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">GDPR Cookie Consent </label>
                                <div className="col-sm-8">
                                    <select
                                        className="form-control"
                                        name="gdpr_cookie_consent"
                                        value={data.gdpr_cookie_consent}
                                        onChange={(e) => setData('gdpr_cookie_consent', e.target.value)}
                                    >

                                        <option value="1">Active</option>
                                        <option value="2">Inactive</option>
                                    </select>
                                </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">GDPR Consent Title</label>
                            <div className="col-sm-8">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="gdpr_consent_title"
                                    value={data.gdpr_consent_title}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">GDPR Consent Text</label>
                            <div className="col-sm-8">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="gdpr_consent_text"
                                    value={data.gdpr_consent_text}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">GDPR Privacy URL</label>
                            <div className="col-sm-8">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="gdpr_privacy_url"
                                    value={data.gdpr_privacy_url}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <hr />
                        <h4 className="m-t-0 mb-4 header-title">Envato Buyer Details</h4>

                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Envato Username</label>
                            <div className="col-sm-8">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="envato_username"
                                    value={data.envato_username}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Buyer Purchase Code</label>
                            <div className="col-sm-8">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="buyer_purchase_code"
                                    value={data.buyer_purchase_code}
                                    onChange={handleChange}
                                />
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
        </>
    );
}


