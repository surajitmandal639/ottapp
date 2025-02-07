
import '../../css/frontend.css';
import '../frontend.js';
import { Head, usePage } from "@inertiajs/react";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";
import { loadStyle } from "@/helper";
import { showErrorAlert } from '@/Components/SweetAlert';

export default function Authenticated({ children }) {

    const { settings, title, flash } = usePage().props;

    useEffect(() => {
        loadStyle(settings.general.styling);  
        if (flash?.error){
            showErrorAlert(flash?.error);
        }     
        if (flash?.success){
            showErrorAlert(flash?.success);
        }     
    }, [settings]);

    // const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <>
            <Head title={title} />

            <Header />

            {children}

            <Footer />
        </>
    );
}
