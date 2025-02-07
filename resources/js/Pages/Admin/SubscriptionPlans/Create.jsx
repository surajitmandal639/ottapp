import React, { useEffect } from "react";
import { router, useForm, Head, Link  } from "@inertiajs/react";
import { showSuccessAlert } from "@/Components/SweetAlert";
import Authenticated from "@/Layouts/Admin/AuthenticatedLayout";

export default function Create({ auth, errors, subscription_plan }) {
    const { data, setData, processing, reset } = useForm({
        name: subscription_plan?.name || "",
        duration: subscription_plan?.duration || "",
        duration_type: subscription_plan?.duration_type || "",
        price: subscription_plan?.price || "",
        device_limit: subscription_plan?.device_limit || "",
        ads: subscription_plan?.ads || 1,
        status: subscription_plan?.status || 1,
    });

    useEffect(() => {
        if (subscription_plan) {
            setData({
                name: subscription_plan?.name || "",
                duration: subscription_plan?.duration || "",
                duration_type: subscription_plan?.duration_type || "",
                price: subscription_plan?.price || "",
                device_limit: subscription_plan?.device_limit || "",
                ads: subscription_plan?.ads || "",
                status: subscription_plan?.status || 1,
            });
        }
    }, [subscription_plan]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (subscription_plan) {
            await router.post(
                route("subscription-plans.update", subscription_plan.id),
                {
                    ...data,
                    _method: "PUT",
                },
                {
                    onSuccess: () => {
                        showSuccessAlert("Plan updated successfully.");
                    },
                }
            );
        } else {
            await router.post(route("subscription-plans.store"), data, {
                onSuccess: () => {
                    showSuccessAlert("Plan created successfully.");
                    reset();
                },
            });
        }
    };

    return (
        <Authenticated user={auth.user}>
            <Head title={subscription_plan ? "Edit Plan" : "Add Plan"} />
            <div className="card-box table-responsive">
                <nav aria-label="breadcrumb ">
                    <ol className="breadcrumb text-primary" style={{justifyContent: 'flex-end'}}>
                        <li className="breadcrumb-item"><Link href={route('admin.dashboard')}>Dashboard</Link></li>
                        <li className="breadcrumb-item"><Link href={route('admin.subscription-plans.index')}>Subscription Plans</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Add Plan</li>
                    </ol>
                </nav>

                <form onSubmit={handleSubmit} className="form-horizontal" autoCapitalize="off">
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">
                            Name <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="form-control"
                                required
                            />
                            {errors.name && (
                                <span className="text-danger">
                                    {errors.name}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">
                            Duration <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-8">
                            <div className="row">
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        name="duration"
                                        value={data.duration}
                                        onChange={(e) =>
                                            setData("duration", e.target.value)
                                        }
                                        className="form-control"
                                        required
                                    />
                                    {errors.duration && (
                                        <span className="text-danger">
                                            {errors.duration}
                                        </span>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <select
                                        className="form-control"
                                        name="duration_type"
                                        value={data.duration_type}
                                        onChange={(e) =>
                                            setData(
                                                "duration_type",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="1">Days</option>
                                        <option value="7">Weeks</option>
                                        <option value="30">Months</option>
                                        <option value="365">Year</option>
                                    </select>
                                    {errors.duration_type && (
                                        <span className="text-danger">
                                            {errors.duration_type}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">
                            Price <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-8">
                            <input
                                type="number"
                                name="price"
                                min={0}
                                value={data.price}
                                onChange={(e) =>
                                    setData("price", e.target.value)
                                }
                                className="form-control"
                                required
                            />
                            {errors.price && (
                                <span className="text-danger">
                                    {errors.price}
                                </span>
                            )}
                            {/* <small className="form-text text-muted mb-2">The minimum amount for processing a transaction through Stripe in USD is $0.50. For more info <Link href="#" target="_blank" className="text-info">click here</Link></small> */}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">
                            Device Limit <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-8">
                            <input
                                type="number"
                                name="device_limit"
                                min={1}
                                value={data.device_limit}
                                onChange={(e) =>
                                    setData("device_limit", e.target.value)
                                }
                                className="form-control"
                                required
                            />
                            {errors.device_limit && (
                                <span className="text-danger">
                                    {errors.device_limit}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">
                            Ads
                        </label>
                        <div className="col-sm-8">
                            <select
                                className="form-control"
                                name="ads"
                                value={data.ads}
                                onChange={(e) =>
                                    setData("ads", e.target.value)
                                }
                            >
                                <option value="1">On</option>
                                <option value="2">Off</option>
                            </select>
                            {errors.ads && (
                                <span className="text-danger">
                                    {errors.ads}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">
                            Status
                        </label>
                        <div className="col-sm-8">
                            <select
                                className="form-control"
                                name="status"
                                value={data.status}
                                onChange={(e) =>
                                    setData("status", e.target.value)
                                }
                            >
                                <option value="1">Active</option>
                                <option value="2">Inactive</option>
                            </select>
                            {errors.status && (
                                <span className="text-danger">
                                    {errors.status}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-8 offset-sm-3">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={processing}
                            >
                                {subscription_plan ? "Update" : "Create"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
}
