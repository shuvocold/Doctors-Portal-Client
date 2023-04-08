import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useNavigation } from 'react-day-picker';
import { useLoaderData } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import CheckoutForm from './CheckoutForm';


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
// console.log(stripePromise);

const Payment = () => {
    const booking = useLoaderData();

    // loader function 
    // const navigation = useNavigation();

    const { treatment, price, slot, appointmentDate } = booking;
    // console.log(booking);

    // if (navigation.state === 'loading') {
    //     return <Loading></Loading>
    // }

    return (
        <div>
            <h3 className="text-3xl mb-2">Payment for - <span className='text-4xl font-bold text-primary'>{treatment}</span></h3>
            <p className="text-xl">Please pay <strong>${price}</strong> for your appointment {appointmentDate} at {slot}</p>

            <div className='w-96 my-6'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        booking={booking}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;