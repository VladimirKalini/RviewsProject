import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PlusCircle, Building2 } from 'lucide-react';
import { Review } from '../types';
import ReviewCard from '../components/ReviewCard';
import StarRating from '../components/StarRating';
import { useAuth } from '../context/AuthContext';
import CompanyIcon from '../components/CompanyIcon';
import ReviewsWidget from '../components/ReviewsWidget';
import NewsSidebar from '../components/NewsSidebar';
import { API_ENDPOINTS, createApiUrl } from '../config/api';

const CompanyPage: React.FC = () => {
  const { companyName } = useParams<{ companyName: string }>();
  const { isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!companyName) {
      setReviews([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(createApiUrl(API_ENDPOINTS.COMPANY_REVIEWS(companyName)))
      .then(res => res.json())
      .then((data: Review[]) => {
        setReviews(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [companyName]);

  const decodedCompanyName = decodeURIComponent(companyName || '');
  const companyReviews = reviews;

  const averageRating = companyReviews.length > 0
    ? companyReviews.reduce((sum, review) => sum + review.rating, 0) / companyReviews.length
    : 0;

  // SEO мета-теги для каждой компании
  const getCompanySEO = (name: string, reviewsCount: number, rating: number) => {
    const baseTitle = `${name} отзывы - Reccomended.ru`;
    const baseDescription = `Читайте ${reviewsCount} отзывов о компании ${name}. Средняя оценка: ${rating.toFixed(1)} из 5. Реальные отзывы клиентов на Reccomended.ru`;
    
    // Специальные SEO данные для EstoniaMotors
    if (name === 'EstoniaMotors') {
      return {
        title: `EstoniaMotors.ru отзывы - Контрактные двигатели и коробки передач | Reccomended.ru`,
        description: `${reviewsCount} отзывов о EstoniaMotors.ru ⭐ ${rating.toFixed(1)}/5. Контрактные двигатели, коробки передач, автозапчасти из Эстонии. Гарантия, быстрая доставка. Читайте реальные отзывы покупателей.`,
        keywords: `estoniamotors.ru, estoniamotors отзывы, estonia motors отзывы, EstoniaMotors.ru, эстония моторс, эстония моторс отзывы, estoniamotors ru отзывы, контрактные двигатели эстония, коробки передач эстония, автозапчасти эстония, двигатель с гарантией, отзывы покупателей, запчасти из европы, контрактный мотор эстония, estonia motors ru, estoniamotors интернет магазин, эстониямоторс отзывы, контрактные запчасти отзывы`,
        ogTitle: `EstoniaMotors.ru - ${reviewsCount} отзывов о контрактных двигателях`,
        ogDescription: `Реальные отзывы о EstoniaMotors.ru. Контрактные двигатели и коробки передач с гарантией. Средняя оценка ${rating.toFixed(1)} из 5 звезд.`
      };
    }
    
    return {
      title: baseTitle,
      description: baseDescription,
      keywords: `${name} отзывы, ${name} отзывы клиентов, оценка компании ${name}`,
      ogTitle: `${name} - ${reviewsCount} отзывов`,
      ogDescription: baseDescription
    };
  };

  const seoData = getCompanySEO(decodedCompanyName, companyReviews.length, averageRating);

  const starsCount = [1, 2, 3, 4, 5].map(star =>
    companyReviews.filter(r => r.rating === star).length
  );
  const maxCount = Math.max(...starsCount, 1);

  return (
    <>
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        
        {/* Дополнительные мета-теги для EstoniaMotors */}
        {decodedCompanyName === 'EstoniaMotors' && (
          <>
            <meta name="author" content="EstoniaMotors.ru отзывы" />
            <meta name="robots" content="index, follow" />
            <meta name="google-site-verification" content="EstoniaMotors автозапчасти отзывы" />
            <meta property="article:tag" content="estoniamotors.ru" />
            <meta property="article:tag" content="estonia motors" />
            <meta property="article:tag" content="эстония моторс" />
            <meta property="article:tag" content="контрактные двигатели" />
            <meta name="geo.placename" content="Эстония" />
          </>
        )}
        
        {/* Open Graph теги для соцсетей */}
        <meta property="og:title" content={seoData.ogTitle} />
        <meta property="og:description" content={seoData.ogDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://reccomended.ru/company/${encodeURIComponent(decodedCompanyName)}`} />
        <meta property="og:site_name" content="Reccomended.ru" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={seoData.ogTitle} />
        <meta name="twitter:description" content={seoData.ogDescription} />
        
        {/* Структурированные данные для поисковиков */}
                 <script type="application/ld+json">
           {JSON.stringify({
             "@context": "https://schema.org",
             "@type": "Organization",
             "name": decodedCompanyName,
             "alternateName": decodedCompanyName === 'EstoniaMotors' ? [
               "EstoniaMotors.ru", 
               "estoniamotors.ru", 
               "Estonia Motors", 
               "Эстония Моторс",
               "Estonia Motors ru"
             ] : undefined,
             "url": `https://reccomended.ru/company/${encodeURIComponent(decodedCompanyName)}`,
             "sameAs": decodedCompanyName === 'EstoniaMotors' ? [
               "https://estoniamotors.ru"
             ] : undefined,
            "aggregateRating": companyReviews.length > 0 ? {
              "@type": "AggregateRating",
              "ratingValue": averageRating.toFixed(1),
              "reviewCount": companyReviews.length,
              "bestRating": "5",
              "worstRating": "1"
            } : undefined,
            "review": companyReviews.slice(0, 3).map(review => ({
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": review.authorName
              },
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": review.rating,
                "bestRating": "5",
                "worstRating": "1"
              },
              "reviewBody": review.content,
              "datePublished": review.createdAt
            }))
                     })}
         </script>
         
         {/* Хлебные крошки для навигации */}
         <script type="application/ld+json">
           {JSON.stringify({
             "@context": "https://schema.org",
             "@type": "BreadcrumbList",
             "itemListElement": [
               {
                 "@type": "ListItem",
                 "position": 1,
                 "name": "Главная",
                 "item": "https://reccomended.ru"
               },
               {
                 "@type": "ListItem", 
                 "position": 2,
                 "name": "Автомобили",
                 "item": "https://reccomended.ru/category/auto"
               },
               {
                 "@type": "ListItem",
                 "position": 3,
                 "name": `${decodedCompanyName} отзывы`,
                 "item": `https://reccomended.ru/company/${encodeURIComponent(decodedCompanyName)}`
               }
             ]
           })}
         </script>
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://reccomended.ru/company/${encodeURIComponent(decodedCompanyName)}`} />
      </Helmet>
      
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
                  <img 
                    src={companyReviews[0].logoUrl} 
                    alt={decodedCompanyName === 'EstoniaMotors' 
                      ? 'EstoniaMotors.ru логотип - контрактные двигатели и коробки передач'
                      : `${decodedCompanyName} логотип`
                    } 
                    className="w-12 h-12 rounded-lg border-2 border-gray-200 bg-white object-cover shadow-sm" 
                  />
                )}
                <CompanyIcon category={companyReviews[0]?.companyCategory || 'tech'} />
                <h1 className="text-3xl font-bold text-gray-900">
                  {decodedCompanyName === 'EstoniaMotors' 
                    ? 'EstoniaMotors.ru отзывы - Контрактные двигатели и коробки передач'
                    : `${decodedCompanyName} отзывы`
                  }
                </h1>
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
    </>
  );
};

export default CompanyPage;