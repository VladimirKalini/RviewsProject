import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Review } from '../types';
import ReviewCard from '../components/ReviewCard';
import CompanyIcon from '../components/CompanyIcon';
import StarRating from '../components/StarRating';
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
import ReviewsWidget from '../components/ReviewsWidget';
import NewsSidebar from '../components/NewsSidebar';

const categories = {
  'it-internet': {
    name: 'IT и интернет',
    icon: Monitor,
    description: 'Отзывы о IT-компаниях, веб-студиях, разработчиках и интернет-сервисах'
  },
  'restaurants': {
    name: 'Рестораны',
    icon: UtensilsCrossed,
    description: 'Отзывы о ресторанах, кафе, службах доставки еды и общественном питании'
  },
  'shops': {
    name: 'Магазины',
    icon: ShoppingBag,
    description: 'Отзывы об интернет-магазинах, торговых центрах и розничных сетях'
  },
  'medicine': {
    name: 'Медицина',
    icon: Stethoscope,
    description: 'Отзывы о медицинских центрах, клиниках, врачах и медицинских услугах'
  },
  'auto': {
    name: 'Автомобили',
    icon: Car,
    description: 'Отзывы об автосалонах, автосервисах, страховых компаниях и автоуслугах'
  },
  'education': {
    name: 'Образование',
    icon: GraduationCap,
    description: 'Отзывы об учебных заведениях, курсах, тренингах и образовательных услугах'
  },
  'real-estate': {
    name: 'Недвижимость',
    icon: Home,
    description: 'Отзывы о риелторских агентствах, застройщиках и услугах по недвижимости'
  },
  'services': {
    name: 'Услуги',
    icon: Wrench,
    description: 'Отзывы о различных услугах: ремонт, клининг, юридические и другие'
  },
};

const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/server/data/reviews.json')
      .then(res => res.json())
      .then((data: Review[]) => {
        if (categorySlug) {
          setReviews(data.filter(r => r.category === categorySlug));
        } else {
          setReviews([]);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [categorySlug]);

  const category = categorySlug ? categories[categorySlug as keyof typeof categories] : null;

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Категория не найдена</h1>
          <p className="text-gray-600">Запрашиваемая категория не существует.</p>
        </div>
      </div>
    );
  }

  const Icon = category.icon;

  // Собираем уникальные компании с расчетом среднего рейтинга и кратким описанием
  const companyMap = new Map();
  reviews.forEach(r => {
    if (!companyMap.has(r.companyName)) {
      companyMap.set(r.companyName, {
        companyName: r.companyName,
        companyCategory: r.companyCategory,
        ratings: [r.rating],
        descriptions: [r.content]
      });
    } else {
      const c = companyMap.get(r.companyName);
      c.ratings.push(r.rating);
      c.descriptions.push(r.content);
    }
  });
  const companies = Array.from(companyMap.values()).map(c => ({
    ...c,
    avgRating: (c.ratings.reduce((a: number, b: number) => a + b, 0) / c.ratings.length).toFixed(1),
    shortDescription: c.descriptions[0]
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        {/* Category Header */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8 shadow-sm">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Icon className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
              <p className="text-gray-600 mt-2">{category.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <span>{reviews.length} {reviews.length === 1 ? 'отзыв' : reviews.length < 5 ? 'отзыва' : 'отзывов'}</span>
          </div>
        </div>
        <div className="flex flex-row gap-8">
          <aside className="w-80 shrink-0 hidden lg:block">
            <ReviewsWidget />
          </aside>
          <main className="flex-1">
            {/* Companies List (только компании, без отзывов) */}
            <div className="flex flex-col gap-4 mb-8">
              {companies.map(company => (
                <Link
                  key={company.companyName}
                  to={`/company/${encodeURIComponent(company.companyName)}`}
                  className="block bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <CompanyIcon category={company.companyCategory || 'tech'} />
                    <span className="text-xl font-bold text-gray-900">{company.companyName}</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <StarRating rating={Math.round(Number(company.avgRating))} size="sm" />
                    <span className="text-yellow-500 font-bold">{company.avgRating}</span>
                  </div>
                  <div className="text-gray-600 text-sm mb-1">
                    {company.shortDescription.slice(0, 60)}...
                  </div>
                </Link>
              ))}
            </div>
          </main>
          <aside className="w-80 shrink-0 hidden lg:block">
            <NewsSidebar />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;