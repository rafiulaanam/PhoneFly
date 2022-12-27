import React from 'react';

const PrimaryButton = ({children}) => {
    return (
       <button className='text-white border-none px-8 btn bg-gradient-to-r from-[#874da2] to-[#c43a30]'>{children}</button>
    );
};

export default PrimaryButton;