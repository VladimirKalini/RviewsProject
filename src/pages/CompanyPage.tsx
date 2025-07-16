import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PlusCircle, Building2 } from 'lucide-react';
import { Review } from '../types';
import ReviewCard from '../components/ReviewCard';
import StarRating from '../components/StarRating';
import { useAuth } from '../context/AuthContext';

// Mock data for demonstration
const mockReviews: Review[] = [
  {
    id: '1',
    companyName: 'TechCorp',
    rating: 4,
    title: 'Отличный сервис',
    content: 'Компания предоставляет качественные услуги. Персонал вежливый и профессиональный. Рекомендую всем, кто ищет надежного партнера в сфере IT.',
    authorId: 'sample-user-1',
    authorName: 'Иван Петров',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: '2',
    companyName: 'TechCorp',
    rating: 5,
    title: 'Превосходная работа',
    content: 'Заказывал разработку мобильного приложения. Результат превзошел все ожидания. Работа выполнена в срок, качество на высшем уровне.',
    authorId: 'sample-user-2',
    authorName: 'Мария Сидорова',
    createdAt: new Date(Date.now() - 172800000).toISOString()
  }
];

const CompanyPage: React.FC = () => {
  const { companyName } = useParams<{ companyName: string }>();
  const { isAuthenticated } = useAuth();

  const decodedCompanyName = decodeURIComponent(companyName || '');
  
  // Filter reviews for this company
  const companyReviews = mockReviews.filter(
    review => review.companyName.toLowerCase() === decodedCompanyName.toLowerCase()
  );

  const averageRating = companyReviews.length > 0 
    ? companyReviews.reduce((sum, review) => sum + review.rating, 0) / companyReviews.length
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Company Header */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <Building2 className="h-8 w-8 text-blue-600" />
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

          {isAuthenticated ? (
            <Link
              to={`/add-review?company=${encodeURIComponent(decodedCompanyName)}`}
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusCircle className="h-5 w-5" />
              <span>Оставить отзыв об этой компании</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <span>Войдите, чтобы оставить отзыв</span>
            </Link>
          )}
        </div>

        {/* Reviews */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Отзывы</h2>
          
          {companyReviews.length === 0 ? (
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
      </div>
    </div>
  );
};

export default CompanyPage;