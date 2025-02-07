import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { showErrorAlert, showSuccessAlert } from "@/Components/SweetAlert";
import Loader from "@/Components/Loder";
import MyImage from "@/Components/MyImage";

export default function Guest({ children }) {
    const { flash, settings } = usePage().props;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        import('/resources/css/backend.css');
        import('/resources/js/backend.js');

        if (flash?.success) {
            showSuccessAlert(flash.success);
        }

        if (flash?.error) {
            showErrorAlert(flash.error);
        }
    }, [flash.success, flash.error]);

    useEffect(() => {
        const startLoading = () => setLoading(true);
        const stopLoading = () => setLoading(false);

        router.on('start', startLoading);
        router.on('finish', stopLoading);

        // Cleanup function to remove the event listeners
        return () => {

            router.on('start', () => {});
            router.on('finish', () => {});
        };
    }, []);

    return (
        <>
            {loading && <Loader />}
            <div className="wrapper-page">
                <div className="text-center">
                    <Link href={route('home')} className="navbar-brand" target="_blank">
                        <MyImage type="general_ettings" filename={`${settings.general.logo}`} fallbackImage="site_logo.png" />
                    </Link>
                </div>

                <div className="m-t-20 card-box">
                    {children}
                </div>
            </div>
        </>
    );
}


