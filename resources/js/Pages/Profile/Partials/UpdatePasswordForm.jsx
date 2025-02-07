import { useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-uppercase">Update Password :</h2>

                <p className="mt-1 text-sm ">
                    Ensure your account is using a long, random password to stay secure.
                </p>
            </header>

            <form onSubmit={updatePassword} acceptCharset="UTF-8" className="row align-items-center" name="profile_form" id="profile_form" role="form" encType="multipart/form-data">

                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="form-group mb-3">
                        <label>Current Password</label>
                        <input
                            type='password'
                            id="current_password"
                            name='current_password'
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                            autoComplete="current-password"
                        />
                        {errors && errors?.current_password && (
                            <span className='invalid-feedback'>{errors?.current_password}</span>
                        )}
                    </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="form-group mb-3">
                        <label>New Password</label>
                        <input
                            type="password"
                            id="password"
                            name='password'
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            autoComplete="new-password"
                        />
                        {errors && errors?.current_password && (
                            <span className='invalid-feedback'>{errors?.current_password}</span>
                        )}
                    </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="form-group mb-3">
                        <label>Confirm Password</label>
                        <input                        
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            autoComplete="new-password"
                        />
                        {errors && errors?.password_confirmation && (
                            <span className='invalid-feedback'>{errors?.password_confirmation}</span>
                        )}
                    </div>
                </div>
                
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                    <div className="form-group d-flex align-items-start flex-column">
                        <button type="submit" className="vfx-item-btn-danger text-uppercase" disabled={processing}>Update</button>
                    </div>
                </div>

                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-gray-600">Saved.</p>
                </Transition>

            </form>

            {/* <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div>

                    <InputLabel htmlFor="current_password" value="Current Password" />

                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                    />

                    <InputError message={errors.current_password} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="New Password" />

                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form> */}
        </section>
    );
}
