import React from 'react';
import { Newspaper } from 'lucide-react';

const mockNews = [
  { id: 'n1', title: 'Как выбрать лучшую IT-компанию для вашего проекта?', source: 'Tech Today', imageUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135684.png', url: 'https://vc.ru/tech' },
  { id: 'n2', title: 'Новые тренды в веб-дизайне 2025 года', source: 'Design Weekly', imageUrl: 'https://cdn-icons-png.flaticon.com/512/1055/1055646.png', url: 'https://habr.com/ru/hub/webdev/' },
  { id: 'n3', title: 'Рейтинг служб доставки еды: кто на первом месте?', source: 'Food & Life', imageUrl: 'https://cdn-icons-png.flaticon.com/512/1046/1046786.png', url: 'https://eda.ru/recepty' },
  { id: 'n4', title: 'Лучшие автосервисы города: топ-10', source: 'Auto News', imageUrl: 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png', url: 'https://www.autonews.ru/' },
  { id: 'n5', title: 'Образовательные курсы: что выбрать в 2025?', source: 'Edu Portal', imageUrl: 'https://cdn-icons-png.flaticon.com/512/3002/3002543.png', url: 'https://www.coursera.org/' },
  { id: 'n6', title: 'Недвижимость: тренды и прогнозы', source: 'Real Estate Pro', imageUrl: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png', url: 'https://realty.rbc.ru/' },
  { id: 'n7', title: 'Инвестиции 2025: Куда вложить деньги?', source: 'Finance Today', imageUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', url: 'https://journal.tinkoff.ru/invest/' },
  { id: 'n8', title: 'Топ-5 направлений для зимнего отпуска', source: 'Travel Weekly', imageUrl: 'https://cdn-icons-png.flaticon.com/512/201/201623.png', url: 'https://www.tourdom.ru/' },
  { id: 'n9', title: 'Как сохранить здоровье в большом городе?', source: 'Health & Life', imageUrl: 'https://cdn-icons-png.flaticon.com/512/2966/2966327.png', url: 'https://medportal.ru/' },
];

const NewsSidebar: React.FC = () => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <div className="flex items-center mb-4">
      <Newspaper className="h-6 w-6 text-blue-600 mr-2" />
      <h2 className="text-xl font-bold text-gray-900">Новости</h2>
    </div>
    <div className="space-y-4">
      {mockNews.map(article => (
        <a key={article.id} href={article.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 group">
          <img src={article.imageUrl} alt={article.title} className="h-16 w-16 rounded-md object-cover flex-shrink-0" />
          <div>
            <h3 className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{article.title}</h3>
            <p className="text-xs text-gray-500">{article.source}</p>
          </div>
        </a>
      ))}
    </div>
  </div>
);

export default NewsSidebar;