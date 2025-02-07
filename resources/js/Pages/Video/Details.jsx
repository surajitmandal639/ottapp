

import { VideoCarousel } from '@/Components/OwlCarousel';
import React from 'react'
import Banner from '@/Components/Banner';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { encryptString } from '@/helper';
import MyImage from '@/Components/MyImage';
import { Link } from '@inertiajs/react';

export default function Details({ video, videos }) {
    console.log(video, videos);

    return (
        <>
            <Authenticated>

                <div className="page-content-area vfx-item-ptb pt-3">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-7 col-md-12 col-sm-12 col-xs-12 mb-4">
                                <div className="detail-poster-area">

                                    <div className="play-icon-item">
                                        <Link className="icon" href={route('video.watch', encryptString(video?.id))} title="play">
                                            <i className="icon fa fa-play"></i><span className="ripple"></span>
                                        </Link>
                                    </div>

                                    <div className="video-post-date">
                                        <span className="video-posts-author">
                                            <i className="fa fa-eye"></i>1.3K Views
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

                                        <div className="video-watch-share-item">

                                            <span className="btn-watchlist">
                                                <Link href={route('add-to-watchlist',)} title="watchlist">
                                                    <i className="fa fa-plus"></i>
                                                    Add to Watchlist
                                                </Link>
                                            </span>

                                            <span className="btn-share">
                                                <Link href="#" className="nav-link" data-bs-toggle="modal" data-bs-target="#social-media">
                                                    <i className="fa fa-share-alt mr-5"></i>
                                                    Share
                                                </Link>
                                            </span>

                                        </div>
                                    </div>

                                    <div id="social-media" className="modal fade centered-modal" tabIndex="-1" role="dialog" aria-labelledby="myModal" aria-hidden="true">
                                        <div className="modal-dialog modal-md modal-dialog-centered" role="document">
                                            <div className="modal-content bg-dark-2 text-light">
                                                <div className="modal-header">
                                                    <h4 className="modal-title text-white">Share</h4>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body p-4">
                                                    <div className="social-media-modal">
                                                        <ul>
                                                            <li><Link title="Sharing" href="https://www.facebook.com/sharer/sharer.php?u=https://videoportal.viavilab.com/movies/details/jawan/10" className="facebook-icon" target="_blank"><i className="ion-social-facebook"></i></Link></li>
                                                            <li><Link title="Sharing" href="https://twitter.com/intent/tweet?text=Jawan&amp;url=https://videoportal.viavilab.com/movies/details/jawan/10" className="twitter-icon" target="_blank"><i className="ion-social-twitter"></i></Link></li>
                                                            <li><Link title="Sharing" href="https://www.instagram.com/?url=https://videoportal.viavilab.com/movies/details/jawan/10" className="instagram-icon" target="_blank"><i className="ion-social-instagram"></i></Link></li>
                                                            <li><Link title="Sharing" href="https://wa.me?text=https://videoportal.viavilab.com/movies/details/jawan/10" className="whatsapp-icon" target="_blank"><i className="ion-social-whatsapp"></i></Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="dtl-poster-img">
                                        <MyImage type='videos' filename={video?.poster} fallbackImage='poster.jpg' altText={video?.name} title={video?.name} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12 mb-4">
                                <div className="poster-dtl-item">
                                    <h2>
                                        <Link href={route('video.watch', encryptString(video?.id))} title={video?.name}>
                                            {video?.name}
                                        </Link>
                                    </h2>

                                    <ul className="dtl-list-link">
                                        {video?.genres && video.genres.map((genre, index) => (
                                            <li key={index}>
                                                <Link
                                                    href={route('video', { genre_id: encryptString(genre?.id) })}
                                                    title={genre?.name}
                                                >
                                                    {genre?.name}
                                                </Link>
                                            </li>
                                        ))}

                                        {video?.languages && video.languages.map((language) => (
                                            <li key={language?.id}>
                                                <Link
                                                    href={route('video', { language_id: encryptString(language?.id) })}
                                                    title={language?.name}
                                                >
                                                    {language?.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="video-watch-share-item mb-3">
                                        <div className="subscribe-btn-item" style={{ marginLeft: '0px !important' }}>
                                            <Link href="#" title="Watch Trailer">
                                                <i className="fa fa-play-circle"></i> Watch Trailer
                                            </Link>
                                        </div>
                                    </div>

                                    <span className="des-bold-text">
                                        <strong>Actors:</strong>&nbsp;
                                        {video?.actors &&
                                            video.actors.map((actor, index) => (
                                                <React.Fragment key={actor.id || index}>
                                                    <Link
                                                        href={route('actors.details', [actor.name.toLowerCase().replace(/\s+/g, '-'), encryptString(actor.id)])}
                                                        title={actor.name}
                                                    >
                                                        {actor.name}
                                                    </Link>
                                                    {index < video.actors.length - 1 && ', '}
                                                </React.Fragment>
                                            ))}
                                    </span>




                                    <span className="des-bold-text"><strong>Directors:</strong>&nbsp;

                                        <Link href="https://videoportal.viavilab.com/directors/atlee/174" title="directors">Atlee</Link>

                                    </span>

                                    <h3>An emotional journey of a prison warden, driven by a personal vendetta while keeping up to a promise made years ago, recruits inmates to commit outrageous crimes that shed light on corruption and injustice, in an attempt to get even with his past, and that leads him to an unexpected reunion.</h3>

                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="video-carousel-area vfx-item-ptb related-video-item">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-12 p-0">
                                            <div className="vfx-item-section">
                                                <h3>You May Also Like</h3>

                                            </div>

                                            <VideoCarousel videos={videos} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Banner></Banner>

            </Authenticated>
        </>
    )
}
