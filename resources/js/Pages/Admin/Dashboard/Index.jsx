// resources/js/Pages/Dashboard.js

import CountUp from "@/Components/CountUp";
import MyBarChart from "@/Components/MyBarChart";
import AuthenticatedLayout from "@/Layouts/Admin/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ auth, data: propData }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Admin Dashboard" />

            <div className="row justify-content-center">
                <div className="col-xl-3 col-md-6">
                    <Link href={route("admin.languages")}>
                        <div className="card-box widget-user">
                            <div className="text-center">
                                <h2 className="text-custom">{ propData && <CountUp endValue={propData?.totalLanguage} /> }</h2>
                                <h5 style={{ color: "#f9f9f9" }}>Language</h5>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-xl-3 col-md-6">
                    <Link href={route("admin.genres")}>
                        <div className="card-box widget-user">
                            <div className="text-center">
                                <h2 className="text-pink">{ propData && <CountUp endValue={propData?.totalGenres} /> }</h2>
                                <h5 style={{ color: "#f9f9f9" }}>Genres</h5>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-xl-3 col-md-6">
                    <Link href={route("admin.videos")}>
                        <div className="card-box widget-user">
                            <div className="text-center">
                                <h2 className="text-warning">{ propData && <CountUp endValue={propData?.totalVideos} /> }</h2>
                                <h5 style={{ color: "#f9f9f9" }}>Videos</h5>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="col-xl-3 col-md-6">
                    <Link href={route('admin.users.index')}>
                        <div className="card-box widget-user">
                            <div className="text-center">
                                <h2 className="text-purple">{ propData && <CountUp endValue={propData?.totalUsers} /> }</h2>
                                <h5 style={{ color: "#f9f9f9" }}>Users</h5>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="col-xl-3 col-md-6">
                    <Link href={route('admin.transactions')}>
                        <div className="card-box widget-user">
                            <div className="text-center">
                                <h2 className="text-primary">{ propData && <CountUp endValue={propData?.totalTransactions} /> }</h2>
                                <h5 style={{ color: "#f9f9f9" }}>
                                    Transactions
                                </h5>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="col-xl-3 col-md-6">
                    <div className="card-box widget-user">
                        <div className="text-center">
                            <h2 className="text-custom">0.00</h2>
                            <h5 style={{ color: "#f9f9f9" }}>Daily Revenue</h5>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6">
                    <div className="card-box widget-user">
                        <div className="text-center">
                            <h2 className="text-pink">0.00</h2>
                            <h5 style={{ color: "#f9f9f9" }}>Weekly Revenue</h5>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6">
                    <div className="card-box widget-user">
                        <div className="text-center">
                            <h2 className="text-warning">387.00</h2>
                            <h5 style={{ color: "#f9f9f9" }}>
                                Monthly Revenue
                            </h5>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6">
                    <div className="card-box widget-user">
                        <div className="text-center">
                            <h2 className="text-success">5,227.89</h2>
                            <h5 style={{ color: "#f9f9f9" }}>Yearly Revenue</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-12">
                    <div className="card-box">
                        <MyBarChart />
                    </div>


                </div>
            </div>
        </AuthenticatedLayout>
    );
}
