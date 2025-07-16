import React, { useState } from 'react';
import { Clock } from 'lucide-react'; // Убедитесь, что у вас установлена библиотека lucide-react

// Тип для одного отзыва
type ReviewItemData = {
  id: number;
  logoUrl: string;
  title: string;
  subtitle?: string; // Необязательное описание
  date: string;
};

// Моковые данные для демонстрации
const mockReviews: ReviewItemData[] = [
  {
    id: 1,
    logoUrl: 'https://cdn.dribbble.com/users/1061323/screenshots/14285403/media/4678146435c243886475439561021798.png?resize=400x300&vertical=center', // Замените на ваши URL
    title: 'Ekscentrik.ru интернет-магазин отзывы',
    date: '29.04.2025',
  },
  {
    id: 2,
    logoUrl: 'https://i.pinimg.com/originals/c3/88/ac/c388ac33d362391b1563f82042236528.jpg', // Замените на ваши URL
    title: 'Франшиза Maturlook отзывы, платят или нет?',
    date: '18.04.2025',
  },
  {
    id: 3,
    logoUrl: 'https://cdn.dribbble.com/users/583436/screenshots/16353949/media/3669c522227b9a473215888a7865b210.jpg?resize=400x300&vertical=center', // Замените на ваши URL
    title: 'MaxProfit отзывы, платят или нет?',
    date: '18.04.2025',
  },
];

// Компонент одного элемента в списке
const ReviewItem: React.FC<{ item: ReviewItemData }> = ({ item }) => (
  <a href="#" className="flex items-start p-3 hover:bg-gray-50 rounded-lg">
    <div className="flex-shrink-0 mr-4">
      <img
        src={item.logoUrl}
        alt={item.title}
        className="w-16 h-16 object-cover rounded-lg bg-white shadow-sm"
      />
    </div>
    <div className="flex flex-col">
      <h3 className="font-medium text-gray-800 leading-tight">
        {item.title}
      </h3>
      {item.subtitle && (
        <p className="text-sm text-gray-500 mt-1">{item.subtitle}</p>
      )}
      <div className="flex items-center text-sm text-gray-400 mt-2">
        <Clock className="w-4 h-4 mr-1.5" />
        <span>{item.date}</span>
      </div>
    </div>
  </a>
);


// Основной компонент виджета
export const ReviewsWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState('new'); // 'new' или 'popular'

  const TabButton: React.FC<{ id: string; title: string; }> = ({ id, title }) => (
      <button
        onClick={() => setActiveTab(id)}
        className={`px-4 py-3 text-sm font-semibold transition-colors duration-200 
          ${activeTab === id
            ? 'border-b-2 border-red-500 text-red-600'
            : 'border-b-2 border-transparent text-gray-600 hover:text-red-500'
          }`
        }
      >
        {title}
      </button>
  )


  return (
    <div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-sm font-sans">
      {/* Вкладки */}
      <div className="flex border-b border-gray-200">
        <TabButton id="new" title="Новые отзывы" />
        <TabButton id="popular" title="Популярные отзывы" />
      </div>

      {/* Список отзывов */}
      <div className="p-1">
        {activeTab === 'new' && (
          <div className="flex flex-col">
            {mockReviews.map((item) => (
              <ReviewItem key={item.id} item={item} />
            ))}
          </div>
        )}
        {activeTab === 'popular' && (
          // Здесь можно отобразить другие данные для популярных отзывов
          <div className="p-4 text-center text-gray-500">
            Популярные отзывы скоро появятся.
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsWidget;