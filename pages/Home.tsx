import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import RoomList from '../components/RoomList';
import { Features, PricingCalculator, Testimonials } from '../components/FeaturesAndPricing';
import { BlogSection, ContactForm } from '../components/ContactAndBlog';

const Home: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <RoomList />
      <Features />
      <PricingCalculator />
      <Testimonials />
      <BlogSection />
      <ContactForm />
    </motion.div>
  );
};

export default Home;