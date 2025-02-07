import React, { useEffect, useState } from "react";
import { router, useForm, Head, Link } from "@inertiajs/react";
import { showSuccessAlert } from "@/Components/SweetAlert";
import Authenticated from "@/Layouts/Admin/AuthenticatedLayout";

export default function Create({ auth, errors, user, subscription_plans, roles }) {

    const { data, setData, processing, reset } = useForm({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        password: user?.password || "",
        avatar: null,
        subscription_plan: user?.subscriptionPlan?.[0].id || "",
        user_expiry_date: user?.user_expiry_date || "",
        status: user?.status || 1,
        roles: user?.roles?.map((role) => ({ id: role.id, name: role.name })) || [],
    });

    const [imagePreview, setImagePreview] = useState(user?.image_url || null);

    useEffect(() => {
        if (user?.image_url) {
            setImagePreview(user.image_url);
        }
    }, [user]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData("avatar", file);

        const filePreview = URL.createObjectURL(file);
        setImagePreview(filePreview);
    };

    useEffect(() => {
        if (user) {
            setData({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                password: user?.password || "",
                subscription_plan: user?.subscriptionPlan?.[0].id || "",
                user_expiry_date: user.user_expiry_date || "",
                status: user.status || 1,
                roles: user?.roles?.map((role) => ({ id: role.id, name: role.name })) || [],
            });
        }
    }, [user]);

    const handleRolesChange = (selectedRoles) => {
        setData(
            "roles",
            selectedRoles.map((role) => role.id)
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user) {
            await router.post(
                route("users.update", user.id),
                {
                    ...data,
                    _method: "PUT",
                },
                {
                    onSuccess: () =>
                        showSuccessAlert("User updated successfully."),
                }
            );
        } else {
            await router.post(route("users.store"), data, {
                onSuccess: () => {
                    showSuccessAlert("User created successfully.");
                    reset();
                },
            });
        }
    };

    // console.log(data.roles);

    return (
        <Authenticated user={auth.user}>
            <Head title={user ? "Edit User" : "Add User"} />
            <div className="card-box table-responsive">
                <div className="row">
                    <Link href="#" onClick={() => window.history.back()}>
                        <h4
                            className="header-title m-t-0 m-b-30 text-primary pull-left"
                            style={{ fontSize: "20px" }}
                        >
                            <i className="fa fa-arrow-left"></i> Back
                        </h4>
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="form-horizontal">
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
                            Email <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-8">
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="form-control"
                                required
                            />
                            {errors.email && (
                                <span className="text-danger">
                                    {errors.email}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">
                            Password
                            {!user && <span className="text-danger">*</span>}
                        </label>
                        <div className="col-sm-8">
                            <input
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className="form-control"
                                required={!user}
                            />
                            {errors.password && (
                                <span className="text-danger">
                                    {errors.password}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Phone</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                name="phone"
                                value={data.phone || ""}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                                className="form-control"
                            />
                            {errors.phone && (
                                <span className="text-danger">
                                    {errors.phone}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Roles</label>
                        <div className="col-sm-8">
                            <select
                                name="roles[]"
                                options={roles}
                                value={data.roles}
                                onChange={handleRolesChange}
                            />
                            {errors.roles && (
                                <span className="text-danger">
                                    {errors.roles}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">
                            Avatar
                        </label>
                        <div className="col-sm-8">
                            <input
                                type="file"
                                name="avatar"
                                onChange={handleFileChange}
                                className="form-control"
                            />
                            {errors && errors.avatar && (
                                <span className="text-danger">
                                    {errors.avatar}
                                </span>
                            )}
                            {/* <small className="form-text text-muted">(Recommended resolution: 1100x450)</small> */}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="offset-sm-3"></label>
                        <div className="col-sm-8">
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="img-thumbnail mr-1"
                                    style={{ width: "180px" }}
                                />
                            )}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">
                            User Expiry Date
                        </label>
                        <div className="col-sm-8">
                            <input
                                type="date"
                                name="user_expiry_date"
                                value={data.user_expiry_date || ""}
                                onChange={(e) =>
                                    setData("user_expiry_date", e.target.value)
                                }
                                className="form-control"
                                placeholder="mm/dd/yyyy"
                            />
                            {errors.user_expiry_date && (
                                <span className="text-danger">
                                    {errors.user_expiry_date}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">
                            Subscription Plan
                        </label>
                        <div className="col-sm-8">
                            <select
                                className="form-control"
                                name="subscription_plan"
                                value={data.subscription_plan}
                                onChange={(e) =>
                                    setData("subscription_plan", e.target.value)
                                }
                            >
                                <option value="">Select...</option>
                                {subscription_plans.map((subscription) => (
                                    <option
                                        key={subscription.id}
                                        value={subscription.id}
                                    >
                                        {subscription.name}
                                    </option>
                                ))}
                            </select>
                            {errors.subscription_plan && (
                                <span className="text-danger">
                                    {errors.subscription_plan}
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
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-8 offset-sm-3">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={processing}
                            >
                                {user ? "Update" : "Create"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
}
