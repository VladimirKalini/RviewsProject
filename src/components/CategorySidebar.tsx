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

const categories = [
  { name: 'IT и интернет', icon: Monitor, slug: 'it-internet' },
  { name: 'Рестораны', icon: UtensilsCrossed, slug: 'restaurants' },
  { name: 'Магазины', icon: ShoppingBag, slug: 'shops' },
  { name: 'Медицина', icon: Stethoscope, slug: 'medicine' },
  { name: 'Автомобили', icon: Car, slug: 'automotive' },
  { name: 'Образование', icon: GraduationCap, slug: 'education' },
  { name: 'Недвижимость', icon: Home, slug: 'real-estate' },
  { name: 'Услуги', icon: Wrench, slug: 'services' },
];

const CategorySidebar: React.FC = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Категории</h3>
      <div className="space-y-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.slug}
              to={`/category/${category.slug}`}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <Icon className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
              <span className="text-gray-700 group-hover:text-blue-600">
                {category.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySidebar;