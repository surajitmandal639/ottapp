import React, { useEffect, useState } from 'react';
import { Link, router, useForm } from '@inertiajs/react';
import { showSuccessAlert } from '@/Components/SweetAlert';
import { Head } from '@inertiajs/react';
import Authenticated from '@/Layouts/Admin/AuthenticatedLayout';

export default function CreateOrEditSection({ auth, errors, section, videos }) {
    const { data, setData, processing, reset } = useForm({
        title: section?.title || "",
        video_ids: section?.videos.map(video => video.id) || [],
        status: section?.status || 1,
    });

    useEffect(() => {
        if (section) {
            setData('title', section.title);
            setData('video_ids', section.videos.map(video => video.id));
            setData('status', section.status);
        }
    }, [section]);

    const handleVideoChange = (values) => {
        setData('video_ids', values.map(v => v.id));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (section) {
            await router.post(route("sections.update", section.id), {
                ...data,
                _method: "PUT",
            }, {
                onSuccess: () => showSuccessAlert("Section updated successfully."),
            });
        } else {
            await router.post(route("sections.store"), data, {
                onSuccess: () => {
                    showSuccessAlert("Section created successfully.");
                    reset();
                },
            });
        }
    };

    return (
        <Authenticated user={auth.user}>
            <Head title={section ? "Edit Section" : "Add Section"} />
            <div className="card-box table-responsive">
                <div className="row">
                    <Link href="#" onClick={() => window.history.back()}>
                        <h4 className="header-title m-t-0 m-b-30 text-primary pull-left" style={{ fontSize: "20px" }}>
                            <i className="fa fa-arrow-left"></i> Back
                        </h4>
                    </Link>
                </div>
                <form onSubmit={handleSubmit} className="form-horizontal">
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Section Title <span className="text-danger">*</span></label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                name="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                            />
                            {errors.title && <span className="invalid-feedback">{errors.title}</span>}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Videos <span className="text-danger">*</span></label>
                        <div className="col-sm-8">
                            <select
                                name="video_ids[]"
                                options={videos}
                                value={videos.filter(video => data.video_ids.includes(video.id))} // Pass selected values
                                onChange={handleVideoChange}
                                className={`form-control ${errors.video_ids ? 'is-invalid' : ''}`}
                            />
                            {errors.video_ids && <span className="invalid-feedback">{errors.video_ids}</span>}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Status</label>
                        <div className="col-sm-8">
                            <select
                                className="form-control"
                                name="status"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                            >
                                <option value="1">Active</option>
                                <option value="2">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-8 offset-sm-3">
                            <button type="submit" className="btn btn-primary" disabled={processing}>
                                {section ? "Update Section" : "Create Section"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
}
