import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { useState } from 'react';
import MyImage from '@/Components/MyImage';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;
    const [avatar, setAvatar] = useState()

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        avatar: user?.avatar,
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData("image", file);

        const filePreview = URL.createObjectURL(file);
        setAvatar(filePreview);
    };

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (

        <>
            <h2 className="text-lg font-medium text-uppercase">Update Profile Infornmation :</h2>
            <form onSubmit={submit} acceptCharset="UTF-8" className="row align-items-center" name="profile_form" id="profile_form" role="form" encType="multipart/form-data">

                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="form-group mb-3">
                        <label>Name</label>
                        <input
                            type='text'
                            id="name"
                            name='name'
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            isFocused
                            autoComplete="name"
                        />
                        {errors && errors?.name && (
                            <span className='invalid-feedback'>{errors?.name}</span>
                        )}
                    </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="form-group mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            autoComplete="username"
                        />

                        {errors && errors?.email && (
                            <span className='invalid-feedback'>{errors?.email}</span>
                        )}
                    </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="form-group mb-3">
                        <label>Email</label>
                        <input
                            type="text"
                            id="phpne"
                            name="phpne"
                            className={`form-control ${errors.phpne ? 'is-invalid' : ''}`}
                            value={data.phpne}
                            onChange={(e) => setData('phpne', e.target.value)}
                            autoComplete="username"
                        />

                        {errors && errors?.phpne && (
                            <span className='invalid-feedback'>{errors?.phpne}</span>
                        )}
                    </div>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div class="form-group mb-3">
                        <label>Profile Image</label>
                        <label class="browse_pic_file">
                            <input
                                type="file"
                                id="avatar"
                                name="avatar"
                                aria-label="Profile picture browse"
                                onChange={handleFileChange}
                            />
                            <span class="browse_file_custom"></span>
                        </label>

                        <div class="user_pic_view">
                            <div class="fileupload_img">
                                <MyImage type='users' filename={user?.avatar} altText="profile pic" itle="profile pic" className="fileupload_img" />
                                
                            </div>
                        </div>

                        <br />

                        {errors && errors?.avatar && (
                            <span className='text-danger'>{errors?.avatar}</span>
                        )}
                    </div>

                </div>

                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                    <div className="form-group d-flex align-items-start flex-column">
                        <button type="submit" className="vfx-item-btn-danger text-uppercase" disabled={processing}>Update</button>
                    </div>
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

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
        </>
    );
}
