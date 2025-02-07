import React, { useEffect } from 'react';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
import { Link } from '@inertiajs/react';

export default function SeasonVideoCarousel() {

  useEffect(() => {
    const $carousel =  $(".season-video-carousel");

    $carousel.owlCarousel({
        nav: true,
        margin: 20,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        responsive: {
           0: {
              items: 2,
              slideBy: 2,
              margin: 15
           },
           640: {
              items: 2,
              slideBy: 2
           },
           768: {
              items: 3,
              slideBy: 3
           },
           991: {
              items: 4,
              slideBy: 4
           },
           1198: {
              items: 5,
              slideBy: 5
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
      title: "East Bengal FC 0-1 Chennaiyin FC",
      image_url: "https://videoportal.viavilab.com/upload/images/East_Bengal_FC.jpg",
      link: "https://videoportal.viavilab.com/sports/details/east-bengal-fc-0-1-chennaiyin-fc/20",
      is_premium: true,
    },
    {
      id: 2,
      title: "Badminton Junior World Highlights",
      image_url: "https://videoportal.viavilab.com/upload/images/Badminton.jpg",
      link: "https://videoportal.viavilab.com/sports/details/badminton-junior-world-highlights/19",
      is_premium: false,
    },
    {
      id: 3,
      title: "East Bengal FC 0-1 Chennaiyin FC",
      image_url: "https://videoportal.viavilab.com/upload/images/East_Bengal_FC.jpg",
      link: "https://videoportal.viavilab.com/sports/details/east-bengal-fc-0-1-chennaiyin-fc/20",
      is_premium: true,
    },
    {
      id: 4,
      title: "Badminton Junior World Highlights",
      image_url: "https://videoportal.viavilab.com/upload/images/Badminton.jpg",
      link: "https://videoportal.viavilab.com/sports/details/badminton-junior-world-highlights/19",
      is_premium: false,
    },
    {
      id: 5,
      title: "East Bengal FC 0-1 Chennaiyin FC",
      image_url: "https://videoportal.viavilab.com/upload/images/East_Bengal_FC.jpg",
      link: "https://videoportal.viavilab.com/sports/details/east-bengal-fc-0-1-chennaiyin-fc/20",
      is_premium: true,
    },
    {
      id: 6,
      title: "Badminton Junior World Highlights",
      image_url: "https://videoportal.viavilab.com/upload/images/Badminton.jpg",
      link: "https://videoportal.viavilab.com/sports/details/badminton-junior-world-highlights/19",
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

            <div className="season-video-carousel owl-carousel owl-loaded owl-drag">

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
};
