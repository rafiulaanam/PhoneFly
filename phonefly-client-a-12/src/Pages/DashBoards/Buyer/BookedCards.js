import React from 'react';

const BookedCards = ({book,setPaymentInfo}) => {
    const {name,status,payment,img,sale_price,price}= book;
    return (
        <div className='my-5'>
            <div className="card card-side bg-base-100 shadow-xl">
  <figure><img src={img} alt="Movie"/></figure>
  <div className="card-body">
    <h2 className="card-title">{name}</h2>
    <p className="card-text">
            Price: $
            <span className="text-3xl font-semibold ">{sale_price}</span>{" "}
            <del>{price}</del>
          </p>
    <p>Your product have already {status} but <span className='font-semibold'>{payment}</span></p>
    <p>Please Pay the payment and confirm your booking</p>
    <div className="card-actions justify-end">
        {
            payment === 'Unpaid' &&

            <label onClick={()=>setPaymentInfo(book)}  htmlFor="payment-modal" className="text-white border-none px-8 btn bg-gradient-to-r from-[#874da2] to-[#c43a30]">Pay</label>
        }
        {
            payment === 'Paid' &&

     <button className=" btn-disabled  btn-sm text-white border-none px-8 btn bg-gradient-to-r from-[#442f4e] to-[#632a26]">Paid</button>
        }
    </div>
  </div>
</div>
        </div>
    );
};

export default BookedCards;