import Breadcrumb from '@/Components/Breadcrumb'
import { encryptString } from '@/helper'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Link } from '@inertiajs/react'
import React from 'react'

export default function Index({ breadcrumb, memberships }) {
  return (
    <>
      <Authenticated>
        <Breadcrumb data={breadcrumb} />
        <div className="vfx-item-ptb vfx-item-info">
          <div className="container-fluid">
            <div className="row">

              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                </div>
              </div>

              {memberships && memberships.map((plan, index) =>
                <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                  <div className="membership-plan-list">
                    <h3>{plan?.name}</h3>
                    <h1>
                      {/* <span>₹</span> */}
                      &#8377;
                      {plan?.price}
                    </h1>
                    <p></p>
                    <h4>{`${plan?.duration} ${plan?.duration_type}`}</h4>
                    <h4>Device Limit - {plan?.device_limit}</h4>
                    <Link href={route('payment-methods', encryptString(plan?.id))} className="vfx-item-btn-danger text-uppercase mb-30" title="plan">Select Plan</Link>
                  </div>
                </div>
              )}




            </div>

            

          </div>
        </div>
      </Authenticated>
    </>
  )
}
