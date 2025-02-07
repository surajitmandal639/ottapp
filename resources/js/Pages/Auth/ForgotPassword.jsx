import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        // Using Inertia's post method to send the email for resetting password
        post(route('password.email'), {
            // onSuccess: () => {
            //     // Optionally, handle success like showing a message or resetting the form
            // },
        });
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <div className="container login-part">
                <div className="row">
                    <div className="col-12 col-lg-12 col-xl-12 mx-auto">
                        <h2 className="form-title-item mb-4">Forgot Password?</h2>
                        <form onSubmit={submit}>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    id="email"
                                    required
                                    placeholder="Email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                {errors.email && (
                                    <div className="mt-2 text-red-600">{errors.email}</div>
                                )}
                            </div>

                            <button
                                className="btn-submit btn-block my-4 mb-4 mt-1"
                                type="submit"
                                disabled={processing}
                            >
                                Reset Password
                            </button>
                        </form>
                        <p className="text-3 text-center mb-0">
                            Don't you have an account yet?{' '}
                            <Link href={route('register')} className="btn-link" title="signup">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
