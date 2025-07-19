import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PlusCircle, Building2 } from 'lucide-react';
import { Review } from '../types';
import ReviewCard from '../components/ReviewCard';
import StarRating from '../components/StarRating';
import { useAuth } from '../context/AuthContext';
import CompanyIcon from '../components/CompanyIcon';
import ReviewsWidget from '../components/ReviewsWidget';
import NewsSidebar from '../components/NewsSidebar';

const CompanyPage: React.FC = () => {
  const { companyName } = useParams<{ companyName: string }>();
  const { isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/server/data/reviews.json')
      .then(res => res.json())
      .then((data: Review[]) => {
        if (companyName) {
          setReviews(data.filter(r => r.companyName.toLowerCase() === decodeURIComponent(companyName).toLowerCase()));
        } else {
          setReviews([]);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [companyName]);

  const decodedCompanyName = decodeURIComponent(companyName || '');
  const companyReviews = reviews;

  const averageRating = companyReviews.length > 0
    ? companyReviews.reduce((sum, review) => sum + review.rating, 0) / companyReviews.length
    : 0;

  const starsCount = [1, 2, 3, 4, 5].map(star =>
    companyReviews.filter(r => r.rating === star).length
  );
  const maxCount = Math.max(...starsCount, 1);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
        <div className="flex flex-row gap-8">
          <aside className="w-80 shrink-0 hidden lg:block">
            <ReviewsWidget />
          </aside>
          <main className="flex-1">
            <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                {companyReviews[0]?.logoUrl && (
                  <img src={companyReviews[0].logoUrl} alt={decodedCompanyName} className="w-12 h-12 rounded-lg border-2 border-gray-200 bg-white object-cover shadow-sm" />
                )}
                <CompanyIcon category={companyReviews[0]?.companyCategory || 'tech'} />
                <h1 className="text-3xl font-bold text-gray-900">{decodedCompanyName}</h1>
              </div>
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-2">
                  <StarRating rating={Math.round(averageRating)} size="lg" />
                  <span className="text-xl font-semibold text-gray-900">
                    {averageRating.toFixed(1)}
                  </span>
                </div>
                <div className="text-gray-600">
                  {companyReviews.length} {companyReviews.length === 1 ? 'отзыв' : 'отзывов'}
                </div>
              </div>
              {/* График распределения отзывов по звёздам */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">Распределение отзывов по оценкам</h3>
                <div className="flex flex-col gap-1">
                  {[5,4,3,2,1].map((star, idx) => (
                    <div key={star} className="flex items-center gap-2">
                      <span className="w-8 text-sm font-bold text-yellow-500">{star}★</span>
                      <div className="flex-1 bg-gray-100 rounded h-4 relative">
                        <div className="bg-blue-400 h-4 rounded" style={{width: `${(starsCount[star-1]/maxCount)*100}%`, minWidth: starsCount[star-1] ? '1.5rem' : 0}}></div>
                      </div>
                      <span className="w-6 text-gray-700 text-sm">{starsCount[star-1]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Отзывы</h2>
              {loading ? (
                <div className="text-center text-gray-400">Загрузка...</div>
              ) : companyReviews.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                  <div className="text-gray-500 text-lg">Пока нет отзывов о компании</div>
                  <div className="text-gray-400 mt-2">
                    {isAuthenticated ? (
                      <>
                        Станьте первым, кто{' '}
                        <Link
                          to={`/add-review?company=${encodeURIComponent(decodedCompanyName)}`}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          оставит отзыв
                        </Link>
                        !
                      </>
                    ) : (
                      <>
                        <Link to="/login" className="text-blue-600 hover:text-blue-700">
                          Войдите
                        </Link>
                        , чтобы оставить первый отзыв!
                      </>
                    )}
                  </div>
                </div>
              ) : (
                companyReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} showCompanyName={false} />
                ))
              )}
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

export default CompanyPage;