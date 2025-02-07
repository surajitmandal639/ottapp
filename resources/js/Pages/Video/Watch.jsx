import MyImage from '@/Components/MyImage';
import MyVideo from '@/Components/MyVideo';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function Watch({ video }) {
    return (
        <>
            <Authenticated>
                <div className='page-content-area vfx-item-ptb pt-0'>
                    <div className="container-fluid d-flex align-items-center justify-content-center py-3" style={{ background: '#101018' }}>
                        <div className="card bg-dark border-0 shadow-lg">
                            <div className="card-body p-3">
                                <MyVideo
                                    filename={video?.video_local}
                                    className="rounded w-100"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="video-post-wrapper">
                                    <div className="row mt-30">

                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <div className="video-posts-data mt-0 mb-0">
                                                <div className="video-post-info">
                                                    <div className="d-flex dtl-title-block mb-2">
                                                        <h2 className="mb-0">Salaar: Part 1 - Ceasefire</h2>
                                                        <div className="video-watch-share-item">
                                                            <div className="subscribe-btn-item">
                                                                <Link href="#" title="Watch Trailer">
                                                                    <i className="fa fa-play-circle"></i> Watch Trailer
                                                                </Link>

                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="video-post-date">
                                                        <span className="video-posts-author">
                                                            <i className="fa fa-eye"></i>3.3K Views
                                                        </span>

                                                        <span className="video-posts-author">
                                                            <i className="fa fa-calendar-alt"></i>{video?.release_date}
                                                        </span>
                                                        
                                                        <span className="video-posts-author">
                                                            <i className="fa fa-clock"></i>{video?.duration}
                                                        </span>
                                                        
                                                        <span className="video-imdb-view">
                                                            <MyImage filename='imdb-logo.png' altText="imdb-logo" title="imdb-logo" />
                                                            {video?.imdb_rating}
                                                        </span>

                                                    </div>

                                                    <ul className="actor-video-link">
                                                        {video?.genres && video.genres.map((genre, index) => (
                                                            <li key={index}>
                                                                <Link
                                                                    href={route('video', { genre_id: genre?.id })}
                                                                    title={genre?.name}
                                                                >
                                                                    {genre?.name}
                                                                </Link>
                                                            </li>
                                                        ))}

                                                        {video?.languages && video.languages.map((language) => (
                                                            <li key={language?.id}>
                                                                <Link
                                                                    href={route('video', { language_id: language?.id })}
                                                                    title={language?.name}
                                                                >
                                                                    {language?.name}
                                                                </Link>
                                                            </li>
                                                        ))}

                                                    </ul>

                                                    <div className="video-watch-share-item">
                                                        <span className="btn-watchlist"><Link href="https://videoportal.viavilab.com/watchlist/add?post_id=20&amp;post_type=Movies" title="watchlist"><i className="fa fa-plus"></i>Add to Watchlist</Link></span>
                                                        <span className="btn-share"><Link href="#" className="nav-link" data-bs-toggle="modal" data-bs-target="#social-media"><i className="fas fa-share-alt mr-5"></i>Share</Link></span>

                                                        <div id="social-media" className="modal fade centered-modal in" tabIndex="-1" role="dialog" aria-labelledby="myModal" aria-hidden="true">
                                                            <div className="modal-dialog modal-md modal-dialog-centered" role="document">
                                                                <div className="modal-content bg-dark-2 text-light">
                                                                    <div className="modal-header">
                                                                        <h4 className="modal-title text-white">Share</h4>
                                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                    </div>
                                                                    <div className="modal-body p-4">
                                                                        <div className="social-media-modal">
                                                                            <ul>
                                                                                <li><Link title="Sharing" href="https://www.facebook.com/sharer/sharer.php?u=https://videoportal.viavilab.com/movies/details/salaar-part-1-ceasefire/20" className="facebook-icon" target="_blank"><i className="ion-social-facebook"></i></Link></li>
                                                                                <li><Link title="Sharing" href="https://twitter.com/intent/tweet?text=Salaar: Part 1 - Ceasefire&amp;url=https://videoportal.viavilab.com/movies/details/salaar-part-1-ceasefire/20" className="twitter-icon" target="_blank"><i className="ion-social-twitter"></i></Link></li>
                                                                                <li><Link title="Sharing" href="https://www.instagram.com/?url=https://videoportal.viavilab.com/movies/details/salaar-part-1-ceasefire/20" className="instagram-icon" target="_blank"><i className="ion-social-instagram"></i></Link></li>
                                                                                <li><Link title="Sharing" href="https://wa.me?text=https://videoportal.viavilab.com/movies/details/salaar-part-1-ceasefire/20" className="whatsapp-icon" target="_blank"><i className="ion-social-whatsapp"></i></Link></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>



                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    {/* <div className="vfx-tabs-item mt-30">
                                <input checked="checked" id="tab1" type="radio" name="pct" />
                                <input id="tab2" type="radio" name="pct" />
                                    <input id="tab3" type="radio" name="pct">
                                        <nav>
                                            <ul>
                                                <li className="tab1">
                                                    <label for="tab1">Description</label>
                                                </li>
                                                <li className="tab2">
                                                    <label for="tab2">Actors</label>
                                                </li>
                                                <li className="tab3">
                                                    <label for="tab3">Directors</label>
                                                </li>
                                            </ul>
                                        </nav>
                                        <section className="tabs_item_block">
                                            <div className="tab1">
                                                <div className="description-detail-item">

                                                    <p></p><p>In the city of Khansaar, Raja Mannar plans to make his son, Vardharaja Mannar his successor, but Raja Mannar's ministers and advisors plan a coup d'état by hiring armies from Russia and Serbia to attack and kill Vardha and Raja. Vardha, along with his brother and a few trusted men, manage to escape from Khansaar. Vardha goes to his childhood best friend, Deva, who learns about his predicament and sets out to make him the undisputed successor of Khansaar.</p><p></p>

                                                </div>
                                            </div>
                                            <div className="tab2">
                                                <div className="row">
                                                    <div className="col-lg-2 col-md-3 col-sm-4 col-xs-12 col-6">
                                                        <div className="actors-member-item">
                                                            <Link href="https://videoportal.viavilab.com/actors/bobby-simha/304" title="actors details">

                                                                <img src="https://videoportal.viavilab.com/upload/images/4luN7NwlKvenAkSDwjzZeWpWuoP.jpg" alt="Bobby Simha" title="Bobby Simha">


                                                                    <span>Bobby Simha</span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2 col-md-3 col-sm-4 col-xs-12 col-6">
                                                        <div className="actors-member-item">
                                                            <Link href="https://videoportal.viavilab.com/actors/easwari-rao/302" title="actors details">

                                                                <img src="https://videoportal.viavilab.com/upload/images/fjyvQ45YZcovy2Egj2eux8UiuHU.jpg" alt="Easwari Rao" title="Easwari Rao">


                                                                    <span>Easwari Rao</span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2 col-md-3 col-sm-4 col-xs-12 col-6">
                                                        <div className="actors-member-item">
                                                            <Link href="https://videoportal.viavilab.com/actors/jagapati-babu/303" title="actors details">

                                                                <img src="https://videoportal.viavilab.com/upload/images/bm72k6FmDxhxtZsl1xvxoz88Hkm.jpg" alt="Jagapati Babu" title="Jagapati Babu">


                                                                    <span>Jagapati Babu</span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2 col-md-3 col-sm-4 col-xs-12 col-6">
                                                        <div className="actors-member-item">
                                                            <Link href="https://videoportal.viavilab.com/actors/mime-gopi/307" title="actors details">

                                                                <img src="https://videoportal.viavilab.com/upload/images/gglNAjJMlCb0p7ig3OVpgsXMkMD.jpg" alt="Mime Gopi" title="Mime Gopi">


                                                                    <span>Mime Gopi</span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2 col-md-3 col-sm-4 col-xs-12 col-6">
                                                        <div className="actors-member-item">
                                                            <Link href="https://videoportal.viavilab.com/actors/prabhas/299" title="actors details">

                                                                <img src="https://videoportal.viavilab.com/upload/images/6naZ3oybdCtfggc5pTrcBDxOXrP.jpg" alt="Prabhas" title="Prabhas">


                                                                    <span>Prabhas</span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2 col-md-3 col-sm-4 col-xs-12 col-6">
                                                        <div className="actors-member-item">
                                                            <Link href="https://videoportal.viavilab.com/actors/pramod-panju/309" title="actors details">

                                                                <img src="https://videoportal.viavilab.com/upload/images/2URHh4gn72VYlgrrZrNaEyXjpPh.jpg" alt="Pramod Panju" title="Pramod Panju">


                                                                    <span>Pramod Panju</span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2 col-md-3 col-sm-4 col-xs-12 col-6">
                                                        <div className="actors-member-item">
                                                            <Link href="https://videoportal.viavilab.com/actors/prithviraj-sukumaran/300" title="actors details">

                                                                <img src="https://videoportal.viavilab.com/upload/images/a9f9Tkc4gEFq7OdYEN7UEOwln0T.jpg" alt="Prithviraj Sukumaran" title="Prithviraj Sukumaran">


                                                                    <span>Prithviraj Sukumaran</span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2 col-md-3 col-sm-4 col-xs-12 col-6">
                                                        <div className="actors-member-item">
                                                            <Link href="https://videoportal.viavilab.com/actors/ramachandra-raju/306" title="actors details">

                                                                <img src="https://videoportal.viavilab.com/upload/images/kU1a4H8o1IQA25Lyq3cW70aufhT.jpg" alt="Ramachandra Raju" title="Ramachandra Raju">


                                                                    <span>Ramachandra Raju</span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2 col-md-3 col-sm-4 col-xs-12 col-6">
                                                        <div className="actors-member-item">
                                                            <Link href="https://videoportal.viavilab.com/actors/shruti-haasan/301" title="actors details">

                                                                <img src="https://videoportal.viavilab.com/upload/images/1zYJuSccSA45VVBdgozpRcL99Rd.jpg" alt="Shruti Haasan" title="Shruti Haasan">


                                                                    <span>Shruti Haasan</span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2 col-md-3 col-sm-4 col-xs-12 col-6">
                                                        <div className="actors-member-item">
                                                            <Link href="https://videoportal.viavilab.com/actors/sriya-reddy/305" title="actors details">

                                                                <img src="https://videoportal.viavilab.com/upload/images/6AwGUf0uj7Dr6cwZkC53KNihPdj.jpg" alt="Sriya Reddy" title="Sriya Reddy">


                                                                    <span>Sriya Reddy</span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2 col-md-3 col-sm-4 col-xs-12 col-6">
                                                        <div className="actors-member-item">
                                                            <Link href="https://videoportal.viavilab.com/actors/tinnu-anand/308" title="actors details">

                                                                <img src="https://videoportal.viavilab.com/upload/images/6fkEiZKNp6jnOQmfQKEjVinhUeL.jpg" alt="Tinnu Anand" title="Tinnu Anand">


                                                                    <span>Tinnu Anand</span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="tab3">

                                                <div className="row">
                                                    <div className="col-lg-2 col-md-3 col-sm-4 col-xs-12 col-6">
                                                        <div className="actors-member-item">
                                                            <Link href="https://videoportal.viavilab.com/directors/prashanth-neel/310" title="directors details">

                                                                <img src="https://videoportal.viavilab.com/upload/images/oq6ydaurgC4NueXuo64R5QoFnfp.jpg" alt="Prashanth Neel" title="Prashanth Neel">

                                                                    <span>Prashanth Neel</span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        </section>
                                    </div>
                            </div> */}
                                </div>


                                {/* <div className="video-carousel-area vfx-item-ptb related-video-item">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-12 p-0">
                                        <div className="vfx-item-section">
                                            <h3>You May Also Like</h3>
                                        </div>
                                        <div className="video-carousel owl-carousel owl-loaded owl-drag">






















                                            <div className="owl-stage-outer"><div className="owl-stage" style="transform: translate3d(0px, 0px, 0px); transition: all; width: 1922px;"><div className="owl-item active" style="width: 172.143px; margin-right: 20px;"><div className="single-video">
                                                <Link href="https://videoportal.viavilab.com/movies/details/fighter/23" title="Fighter">
                                                    <div className="video-img">



                                                        <span className="video-item-content">Fighter</span>
                                                        <img src="https://videoportal.viavilab.com/upload/images/zDZowwb9GZGEctAu2PCpjiPQAMM.jpg" alt="Fighter" title="Fighter">
                                                    </div>
                                                </Link>
                                            </div></div><div className="owl-item active" style="width: 172.143px; margin-right: 20px;"><div className="single-video">
                                                <Link href="https://videoportal.viavilab.com/movies/details/maidaan/22" title="Maidaan">
                                                    <div className="video-img">


                                                        <div className="vid-lab-premium">
                                                            <img src="https://videoportal.viavilab.com/site_assets/images/ic-premium.png" alt="ic-premium" title="ic-premium">
                                                        </div>


                                                        <span className="video-item-content">Maidaan</span>
                                                        <img src="https://videoportal.viavilab.com/upload/images/b3ZIV3iLKtJvyDZncIyINYUIUdt.jpg" alt="Maidaan" title="Maidaan">
                                                    </div>
                                                </Link>
                                            </div></div><div className="owl-item active" style="width: 172.143px; margin-right: 20px;"><div className="single-video">
                                                <Link href="https://videoportal.viavilab.com/movies/details/shamshera/21" title="Shamshera">
                                                    <div className="video-img">


                                                        <div className="vid-lab-premium">
                                                            <img src="https://videoportal.viavilab.com/site_assets/images/ic-premium.png" alt="ic-premium" title="ic-premium">
                                                        </div>


                                                        <span className="video-item-content">Shamshera</span>
                                                        <img src="https://videoportal.viavilab.com/upload/images/rryN6GhaoovO3sM8IEqGyKgCmXf.jpg" alt="Shamshera" title="Shamshera">
                                                    </div>
                                                </Link>
                                            </div></div><div className="owl-item active" style="width: 172.143px; margin-right: 20px;"><div className="single-video">
                                                <Link href="https://videoportal.viavilab.com/movies/details/bawaal/19" title="Bawaal">
                                                    <div className="video-img">


                                                        <div className="vid-lab-premium">
                                                            <img src="https://videoportal.viavilab.com/site_assets/images/ic-premium.png" alt="ic-premium" title="ic-premium">
                                                        </div>


                                                        <span className="video-item-content">Bawaal</span>
                                                        <img src="https://videoportal.viavilab.com/upload/images/kT0mA3kYzvl2UZGxhJnLyTUYa2z.jpg" alt="Bawaal" title="Bawaal">
                                                    </div>
                                                </Link>
                                            </div></div><div className="owl-item active" style="width: 172.143px; margin-right: 20px;"><div className="single-video">
                                                <Link href="https://videoportal.viavilab.com/movies/details/jailer/18" title="Jailer">
                                                    <div className="video-img">



                                                        <span className="video-item-content">Jailer</span>
                                                        <img src="https://videoportal.viavilab.com/upload/images/pTmMxAHqX4vsIDE6HPPxOR0Q6TN.jpg" alt="Jailer" title="Jailer">
                                                    </div>
                                                </Link>
                                            </div></div><div className="owl-item active" style="width: 172.143px; margin-right: 20px;"><div className="single-video">
                                                <Link href="https://videoportal.viavilab.com/movies/details/ponniyin-selvan-part-ii/17" title="Ponniyin Selvan: Part II">
                                                    <div className="video-img">


                                                        <div className="vid-lab-premium">
                                                            <img src="https://videoportal.viavilab.com/site_assets/images/ic-premium.png" alt="ic-premium" title="ic-premium">
                                                        </div>


                                                        <span className="video-item-content">Ponniyin Selvan: Part II</span>
                                                        <img src="https://videoportal.viavilab.com/upload/images/1fMM5yjLYJNfO3CSQBpfC1kqeIK.jpg" alt="Ponniyin Selvan: Part II" title="Ponniyin Selvan: Part II">
                                                    </div>
                                                </Link>
                                            </div></div><div className="owl-item active" style="width: 172.143px; margin-right: 20px;"><div className="single-video">
                                                <Link href="https://videoportal.viavilab.com/movies/details/rocky-aur-rani-kii-prem-kahaani/16" title="Rocky Aur Rani Kii Prem Kahaani">
                                                    <div className="video-img">


                                                        <div className="vid-lab-premium">
                                                            <img src="https://videoportal.viavilab.com/site_assets/images/ic-premium.png" alt="ic-premium" title="ic-premium">
                                                        </div>


                                                        <span className="video-item-content">Rocky Aur Rani Kii Prem Kahaani</span>
                                                        <img src="https://videoportal.viavilab.com/upload/images/vTQIqlxUkOuyf2UKhlM2OUaFGKz.jpg" alt="Rocky Aur Rani Kii Prem Kahaani" title="Rocky Aur Rani Kii Prem Kahaani">
                                                    </div>
                                                </Link>
                                            </div></div><div className="owl-item" style="width: 172.143px; margin-right: 20px;"><div className="single-video">
                                                <Link href="https://videoportal.viavilab.com/movies/details/omg-2/14" title="OMG 2">
                                                    <div className="video-img">


                                                        <div className="vid-lab-premium">
                                                            <img src="https://videoportal.viavilab.com/site_assets/images/ic-premium.png" alt="ic-premium" title="ic-premium">
                                                        </div>


                                                        <span className="video-item-content">OMG 2</span>
                                                        <img src="https://videoportal.viavilab.com/upload/images/kApiO3oL6t100aCtkcwEhk2kqgK.jpg" alt="OMG 2" title="OMG 2">
                                                    </div>
                                                </Link>
                                            </div></div><div className="owl-item" style="width: 172.143px; margin-right: 20px;"><div className="single-video">
                                                <Link href="https://videoportal.viavilab.com/movies/details/tiger-3/13" title="Tiger 3">
                                                    <div className="video-img">



                                                        <span className="video-item-content">Tiger 3</span>
                                                        <img src="https://videoportal.viavilab.com/upload/images/7wgED7Yx9VLcNWSO91VgwicHmMD.jpg" alt="Tiger 3" title="Tiger 3">
                                                    </div>
                                                </Link>
                                            </div></div><div className="owl-item" style="width: 172.143px; margin-right: 20px;"><div className="single-video">
                                                <Link href="https://videoportal.viavilab.com/movies/details/animal/12" title="Animal">
                                                    <div className="video-img">


                                                        <div className="vid-lab-premium">
                                                            <img src="https://videoportal.viavilab.com/site_assets/images/ic-premium.png" alt="ic-premium" title="ic-premium">
                                                        </div>


                                                        <span className="video-item-content">Animal</span>
                                                        <img src="https://videoportal.viavilab.com/upload/images/hr9rjR3J0xBBKmlJ4n3gHId9ccx.jpg" alt="Animal" title="Animal">
                                                    </div>
                                                </Link>
                                            </div></div></div></div><div className="owl-nav"><button type="button" role="presentation" className="owl-prev disabled" aria-label="prev" aria-hidden="true"><i className="fas fa-angle-left"></i></button><button type="button" role="presentation" className="owl-next" aria-label="next" aria-hidden="true"><i className="fas fa-angle-right"></i></button></div><div className="owl-dots"><button role="button" className="owl-dot active"><span></span></button><button role="button" className="owl-dot"><span></span></button></div></div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                            </div>
                        </div>
                    </div>

                </div>
            </Authenticated>
        </>
    );
}
