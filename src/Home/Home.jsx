import React from 'react';
import Banner from './Banner';
import Featured from './Featured';
import ContactUs from './ContactUs';
import OpinionSlider from './OpinionSlider';
import VolunteersSection from './VolunteersSection';

const Home = () => {
  return (

    <div>

      <Banner></Banner>

      <Featured></Featured>
     <VolunteersSection></VolunteersSection>
      <OpinionSlider></OpinionSlider>
      <ContactUs></ContactUs>
      
    </div>
  );
};

export default Home;