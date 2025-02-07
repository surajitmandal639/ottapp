
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword, errors: serverErrors }) {
    const { data, setData, post, processing, errors: formErrors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    // Merge server-side errors and form validation errors
    const errors = { ...formErrors, ...serverErrors };

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };
    
    return (
        <GuestLayout>
            <Head title="Log in" />
            
            <div className="container login-part">
                {status && (
                    <div className="mb-4 text-success">
                        {status}
                    </div>
                )}
                <div className="row">
                    <div className="col-12 col-lg-12 col-xl-12 mx-auto">
                        <h2 className="form-title-item mb-4">Login</h2>

                        <form onSubmit={submit}>
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={data.email}
                                    className="form-control"
                                    placeholder="Email"
                                    onChange={(e) => setData("email", e.target.value)}
                                />
                                {errors.email && <div className="text-danger mt-2">{errors.email}</div>}
                            </div>

                            <div className="form-group">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={data.password}
                                    className="form-control"
                                    placeholder="Password"
                                    onChange={(e) => setData("password", e.target.value)}
                                />
                                {errors.password && <div className="text-danger mt-2">{errors.password}</div>}
                            </div>

                            <div className="row mt-4">
                                <div className="col">
                                    <div className="form-check custom-control custom-checkbox">
                                        <input id="remember-me" name="remember" className="form-check-input" type="checkbox" />
                                        <label className="custom-control-label" htmlFor="remember-me">Remember me</label>
                                    </div>
                                </div>

                                {canResetPassword && (
                                    <div className="col text-end">
                                        <Link href={route("password.request")} className="btn-link" title="forgot password">
                                            Forgot Password?
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <button className="btn-submit btn-block my-4 mb-4" type="submit" disabled={processing}>
                                Login
                            </button>
                        </form>

                        <p className="text-3 text-center mb-3">
                            Don't you have an account yet?{" "}
                            <Link href={route("register")} className="btn-link" title="signup">Sign Up</Link>
                        </p>

                        <div className="socail-login-item mx-auto w-100 text-center">
                            <label>
                                {/* href={route("auth.google")} */}
                                <Link href="#" className="btn btn-lg btn-success btn-block btn-g-plus-item" title="google">
                                    <i className="fa fa-google"></i> Google
                                </Link>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            
        </GuestLayout>
    );
}
