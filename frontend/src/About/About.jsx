import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Banner from '../assets/Banner.jpg'

const About = () => {
  return (
    <div className="dark:bg-slate-900 dark:text-white">
      <Navbar />
      <div>
        <section className="container mx-auto py-10 px-4">
          <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
          <p className="text-lg text-center mb-8">
            Welcome to our website! We are dedicated to providing the best services and products to our customers. 
            Our mission is to deliver excellence and innovation through our offerings.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left: Image or illustration */}
            <div className="flex justify-center">
              <img
                src={Banner}
                alt="About Us"
                className="rounded-xl shadow-lg"
              />
            </div>

            {/* Right: Description */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-lg mb-4">
                We aim to create a seamless and user-friendly experience for all of our users. 
                Our platform is built on the principles of trust, quality, and continuous improvement.
              </p>
              <h2 className="text-2xl font-semibold mb-4">Meet Our Team</h2>
              <p className="text-lg">
                Our team is composed of passionate and talented individuals who work tirelessly 
                to bring our vision to life. We are here to support you every step of the way.
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
      
    </div>
    
  );
};

export default About;
