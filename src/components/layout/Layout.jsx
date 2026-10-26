import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <>
      <div id="navbar">
        <Navbar />
      </div>
      <main>{children}</main>
      <div id="site-footer">
        <Footer />
      </div>
    </>
  );
}

