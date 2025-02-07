import Breadcrumb from '@/Components/Breadcrumb';
import MyImage from '@/Components/MyImage';
import { showSuccessAlert } from '@/Components/SweetAlert';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Link, useForm, usePage } from '@inertiajs/react';
import React, { useRef } from 'react';
import Swal from 'sweetalert2';

export default function Dashboard({ breadcrumb }) {
  const { user } = usePage().props.auth;

  const passwordInput = useRef();

  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
  } = useForm({
    password: '',
  });

  const deleteUser = () => {
    destroy(route('profile.destroy'), { data }, {
      preserveScroll: true,
      onSuccess: () => showSuccessAlert('Account deleted successfully.'),
      // onError: () => passwordInput.current.focus(),
      onFinish: () => reset(),
    });
  };

  const handleAccountDelete = async () => {
    const result = await Swal.fire({
      color: 'rgb(255, 255, 255)',
      background: 'rgb(26, 34, 52)',
      title: 'Are you sure you want to delete your account?',
      text: 'Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, proceed!',
      cancelButtonText: 'No, cancel!',
      input: 'password',
      inputAttributes: {
        style: 'background: #fff; border: 1px solid #d7d7d7; padding: 0.3125rem 1.25rem; color: #6e6e6e; height: 3.5rem; border-radius: 0.5rem;',
        id: 'password',
        name: 'password',
        placeholder: 'Enter your Password',
      },
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!';
        }
      },
    });

    // Check if the user confirmed and entered a password
    if (result.isConfirmed && result.value) {
      
      setData('password', result.value);
      
      deleteUser();
    }
  };

  return (
    <Authenticated>
      <Breadcrumb data={breadcrumb} />
      <div className="vfx-item-ptb vfx-item-info">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="profile-section">
                <div className="row">
                  <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
                    <div className="img-profile">
                      <MyImage
                        type="users"
                        filename={user?.avatar}
                        fallbackImage="avatar.png"
                        className="img-rounded"
                        altText="profile_img"
                        title="profile pic"
                      />
                    </div>
                    <div className="profile_title_item">
                      <h5>{user?.name || 'User'}</h5>
                      <p>{user?.email || 'email@example.com'}</p>
                      <Link
                        href="#"
                        className="vfx-item-btn-danger text-uppercase"
                        onClick={handleAccountDelete}
                      >
                        <i className="fa fa-trash"></i> Delete Account
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-9 col-md-8 col-sm-12 col-xs-12">
                    <div className="row">
                      <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                        <div className="member-ship-option">
                          <h5 className="color-up">My Subscription</h5>
                          <div className="mt-3">
                            <Link
                              href="https://videoportal.viavilab.com/membership_plan"
                              className="vfx-item-btn-danger text-uppercase"
                            >
                              Select Plan
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                        <div className="member-ship-option">
                          <h5 className="color-up">Last Invoice</h5>
                          <span className="premuim-memplan-bold-text">
                            <strong>Date:</strong>
                          </span>
                          <span className="premuim-memplan-bold-text">
                            <strong>Plan:</strong>
                          </span>
                          <span className="premuim-memplan-bold-text">
                            <strong>Amount:</strong>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="table-wrapper">
                <div className="vfx-item-section">
                  <h3>User History</h3>
                </div>
                <table className="fl-table">
                  <thead>
                    <tr>
                      <th>Plan</th>
                      <th>Amount</th>
                      <th>Payment Gateway</th>
                      <th>Payment ID</th>
                      <th>Payment Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Render user history here */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
