import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, LogOut, PlusCircle, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import StarRating from './StarRating';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    firstName: '',
    lastName: '',
    company: '',
    location: '',
    rating: 5,
    comment: '',
  });
  const [reviewSent, setReviewSent] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/company/${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({ ...prev, [name]: value }));
  };
  const handleReviewRating = (rating: number) => {
    setReviewForm(prev => ({ ...prev, rating }));
  };
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewSent(true);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            Отзыв.PRO
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Поиск компаний..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </form>
          </div>

          
          {/* Кнопка оставить отзыв (десктоп) */}
          <div className="hidden sm:flex items-center space-x-4">
            <Link
              to="/add-review"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Оставить отзыв
            </Link>
          </div>
          {/* Бургер-меню для мобильных */}
          <div className="flex sm:hidden">
            <button onClick={() => setMobileMenuOpen(open => !open)} className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none">
              <Menu className="h-7 w-7" />
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="absolute left-0 right-0 top-full z-50 w-full bg-white shadow-lg animate-slide-down">
              <div className="flex flex-col items-center p-6">
                <Link
                  to="/add-review"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-lg mb-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Оставить отзыв
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;