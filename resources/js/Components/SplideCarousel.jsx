import { Link } from '@inertiajs/react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import 'owl.carousel';
import MyImage from './MyImage';
import { encryptString } from '@/helper';

export default function SplideCarousel({ videos }) {


    return (
        <div className="slider-area pt-3">
            <div className="container-fluid">
                <div className="row">
                    <Splide
                        options={{
                            type: 'loop',
                            padding: '10%',
                            perPage: 1,
                            perMove: 1,
                            autoplay: true,
                            interval: 3000,
                            gap: '14px',
                            arrows: true,
                            pagination: false,
                            breakpoints: {
                                600: {
                                    perPage: 1,
                                },
                                900: {
                                    perPage: 2,
                                },
                            },
                        }}
                    >
                        {videos && videos.map((video, index) =>
                            <SplideSlide key={index}>
                                <div className="splide-slider-details-area">
                                    <Link href={route('video.details', encryptString(video?.id))} title={video?.name}>
                                        <h1>{video?.name}</h1>
                                    </Link>
                                    <div className='d-flex'>
                                        <Link href={route('video.details', encryptString(video?.id))} className="btn-watch d-flex" title={video?.name}>
                                            <MyImage type="" filename="ic-play.png" altText="ic-play" title="ic-play" />
                                            Watch
                                        </Link>
                                        <Link href={route('memberships')} className="btn-buy-plan d-flex" title="buy-plan">
                                            <MyImage type="" filename="ic-subscribe.png" altText="ic-subscribe" title="ic-subscribe" />
                                            Buy Plan
                                        </Link>
                                    </div>
                                </div>
                                <MyImage type="videos" filename={video?.poster} fallbackImage='poster.jpg' altText={video?.name || 'Video Image'} title={video?.name} />
                            </SplideSlide>
                        )}

                    </Splide>
                </div>
            </div>
        </div>

    );
}

