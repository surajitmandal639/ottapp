import React, { useEffect, useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import MyImage from "@/Components/MyImage";
import { Sidebar } from "./Sidebar";

export const Topbar = () => {
    const { logo, auth, title } = usePage().props;
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => setSidebarVisible((prev) => !prev);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setSidebarVisible(true);
            } else {
                setSidebarVisible(false);
            }
        };

        handleResize(); // Check initial screen size
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route("admin.logout"));
    };

    return (
        <>
            <div className="topbar">
                <div className="topbar-left d-none d-sm-flex align-items-center justify-content-center">
                    <Link href={route("dashboard")} className="logo">
                        <span>
                            <MyImage type="general_settings" filename={logo} fallbackImage="site_logo.png" altText="Site Logo" />
                        </span>
                        <i className="mdi mdi-layers"></i>
                    </Link>
                </div>
                <div className="navbar navbar-default">
                    <div className="container-fluid">
                        <ul className="navbar-nav list-inline navbar-left">
                            <li className="list-inline-item">
                                <button className="button-menu-mobile open-left" onClick={toggleSidebar}>
                                    <i className="fa fa-bars"></i>
                                </button>
                            </li>
                            <li className="list-inline-item">
                                <h4 className="page-title">{title}</h4>
                            </li>
                        </ul>
                        <nav className="navbar-custom float-right">
                            <ul className="list-unstyled topbar-right-menu d-flex align-items-center mb-0">
                                <li>
                                    <div className="notification-box">
                                        <ul className="list-inline mb-0">
                                            <li>
                                                <Link href={route("admin.clear-cache")} className="mr-3" title="Clear Cache">
                                                    <i className="fa fa-refresh"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href={route("home")} title="Front End" target="_blank">
                                                    <i className="fa fa-desktop"></i>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="dropdown notification-list">
                                    <span className="text-light">{auth.user.name}</span>
                                    <Link
                                        className="nav-link dropdown-toggle waves-effect waves-light nav-user"
                                        data-toggle="dropdown"
                                        href="#"
                                        role="button"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <MyImage
                                            type="users"
                                            filename={auth.user.avatar}
                                            fallbackImage="avatar.png"
                                            altText="User Image"
                                            className="rounded-circle"
                                        />
                                    </Link>
                                    <div className="dropdown-menu dropdown-menu-right profile-dropdown">
                                        <Link href={route("admin.profile.edit")} className="dropdown-item">
                                            <i className="fa fa-user m-r-5"></i> Profile
                                        </Link>
                                        <form onSubmit={handleSubmit} style={{ display: "inline" }}>
                                            <button type="submit" className="dropdown-item">
                                                <i className="fa fa-power-off m-r-5"></i> Logout
                                            </button>
                                        </form>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

            <Sidebar visible={sidebarVisible} onClose={toggleSidebar} 
                style={{
                    top: '70px',
                    width: '250px',
                    zIndex: 5,
                    background: '#101011',
                    bottom: 0,
                    paddingTop: '15px',
                    paddingBottom: '15px',
                    position: 'fixed',
                    boxShadow: "0 0 24px 0 rgba(0, 0, 0, 0.06), 0 1px 0 0 rgba(0, 0, 0, 0.02)",
                    transition: "transform 0.3s ease",
                    transform: sidebarVisible ? "translateX(0)" : "translateX(-100%)"
                }}
            />
        </>
    );
};
