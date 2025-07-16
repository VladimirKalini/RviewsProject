import React, { useState } from 'react';
// Импортируем все необходимые иконки
import { TrendingUp, Building, Code, Utensils, Wrench, Newspaper, Clock } from 'lucide-react';

// --- ТИПЫ ДАННЫХ ---

// Тип для основного отзыва в центральной колонке
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
};

// Тип для новости в правом сайдбаре
type NewsArticle = {
  id: string;
  title: string;
  source: string;
  imageUrl: string;
};

// Тип для отзыва в левом виджете
type ReviewWidgetItemData = {
  id: number;
  logoUrl: string;
  title: string;
  date: string;
};


// --- МОКОВЫЕ ДАННЫЕ ---

const mockReviews: Review[] = [
    { id: '1', companyName: 'TechCorp', companyCategory: 'tech', rating: 4, title: 'Отличный сервис', content: 'Компания предоставляет качественные услуги. Персонал вежливый и профессиональный. Рекомендую всем.', authorId: 'user-1', authorName: 'Иван Петров', createdAt: new Date().toISOString() },
    { id: '2', companyName: 'WebStudio', companyCategory: 'web', rating: 5, title: 'Превосходная работа', content: 'Заказывал разработку сайта. Результат превзошел все ожидания. Работа выполнена в срок.', authorId: 'user-2', authorName: 'Мария Сидорова', createdAt: new Date().toISOString() },
    { id: '3', companyName: 'FoodDelivery', companyCategory: 'food', rating: 3, title: 'Средне', content: 'Доставка еды работает, но есть проблемы с качеством блюд. Иногда привозят холодную еду.', authorId: 'user-3', authorName: 'Александр Козлов', createdAt: new Date().toISOString() },
    { id: '4', companyName: 'AutoService', companyCategory: 'auto', rating: 5, title: 'Лучший автосервис в городе', content: 'Обслуживаюсь здесь уже несколько лет. Мастера профессионалы, цены адекватные.', authorId: 'user-4', authorName: 'Дмитрий Волков', createdAt: new Date().toISOString() }
];

// РАСШИРЕННЫЙ СПИСОК НОВОСТЕЙ
const mockNews: NewsArticle[] = [
  { id: 'n1', title: 'Как выбрать лучшую IT-компанию для вашего проекта?', source: 'Tech Today', imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80' },
  { id: 'n2', title: 'Новые тренды в веб-дизайне 2025 года', source: 'Design Weekly', imageUrl: 'https://images.unsplash.com/photo-1559028006-44a138343629?w=400&q=80' },
  { id: 'n3', title: 'Рейтинг служб доставки еды: кто на первом месте?', source: 'Food & Life', imageUrl: 'https://images.unsplash.com/photo-1598103442348-0b57a3e7a33a?w=400&q=80' },
  { id: 'n4', title: 'Топ-5 ошибок при выборе автосервиса', source: 'Auto World', imageUrl: 'https://images.unsplash.com/photo-1553773022-60c6d5351e33?w=400&q=80' },
  { id: 'n5', title: 'Будущее за облачными технологиями: обзор рынка', source: 'Cloud Insights', imageUrl: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=400&q=80' }
];

// РАСШИРЕННЫЙ СПИСОК ДЛЯ ВИДЖЕТА
const mockWidgetReviews: ReviewWidgetItemData[] = [
    { id: 1, logoUrl: 'https://cdn.dribbble.com/users/1061323/screenshots/14285403/media/4678146435c243886475439561021798.png?resize=400x300&vertical=center', title: 'Ekscentrik.ru интернет-магазин отзывы', date: '29.04.2025' },
    { id: 2, logoUrl: 'https://i.pinimg.com/originals/c3/88/ac/c388ac33d362391b1563f82042236528.jpg', title: 'Франшиза Maturlook отзывы, платят или нет?', date: '18.04.2025' },
    { id: 3, logoUrl: 'https://cdn.dribbble.com/users/583436/screenshots/16353949/media/3669c522227b9a473215888a7865b210.jpg?resize=400x300&vertical=center', title: 'MaxProfit отзывы, платят или нет?', date: '18.04.2025' },
    { id: 4, logoUrl: 'https://cdn.dribbble.com/users/201382/screenshots/1487498/media/69b0a7c4853e498f3956795b3671d0e5.png?resize=400x300&vertical=center', title: 'Отзывы о хостинге "SpaceWeb": стоит ли доверять?', date: '15.04.2025' },
    { id: 5, logoUrl: 'https://cdn.dribbble.com/users/385426/screenshots/1824026/media/893c09c3e9a7e8a4d3345d16c355283f.png?resize=400x300&vertical=center', title: 'Интернет-провайдер "CityLink": скорость и надежность', date: '12.04.2025' },
];


// --- КОМПОНЕНТЫ ---

// Иконка компании
const CompanyIcon: React.FC<{ category: Review['companyCategory'] }> = ({ category }) => {
  const iconProps = { className: "h-5 w-5 mr-2 text-gray-500" };
  switch (category) {
    case 'tech': return <Building {...iconProps} />;
    case 'web': return <Code {...iconProps} />;
    case 'food': return <Utensils {...iconProps} />;
    case 'auto': return <Wrench {...iconProps} />;
    default: return <Building {...iconProps} />;
  }
};

// Карточка отзыва (центр)
const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 transition-transform transform hover:-translate-y-1 hover:shadow-lg">
    <div className="flex items-center mb-3"><CompanyIcon category={review.companyCategory} /><h3 className="text-lg font-semibold text-gray-900">{review.companyName}</h3></div>
    <div className="flex items-center mb-2">{[...Array(5)].map((_, i) => <svg key={i} className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.447a1 1 0 00-1.175 0l-3.368 2.447c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" /></svg>)}<span className="ml-2 text-sm text-gray-500">{review.rating}.0</span></div>
    <h4 className="text-md font-bold text-gray-800 mb-2">{review.title}</h4>
    <p className="text-gray-600 text-sm mb-4">{review.content}</p>
    <div className="text-xs text-gray-400"><span>{review.authorName}</span> - <span>{new Date(review.createdAt).toLocaleDateString()}</span></div>
  </div>
);

// Правый сайдбар: Новости
const NewsSidebar: React.FC = () => (
  <div className="bg-white p-4 rounded-lg shadow-md"><div className="flex items-center mb-4"><Newspaper className="h-6 w-6 text-blue-600 mr-2" /><h2 className="text-xl font-bold text-gray-900">Новости</h2></div><div className="space-y-4">{mockNews.map(article => <a key={article.id} href="#" className="flex items-center space-x-3 group"><img src={article.imageUrl} alt={article.title} className="h-16 w-16 rounded-md object-cover flex-shrink-0" /><div><h3 className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{article.title}</h3><p className="text-xs text-gray-500">{article.source}</p></div></a>)}</div></div>
);

// Правый сайдбар: Категории
const CategorySidebar: React.FC = () => (
  <div className="bg-white p-4 rounded-lg shadow-md"><h2 className="text-xl font-bold text-gray-900 mb-4">Категории</h2><ul><li className="text-gray-700 hover:text-blue-600 cursor-pointer">IT и Технологии</li><li className="text-gray-700 hover:text-blue-600 cursor-pointer mt-2">Доставка еды</li><li className="text-gray-700 hover:text-blue-600 cursor-pointer mt-2">Автосервисы</li></ul></div>
);

// --- Левый виджет с отзывами ---
const ReviewWidgetItem: React.FC<{ item: ReviewWidgetItemData }> = ({ item }) => (
  <a href="#" className="flex items-start p-3 hover:bg-gray-50 rounded-lg"><div className="flex-shrink-0 mr-4"><img src={item.logoUrl} alt={item.title} className="w-16 h-16 object-cover rounded-lg bg-white shadow-sm" /></div><div className="flex flex-col"><h3 className="font-medium text-gray-800 leading-tight">{item.title}</h3><div className="flex items-center text-sm text-gray-400 mt-2"><Clock className="w-4 h-4 mr-1.5" /><span>{item.date}</span></div></div></a>
);

const ReviewsWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState('new');
  const TabButton: React.FC<{ id: string; title: string; }> = ({ id, title }) => (<button onClick={() => setActiveTab(id)} className={`px-4 py-3 text-sm font-semibold transition-colors duration-200 ${activeTab === id ? 'border-b-2 border-red-500 text-red-600' : 'border-b-2 border-transparent text-gray-600 hover:text-red-500'}`}>{title}</button>)

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm font-sans"><div className="flex border-b border-gray-200"><TabButton id="new" title="Новые отзывы" /><TabButton id="popular" title="Популярные отзывы" /></div><div className="p-1">{activeTab === 'new' && <div className="flex flex-col">{mockWidgetReviews.map((item) => <ReviewWidgetItem key={item.id} item={item} />)}</div>}{activeTab === 'popular' && <div className="p-4 text-center text-gray-500">Популярные отзывы скоро появятся.</div>}</div></div>
  );
};


// --- ОСНОВНОЙ КОМПОНЕНТ СТРАНИЦЫ ---

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Заголовок */}
        <div className="flex items-center space-x-2 mb-8">
          <TrendingUp className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Последние отзывы</h1>
        </div>

        {/* Общая сетка (12 колонок) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Левый сайдбар (3 колонки) */}
          <aside className="lg:col-span-3">
             <ReviewsWidget />
          </aside>

          {/* Центральный контент (6 колонок) */}
          <main className="lg:col-span-6">
            <div className="space-y-6">
              {mockReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </main>

          {/* Правый сайдбар (3 колонки) */}
          <aside className="lg:col-span-3">
            <div className="space-y-8">
               <NewsSidebar />
               <CategorySidebar />
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default Home;