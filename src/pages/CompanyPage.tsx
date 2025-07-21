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
        title: `estoniamotors.ru отзывы - EstoniaMotors.ru официальный сайт | Reccomended.ru`,
        description: `${reviewsCount} отзывов о estoniamotors.ru ⭐ ${rating.toFixed(1)}/5. EstoniaMotors.ru - контрактные двигатели, коробки передач, автозапчасти из Эстонии. Официальный сайт estoniamotors.ru. Гарантия, быстрая доставка. Читайте реальные отзывы покупателей о estoniamotors.ru.`,
        keywords: `estoniamotors.ru, estoniamotors.ru отзывы, Estoniamotors.ru отзывы, ESTONIAMOTORS.RU, estoniamotors отзывы, estonia motors отзывы, EstoniaMotors.ru, эстония моторс, эстония моторс отзывы, estoniamotors ru отзывы, estoniamotors ру отзывы, estonia-motors.ru, www.estoniamotors.ru, estoniamotors сайт, estoniamotors официальный сайт, estoniamotors интернет магазин отзывы, контрактные двигатели эстония, коробки передач эстония, автозапчасти эстония, двигатель с гарантией, отзывы покупателей, запчасти из европы, контрактный мотор эстония, estonia motors ru, estoniamotors интернет магазин, эстониямоторс отзывы, контрактные запчасти отзывы, estoniamotors доставка, estoniamotors гарантия, эстония автозапчасти интернет магазин`,
        ogTitle: `estoniamotors.ru отзывы - ${reviewsCount} отзывов о EstoniaMotors.ru`,
        ogDescription: `Реальные отзывы о estoniamotors.ru интернет-магазине. EstoniaMotors.ru - контрактные двигатели и коробки передач с гарантией. Средняя оценка ${rating.toFixed(1)} из 5 звезд. Отзывы о estoniamotors.ru от реальных покупателей.`
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
             <meta name="author" content="estoniamotors.ru отзывы" />
             <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
             <meta name="revisit-after" content="1 days" />
             <meta name="rating" content="general" />
             <meta name="distribution" content="global" />
             <meta name="language" content="Russian" />
             <meta name="copyright" content="estoniamotors.ru отзывы" />
             <meta property="article:tag" content="estoniamotors.ru" />
             <meta property="article:tag" content="estoniamotors.ru отзывы" />
             <meta property="article:tag" content="Estoniamotors.ru отзывы" />
             <meta property="article:tag" content="estonia motors" />
             <meta property="article:tag" content="эстония моторс" />
             <meta property="article:tag" content="контрактные двигатели" />
             <meta property="article:tag" content="estoniamotors официальный сайт" />
             <meta property="article:tag" content="estoniamotors интернет магазин" />
             <meta name="geo.placename" content="Эстония" />
             <meta name="geo.region" content="EE" />
             <meta name="DC.title" content="estoniamotors.ru отзывы" />
             <meta name="DC.subject" content="estoniamotors.ru отзывы покупателей" />
             <meta name="DC.description" content="Отзывы о estoniamotors.ru - контрактные двигатели и коробки передач" />
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
               "ESTONIAMOTORS.RU",
               "www.estoniamotors.ru",
               "Estonia Motors", 
               "Эстония Моторс",
               "Estonia Motors ru",
               "estoniamotors ру",
               "эстониямоторс",
               "estoniamotors сайт",
               "estoniamotors официальный сайт"
             ] : undefined,
             "url": `https://reccomended.ru/company/${encodeURIComponent(decodedCompanyName)}`,
             "sameAs": decodedCompanyName === 'EstoniaMotors' ? [
               "https://estoniamotors.ru",
               "https://www.estoniamotors.ru",
               "https://reccomended.ru/company/EstoniaMotors"
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
         
         {/* FAQ структурированные данные для EstoniaMotors */}
         {decodedCompanyName === 'EstoniaMotors' && (
           <script type="application/ld+json">
             {JSON.stringify({
               "@context": "https://schema.org",
               "@type": "FAQPage",
               "mainEntity": [
                 {
                   "@type": "Question",
                   "name": "Что такое estoniamotors.ru?",
                   "acceptedAnswer": {
                     "@type": "Answer",
                     "text": "EstoniaMotors.ru - это интернет-магазин контрактных двигателей и коробок передач из Эстонии. На сайте estoniamotors.ru можно купить качественные автозапчасти с гарантией."
                   }
                 },
                 {
                   "@type": "Question", 
                   "name": "Какие отзывы о estoniamotors.ru?",
                   "acceptedAnswer": {
                     "@type": "Answer",
                     "text": "Отзывы о EstoniaMotors.ru в основном положительные. Покупатели отмечают качество товаров, быструю доставку и гарантию на продукцию estoniamotors.ru."
                   }
                 },
                 {
                   "@type": "Question",
                   "name": "Надежен ли сайт estoniamotors.ru?", 
                   "acceptedAnswer": {
                     "@type": "Answer",
                     "text": "По отзывам покупателей, EstoniaMotors.ru - надежный интернет-магазин. Компания предоставляет гарантию на товары и осуществляет быструю доставку."
                   }
                 },
                 {
                   "@type": "Question",
                   "name": "Где найти отзывы о estoniamotors.ru?",
                   "acceptedAnswer": {
                     "@type": "Answer", 
                     "text": "Отзывы о EstoniaMotors.ru можно найти на этой странице. Здесь собраны реальные мнения покупателей о estoniamotors.ru интернет-магазине."
                   }
                 }
               ]
             })}
           </script>
         )}
                   
          {/* Дополнительные ссылки для EstoniaMotors */}
          {decodedCompanyName === 'EstoniaMotors' && (
           <>
             <link rel="alternate" href={`https://reccomended.ru/company/EstoniaMotors`} hrefLang="ru" />
             <link rel="dns-prefetch" href="//estoniamotors.ru" />
             <link rel="preconnect" href="https://estoniamotors.ru" />
             <meta name="theme-color" content="#3b82f6" />
             <meta name="apple-mobile-web-app-title" content="estoniamotors.ru отзывы" />
             <meta name="application-name" content="estoniamotors.ru отзывы" />
             <meta name="msapplication-TileColor" content="#3b82f6" />
             <meta name="msapplication-tooltip" content="Отзывы о estoniamotors.ru" />
             <meta property="og:locale" content="ru_RU" />
             <meta property="og:image" content="https://reccomended.ru/favicon.png" />
             <meta property="og:image:width" content="300" />
             <meta property="og:image:height" content="300" />
             <meta property="og:image:alt" content="estoniamotors.ru отзывы" />
             <meta name="twitter:image" content="https://reccomended.ru/favicon.png" />
           </>
         )}
         
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
                    ? 'estoniamotors.ru отзывы - EstoniaMotors.ru официальный сайт'
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
              
              {/* SEO блок для EstoniaMotors */}
              {decodedCompanyName === 'EstoniaMotors' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <h2 className="text-xl font-semibold text-blue-900 mb-3">О компании estoniamotors.ru</h2>
                  <p className="text-blue-800 text-sm leading-relaxed">
                    <strong>EstoniaMotors.ru</strong> - официальный сайт интернет-магазина контрактных двигателей и коробок передач из Эстонии. 
                    На <strong>estoniamotors.ru</strong> вы найдете качественные автозапчасти с гарантией. 
                    Читайте реальные отзывы покупателей о <strong>estoniamotors.ru</strong> ниже на этой странице. 
                    Сайт <strong>EstoniaMotors.ru</strong> специализируется на продаже контрактных двигателей, коробок передач и других автозапчастей из Эстонии. 
                    Все отзывы о <strong>estoniamotors.ru</strong> от реальных покупателей помогут вам сделать правильный выбор.
                  </p>
                </div>
              )}
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {decodedCompanyName === 'EstoniaMotors' 
                  ? 'Отзывы о estoniamotors.ru - реальные мнения покупателей'
                  : 'Отзывы'
                }
              </h2>
              {loading ? (
                <div className="text-center text-gray-400">Загрузка...</div>
              ) : companyReviews.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                  <div className="text-gray-500 text-lg">
                    {decodedCompanyName === 'EstoniaMotors' 
                      ? 'Пока нет отзывов о estoniamotors.ru'
                      : 'Пока нет отзывов о компании'
                    }
                  </div>
                  <div className="text-gray-400 mt-2">
                    {isAuthenticated ? (
                      <>
                        Станьте первым, кто{' '}
                        <Link
                          to={`/add-review?company=${encodeURIComponent(decodedCompanyName)}`}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          {decodedCompanyName === 'EstoniaMotors' 
                            ? 'оставит отзыв о estoniamotors.ru'
                            : 'оставит отзыв'
                          }
                        </Link>
                        !
                      </>
                    ) : (
                      <>
                        <Link to="/login" className="text-blue-600 hover:text-blue-700">
                          Войдите
                        </Link>
                        {decodedCompanyName === 'EstoniaMotors' 
                          ? ', чтобы оставить первый отзыв о estoniamotors.ru!'
                          : ', чтобы оставить первый отзыв!'
                        }
                      </>
                    )}
                  </div>
                </div>
              ) : (
                companyReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} showCompanyName={false} />
                ))
              )}
              
              {/* FAQ секция для EstoniaMotors для SEO */}
              {decodedCompanyName === 'EstoniaMotors' && (
                <div className="bg-white border border-gray-200 rounded-lg p-6 mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Часто задаваемые вопросы о estoniamotors.ru</h3>
                  <div className="space-y-4">
                    <div className="border-b border-gray-200 pb-3">
                      <h4 className="font-medium text-gray-800 mb-2">Что такое estoniamotors.ru?</h4>
                      <p className="text-sm text-gray-600">EstoniaMotors.ru - это интернет-магазин контрактных двигателей и коробок передач из Эстонии. На сайте estoniamotors.ru можно купить качественные автозапчасти с гарантией.</p>
                    </div>
                    <div className="border-b border-gray-200 pb-3">
                      <h4 className="font-medium text-gray-800 mb-2">Какие отзывы о estoniamotors.ru?</h4>
                      <p className="text-sm text-gray-600">Отзывы о EstoniaMotors.ru в основном положительные. Покупатели отмечают качество товаров, быструю доставку и гарантию на продукцию estoniamotors.ru.</p>
                    </div>
                    <div className="border-b border-gray-200 pb-3">
                      <h4 className="font-medium text-gray-800 mb-2">Надежен ли сайт estoniamotors.ru?</h4>
                      <p className="text-sm text-gray-600">По отзывам покупателей, EstoniaMotors.ru - надежный интернет-магазин. Компания предоставляет гарантию на товары и осуществляет быструю доставку.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Где найти отзывы о estoniamotors.ru?</h4>
                      <p className="text-sm text-gray-600">Отзывы о EstoniaMotors.ru можно найти на этой странице. Здесь собраны реальные мнения покупателей о estoniamotors.ru интернет-магазине.</p>
                    </div>
                  </div>
                </div>
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