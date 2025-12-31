import React from 'react';
import Navbar from './Navbar';
import Banner from './Banner';
import Footer from './Footer';
import ServiceBar from './ServiceBar';
import FlashSale from './FlashSell';
import CategorySection from './Categories';
import Newsletter from './NewsLetter';
import Testimonials from './Testimonials';

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Banner></Banner>
            <ServiceBar></ServiceBar>
            <FlashSale></FlashSale>
            <CategorySection></CategorySection>
            <Testimonials></Testimonials>
            <Newsletter></Newsletter>
            <Footer></Footer>
        </div>
    );
};

export default Home;