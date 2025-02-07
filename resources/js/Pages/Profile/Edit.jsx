import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head, useForm } from '@inertiajs/react';
import Breadcrumb from '@/Components/Breadcrumb';

export default function Edit({ auth, mustVerifyEmail, status }) {
    const breadcrumb = [
        { name: 'Home', url: route('home') },
        { name: 'Dashboard', url: route('dashboard') },
        { name: 'Edit Profile', url: route('profile.edit') },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Profile" />
            <Breadcrumb data={breadcrumb} />

            <div className="edit-profile-area vfx-item-ptb vfx-item-info">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 offset-lg-2 offset-md-0">
                            <div className="edit-profile-form">

                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                />

                            </div>

                            <div className="edit-profile-form">

                                <UpdatePasswordForm />

                            </div>

                            <DeleteUserForm className="max-w-xl" />

                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div> */}
        </AuthenticatedLayout>
    );
}
