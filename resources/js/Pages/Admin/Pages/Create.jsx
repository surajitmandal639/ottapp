
import { Head, Link, router, useForm } from "@inertiajs/react";
import { showSuccessAlert } from "@/Components/SweetAlert";
import Authenticated from "@/Layouts/Admin/AuthenticatedLayout";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Create = ({ auth, errors: propErrors, page }) => {
    const { errors: formErrors, setError, clearErrors, data: formData, setData, reset } = useForm({
        title: page?.title || '',
        description: page?.description || '',
        order: page?.order || '',
        status: page?.status || 1,
    });

    const errors = { ...propErrors, ...formErrors };
    const data = {...page, ...formData};

    const checkUniqueness = async (field, value) => {
        let unique = true;
        try {
            const response = await axios.post(route('pages.checkUnique', { field, value, id: page?.id || null }));

            if (response.data) {
                setError(field, `${field.charAt(0).toUpperCase() + field.slice(1)} must be unique.`);
                unique = false;
            } else {
                clearErrors(field);
            }
        } catch (error) {
            console.error("Error checking uniqueness", error);
        }
        return unique;
    };


    const validateFields = async (field, value) => {
        let valid = true;

        switch (field) {
            case 'title':
                if (!value || typeof value !== 'string' || value.length > 50) {
                    setError("title", "Page title is required and must be a string with a maximum length of 50 characters.");
                    valid = false;
                } else {
                    valid = await checkUniqueness('title', value);
                    if (valid) {
                        clearErrors("title");
                    }
                }
                break;

            case 'order':
                if (value == '') {
                    clearErrors("order");
                    valid = true;
                } else if (isNaN(value) || parseInt(value) <= 0) {
                    setError("order", "Page order must be a positive number.");
                    valid = false;
                } else {
                    valid = await checkUniqueness('order', value);
                    if (valid) {
                        clearErrors("order");
                    }
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
            const successMessage = page ? "Page updated successfully." : "Page created successfully.";
            const pageId = page ? page?.id : null;

            await router.post(
                route('pages.save', pageId),
                { ...data },
                {
                    onSuccess: () => {
                        showSuccessAlert(successMessage);
                        if (!page) reset();
                    },
                }
            );
        }
    };

    console.log(data);


    return (
        <Authenticated user={auth.user}>
            <Head title={page ? "Edit Page" : "Add Page"} />
            <div className="card-box table-responsive">
                <nav aria-label="breadcrumb ">
                    <ol className="breadcrumb text-primary" style={{ justifyContent: 'flex-end' }}>
                        <li className="breadcrumb-item"><Link href={route('admin.dashboard')}>Dashboard</Link></li>
                        <li className="breadcrumb-item"><Link href={route('admin.pages')}>Pages</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Edit Page</li>
                    </ol>
                </nav>

                <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="off">
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Page Title <span className="text-danger">*</span></label>
                        <div className="col-sm-8">
                            <input
                                className="form-control"
                                type="text"
                                name="title"
                                required
                                value={data.title}
                                onChange={handleChange}
                            />
                            {errors && errors.title && (<span className="text-danger">{errors.title}</span>)}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Description</label>
                        <div className="col-sm-8">
                            <CKEditor
                                editor={ClassicEditor}
                                data={data.description}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setData("description", data);
                                }}
                            />
                            {errors && errors.description && (<span className="text-danger">{errors.description}</span>)}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Page Order</label>
                        <div className="col-sm-8">
                            <input
                                className="form-control"
                                type="number"
                                name="order"
                                value={data.order}
                                onChange={handleChange}
                            />
                            { errors && errors.order && (<span className="text-danger">{errors.order}</span>)}
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
                            <button type="submit" className="btn btn-primary">{page ? 'Update' : 'Save' }</button>
                        </div>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
};

export default Create;
