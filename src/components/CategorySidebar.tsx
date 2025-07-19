import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Monitor, 
  UtensilsCrossed, 
  ShoppingBag, 
  Stethoscope, 
  Car, 
  GraduationCap,
  Home,
  Wrench
} from 'lucide-react';
import { useState } from 'react';

const categories = [
  { name: 'IT и интернет', icon: Monitor, slug: 'it-internet' },
  { name: 'Рестораны', icon: UtensilsCrossed, slug: 'restaurants' },
  { name: 'Магазины', icon: ShoppingBag, slug: 'shops' },
  { name: 'Медицина', icon: Stethoscope, slug: 'medicine' },
  { name: 'Автомобили', icon: Car, slug: 'auto' },
  { name: 'Образование', icon: GraduationCap, slug: 'education' },
  { name: 'Недвижимость', icon: Home, slug: 'real-estate' },
  { name: 'Услуги', icon: Wrench, slug: 'services' },
];

const CategorySidebar: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-white border border-gray-200 rounded-xl p-4 shadow-md">
      {/* Мобильный dropdown */}
      <div className="sm:hidden">
        <button
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-lg font-semibold text-gray-700 hover:bg-gray-100 transition shadow-sm"
        >
          Категории
          <svg className={`w-5 h-5 ml-2 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </button>
        {open && (
          <div className="mt-2 flex flex-col gap-2 bg-white border border-gray-100 rounded-xl shadow-lg p-2 animate-fade-in">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 hover:text-blue-600 text-base font-semibold"
                  onClick={() => setOpen(false)}
                >
                  <Icon className="h-6 w-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  <span>{category.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
      {/* Десктопный список */}
      <div className="hidden sm:flex flex-wrap gap-4 justify-start items-center">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.slug}
              to={`/category/${category.slug}`}
              className="flex items-center space-x-3 px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors group text-gray-700 hover:text-blue-600 text-lg font-semibold shadow-sm"
            >
              <Icon className="h-7 w-7 text-gray-400 group-hover:text-blue-600 transition-colors" />
              <span className="text-lg font-bold">{category.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default CategorySidebar;