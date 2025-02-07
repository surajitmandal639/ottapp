import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register.save'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="col-12 col-lg-12 col-xl-12 mx-auto">
                <h2 className="form-title-item mb-4">Sign Up</h2>
                <form onSubmit={submit}>
                
                    <div className="form-group">
                        <input 
                            type="text" 
                            className={`form-control ${errors?.email ? 'is-invalid' : ''}`} 
                            id="name"
                            name="name"
                            value={data.name}
                            autoComplete="name"
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            placeholder="Name"
                        />
                        {errors && errors?.name && (<span className='invalid-feedback' >{errors.name}</span>)}
                    </div>

                    <div className="form-group">
                        <input 
                            type="email" 
                            className={`form-control ${errors?.email ? 'is-invalid' : ''}`}
                            id='email'
                            name="email"
                            value={data.email}
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required 
                            placeholder="Email" 
                        />
                        {errors && errors?.email && (<span className='invalid-feedback' >{errors.email}</span>)}
                    </div>

                    <div className="form-group">
                        <input 
                            type="password" 
                            className={`form-control ${errors?.email ? 'is-invalid' : ''}`}
                            id='password'
                            name="password"
                            value={data.password}
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                            placeholder="Password (At least 8 characters)" 
                        />
                        {errors && errors?.password && (<span className='invalid-feedback' >{errors.password}</span>)}
                    </div>

                    <div className="form-group">
                        <input 
                            type="password" 
                            className={`form-control ${errors?.email ? 'is-invalid' : ''}`}
                            id="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required 
                            placeholder="Confirm Password" 
                        />
                        {errors && errors?.password_confirmation && (<span className='invalid-feedback' >{errors.password_confirmation}</span>)}
                    </div>

                    <button className="btn-submit btn-block mb-4" type="submit" disabled={processing}>Sign Up</button>
                </form>

                <p className="text-3 text-center mb-3">Already Sign Up? 
                    <Link className="btn-link" href={route('login')} title="login"> Login</Link>
                </p>
                
                <div className="socail-login-item mx-auto w-100 text-center">
                    <label>
                        <Link href="#" className="btn btn-lg btn-success btn-block btn-g-plus-item" title="google">
                            <i className="fa fa-google"></i> Google
                        </Link>     
                    </label>          
                
                </div>
            </div>

            {/* <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form> */}
        </GuestLayout>
    );
}
