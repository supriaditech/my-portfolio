import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const MasterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-black">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default MasterLayout;
