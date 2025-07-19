import React, { useState } from 'react';
import { Clock } from 'lucide-react';

// --- РАСШИРЕННЫЕ ДАННЫЕ С НОВЫМИ ЛОГОТИПАМИ ---

const mockWidgetReviews = [
  { 
    id: 1, 
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/3081/3081648.png', 
    title: 'Ekscentrik.ru интернет-магазин отзывы', 
    date: '29.04.2025' 
  },
  { 
    id: 2, 
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/2666/2666064.png', 
    title: 'Франшиза Maturlook отзывы, платят или нет?', 
    date: '18.04.2025' 
  },
  { 
    id: 3, 
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135706.png', 
    title: 'MaxProfit отзывы, платят или нет?', 
    date: '18.04.2025' 
  },
  // ДОБАВЛЕНО: Новый отзыв про автосервис
  {
    id: 4,
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/2936/2936732.png',
    title: 'AutoFix-Мастер отзывы о сервисе',
    date: '15.04.2025'
  },
  // ДОБАВЛЕНО: Новый отзыв про доставку еды
  {
    id: 5,
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/1048/1048953.png',
    title: 'Доставка "БыстроЕм" - стоит ли заказывать?',
    date: '12.04.2025'
  },
   // ДОБАВЛЕНО: Новый отзыв про онлайн-курсы
  {
    id: 6,
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
    title: 'Онлайн-курсы SkillUp: развод или нет?',
    date: '11.04.2025'
  },
];

const mockPopularReviews = [
  { 
    id: 13, 
    logoUrl: 'https://ui-avatars.com/api/?name=П+К+1&background=2563eb&color=fff&size=64', 
    title: 'Популярная компания 1', 
    date: '01.04.2025' 
  },
  { 
    id: 14, 
    logoUrl: 'https://ui-avatars.com/api/?name=П+К+2&background=db2777&color=fff&size=64', 
    title: 'Популярная компания 2', 
    date: '31.03.2025' 
  },
  // ДОБАВЛЕНО: Новая популярная компания
  {
    id: 15,
    logoUrl: 'https://ui-avatars.com/api/?name=П+К+3&background=16a34a&color=fff&size=64',
    title: 'Популярная компания 3',
    date: '28.03.2025'
  },
  // ДОБАВЛЕНО: Новая популярная компания
  {
    id: 16,
    logoUrl: 'https://ui-avatars.com/api/?name=П+К+4&background=ca8a04&color=fff&size=64',
    title: 'Популярная компания 4',
    date: '25.03.2025'
  }
];


// --- ОСТАЛЬНОЙ КОД КОМПОНЕНТА ОСТАЛСЯ БЕЗ ИЗМЕНЕНИЙ ---

const ReviewWidgetItem: React.FC<{ item: { id: number; logoUrl: string; title: string; date: string } }> = ({ item }) => (
  <a href="#" className="flex items-start p-3 hover:bg-gray-50 rounded-lg">
    <div className="flex-shrink-0 mr-4">
      <img src={item.logoUrl} alt={item.title} className="w-16 h-16 object-cover rounded-lg bg-white shadow-sm" />
    </div>
    <div className="flex flex-col">
      <h3 className="font-medium text-gray-800 leading-tight">{item.title}</h3>
      <div className="flex items-center text-sm text-gray-400 mt-2">
        <Clock className="w-4 h-4 mr-1.5" />
        <span>{item.date}</span>
      </div>
    </div>
  </a>
);

const ReviewsWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState('new');
  const TabButton: React.FC<{ id: string; title: string }> = ({ id, title }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-3 text-sm font-semibold transition-colors duration-200 ${activeTab === id ? 'border-b-2 border-red-500 text-red-600' : 'border-b-2 border-transparent text-gray-600 hover:text-red-500'}`}
    >
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
            {mockWidgetReviews.map((item) => <ReviewWidgetItem key={item.id} item={item} />)}
          </div>
        )}
        {activeTab === 'popular' && (
          <div className="flex flex-col">
            {mockPopularReviews.map((item) => <ReviewWidgetItem key={item.id} item={item} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsWidget;