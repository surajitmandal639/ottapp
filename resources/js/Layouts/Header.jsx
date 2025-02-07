import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import SearchPopup from './SearchPopup';
import MyImage from '@/Components/MyImage';

export default function Header() {
  console.log('Use PAge in resources>js>Layouts>Header : ', usePage());

  const { auth } = usePage().props;

  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Dummy data for movies, tvShows, and sports
  const movies = [
    { title: 'Movie 1', url: '/movie1', image: 'movie1.jpg', isPremium: true },
    { title: 'Movie 2', url: '/movie2', image: 'movie2.jpg', isPremium: false },
    // Add more movie objects as needed
  ];

  const tvShows = [
    { title: 'Show 1', url: '/show1', image: 'show1.jpg', isPremium: true },
    { title: 'Show 2', url: '/show2', image: 'show2.jpg', isPremium: false },
    // Add more TV show objects as needed
  ];

  const sports = [
    { title: 'Sport 1', url: '/sport1', image: 'sport1.jpg' },
    { title: 'Sport 2', url: '/sport2', image: 'sport2.jpg' },
    // Add more sport objects as needed
  ];

  // Function to toggle popup
  const toggleSearchPopup = () => {
    setShowSearchPopup(!showSearchPopup);
  };

  // Function to handle logout
  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      await router.post(route("logout"));  // Log out the user
    } catch (error) {
      console.log("Error when logging out: ", error);
    }
  };

  // / Function to check if a link is active
  const isActive = (path) => window.location.href === path ? 'active' : '';

  return (
    <>
      <header>

        <div className="main-menu">
          <nav className="header-section pin-style" style={{ top: '0px' }}>
            <div className="container-fluid">
              <div className="mod-menu">
                <div className="row">
                  {/* Logo Section */}
                  <div className="col-2">
                    <Link href={route('home')} title="logo" className="logo">
                      <img src={`${asset_url}/images/site_logo.png`} alt="logo" title="logo" />
                    </Link>
                  </div>

                  {/* Navigation Links Section */}
                  <div className="col-7 nav-order-last nopadding">
                    <div className="main-nav leftnav">
                      <ul className="top-nav">
                        <li className="visible-this d-md-none menu-icon">
                          <Link
                            href="#"
                            className="navbar-toggle collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target="#menu"
                            aria-expanded="false"
                            title="menu-toggle"
                          >
                            <i className="fa fa-bars"></i>
                          </Link>
                        </li>
                      </ul>
                      <div id="menu" className="header-menu">
                        <ul className="nav vfx-item-nav">
                          <li>
                            <Link href={route('home')} className={isActive(route('home')) || isActive(route('welcome'))} title="home">
                              Home
                            </Link>
                          </li>
                          {/* <li>
                            <Link href="/movies" title="Movies">
                              Movies
                            </Link>
                          </li>
                          <li>
                            <Link href="/shows" title="TV Shows">
                              TV Shows
                            </Link>
                          </li>
                          <li>
                            <Link href="/sports" title="Sports">
                              Sports
                            </Link>
                            <span className="arrow"></span>
                            <ul className="dm-align-2 mega-list">
                              <li>
                                <Link href="/sports?cat_id=2" title="Archery">
                                  Archery
                                </Link>
                              </li>
                              <li>
                                <Link href="/sports?cat_id=4" title="Badminton">
                                  Badminton
                                </Link>
                              </li>
                              <li>
                                <Link href="/sports?cat_id=5" title="Car Racing">
                                  Car Racing
                                </Link>
                              </li>
                              <li>
                                <Link href="/sports?cat_id=6" title="Cricket">
                                  Cricket
                                </Link>
                              </li>
                              <li>
                                <Link href="/sports?cat_id=7" title="Football">
                                  Football
                                </Link>
                              </li>
                              <li>
                                <Link href="/sports?cat_id=8" title="Hokey">
                                  Hokey
                                </Link>
                              </li>
                              <li>
                                <Link href="/sports?cat_id=9" title="Khelo India">
                                  Khelo India
                                </Link>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <Link href="/livetv" title="Live TV">
                              Live TV
                            </Link>
                            <span className="arrow"></span>
                            <ul className="dm-align-2 mega-list">
                              <li>
                                <Link href="/livetv?cat_id=2" title="Entertainment">
                                  Entertainment
                                </Link>
                              </li>
                              <li>
                                <Link href="/livetv?cat_id=3" title="Lifestyle">
                                  Lifestyle
                                </Link>
                              </li>
                              <li>
                                <Link href="/livetv?cat_id=1" title="LIVE TV">
                                  LIVE TV
                                </Link>
                              </li>
                              <li>
                                <Link href="/livetv?cat_id=4" title="Music">
                                  Music
                                </Link>
                              </li>
                              <li>
                                <Link href="/livetv?cat_id=5" title="News">
                                  News
                                </Link>
                              </li>
                              <li>
                                <Link href="/livetv?cat_id=6" title="Sports">
                                  Sports
                                </Link>
                              </li>
                            </ul>
                          </li> */}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* User and Actions Section */}
                  <div className="col-3">
                    <div className="right-sub-item-area ">
                      {/* Search Button */}
                      <div className="search-item-block me-2">
                        <button
                          type="button"
                          className="btn btn-default open"
                          title="search"
                          style={{
                            width: '36px',
                            textAlign: 'center',
                            borderRadius: '50px',
                            lineHeight: '38px',
                            height: '36px',
                            backgroundColor: '#ff0015',
                            border: 'none',
                            padding: '0',
                            transition: 'all 0.3s ease',
                            color: '#ffffff',
                          }}
                          onClick={toggleSearchPopup}
                        >
                          <i className="fa fa-search"></i>
                        </button>
                      </div>

                      {/* Subscribe Button */}
                      <div className="subscribe-btn-item me-2">
                        <Link href={route('memberships')} title="subscribe">
                          <MyImage type="" filename="" fallbackImage='ic-subscribe.png' altText="ic-subscribe" />
                        </Link>
                      </div>

                      {/* User Profile or Login Button */}
                      {auth?.user ? (
                        // <div className="user-menu dropdown">
                        //   <div className="user-name" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
                        //     <span>
                        //       <MyImage id="userPic" type="users" filename={auth?.user?.avatar} fallbackImage='avatar.png' altText="profile image" title="User Avatar" style={{ width: '32px', height: '32px', borderRadius: '50%' }}/>

                        //     </span>
                        //     {auth?.user?.name} <i className="fa fa-angle-down" id="userArrow"></i>
                        //   </div>

                        //   {/* Dropdown menu */}
                        //   <ul
                        //     className="content-user"
                        //     style={{
                        //       opacity: dropdownVisible ? 1 : 0,
                        //       visibility: dropdownVisible ? 'visible' : 'hidden',
                        //       transition: 'opacity 0.3s ease, visibility 0.3s ease',
                        //     }}
                        //   >
                        //     <li>
                        //       <Link href={route('dashboard')} title="Dashboard">
                        //         <i className="fa fa-database"></i> Dashboard
                        //       </Link>
                        //     </li>
                        //     <li>
                        //       <form
                        //           style={{ display: "inline" }}
                        //           onSubmit={handleSubmit}
                        //       >
                        //           <button type="submit" className="dropdown-item notify-item" > <i className="fa fa-sign-out"></i>Logout</button>
                        //       </form>
                        //     </li>
                        //   </ul>
                        // </div>

                        <div
                          className="dropdown"

                        >
                          <button
                            className="dropdown-toggle d-flex align-items-center"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            style={{
                              fontWeight: '700',
                              textTransform: 'uppercase',
                              alignItems: 'center',
                            }}
                          >
                            <span
                              style={{
                                display: 'inline-block',
                                width: '36px',
                                height: '36px',
                                marginRight: '10px',
                                borderRadius: '50%',
                                position: 'relative',
                                overflow: 'hidden',
                              }}
                            >
                              <MyImage
                                type="users"
                                filename={auth?.user?.avatar}
                                fallbackImage="avatar.png"
                                altText="profile image"
                                title="User Avatar"
                                style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                              />
                            </span>
                            {auth?.user?.name}

                          </button>
                          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li>
                              <Link href={route('dashboard')} className="dropdown-item" title="Dashboard">
                                <i className="fa fa-database"></i> Dashboard
                              </Link>
                            </li>
                            <li><Link href={route('profile.edit')} className="dropdown-item" title="Profile"><i className="fa fa-user"></i> Profile</Link></li>
                            <li><Link href={route('watchlist')} className="dropdown-item" title="My Watchlist"><i className="fa fa-list"></i> My Watchlist</Link></li>
                            <li>
                              <Link href="#" className="dropdown-item" onClick={handleLogout} >
                                <i className="fa fa-sign-out"></i> Logout
                              </Link>
                            </li>
                          </ul>
                        </div>




                      ) : (
                        <div className="signup-btn-item">
                          <Link href={route('login')} title="Login" className="d-flex">
                            <img src={`${asset_url}/images/ic-signup-user.png`} alt="ic-signup-user" title="signup-user" />
                            <span>Login</span>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Render the SearchPopup when showSearchPopup is true */}
      {showSearchPopup && (
        <SearchPopup
          isOpen={showSearchPopup}
          closePopup={() => setShowSearchPopup(false)}
          movies={movies}
          tvShows={tvShows}
          sports={sports}
        />
      )}
    </>
  );
}
