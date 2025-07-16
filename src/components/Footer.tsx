import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 text-sm">
            © Отзыв.PRO, 2025
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/about" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
              О нас
            </Link>
            <Link to="/rules" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
              Правила сайта
            </Link>
            <Link to="/contacts" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
              Контакты
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;