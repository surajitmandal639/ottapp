import Banner from '@/Components/Banner';
import { SeasonCarousel, ShowsCarousel, VideoCarousel } from '@/Components/OwlCarousel';
import SplideCarousel from '@/Components/SplideCarousel';
import Footer from '@/Layouts/Footer';
import Header from '@/Layouts/Header';
import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import './../../../resources/css/frontend.css';
import './../../../resources/js/frontend.js';
import { loadStyle } from '@/helper';

export default function Welcome({ videos }) {    
    const { settings, title } = usePage().props;

    useEffect(() => {
        loadStyle(settings.general.styling);       
    }, [settings]);
    
    return (
        <>
            <Head title={title} />

            <Header />

            <SplideCarousel videos={videos} />

            <Banner />

            <VideoCarousel videos={videos}/>

            <ShowsCarousel />
            
            <SeasonCarousel />

            <Footer />


        </>
    );
}


