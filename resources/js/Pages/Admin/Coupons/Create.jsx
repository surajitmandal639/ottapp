import { Head, Link, router, useForm } from "@inertiajs/react";
import { showSuccessAlert } from "@/Components/SweetAlert";
import Authenticated from "@/Layouts/Admin/AuthenticatedLayout";

const Create = ({ auth, errors: propErrors, coupon }) => {
    const { errors: formErrors, setError, clearErrors, data: formData, setData, reset } = useForm({
        code: coupon?.code || '',
        value: coupon?.value || '',
        type: coupon?.type || '1', // Default to "Percentage"
        usage_limit: coupon?.usage_limit || '',
        exp_date: coupon?.exp_date || '',
        status: coupon?.status || 1,
    });

    const errors = { ...propErrors, ...formErrors };

    const validateFields = (field, value) => {
        let valid = true;

        switch (field) {
            case 'code':
                if (!value || typeof value !== 'string' || value.length > 255) {
                    setError("code", "Coupon code is required and must be a string with a maximum length of 255 characters.");
                    valid = false;
                } else {
                    clearErrors("code");
                }
                break;

            case 'value':
                if (isNaN(value) || value < 0) {
                    setError("value", "Coupon value must be a number greater than or equal to 0.");
                    valid = false;
                } else {
                    clearErrors("value");
                }
                break;

            case 'type':
                if (!['percent', 'fixed'].includes(value)) {
                    setError("type", "Coupon type must be either Percentage or Fixed.");
                    valid = false;
                } else {
                    clearErrors("type");
                }
                break;

            case 'user_limit':
                if (isNaN(value) || value < 0) {
                    setError("user_limit", "User limit must be a number greater than or equal to 0.");
                    valid = false;
                } else {
                    clearErrors("user_limit");
                }
                break;

            case 'exp_date':
                const today = new Date().toISOString().split('T')[0];
                if (!value || value < today) {
                    setError("exp_date", "Expiration date must be today or later.");
                    valid = false;
                } else {
                    clearErrors("exp_date");
                }
                break;

            case 'status':
                if (![1, 2].includes(parseInt(value, 10))) {
                    setError("status", "Status must be either Active or Inactive.");
                    valid = false;
                } else {
                    clearErrors("status");
                }
                break;

            default:
                break;
        }

        return valid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
        validateFields(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = Object.keys(formData).every(key => validateFields(key, formData[key]));

        if (isValid) {
            const successMessage = coupon ? "Coupon updated successfully." : "Coupon created successfully.";

            await router.post(
                route('coupons.save', coupon?.id),
                { ...formData },
                {
                    onSuccess: () => {
                        showSuccessAlert(successMessage);
                        if (!coupon) reset();
                    },
                }
            );
        }
    };

    const generateCouponCode = () => {
        const length = 10;
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        setData('code', text);
        validateFields('code', text);
    };

    return (
        <Authenticated user={auth.user}>
            <Head title={coupon ? "Edit Coupon" : "Add Coupon"} />
            <div className="card-box table-responsive">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb text-primary" style={{ justifyContent: 'flex-end' }}>
                        <li className="breadcrumb-item"><Link href={route('admin.dashboard')}>Dashboard</Link></li>
                        <li className="breadcrumb-item"><Link href={route('admin.coupons')}>Coupons</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{coupon ? "Edit Coupon" : "Add Coupon"}</li>
                    </ol>
                </nav>

                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Coupon Code <span className="text-danger">*</span></label>
                        <div className="col-sm-8">
                            <input
                                className="form-control"
                                type="text"
                                name="code"
                                id="code"
                                required
                                value={formData.code}
                                onChange={handleChange}
                            />
                            {errors.code && (<span className="text-danger">{errors.code}</span>)}
                            <br />
                            <button type="button" onClick={generateCouponCode} className="btn btn-success">Generate</button>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Coupon Value</label>
                        <div className="col-sm-6">
                            <input
                                className="form-control"
                                type="number"
                                name="value"
                                required
                                value={formData.value}
                                onChange={handleChange}
                            />
                            {errors.value && (<span className="text-danger">{errors.value}</span>)}
                        </div>
                        <div className="col-sm-2">
                            <select
                                className="form-control"
                                name="type"
                                required
                                value={formData.type}
                                onChange={handleChange}
                            >
                                <option value="percent">Percentage</option>
                                <option value="fixed">Fixed</option>
                            </select>
                            {errors.type && (<span className="text-danger">{errors.type}</span>)}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">User Limit <span className="text-danger">*</span></label>
                        <div className="col-sm-8">
                            <input
                                className="form-control"
                                type="number"
                                name="usage_limit"
                                required
                                value={formData.usage_limit}
                                onChange={handleChange}
                            />
                            {errors.usage_limit && (<span className="text-danger">{errors.usage_limit}</span>)}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Expiration Date</label>
                        <div className="col-sm-8">
                            <input
                                className="form-control"
                                type="date"
                                name="exp_date"
                                value={formData.exp_date ? formData.exp_date.slice(0, 10) : ''}
                                onChange={handleChange}
                            />
                            {errors.exp_date && (<span className="text-danger">{errors.exp_date}</span>)}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Status</label>
                        <div className="col-sm-8">
                            <select
                                className="form-control"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="1">Active</option>
                                <option value="2">Inactive</option>
                            </select>
                            {errors.status && (<span className="text-danger">{errors.status}</span>)}
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-12 text-center">
                            <button type="submit" className="btn btn-primary">
                                {coupon ? "Update" : "Save"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
};

export default Create;
