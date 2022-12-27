import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import { Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_stripe_key);

const PaymentModal = ({paymentInfo,setPaymentInfo,refetch}) => {
    const { name,  sale_price, price, img} =
    paymentInfo;
// console.log(paymentInfo)

    return (
        <div>
             <div className=''>
      <input type="checkbox" id="payment-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle ">
        <div className="modal-box">
          <label
            htmlFor="payment-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="flex justify-center">
            <img className="w-28" src={img} alt="" />
          </div>
          <h3 className="font-bold text-lg mt-4">{name}</h3>
          
          <p className="card-text">
            Price: $
            <span className="text-3xl font-semibold ">{sale_price}</span>{" "}
            <del>{price}</del>
          </p>
          <p className="card-text py-4">Meeting location: {'location'}</p>
          
         
          <Elements stripe={stripePromise}>
      <CheckoutForm 
      paymentInfo={paymentInfo}
      setPaymentInfo={setPaymentInfo}
      refetch={refetch}
      />
    </Elements>
        </div>
      </div>
    </div>
        </div>
    );
};

export default PaymentModal;