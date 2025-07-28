import React from 'react';
import Banner from './Banner';
import Featured from './Featured';
import ContactUs from './ContactUs';

const Home = () => {
    return (

        <div >
           <div className='w-11/12 mx-auto'>
             <Banner></Banner>
           </div>

            <div className='w-11/12 mx-auto'>
                <Featured></Featured>
            </div>

           <div className='w-11/12 mx-auto'>
             <ContactUs></ContactUs>
           </div>

        </div>
    );
};

export default Home;