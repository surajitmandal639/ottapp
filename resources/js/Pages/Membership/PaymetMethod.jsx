import Breadcrumb from '@/Components/Breadcrumb';
import { showSuccessAlert, showErrorAlert } from '@/Components/SweetAlert';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Link, router, usePage } from '@inertiajs/react';

import React, { useState, useEffect } from 'react';

export default function PaymentMethod({ breadcrumb, plan, methods }) {
    const { user } = usePage().props.auth;
    const [totalPrice, setTotalPrice] = useState(plan?.price || 0); // Default to 0 if no plan price
    const [couponCode, setCouponCode] = useState('');
    
    // Handle applying coupon
    const handleApplyCoupon = async (e) => {
        e.preventDefault();

        if (!couponCode) {
            showErrorAlert('Please enter a coupon code.');
            return;
        }

        try {
            const response = await axios.post(route('apply-coupon'), {
                total_price: totalPrice,
                coupon_code: couponCode,
            });

            if (response.data.status === 'success') {
                setTotalPrice(response.data.final_price); // Update total price
                showSuccessAlert(response.data.message);
            } else {
                showErrorAlert(response.data.message);
            }
        } catch (error) {
            console.error(error);
            showErrorAlert('An error occurred while applying the coupon.');
        }
    };

    // Handle logout
    const handleLogout = async (event) => {
        event.preventDefault();
        try {
            await router.post(route('logout'));
        } catch (error) {
            console.error("Error during logout: ", error);
        }
    };

    return (
        <Authenticated>
            <Breadcrumb data={breadcrumb} />

            <div className="vfx-item-ptb vfx-item-info pb-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="payment-details-area">
                                <h3>Payment Method</h3>
                                <div className="select-plan-text">
                                    You have Selected <span>{plan?.name}</span> ₹ {totalPrice}
                                </div>
                                <p>
                                    You are Logged in as{' '}
                                    <Link href="#" title="user_email">
                                        {user?.email}
                                    </Link>
                                    . If you would like to use a different account for this subscription,{' '}
                                    <Link href="#" onClick={handleLogout} title="logout">
                                        Logout
                                    </Link>{' '}
                                    now.
                                </p>
                                <div className="mt-3">
                                    <Link href={route('memberships')} className="vfx-item-btn-danger text-uppercase">
                                        Change Plan
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12">
                            <div className="apply-coupon-code">
                                <h2>I Have Coupon Code</h2>
                                <form onSubmit={handleApplyCoupon} className="">
                                    <div className="apply-now-item">
                                        <input
                                            type="text"
                                            name="coupon_code"
                                            id="enterCode"
                                            className="form-control"
                                            placeholder="Enter Coupon Code"
                                            onChange={(e) => setCouponCode(e.target.value)}
                                            value={couponCode}
                                        />
                                        <button className="vfx-item-btn-danger text-uppercase" type="submit">
                                            Apply Coupon
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="row membership_plan_block">
                        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                            <div className="select-payment-method">
                                <h1>Paypal</h1>
                                <h4>For International Payment</h4>
                                <form
                                    method="POST"
                                    action="https://example.com/paypal/pay"
                                    acceptCharset="UTF-8"
                                    className=""
                                >
                                    <input type="hidden" name="plan_id" value={plan?.id} />
                                    <input type="hidden" name="amount" value={totalPrice} />
                                    <input type="hidden" name="plan_name" value={plan?.name} />
                                    <button type="submit" className="vfx-item-btn-danger text-uppercase">
                                        Pay Now
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
