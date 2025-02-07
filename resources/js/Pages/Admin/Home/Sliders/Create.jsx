import React, { useEffect, useState } from "react";
import { router, useForm } from "@inertiajs/react";
import { showSuccessAlert } from "@/Components/SweetAlert";
import { Head, Link } from "@inertiajs/react";
import Authenticated from "@/Layouts/Admin/AuthenticatedLayout";

export default function Create ({ auth, errors, slider }) {
    const { data, setData, processing, reset } = useForm({
        title: slider?.title || "",
        image: null,
        status: slider?.status || 1,
    });

    const [imagePreview, setImagePreview] = useState(slider?.image_url || null);

    useEffect(() => {
        if (slider?.image_url) {
            setImagePreview(slider.image_url);
        }
    }, [slider]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData("image", file);

        const filePreview = URL.createObjectURL(file);
        setImagePreview(filePreview);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (slider) {
            await router.post(route("sliders.update", slider.id), {
                ...data,
                _method: "PUT",
            }, {
                onSuccess: () => showSuccessAlert("Slider updated successfully."),
            });
        } else {
            await router.post(route("sliders.store"), data, {
                onSuccess: () => {
                    showSuccessAlert("Slider created successfully.");
                    reset();
                    setImagePreview(null);
                },
            });
        }
    };

    return (
        <Authenticated user={auth.user}>
            <Head title={slider ? "Edit Slider" : "Add Slider"} />
            <div className="card-box table-responsive">
                <div className="row">
                    <Link href="#" onClick={() => window.history.back()}>
                        <h4 className="header-title m-t-0 m-b-30 text-primary pull-left" style={{ fontSize: "20px" }}>
                            <i className="fa fa-arrow-left"></i> Back
                        </h4>
                    </Link>
                </div>
                <form onSubmit={handleSubmit} className="form-horizontal" encType="multipart/form-data">
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Slider Title <span className="text-danger">*</span></label>
                        <div className="col-sm-8">
                            <input type="text" name="title" value={data.title} onChange={(e) => setData('title', e.target.value)}
                                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                            />
                            {errors && errors.title && <span className="invalid-feedback">{errors.title}</span>}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Slider Image <span className="text-danger">*</span></label>
                        <div className="col-sm-8">
                            <input type="file" name="image" onChange={handleFileChange}
                             className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                            />
                            {errors && errors.image && <span className="invalid-feedback">{errors.image}</span>}
                            <small className="form-text text-muted">(Recommended resolution: 1100x450)</small>

                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="offset-sm-3"></label>
                        <div className="col-sm-8">
                            {imagePreview && ( <img src={imagePreview} alt="Preview" className="img-thumbnail mr-1" style={{ width: "180px" }} /> )}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Status</label>
                        <div className="col-sm-8">
                            <select className="form-control" name="status" value={data.status} onChange={(e) => setData('status', e.target.value)}>
                                <option value="1">Active</option>
                                <option value="2">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-8 offset-sm-3">
                            <button type="submit" className="btn btn-primary" disabled={processing}>
                                {slider ? "Update Slider" : "Create Slider"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
};
