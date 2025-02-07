import React, { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";

export const Sidebar = ({ visible, onClose, ...props }) => {
    const { url: activeUrl } = usePage();
    const [activeItem, setActiveItem] = useState("");
    const [expandedMenu, setExpandedMenu] = useState({});

    useEffect(() => {
        import('/public/backend_asset/css/sidebarScroll.css');
        setActiveItem(activeUrl);

        const updateExpandedMenu = () => {
            const newExpandedMenu = {};
            document.querySelectorAll(".has_sub .list-unstyled li a").forEach((link) => {
                if (getPath(link.getAttribute("href")) === activeUrl) {
                    const parentLi = link.closest(".has_sub");
                    if (parentLi) newExpandedMenu[parentLi.getAttribute("id")] = true;
                }
            });
            setExpandedMenu(newExpandedMenu);
        };

        updateExpandedMenu();
    }, [activeUrl]);

    const handleMenuClick = (menuId, event) => {
        event.preventDefault();
        setExpandedMenu((prev) => ({
            ...prev,
            [menuId]: !prev[menuId]
        }));
    };

    const handleMenuItemClick = () => {
        setExpandedMenu({});
        if (window.innerWidth < 768) {
            onClose(); // Close sidebar on mobile after selecting an item
        }
    };

    const getPath = (url) => {
        try {
            return new URL(url, window.location.origin).pathname;
        } catch {
            return "";
        }
    };

    return (
        <div className={`left side-menu`} {...props}>
            <div className="sidebar-inner" style={{ overflowY: "auto", height: "100%" }}>
                <div id="sidebar-menu">
                    <ul>
                    <MenuItem
                            href={route("admin.dashboard")}
                            icon="fa-dashboard"
                            text="Dashboard"
                            activeItem={activeItem}
                            getPath={getPath}
                            onClick={handleMenuItemClick}
                        />
                        <MenuItem
                            href={route("admin.languages")}
                            icon="fa-language"
                            text="Language"
                            activeItem={activeItem}
                            getPath={getPath}
                            onClick={handleMenuItemClick}
                        />
                        <MenuItem
                            href={route("admin.genres")}
                            icon="fa-list"
                            text="Genres"
                            activeItem={activeItem}
                            getPath={getPath}
                            onClick={handleMenuItemClick}
                        />

                        <SubMenu
                            id="cast-crew"
                            icon="fa-users"
                            text="Cast & Crew"
                            activeItem={activeItem}
                            getPath={getPath}
                            expandedMenu={expandedMenu}
                            handleMenuClick={handleMenuClick}
                        >
                            <MenuItem
                                href={route("admin.actors")}
                                icon="fa-user"
                                text="Actors"
                                activeItem={activeItem}
                                getPath={getPath}
                                onClick={handleMenuItemClick}
                            />
                            <MenuItem
                                href={route("admin.directors")}
                                icon="fa-user"
                                text="Directors"
                                activeItem={activeItem}
                                getPath={getPath}
                                onClick={handleMenuItemClick}
                            />
                        </SubMenu>

                        <SubMenu
                            id="home"
                            icon="fa-home"
                            text="Home"
                            activeItem={activeItem}
                            getPath={getPath}
                            expandedMenu={expandedMenu}
                            handleMenuClick={handleMenuClick}
                        >
                            <MenuItem
                                href={route("admin.home-sliders")}
                                icon="fa-sliders"
                                text="Slider"
                                activeItem={activeItem}
                                getPath={getPath}
                                onClick={handleMenuItemClick}
                            />
                            <MenuItem
                                href={route("admin.sections.index")}
                                icon="fa-list"
                                text="Home Sections"
                                activeItem={activeItem}
                                getPath={getPath}
                                onClick={handleMenuItemClick}
                            />
                        </SubMenu>

                        <MenuItem
                            href={route("admin.videos")}
                            icon="fa-video-camera"
                            text="Videos"
                            activeItem={activeItem}
                            getPath={getPath}
                            onClick={handleMenuItemClick}
                        />

                        

                        <SubMenu
                            id="users"
                            icon="fa-users"
                            text="Users"
                            activeItem={activeItem}
                            getPath={getPath}
                            expandedMenu={expandedMenu}
                            handleMenuClick={handleMenuClick}
                        >
                            <MenuItem
                                href={route("admin.users.index")}
                                icon="fa-sliders"
                                text="Users"
                                activeItem={activeItem}
                                getPath={getPath}
                                onClick={handleMenuItemClick}
                            />
                            <MenuItem
                                href="#"
                                icon="fa-users"
                                text="Sub Admin"
                                activeItem={activeItem}
                                getPath={getPath}
                                onClick={handleMenuItemClick}
                            />
                            <MenuItem
                                href={route("admin.users.deleted")}
                                icon="fa-users"
                                text="Deleted Users"
                                activeItem={activeItem}
                                getPath={getPath}
                                onClick={handleMenuItemClick}
                            />
                        </SubMenu>

                        <MenuItem
                            href={route("admin.subscription-plans")}
                            icon="fa-dollar"
                            text="Subscription Plan"
                            activeItem={activeItem}
                            getPath={getPath}
                            onClick={handleMenuItemClick}
                        />
                        <MenuItem
                            href={route("admin.coupons")}
                            icon="fa-gift"
                            text="Coupons"
                            activeItem={activeItem}
                            getPath={getPath}
                            onClick={handleMenuItemClick}
                        />
                        <MenuItem
                            href={route("admin.gateways")}
                            icon="fa-credit-card-alt"
                            text="Payment Gateway"
                            activeItem={activeItem}
                            getPath={getPath}
                            onClick={handleMenuItemClick}
                        />
                        <MenuItem
                            href={route("admin.transactions")}
                            icon="fa-list"
                            text="Transactions"
                            activeItem={activeItem}
                            getPath={getPath}
                            onClick={handleMenuItemClick}
                        />
                        <MenuItem
                            href={route("admin.pages")}
                            icon="fa-edit"
                            text="Pages"
                            activeItem={activeItem}
                            getPath={getPath}
                            onClick={handleMenuItemClick}
                        />


                        <SubMenu
                            id="player_settings"
                            icon="fa-play-circle"
                            text="Player Settings"
                            activeItem={activeItem}
                            getPath={getPath}
                            expandedMenu={expandedMenu}
                            handleMenuClick={handleMenuClick}
                        >
                            <MenuItem
                                href={route("admin.player-settings")}
                                icon="fa-cog"
                                text="Settings"
                                activeItem={activeItem}
                                getPath={getPath}
                                onClick={handleMenuItemClick}
                            />
                            <MenuItem
                                href={route("admin.player-ad-settings")}
                                icon="fa-buysellads"
                                text="Player Ads"
                                activeItem={activeItem}
                                getPath={getPath}
                                onClick={handleMenuItemClick}
                            />
                        </SubMenu>
                        <SubMenu
                            id="settings"
                            icon="fa-cog"
                            text="Settings"
                            activeItem={activeItem}
                            getPath={getPath}
                            expandedMenu={expandedMenu}
                            handleMenuClick={handleMenuClick}
                        >
                            <MenuItem
                                href={route("admin.general-settings")}
                                icon="fa-cog"
                                text="General"
                                activeItem={activeItem}
                                getPath={getPath}
                                onClick={handleMenuItemClick}
                            />
                            <MenuItem
                                href={route("admin.smtp")}
                                icon="fa-send"
                                text="SMTP Email"
                                activeItem={activeItem}
                                getPath={getPath}
                                onClick={handleMenuItemClick}
                            />
                            <MenuItem
                                href={route("admin.social-login")}
                                icon="fa-usb"
                                text="Social Login"
                                activeItem={activeItem}
                                getPath={getPath}
                                onClick={handleMenuItemClick}
                            />
                            <MenuItem
                                href={route("admin.menu-settings")}
                                icon="fa-list"
                                text="Menu"
                                activeItem={activeItem}
                                getPath={getPath}
                                onClick={handleMenuItemClick}
                            />
                            <MenuItem
                                href={route("admin.recaptcha-settings")}
                                icon="fa-refresh"
                                text="reCAPTCHA"
                                activeItem={activeItem}
                                getPath={getPath}
                                onClick={handleMenuItemClick}
                            />
                            <MenuItem
                                href={route("admin.banner-ad-settings")}
                                icon="fa-buysellads"
                                text="Website Banner Ads"
                                activeItem={activeItem}
                                getPath={getPath}
                                onClick={handleMenuItemClick}
                            />
                            <MenuItem
                                href={route("admin.site-maintenance")}
                                icon="fa-wrench"
                                text="Site Maintenance"
                                activeItem={activeItem}
                                getPath={getPath}
                                onClick={handleMenuItemClick}
                            />
                        </SubMenu>
                        <SubMenu
                            id="android-app"
                            icon="fa-android"
                            text="Android App"
                            activeItem={activeItem}
                            getPath={getPath}
                            expandedMenu={expandedMenu}
                            handleMenuClick={handleMenuClick}
                        >
                            <MenuItem
                                href={route("admin.verify-purchase-app")}
                                icon="fa-lock"
                                text="App Verify"
                                activeItem={activeItem}
                                getPath={getPath}
                                onClick={handleMenuItemClick}
                            />
                            <MenuItem
                                href={route("admin.android-setting")}
                                icon="fa-cog"
                                text="App Settings"
                                activeItem={activeItem}
                                getPath={getPath}
                                onClick={handleMenuItemClick}
                            />
                            <MenuItem
                                href={route("admin.android-ad-list")}
                                icon="fa-buysellads"
                                text="Ad Settings"
                                activeItem={activeItem}
                                getPath={getPath}
                                onClick={handleMenuItemClick}
                            />
                            <MenuItem
                                href={route("admin.android-notification")}
                                icon="fa-send"
                                text="Notification"
                                activeItem={activeItem}
                                getPath={getPath}
                                onClick={handleMenuItemClick}
                            />
                        </SubMenu>
                    </ul>
                </div>
            </div>
        </div>
    );
};

// MenuItem component
const MenuItem = ({ href, icon, text, activeItem, getPath, onClick }) => (
    <li className={`${activeItem === getPath(href) ? "active" : ""}`}>
        <Link
            href={href}
            className={`waves-effect ${activeItem === getPath(href) ? "active" : ""}`}
            onClick={onClick}
        >
            <i className={`fa ${icon}`}></i>
            <span>{text}</span>
        </Link>
    </li>
);

// SubMenu component
const SubMenu = ({ id, icon, text, expandedMenu, handleMenuClick, children }) => (
    <li className="has_sub" id={id}>
        <Link
            href="#"
            className={`waves-effect ${expandedMenu[id] ? "active subdrop" : ""}`}
            onClick={(event) => handleMenuClick(id, event)}
        >
            <i className={`fa ${icon}`}></i>
            <span>{text}</span>
            <span className="menu-arrow"></span>
        </Link>
        <ul className={`list-unstyled ${expandedMenu[id] ? "d-block" : "d-none"}`}>
            {React.Children.map(children, (child) =>
                React.cloneElement(child, { activeItem: child.props.activeItem, getPath: child.props.getPath })
            )}
        </ul>
    </li>
);
