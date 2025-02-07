
import { Head, Link, router, useForm } from "@inertiajs/react";
import { showSuccessAlert } from "@/Components/SweetAlert";
import Authenticated from "@/Layouts/Admin/AuthenticatedLayout";

const Create = ({ auth, errors: propErrors, gateway }) => {
    const { errors: formErrors, setError, clearErrors, data: formData, setData, reset } = useForm({
        name: gateway?.name || '',
        short_info: gateway?.short_info || '',
        api_key: gateway?.api_key || '',
        api_secret: gateway?.api_secret || '',
        status: gateway?.status || 1,
    });

    const errors = { ...propErrors, ...formErrors };
    const data = {...gateway, ...formData};

    const checkUniqueness = async (field, value) => {
        let unique = true;
        try {
            const response = await axios.post(route('gateways.checkUnique'), { field, value });

            if (response) {
                setError(field, `${field.charAt(0).toUpperCase() + field.slice(1)} must be unique.`);
            }
        } catch (error) {
            console.error("Error checking uniqueness", error);
        }
        return unique;
    };

    const validateFields = async (field, value) => {
        let valid = true;

        switch (field) {
            case 'name':
                if (!value || typeof value !== 'string' || value.length > 50) {
                    setError("name", "Gateway name is required and must be a string with a maximum length of 50 characters.");
                    valid = false;
                } else {
                    valid = await checkUniqueness('name', value);
                    clearErrors("name");
                }
                break;

            case 'short_info':
                if (isNaN(value) || value < 0 || value > 100) {
                    setError("short_info", "Gateway short info is ");
                    valid = false;
                } else {
                    clearErrors("short_info");
                }
                break;

            case 'api_key':
                if (!value || typeof value !== 'string' || value.length > 255) {
                    setError("api_key", "API key is required and must be a string with a maximum length of 255 characters.");
                    valid = false;
                } else {
                    valid = await checkUniqueness('api_key', value);
                    clearErrors("api_key");
                }
                break;

            case 'api_secret':
                const today = new Date().toISOString().split('T')[0];
                if (!value || value < today) {
                    setError("api_secret", " ");
                    valid = false;
                } else {
                    clearErrors("api_secret");
                }
                break;

            case 'status':
                if (![1, 2].includes(value)) {
                    setError("status", "Status is required and must be either 1 (Active) or 2 (Inactive).");
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

        const isValid = Object.keys(data).every(key => validateFields(key, data[key]));

        if (isValid) {
            const successMessage = gateway ? "Gateway updated successfully." : "Gateway created successfully.";

            await router.post(
                route('gateways.save', gateway?.id),
                { ...data },
                {
                    onSuccess: () => {
                        showSuccessAlert(successMessage);
                        if (!gateway) reset();
                    },
                }
            );
        }
    };

    return (
        <Authenticated user={auth.user}>
            <Head title={gateway ? "Edit Gateway" : "Add Gateway"} />
            <div className="card-box table-responsive">
                <nav aria-label="breadcrumb ">
                    <ol className="breadcrumb text-primary" style={{ justifyContent: 'flex-end' }}>
                        <li className="breadcrumb-item"><Link href={route('admin.dashboard')}>Dashboard</Link></li>
                        <li className="breadcrumb-item"><Link href={route('admin.gateways')}>Gateways</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Edit Gateway</li>
                    </ol>
                </nav>

                <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="off">
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Gateway Name <span className="text-danger">*</span></label>
                        <div className="col-sm-8">
                            <input
                                className="form-control"
                                type="text"
                                name="name"
                                required
                                value={data.name}
                                onChange={handleChange}
                            />
                            {errors && errors.name && (<span className="text-danger">{errors.name}</span>)}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Short Info</label>
                        <div className="col-sm-8">
                            <input
                                className="form-control"
                                type="text"
                                name="short_info"
                                required
                                value={data.short_info}
                                onChange={handleChange}
                            />
                            {errors && errors.short_info && (<span className="text-danger">{errors.short_info}</span>)}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">{gateway.name} Api Key<span className="text-danger">*</span></label>
                        <div className="col-sm-8">
                            <input
                                className="form-control"
                                type="text"
                                name="api_key"
                                required
                                value={data.api_key}
                                onChange={handleChange}
                            />
                            {errors.api_key && (<span className="text-danger">{errors.api_key}</span>)}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">{gateway.name} Api Secret</label>
                        <div className="col-sm-8">
                            <input
                                className="form-control"
                                type="text"
                                name="api_secret"
                                value={data.api_secret}
                                onChange={handleChange}
                            />
                            { errors && errors.api_secret && (<span className="text-danger">{errors.api_secret}</span>)}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Status</label>
                        <div className="col-sm-8">
                            <select
                                className="form-control"
                                name="status"
                                value={data.status}
                                onChange={handleChange}
                            >
                                <option value="1">Active</option>
                                <option value="2">Inactive</option>
                            </select>
                            {errors && errors.status && (<span className="text-danger">{errors.status}</span>)}
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-12 text-center">
                            <button type="submit" className="btn btn-primary">Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
};

export default Create;
