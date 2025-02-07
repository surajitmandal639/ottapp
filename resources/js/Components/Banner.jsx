import { Link } from '@inertiajs/react'
import React from 'react'

export default function Banner() {
  return (
    <>
        <div className="vid-item-ptb banner_ads_item pb-1" style={{ padding: '15px 0' }}>
            <div className="container-fluid d-flex justify-content-center">
                <div className="row">
                    <div className="col-md-12">
                        <Link href="https://1.envato.market/JakrN" target="_blank"><img src="https://videoportal.viavilab.com/upload/ad-conent-one1.png" alt="banner_ads" title="Banner Ads" /></Link>
                    </div>
                </div>  
            </div>
        </div>
    </>
  )
}
