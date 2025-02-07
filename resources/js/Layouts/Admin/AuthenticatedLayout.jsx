import {  Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { showErrorAlert, showSuccessAlert } from "@/Components/SweetAlert";
import Loader from "@/Components/Loder";
import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";

export default function Authenticated({ children }) {
    const { flash } = usePage().props;
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
        
        return () => {

            router.on('start', () => {});
            router.on('finish', () => {});
        };
    }, []);

    return (
        <>
            {loading && <Loader />}

            <div className="fixed-left widescreen">
                <div id="wrapper">
                    <Topbar />
                    {/* <Sidebar /> */}
                    <div className="content-page">
                        <div className="content">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12">
                                    {children}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
}

{
    /* <footer class="footer text-right"> Copyright © 2024 <Link href="http://www.viaviweb.com" target="_blank">Viaviweb.com</Link>. All Rights Reserved. </footer>  */
}
