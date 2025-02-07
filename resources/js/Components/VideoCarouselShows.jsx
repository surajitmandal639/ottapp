import React, { useEffect } from 'react';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
import { Link } from '@inertiajs/react';

export default function VideoShowsCarousel() {

  useEffect(() => {

    const $carousel = $(".video-shows-carousel");

    $carousel.owlCarousel({
      nav: true,
      margin: 20,
      navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
      responsive: {
        0: {
          items: 1,
          slideBy: 1
        },
        640: {
          items: 2,
          slideBy: 2
        },
        768: {
          items: 2,
          slideBy: 2
        },
        991: {
          items: 3,
          slideBy: 3
        },
        1198: {
          items: 3,
          slideBy: 3
        }
      }
    });

    return () => {
        $carousel.trigger('destroy.owl.carousel');
    };
  }, []);

  // Movie data
  const movies = [
    {
      id: 1,
      title: "Avatar: The Last Airbender",
      image_url: "https://videoportal.viavilab.com/upload/images/syc4jp5vlEBlI4QX3RSTUk52EUN.jpg",
      link: "https://videoportal.viavilab.com/shows/details/avatar-the-last-airbender/17",
      is_premium: true,
    },
    {
      id: 2,
      title: "Young Justice",
      image_url: "https://videoportal.viavilab.com/upload/images/3Id4UGssefRUWLdsh8MXx0nnxst.jpg",
      link: "https://videoportal.viavilab.com/shows/details/young-justice/16",
      is_premium: false,
    },
    {
      id: 3,
      title: "Avatar: The Last Airbender",
      image_url: "https://videoportal.viavilab.com/upload/images/syc4jp5vlEBlI4QX3RSTUk52EUN.jpg",
      link: "https://videoportal.viavilab.com/shows/details/avatar-the-last-airbender/17",
      is_premium: true,
    },
    {
      id: 4,
      title: "Young Justice",
      image_url: "https://videoportal.viavilab.com/upload/images/3Id4UGssefRUWLdsh8MXx0nnxst.jpg",
      link: "https://videoportal.viavilab.com/shows/details/young-justice/16",
      is_premium: false,
    },
    {
      id: 5,
      title: "Avatar: The Last Airbender",
      image_url: "https://videoportal.viavilab.com/upload/images/syc4jp5vlEBlI4QX3RSTUk52EUN.jpg",
      link: "https://videoportal.viavilab.com/shows/details/avatar-the-last-airbender/17",
      is_premium: true,
    },
    {
      id: 6,
      title: "Young Justice",
      image_url: "https://videoportal.viavilab.com/upload/images/3Id4UGssefRUWLdsh8MXx0nnxst.jpg",
      link: "https://videoportal.viavilab.com/shows/details/young-justice/16",
      is_premium: false,
    },

  ];


  return (
    <div className="video-shows-section vfx-item-ptb">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="vfx-item-section">
                <h3>Upcoming Shows</h3>
                <span className="view-more">
                    <Link href="https://videoportal.viavilab.com/collections/latest-movies/1" title="view-more">View All</Link>
                </span>
            </div>

            <div className="video-shows-carousel owl-carousel owl-loaded owl-drag">

            <div className="owl-stage-outer">
                <div className="owl-stage">
                  {movies.map((movie) => (
                    <div className="owl-item" key={movie.id} style={{ width: '172.143px', marginRight: '20px' }}>
                      <div className="single-video">
                        <Link href={movie.link} title={movie.title}>
                          <div className="video-img">

                            {movie?.is_premium && (
                                <div className="vid-lab-premium">
                                    <img src="https://videoportal.viavilab.com/site_assets/images/ic-premium.png" alt="premium" title="premium" />
                                </div>
                            )}

                            <span className="video-item-content">{movie.title}</span>
                            <img
                              src={movie.image_url}
                              alt={movie.title}
                              title={`Movies-${movie.title}`}
                            />
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
