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
    const apiUrl = createApiUrl(API_ENDPOINTS.COMPANY_REVIEWS(companyName));
    console.log('Fetching reviews from:', apiUrl);
    
    fetch(apiUrl)
      .then(res => {
        console.log('Response status:', res.status);
        return res.json();
      })
      .then((data: Review[]) => {
        console.log('Received reviews:', data.length, 'items');
        setReviews(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
        setLoading(false);
      });
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
    
         // Специальные SEO данные для MotorZen.ru
     if (name === 'MotorZen.ru') {
       return {
         title: `motorzen.ru отзывы - MotorZen.ru официальный сайт | Reccomended.ru`,
         description: `${reviewsCount} отзывов о motorzen.ru ⭐ ${rating.toFixed(1)}/5. MotorZen.ru - контрактные двигатели, коробки передач, автозапчасти с гарантией. Официальный сайт motorzen.ru. Быстрая доставка по России. Читайте реальные отзывы покупателей о motorzen.ru.`,
         keywords: `motorzen.ru отзывы, Motorzen.ru отзывы, отзывы motorzen, motorzen отзывы покупателей, motor zen отзывы, моторзен отзывы, motorzen ru отзывы, motorzen ру отзывы, отзывы о motorzen.ru, отзывы покупателей motorzen, motorzen отзывы, MotorZen отзывы, MOTORZEN отзывы, motorzen.ru, MotorZen.ru, MOTORZEN.RU, www.motorzen.ru, motorzen сайт, motorzen официальный сайт, motorzen интернет магазин отзывы, моторзен отзывы, отзывы моторзен, контрактные двигатели отзывы, коробки передач отзывы, автозапчасти отзывы, запчасти motorzen`,
         ogTitle: `motorzen.ru отзывы - ${reviewsCount} отзывов о MotorZen.ru`,
         ogDescription: `Реальные отзывы о motorzen.ru интернет-магазине. MotorZen.ru - контрактные двигатели и коробки передач с гарантией. Средняя оценка ${rating.toFixed(1)} из 5 звезд. Отзывы о motorzen.ru от реальных покупателей.`
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
        
                                   {/* Дополнительные мета-теги для MotorZen.ru */}
          {decodedCompanyName === 'MotorZen.ru' && (
           <>
                            <meta name="author" content="motorzen.ru отзывы" />
               <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
               <meta name="revisit-after" content="1 days" />
               <meta name="rating" content="general" />
               <meta name="distribution" content="global" />
               <meta name="language" content="Russian" />
               <meta name="copyright" content="motorzen.ru отзывы" />
               <meta property="article:tag" content="motorzen.ru" />
               <meta property="article:tag" content="motorzen.ru отзывы" />
               <meta property="article:tag" content="Motorzen.ru отзывы" />
               <meta property="article:tag" content="motor zen" />
               <meta property="article:tag" content="моторзен" />
               <meta property="article:tag" content="контрактные двигатели" />
               <meta property="article:tag" content="motorzen официальный сайт" />
               <meta property="article:tag" content="motorzen интернет магазин" />
               <meta name="geo.placename" content="Россия" />
               <meta name="geo.region" content="RU" />
               <meta name="DC.title" content="motorzen.ru отзывы" />
               <meta name="DC.subject" content="motorzen.ru отзывы покупателей" />
               <meta name="DC.description" content="Отзывы о motorzen.ru - контрактные двигатели и коробки передач с гарантией" />
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
                           "alternateName": decodedCompanyName === 'MotorZen.ru' ? [
                "MotorZen.ru", 
                "motorzen.ru", 
                "MOTORZEN.RU",
                "www.motorzen.ru",
                "Motor Zen", 
                "Моторзен",
                "Motor Zen ru",
                "motorzen ру",
                "моторзен",
                "motorzen сайт",
                "motorzen официальный сайт"
              ] : undefined,
             "url": `https://reccomended.ru/company/${encodeURIComponent(decodedCompanyName)}`,
                           "sameAs": decodedCompanyName === 'MotorZen.ru' ? [
                "https://motorzen.ru",
                "https://www.motorzen.ru",
                "https://reccomended.ru/company/MotorZen.ru"
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
         
                   {/* FAQ структурированные данные для MotorZen.ru */}
          {decodedCompanyName === 'MotorZen.ru' && (
           <script type="application/ld+json">
             {JSON.stringify({
               "@context": "https://schema.org",
               "@type": "FAQPage",
               "mainEntity": [
                 {
                   "@type": "Question",
                   "name": "Что такое motorzen.ru?",
                   "acceptedAnswer": {
                     "@type": "Answer",
                     "text": "MotorZen.ru - это интернет-магазин контрактных двигателей и коробок передач с гарантией. На сайте motorzen.ru можно купить качественные автозапчасти с быстрой доставкой по России."
                   }
                 },
                 {
                   "@type": "Question", 
                   "name": "Какие отзывы о motorzen.ru?",
                   "acceptedAnswer": {
                     "@type": "Answer",
                     "text": "Отзывы о MotorZen.ru исключительно положительные. Покупатели отмечают высокое качество товаров, профессиональный подход, быструю доставку и надежную гарантию motorzen.ru."
                   }
                 },
                 {
                   "@type": "Question",
                   "name": "Надежен ли сайт motorzen.ru?", 
                   "acceptedAnswer": {
                     "@type": "Answer",
                     "text": "По отзывам покупателей, MotorZen.ru - очень надежный интернет-магазин. Компания предоставляет гарантию на товары, качественную консультацию и быструю доставку."
                   }
                 },
                 {
                   "@type": "Question",
                   "name": "Где найти отзывы о motorzen.ru?",
                   "acceptedAnswer": {
                     "@type": "Answer", 
                     "text": "Отзывы о MotorZen.ru можно найти на этой странице. Здесь собраны реальные мнения покупателей о motorzen.ru интернет-магазине и качестве обслуживания."
                   }
                 }
               ]
             })}
           </script>
         )}
                   
                     {/* Дополнительные ссылки для MotorZen.ru */}
           {decodedCompanyName === 'MotorZen.ru' && (
           <>
                            <link rel="alternate" href={`https://reccomended.ru/company/MotorZen.ru`} hrefLang="ru" />
               <link rel="dns-prefetch" href="//motorzen.ru" />
               <link rel="preconnect" href="https://motorzen.ru" />
               <meta name="theme-color" content="#3b82f6" />
               <meta name="apple-mobile-web-app-title" content="motorzen.ru отзывы" />
               <meta name="application-name" content="motorzen.ru отзывы" />
               <meta name="msapplication-TileColor" content="#3b82f6" />
               <meta name="msapplication-tooltip" content="Отзывы о motorzen.ru" />
               <meta property="og:locale" content="ru_RU" />
               <meta property="og:image" content="https://reccomended.ru/favicon.png" />
               <meta property="og:image:width" content="300" />
               <meta property="og:image:height" content="300" />
               <meta property="og:image:alt" content="motorzen.ru отзывы" />
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
                    alt={decodedCompanyName === 'MotorZen.ru' 
                      ? 'MotorZen.ru логотип - контрактные двигатели и коробки передач'
                      : `${decodedCompanyName} логотип`
                    } 
                    className="w-12 h-12 rounded-lg border-2 border-gray-200 bg-white object-cover shadow-sm" 
                  />
                )}
                <CompanyIcon category={companyReviews[0]?.companyCategory || 'tech'} />
                <h1 className="text-3xl font-bold text-gray-900">
                  {decodedCompanyName === 'MotorZen.ru' 
                    ? 'motorzen.ru отзывы - MotorZen.ru официальный сайт'
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
              
                      {/* SEO блок для MotorZen.ru */}
        {decodedCompanyName === 'MotorZen.ru' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                                      <h2 className="text-xl font-semibold text-blue-900 mb-3">О компании motorzen.ru</h2>
                    <p className="text-blue-800 text-sm leading-relaxed">
                      <strong>MotorZen.ru</strong> - официальный сайт интернет-магазина контрактных двигателей и коробок передач с гарантией. 
                      На <strong>motorzen.ru</strong> вы найдете качественные автозапчасти с быстрой доставкой по России. 
                     Читайте реальные отзывы покупателей о <strong>motorzen.ru</strong> ниже на этой странице. 
                      Сайт <strong>MotorZen.ru</strong> специализируется на продаже контрактных двигателей, коробок передач и других автозапчастей с гарантией. 
                     Все отзывы о <strong>motorzen.ru</strong> от реальных покупателей помогут вам сделать правильный выбор.
                    </p>
                </div>
              )}
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {decodedCompanyName === 'MotorZen.ru' 
                  ? 'Отзывы о motorzen.ru - реальные мнения покупателей'
                  : 'Отзывы'
                }
              </h2>
              {loading ? (
                <div className="text-center text-gray-400">Загрузка...</div>
              ) : companyReviews.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                  <div className="text-gray-500 text-lg">
                    {decodedCompanyName === 'MotorZen.ru' 
                      ? 'Пока нет отзывов о motorzen.ru'
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
                          {decodedCompanyName === 'MotorZen.ru' 
                            ? 'оставит отзыв о motorzen.ru'
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
                        {decodedCompanyName === 'MotorZen.ru' 
                          ? ', чтобы оставить первый отзыв о motorzen.ru!'
                          : ', чтобы оставить первый отзыв!'
                        }
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-sm text-gray-500 mb-4">
                    Отображается {companyReviews.length} отзывов:
                    {companyReviews.map(review => ` ${review.authorName}`).join(',')}
                  </div>
                  {companyReviews.map((review, index) => {
                    console.log(`Rendering review ${index + 1}:`, review.authorName, review.title);
                    return (
                      <ReviewCard key={review.id} review={review} showCompanyName={false} />
                    );
                  })}
                </>
              )}
              
                          {/* FAQ секция для MotorZen.ru для SEO */}
            {decodedCompanyName === 'MotorZen.ru' && (
                <div className="bg-white border border-gray-200 rounded-lg p-6 mt-8">
                                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Часто задаваемые вопросы о motorzen.ru</h3>
                    <div className="space-y-4">
                      <div className="border-b border-gray-200 pb-3">
                        <h4 className="font-medium text-gray-800 mb-2">Что такое motorzen.ru?</h4>
                        <p className="text-sm text-gray-600">MotorZen.ru - это интернет-магазин контрактных двигателей и коробок передач с гарантией. На сайте motorzen.ru можно купить качественные автозапчасти с быстрой доставкой по России.</p>
                      </div>
                      <div className="border-b border-gray-200 pb-3">
                        <h4 className="font-medium text-gray-800 mb-2">Какие отзывы о motorzen.ru?</h4>
                       <p className="text-sm text-gray-600">Отзывы о MotorZen.ru исключительно положительные. Покупатели отмечают высокое качество товаров, профессиональный подход, быструю доставку и надежную гарантию motorzen.ru.</p>
                      </div>
                      <div className="border-b border-gray-200 pb-3">
                        <h4 className="font-medium text-gray-800 mb-2">Надежен ли сайт motorzen.ru?</h4>
                        <p className="text-sm text-gray-600">По отзывам покупателей, MotorZen.ru - очень надежный интернет-магазин. Компания предоставляет гарантию на товары, качественную консультацию и быструю доставку.</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Где найти отзывы о motorzen.ru?</h4>
                       <p className="text-sm text-gray-600">Отзывы о MotorZen.ru можно найти на этой странице. Здесь собраны реальные мнения покупателей о motorzen.ru интернет-магазине и качестве обслуживания.</p>
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