import Authenticated from "@/Layouts/Admin/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React from "react";

const Show = ({ auth, title, user }) => {
    return (
        <Authenticated user={auth.user}>
            <Head title={title} />
            <div className="row">
                <div className="col-sm-8">
                    <div className="bg-picture card-box">
                        <div className="p-t-10 pull-right">
                            <span className={`badge ${user.status === 1 ? 'badge-success' : 'badge-danger'}`}>
                                {user.status === 1 ? 'Active' : 'Inactive'}
                            </span>
                        </div>

                        <div className="profile-info-name">
                            <img
                                src={user.image_url || "/storage/upload/images/users/default-avatar.jpg"}
                                className="img-thumbnail"
                                alt="profile_img"
                                style={{ width: '155px' }}
                            />

                            <div className="profile-info-detail">
                                <h4 className="m-0">{user.name}</h4>
                                <p className="text-muted m-b-20">
                                    <b>Email:</b> {user.email} <br />
                                    <b>Phone:</b> {user.phone}
                                </p>
                            </div>

                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-4">
                    <div className="card-box">
                        <h4 className="header-title m-t-0 m-b-30">
                            Subscription Plan
                        </h4>

                        <ul className="list-group m-b-0 user-list">
                            <li className="list-group-item">
                                <Link href="#" className="user-list-item">
                                    <div className="avatar">
                                        <i className="fa fa-circle text-primary"></i>
                                    </div>
                                    <div className="user-desc">
                                        <span className="name">{user.subscription_plans[0]?.name || 'N/A'}</span>
                                        <span className="desc">
                                            Current Plan
                                        </span>
                                    </div>
                                </Link>
                            </li>

                            <li className="list-group-item">
                                <Link href="#" className="user-list-item">
                                    <div className="avatar">
                                        <i className="fa fa-circle text-success"></i>
                                    </div>
                                    <div className="user-desc">
                                        <span className="name">{user.user_expiry_date || 'N/A'}</span>
                                        <span className="desc">
                                            Subscription expires on
                                        </span>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="card-box table-responsive">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card-box">
                                <h4 className="header-title m-t-0 m-b-30">
                                    User Transactions
                                </h4>
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Email</th>
                                                <th>Plan</th>
                                                <th>Amount</th>
                                                <th>Payment Gateway</th>
                                                <th>Payment ID</th>
                                                <th>Payment Date</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                                <nav className="paging_simple_numbers"></nav>
                            </div>
                        </div>
                    </div>
                </div>
        </Authenticated>
    );
};

export default Show;
