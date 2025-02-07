import { SeasonCarousel, ShowsCarousel, VideoCarousel } from '@/Components/OwlCarousel';
import React, { useState, useEffect } from 'react';

export default function SearchPopup({ isOpen = true, closePopup }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredTvShows, setFilteredTvShows] = useState([]);
  const [filteredSports, setFilteredSports] = useState([]);

  const handleSearch = async (e) => {
    try {
      const searchValue = e.target.value;
      setSearchTerm(searchValue);
      if (searchValue.trim() === '') {
        setFilteredMovies([]);
        setFilteredTvShows([]);
        setFilteredSports([]);
        return;
      }

      const response = await axios.get(route('search'), { params: { searchTerm: searchValue } });

      if (response && response.data) {
        setFilteredMovies(response.data.videos || []);
        setFilteredTvShows(response.data.tvShows || []);
        setFilteredSports(response.data.sports || []);
      }
    } catch (error) {
      console.error('There was an error fetching the search results!', error);
    }
  };

  // Re-initialize Owl Carousel when results change
  useEffect(() => {
    if (filteredMovies.length > 0 || filteredTvShows.length > 0 || filteredSports.length > 0) {
      // Initialize Video Carousel
      $(".video-carousel").owlCarousel({
        nav: true,
        margin: 20,
        navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
        responsive: {
          0: { items: 2, slideBy: 2 },
          480: { items: 3, slideBy: 3 },
          768: { items: 4, slideBy: 4 },
          991: { items: 5, slideBy: 5 },
          1198: { items: 7, slideBy: 7 }
        }
      });
      
      // Initialize TV Shows Carousel
      $(".video-shows-carousel").owlCarousel({
        nav: true,
        margin: 20,
        navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
        responsive: {
          0: { items: 1, slideBy: 1 },
          640: { items: 2, slideBy: 2 },
          768: { items: 2, slideBy: 2 },
          991: { items: 2, slideBy: 2 },
          1198: { items: 3, slideBy: 3 }
        }
      });
      
      // Initialize Sports Carousel
      $(".tv-season-video-carousel").owlCarousel({
        nav: true,
        margin: 20,
        navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
        responsive: {
          0: { items: 1, slideBy: 1 },
          640: { items: 2, slideBy: 2 },
          768: { items: 3, slideBy: 3 },
          991: { items: 4, slideBy: 4 },
          1198: { items: 5, slideBy: 5 }
        }
      });
    }
  }, [filteredMovies, filteredTvShows, filteredSports]);

  if (!isOpen) return null;

  return (
    <div id="popup1" className="popup-overlay" style={{ visibility: 'visible', opacity: '1', zIndex: '999' }}>
      <div className="search">
        <div className="search-container has-results">
          <span className="title">Search</span>
          <div className="search-input">
            <input
              type="text"
              id="search_box"
              className="search-container-input"
              placeholder="Title"
              onChange={handleSearch}
              value={searchTerm}
              style={{ background: 'rgb(0, 0, 0)' }}
              autoComplete='off'
            />
          </div>
        </div>
        <div className="search-results mt-4" id="search_output">
          {/* Movies Section */}
          {filteredMovies.length > 0 && (            
            <div className="section section-padding bg-image tv_show gray_bg mb-3">
              <VideoCarousel videos={filteredMovies} />
            </div>
          )}

          {/* TV Shows Section */}
          {filteredTvShows.length > 0 && (
            <div className="section section-padding bg-image tv_show gray_bg">
              <ShowsCarousel />
            </div>
          )}

          {/* Sports Section */}
          {filteredSports.length > 0 && (
            <div className="section section-padding bg-image tv_show gray_bg">
              <SeasonCarousel />
            </div>
          )}

          {/* No Results Found */}
          {filteredMovies.length === 0 && filteredTvShows.length === 0 && filteredSports.length === 0 && (
            <p>No results found.</p>
          )}
        </div>
        <button className="close" onClick={closePopup}>
          <i className="fa fa-close"></i>
        </button>
      </div>
    </div>
  );
}
