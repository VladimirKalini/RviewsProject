import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import CategorySidebar from './CategorySidebar';
import { Outlet } from 'react-router-dom';
import ReviewsWidget from '../pages/ReviewsWidget';
import NewsSidebar from '../pages/Home';

const Layout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <div className="max-w-screen-xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        <CategorySidebar />
        <main className={mobileMenuOpen ? 'pt-32 transition-all duration-300' : ''}><Outlet /></main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout; 