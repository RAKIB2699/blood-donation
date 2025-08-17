import React from 'react';
import Banner from './Banner';
import Featured from './Featured';
import ContactUs from './ContactUs';
import OpinionSlider from './OpinionSlider';
import VolunteersSection from './VolunteersSection';
import StatsCards from './StatsCards';
import AboutUs from './AboutUs';
import HowToDonate from './HowToDonate';

const Home = () => {
  return (

    <div>

      <Banner></Banner>

      <Featured></Featured>
     <VolunteersSection></VolunteersSection>
      <OpinionSlider></OpinionSlider>
      <HowToDonate></HowToDonate>
      <StatsCards></StatsCards>
      <AboutUs></AboutUs>
      <ContactUs></ContactUs>
      
    </div>
  );
};

export default Home;