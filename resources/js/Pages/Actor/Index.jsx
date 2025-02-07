import MyImage from '@/Components/MyImage'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import React from 'react'

export default function Index({ actor }) {
    console.log(actor?.images[0]);
    
    return (
        <>
            <Authenticated>
                <div class="page-content-area vfx-item-ptb pt-3">
                    <div class="container-fluid">

                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                <div class="actors-detail-wrapper media align-items-start d-flex">

                                    <div class="actors-profile">
                                        <MyImage type='actors' filename={actor?.images[0].filename} fallbackImage='actor.jpg' altText={actor?.name} title={actor?.name} />


                                    </div>

                                    <div class="media-body actors-info-details">
                                        <h4 className='text-capitalize'>{actor?.name}</h4>
                                        <span class="des-bold-text"><strong>Place of Birth:</strong> {actor?.place_of_birth}</span>
                                        <span class="des-bold-text"><strong>Birthday:</strong> {actor?.date_of_birth}</span>
                                        <span class="des-bold-text"><strong>Bio:</strong> {actor?.bio}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Authenticated>
        </>
    )
}
