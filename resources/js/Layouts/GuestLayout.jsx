
import { Link, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import '../../css/frontend.css';
import '../frontend.js';
import { loadStyle } from "@/helper";
import MyImage from "@/Components/MyImage";

export default function Guest({ children }) {
    
    const { settings } = usePage().props; 
    
    useEffect(() => {
        loadStyle(settings.general.styling);
    }, [settings]);
    

    return (
        <>   
               
            <div id="main-wrapper">
                <div className="container-fluid px-0 m-0 h-100 mx-auto">
                    <div className="row g-0 min-vh-100 overflow-hidden">
                        <div className="col-md-12">
                            <div className="hero-wrap d-flex align-items-center h-100">
                                

                                <div className="hero-mask"></div>
                                <div className="hero-bg hero-bg-scroll" style={{ backgroundImage: `url('${asset_url}/images/login-signup-bg-img.jpg')` }}></div>
                                
                                <div className="hero-content mx-auto w-100 h-100 d-flex flex-column justify-content-center">
                                    <div className="row">
                                        <div className="col-12 col-lg-5 col-xl-5 mx-auto">
                                            <div className="logo mt-40 mb-20 mb-md-0 justify-content-center d-flex text-center">
                                                <Link href={route('home')} title="logo">
                                                    <MyImage type="general_ettings" filename={`${settings.general.logo}`} fallbackImage="site_logo.png" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-4 col-md-6 col-sm-6 mx-auto d-flex align-items-center login-item-block">
            
                                        {children}

                                    </div>
                                
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
