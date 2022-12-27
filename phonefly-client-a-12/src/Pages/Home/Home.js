import React from 'react';
import AdvertiseArea from './AdvertiseArea/AdvertiseArea';
import Banner from './Banner/Banner';
import Brand from './Brand/Brand';
import CategoryArea from './CategoryArea/CategoryArea';
import CustomerReview from './CustomerReview/CustomerReview';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <CategoryArea></CategoryArea>
            <AdvertiseArea></AdvertiseArea>
            <CustomerReview></CustomerReview>
            <Brand></Brand>
        </div>
    );
};

export default Home;