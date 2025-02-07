// resources/js/Laouts/Footer.jsx

import { Link } from '@inertiajs/react';
import React from 'react';

export const Footer = () => {
    return (
        <footer className="footer text-right">
            Copyright <span className='text-primary'>© 2024</span> <Link href={route('home')} target="_blank" rel="noopener noreferrer">video.com</Link>. All Rights Reserved.
        </footer>
    );
};

