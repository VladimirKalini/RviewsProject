import React, { useEffect, useState } from 'react';
// Импортируем все необходимые иконки
import { TrendingUp, Building, Code, Utensils, Wrench, Newspaper, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import CompanyIcon from '../components/CompanyIcon';
import NewsSidebar from '../components/NewsSidebar';
import { API_ENDPOINTS, createApiUrl } from '../config/api';


// --- ТИПЫ ДАННЫХ ---

type Review = {
  id: string;
  companyName: string;
  companyCategory: 'tech' | 'web' | 'food' | 'auto';
  rating: number;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  logoUrl?: string; 
};

type NewsArticle = {
  id: string;
  title: string;
  source: string;
  imageUrl: string;
};

type ReviewWidgetItemData = {
  id: number;
  logoUrl: string;
  title: string;
  date: string;
  companyLink?: string;
};


// --- ОБНОВЛЕННЫЕ МОКОВЫЕ ДАННЫЕ ---

// Удаляю локальный mockNews и определение NewsSidebar

// --- КОМПОНЕНТЫ ---

// Функция для генерации аватара по имени
const getAvatarUrl = (name: string) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff&size=64`;

// Карточка отзыва (центр)
const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  const isNew = (Date.now() - new Date(review.createdAt).getTime()) < 3 * 24 * 60 * 60 * 1000;
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 transition-transform transform hover:-translate-y-1 hover:shadow-xl animate-fade-in relative group">
      {isNew && <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse">Новый</span>}
      <div className="flex items-center gap-3 mb-2">
        {review.logoUrl && <img src={review.logoUrl} alt={review.companyName} className="w-12 h-12 rounded-lg border-2 border-gray-200 bg-white object-cover shadow-sm" />}
        <CompanyIcon category={review.companyCategory} />
        <h3 className="text-xl font-bold text-gray-900">{review.companyName}</h3>
      </div>
      <div className="flex items-center mb-2">{[...Array(5)].map((_, i) => <svg key={i} className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.447a1 1 0 00-1.175 0l-3.368 2.447c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" /></svg>)}<span className="ml-2 text-sm text-gray-500">{review.rating}.0</span></div>
      <div className="flex items-center gap-2 mb-2">
        <img src={getAvatarUrl(review.authorName)} alt={review.authorName} className="w-8 h-8 rounded-full border-2 border-blue-200 shadow-sm" />
        <span className="text-xs text-gray-500">{review.authorName}</span>
        <span className="text-xs text-gray-400">- {new Date(review.createdAt).toLocaleDateString()}</span>
      </div>
      <h4 className="text-md font-bold text-gray-800 mb-1">{review.title}</h4>
      <p className="text-gray-600 text-sm mb-2">{review.content}</p>
    </div>
  );
};

// Сайдбар с новостями (справа)
// const NewsSidebar: React.FC = () => (
//   <div className="bg-white p-4 rounded-lg shadow-md">
//     <div className="flex items-center mb-4">
//       <Newspaper className="h-6 w-6 text-blue-600 mr-2" />
//       <h2 className="text-xl font-bold text-gray-900">Новости</h2>
//     </div>
//     <div className="space-y-4">
//       {mockNews.map(article => (
//         <a key={article.id} href="#" className="flex items-center space-x-3 group">
//           <img src={article.imageUrl} alt={article.title} className="h-16 w-16 rounded-md object-cover flex-shrink-0" />
//           <div>
//             <h3 className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{article.title}</h3>
//             <p className="text-xs text-gray-500">{article.source}</p>
//           </div>
//         </a>
//       ))}
//     </div>
//   </div>
// );


// --- НОВЫЙ ВСТРОЕННЫЙ КОМПОНЕНТ REVIEWSWIDGET ---

const newMockWidgetReviews: ReviewWidgetItemData[] = [
    { id: 1, logoUrl: 'https://cdn-icons-png.flaticon.com/512/3081/3081648.png', title: 'Ekscentrik.ru', date: '29.04.2025', companyLink: '/company/Ekscentrik.ru' },
    { id: 2, logoUrl: 'https://cdn-icons-png.flaticon.com/512/2666/2666064.png', title: 'Maturlook', date: '18.04.2025', companyLink: '/company/Maturlook' },
    { id: 3, logoUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135706.png', title: 'MaxProfit', date: '18.04.2025', companyLink: '/company/MaxProfit' },
    { id: 4, logoUrl: 'https://cdn-icons-png.flaticon.com/512/2936/2936732.png', title: 'AutoFix-Мастер', date: '15.04.2025', companyLink: '/company/AutoFix-Мастер' },
    { id: 5, logoUrl: 'https://cdn-icons-png.flaticon.com/512/1048/1048953.png', title: 'БыстроЕм', date: '12.04.2025', companyLink: '/company/БыстроЕм' },
    { id: 6, logoUrl: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png', title: 'SkillUp', date: '11.04.2025', companyLink: '/company/SkillUp' },
];

const newMockPopularReviews: ReviewWidgetItemData[] = [
  { 
    id: 13, 
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135673.png', 
    title: 'Ozon', 
    date: '10.07.2025',
    companyLink: '/company/Ozon'
  },
  { 
    id: 14, 
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135689.png', 
    title: 'Avito', 
    date: '09.07.2025',
    companyLink: '/company/Avito'
  },
  { 
    id: 15, 
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/3082/3082003.png', 
    title: 'М.Видео', 
    date: '08.07.2025',
    companyLink: '/company/М.Видео'
  },
  { 
    id: 16, 
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/1046/1046786.png', 
    title: 'Яндекс.Еда', 
    date: '07.07.2025',
    companyLink: '/company/Яндекс.Еда'
  },
  { 
    id: 17, 
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png', 
    title: 'Леруа Мерлен', 
    date: '05.07.2025',
    companyLink: '/company/Леруа Мерлен'
  },
];

const ReviewWidgetItem: React.FC<{ item: ReviewWidgetItemData }> = ({ item }) => {
  const content = (
    <>
      <div className="flex-shrink-0 mr-4">
        <img src={item.logoUrl} alt={item.title} className="w-16 h-16 object-cover rounded-lg bg-white shadow-sm" />
      </div>
      <div className="flex flex-col">
        <h3 className="font-medium text-gray-800 leading-tight hover:text-blue-600 transition-colors">{item.title}</h3>
        <div className="flex items-center text-sm text-gray-400 mt-2">
          <Clock className="w-4 h-4 mr-1.5" />
          <span>{item.date}</span>
        </div>
      </div>
    </>
  );

  return item.companyLink ? (
    <Link to={item.companyLink} className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
      {content}
    </Link>
  ) : (
    <div className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
      {content}
    </div>
  );
};

const ReviewsWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState('new');
  const TabButton: React.FC<{ id: string; title: string; }> = ({ id, title }) => (
    <button onClick={() => setActiveTab(id)} className={`px-4 py-3 text-sm font-semibold transition-colors duration-200 ${activeTab === id ? 'border-b-2 border-red-500 text-red-600' : 'border-b-2 border-transparent text-gray-600 hover:text-red-500'}`}>
      {title}
    </button>
  );

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm font-sans">
      <div className="flex border-b border-gray-200">
        <TabButton id="new" title="Новые отзывы" />
        <TabButton id="popular" title="Популярные отзывы" />
      </div>
      <div className="p-1">
        {activeTab === 'new' && (
          <div className="flex flex-col">
            {newMockWidgetReviews.map((item) => <ReviewWidgetItem key={item.id} item={item} />)}
          </div>
        )}
        {activeTab === 'popular' && (
          <div className="flex flex-col">
            {newMockPopularReviews.map((item) => <ReviewWidgetItem key={item.id} item={item} />)}
          </div>
        )}
      </div>
    </div>
  );
};


// --- ГЛАВНЫЙ КОМПОНЕНТ СТРАНИЦЫ ---

const Home: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(createApiUrl(API_ENDPOINTS.REVIEWS))
      .then(res => res.json())
      .then((data: Review[]) => {
        setReviews(data.slice(0, 10)); 
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-blue-500 to-green-400 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Добро пожаловать на Reccomended.ru!</h2>
            <p className="text-lg">Читайте отзывы о компаниях, включая motorzen.ru, делитесь своим опытом и помогайте другим выбирать лучшее.</p>
          </div>
          <a href="/add-review" className="mt-4 md:mt-0 inline-block bg-white text-blue-600 font-bold px-6 py-3 rounded-lg shadow-md hover:bg-blue-50 transition-colors animate-bounce">Оставить отзыв</a>
        </div>
        
        {/* SEO блок с упоминанием популярных компаний */}
        <div className="mb-8 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Популярные компании на нашем сайте</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            На Reccomended.ru вы найдете отзывы о многих компаниях, включая <strong>motorzen.ru</strong> - интернет-магазин контрактных двигателей и автозапчастей с гарантией. 
            Читайте реальные отзывы покупателей о <strong>MotorZen.ru</strong>, TechNova, WebStudio и других компаниях. 
            Все отзывы о <strong>motorzen.ru</strong> помогут вам сделать правильный выбор при покупке автозапчастей.
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <Link to="/company/MotorZen.ru" className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
              motorzen.ru отзывы
            </Link>
            <Link to="/company/TechNova" className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
              TechNova
            </Link>
            <Link to="/company/WebStudio" className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
              WebStudio
            </Link>
          </div>
        </div>
   
        <div className="flex items-center space-x-2 mb-8">
          <TrendingUp className="h-8 w-8 text-blue-600 animate-pulse" />
          <h1 className="text-3xl font-bold text-gray-900">Последние отзывы</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <aside className="lg:col-span-3">
        
            <ReviewsWidget />
          </aside>
          
          <main className="lg:col-span-6">
            <div className="space-y-6">
              {loading ? (
                <div className="text-center text-gray-400">Загрузка...</div>
              ) : reviews.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                  <div className="text-gray-500 text-lg">Пока нет отзывов</div>
                </div>
              ) : (
                reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
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

export default Home;