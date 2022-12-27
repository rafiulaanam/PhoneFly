import React from 'react';
import loading from '../../Assets/icon/loading.svg';

const Spinner = () => {
    return (
      <div className='bg-white h-screen text-black flex justify-center items-center'>
          <div className='flex'>
            <p className='lg:text-8xl text-2xl font-extrabold'>L</p>
            <img className='lg:w-24 w-7 mt-1 lg:mt-3' src={loading} alt=''/>
            <p className='lg:text-8xl text-2xl font-extrabold'>ading....</p>
        </div>
      </div>
    );
};

export default Spinner;