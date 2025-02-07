import { Link } from '@inertiajs/react'
import React from 'react'

export default function Footer() {
  return (
    <>
      <footer>
        <div className="footer-area vfx-item-ptb">
          <div className="footer-wrapper">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                  <div className="footer-bottom">
                    <div className="footer-links">
                      <ul>
                        <li><Link href={route('page', 'about-us')} title="About Us">About Us</Link></li>
                        <li><Link href={route('page', 'terms-of-use')} title="Terms Of Use">Terms Of Use</Link></li>
                        <li><Link href={route('page', 'privacy-policy')} title="Privacy Policy">Privacy Policy</Link></li>
                        <li><Link href={route('page', 'faq')} title="FAQ">FAQ</Link></li>
                        <li><Link href={route('page', 'contact-us')} title="Contact Us">Contact Us</Link></li>
                      </ul>
                    </div>
                    <div className="copyright-text">
                      <p>Copyright <span className='text-primary'>© 2024</span> <Link href={route('home')} target="_blank" rel="noopener noreferrer">video.com</Link>. All Rights Reserved.</p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">

                  <div className="single-footer">
                    <div className="footer-heading-wrap">
                      <h3 className="footer-heading">Connect with us</h3>
                    </div>
                    <div className="social-links">
                      <ul>
                        <li><Link href="https://www.facebook.com" title="facebook"><i className="fa fa-facebook"></i></Link></li>

                        <li><Link href="https://twitter.com" title="twitter"><i className="fa fa-twitter"></i></Link></li>

                        <li><Link href="https://www.instagram.com" title="instagram"><i className="fa fa-instagram"></i></Link></li>


                      </ul>
                    </div>
                  </div>
                </div>


                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <div className="single-footer">
                    <div className="footer-heading-wrap">
                      <h3 className="footer-heading">Apps</h3>
                    </div>
                    <div className="download-app-link-item">

                      <Link className="google-play-download" href="https://play.google.com/store/apps/dev?id=7157478532572017100" target="_blank" title="Google Play">
                          <img src={`${asset_url}/images/google-play.png`} alt="Google Play Download" title="Google Play Download" /></Link>


                      <Link className="apple-store-download" href="https://apps.apple.com/in/developer/vishal-pamar/id1141291247" target="_blank" title="Apple Store">
                          <img src={`${asset_url}/images/app-store.png`} alt="Apple Store Download" title="Apple Store Download" />
                      </Link>

                    </div>
                  </div>
                </div>



              </div>
            </div>
          </div>
        </div>

        <div className="scroll-top" style={{display: 'block'}}>
          <div className="scroll-icon"> <i className="fa fa-angle-up"></i> </div>
        </div>
      </footer>
    </>
  )
}
