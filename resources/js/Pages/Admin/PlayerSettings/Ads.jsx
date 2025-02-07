import { Head, Link, router, useForm } from "@inertiajs/react";
import { showSuccessAlert } from "@/Components/SweetAlert";
import Authenticated from "@/Layouts/Admin/AuthenticatedLayout";
import { useState } from "react";

export default function Ads({ errors: propErrors, ad }) {
    const { errors: formErrors, setError, clearErrors, data: formData, setData } = useForm({
        vast_type: ad?.vast_type || 'URL',
        ad_video_local: null,
        ad_video_url: ad?.ad_video_url || '',
        custom_ad1_source: ad?.custom_ad1_source || '',
        custom_ad1_timestart: ad?.custom_ad1_timestart || '',
        custom_ad1_link: ad?.custom_ad1_link || '',
        custom_ad2_source: ad?.custom_ad2_source || '',
        custom_ad2_timestart: ad?.custom_ad2_timestart || '',
        custom_ad2_link: ad?.custom_ad2_link || '',
        custom_ad3_source: ad?.custom_ad3_source || '',
        custom_ad3_timestart: ad?.custom_ad3_timestart || '',
        custom_ad3_link: ad?.custom_ad3_link || '',
    });

    const errors = { ...propErrors, ...formErrors };
    const data = { ...ad, ...formData };
    const [videoPreview, setVideoPreview] = useState(null);

    const validateFields = (field, value) => {
        let valid = true;

        switch (field) {
            case 'vast_type':
                if (!['Local', 'URL'].includes(value)) {
                    setError("vast_type", "Source Type is required and must be either 'Local' or 'URL'!!");
                    valid = false;
                } else {
                    clearErrors("vast_type");
                }
                break;

            case 'ad_video_url':
                if (data.vast_type === 'URL' && (!value || !/^https?:\/\/.+/.test(value))) {
                    setError("ad_video_url", "Source URL is required and must be a valid URL!!");
                    valid = false;
                } else {
                    clearErrors("ad_video_url");
                }
                break;

            case 'ad_video_local':
                if(!ad?.ad_video_local){
                    if ((data.vast_type === 'Local' && !value)) {
                        setError("ad_video_local", "Source File is required for Local type!!");
                        valid = false;
                    } else {
                        clearErrors("ad_video_local");
                    }
                }else{
                    clearErrors("ad_video_local");
                }
                break;

            case 'custom_ad1_source':
            case 'custom_ad2_source':
            case 'custom_ad3_source':
                if (value && !/^https?:\/\/.+/.test(value)) {
                    setError(field, "Ad Source must be a valid URL!!");
                    valid = false;
                } else {
                    clearErrors(field);
                }
                break;

            case 'custom_ad1_timestart':
            case 'custom_ad2_timestart':
            case 'custom_ad3_timestart':
                if (value && !/^(\d{2}):(\d{2}):(\d{2})$/.test(value)) {
                    setError(field, "Timestart must be in HH:MM:SS format!!");
                    valid = false;
                } else {
                    clearErrors(field);
                }
                break;

            case 'custom_ad1_link':
            case 'custom_ad2_link':
            case 'custom_ad3_link':
                if (value && !/^https?:\/\/.+/.test(value)) {
                    setError(field, "Link must be a valid URL!!");
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

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'ad_video_local' && files.length > 0) {
            const file = files[0];
            setData(name, file);
            setVideoPreview(URL.createObjectURL(file)); // Set video preview
        } else {
            setData(name, value);
        }

        validateFields(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields
        const isValid = Object.keys(data).every(key => validateFields(key, data[key]));

        if (isValid) {
            const successMessage = ad ? "Ad settings updated successfully" : "Ad settings created successfully";

            await router.post(
                route('player-ad-settings.save', ad?.id),
                { ...data },
                {
                    onSuccess: () => {
                        showSuccessAlert(successMessage);
                    },
                }
            );
        }
    };

    return (
        <>
            <Authenticated>
                <Head title='Ad Settings' />
                <div className="card-box">

                    <form onSubmit={handleSubmit} acceptCharset="UTF-8" className="form-horizontal" name="ad_settings" id="ad_settings" role="form" encType="multipart/form-data">

                        <div className="row">

                            <div className="col-md-6">
                                <h4 className="m-t-0 m-b-30 header-title" style={{ fontSize: '20px' }}>VAST, VMAP and IMA / DFP Advertising</h4>
                                <br />
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label"></label>
                                    <div className="col-sm-8">
                                        <p>Currently support inline linear (pre-roll, mid-roll, post-roll, pods) and nonlinear ads. To add an VAST, VMAP or Google IMA URL path to the player to be played.</p>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Source Type</label>
                                    <div className="col-sm-8">
                                        <select className="form-control" name="vast_type" value={data.vast_type} onChange={handleChange}>
                                            <option value="Local">Local</option>
                                            <option value="URL">URL</option>
                                        </select>
                                        {errors.vast_type && <div className="text-danger">{errors.vast_type}</div>}
                                    </div>
                                </div>

                                {data.vast_type === 'Local' && (
                                    <>
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Source File</label>
                                            <div className="col-sm-8">
                                                <input
                                                    type="file"
                                                    name="ad_video_local"
                                                    onChange={handleChange}
                                                    className="form-control"
                                                />
                                                {errors.ad_video_local && <div className="text-danger">{errors.ad_video_local}</div>}
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label"></label>
                                            <div className="col-sm-8">
                                                {videoPreview ? (
                                                    <video controls className="img-thumbnail">
                                                        <source src={videoPreview} type="video/mp4" />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                ) : (
                                                    <video controls className="img-thumbnail">
                                                        <source src={`/storage/upload/videos/${ad?.ad_video_local}`} type="video/mp4" className="text-white"/>
                                                        Your browser does not support the video tag.
                                                    </video>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}

                                {data.vast_type === 'URL' && (
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Source URL</label>
                                        <div className="col-sm-8">
                                            <input type="text" name="ad_video_url" value={data.ad_video_url} onChange={handleChange} className="form-control" placeholder="http://example.com/demo.mp4" />
                                            {errors.ad_video_url && <div className="text-danger">{errors.ad_video_url}</div>}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="col-md-6">
                                <h4 className="m-t-0 m-b-30 header-title" style={{ fontSize: '20px' }}>Built-in Advertisement</h4>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label"></label>
                                    <div className="col-sm-8">
                                        <p><b>Source:</b> The ad source, it can be a mp4 video path, an image path, webpage URL or a youtube video url.</p><p>

                                        </p><p><b>Timestart :</b> The ad start time when it will appear in hours:minutes:seconds format.</p><p>

                                        </p><p><b>Link:</b> The link to open when the ad is clicked.</p><p>
                                        </p></div>
                                </div>
                                {[1, 2, 3].map(adNum => (
                                    <div key={adNum}>
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Ad{adNum} Source</label>
                                            <div className="col-sm-8">
                                                <div className="input-group">
                                                    <input type="text" name={`custom_ad${adNum}_source`} value={data[`custom_ad${adNum}_source`]} onChange={handleChange} className="form-control" />
                                                    {errors[`custom_ad${adNum}_source`] && <div className="text-danger">{errors[`custom_ad${adNum}_source`]}</div>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Ad{adNum} Timestart</label>
                                            <div className="col-sm-8">
                                                <input type="text" name={`custom_ad${adNum}_timestart`} value={data[`custom_ad${adNum}_timestart`]} onChange={handleChange} className="form-control" placeholder="00:00:00" />
                                                {errors[`custom_ad${adNum}_timestart`] && <div className="text-danger">{errors[`custom_ad${adNum}_timestart`]}</div>}
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Ad{adNum} Link</label>
                                            <div className="col-sm-8">
                                                <input type="text" name={`custom_ad${adNum}_link`} value={data[`custom_ad${adNum}_link`]} onChange={handleChange} className="form-control" />
                                                {errors[`custom_ad${adNum}_link`] && <div className="text-danger">{errors[`custom_ad${adNum}_link`]}</div>}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="form-group text-right m-b-0">
                            <div className="col-sm-offset-3 col-sm-9">
                                <button className="btn btn-primary waves-effect waves-light" type="submit">Save</button>
                                <Link href={route('admin.player-ad-settings')} className="btn btn-secondary waves-effect m-l-5">Cancel</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </Authenticated>
        </>
    );
}
