
import Guest from '@/Layouts/Admin/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('admin.login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <Guest>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                <div className="text-center">
                    <h3 className="text-uppercase font-bold m-b-0" style={{color: '#f9f9f9'}}>Sign In</h3>           

                </div>
                <form onSubmit={submit} >    
                    <div className="form-group">
                        <div className="col-xs-12">
                            <input 
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className={`form-control ${errors?.email ? 'is-invalid' : ''}`}
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            {errors && errors?.email && (<span className='invalid-feedback' >{errors.email}</span>)}
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-xs-12">
                            <input
                                className={`form-control ${errors?.email ? 'is-invalid' : ''}`}
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            {errors && errors?.password && (<span className='invalid-feedback' >{errors.password}</span>)}
                        </div>
                    </div>
                    <div className="form-group ">
                        <div className="col-xs-12">
                        <div className="checkbox checkbox-custom">
                            <input 
                                id='checkbox-signup'
                                type="checkbox" 
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <label htmlFor="checkbox-signup"> Remember me </label>
                        </div>
                        </div>
                    </div>
                    <div className="form-group text-center m-t-10">
                        <div className="col-xs-12">
                        <button className="btn btn-custom btn-bordred btn-block waves-effect waves-light" type="submit" disabled={processing}>Login</button>
                        </div>
                    </div>
                    {canResetPassword && (
                        <div className="form-group m-t-20 m-b-0 text-center">
                            <div className="col-sm-12">
                                <Link
                                    href={route('admin.password.request')}
                                    className="text-muted"
                                >
                                    <i className="fa fa-lock m-r-5"></i>
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>
                    )}
                </form> 
        </Guest>
    );
}