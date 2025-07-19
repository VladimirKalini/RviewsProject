import React, { useState } from 'react';
import { Star, User, Building2, MapPin, MessageCircle } from 'lucide-react';
import StarRating from '../components/StarRating';

const AddReview: React.FC = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    company: '',
    location: '',
    rating: 5,
    comment: '',
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const handleRating = (rating: number) => {
    setForm(prev => ({ ...prev, rating }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="bg-white shadow-2xl border border-gray-100 rounded-2xl p-10 sm:p-12 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-10 flex items-center gap-3">
            <Star className="h-9 w-9 text-yellow-400" /> Оставить отзыв
          </h1>
          {sent ? (
            <div className="text-center py-16">
              <div className="text-2xl text-green-700 font-bold mb-2">Отзыв отправлен на модерацию</div>
              <div className="text-gray-600">Спасибо! Ваш отзыв будет опубликован после проверки.</div>
            </div>
          ) : (
          <form onSubmit={handleSubmit} className="space-y-7">
            <div className="flex gap-4 flex-col sm:flex-row">
              <div className="flex-1 relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
                <input name="firstName" type="text" value={form.firstName} onChange={handleChange} placeholder="Имя" className="block w-full border border-gray-200 rounded-xl pl-10 pr-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-900 text-base transition placeholder-gray-400" required />
              </div>
              <div className="flex-1 relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
                <input name="lastName" type="text" value={form.lastName} onChange={handleChange} placeholder="Фамилия" className="block w-full border border-gray-200 rounded-xl pl-10 pr-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-900 text-base transition placeholder-gray-400" required />
              </div>
            </div>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
              <input name="company" type="text" value={form.company} onChange={handleChange} placeholder="Название компании" className="block w-full border border-gray-200 rounded-xl pl-10 pr-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-900 text-base transition placeholder-gray-400" required />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
              <input name="location" type="text" value={form.location} onChange={handleChange} placeholder="Место (город, регион)" className="block w-full border border-gray-200 rounded-xl pl-10 pr-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-900 text-base transition placeholder-gray-400" required />
            </div>
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">Оценка компании</label>
              <div className="flex items-center gap-4">
                <StarRating rating={form.rating} size="lg" interactive onRatingChange={handleRating} />
                <span className="text-lg font-bold text-yellow-500">{form.rating}/5</span>
              </div>
            </div>
            <div className="relative">
              <MessageCircle className="absolute left-3 top-4 text-blue-400 w-5 h-5" />
              <textarea name="comment" rows={5} value={form.comment} onChange={handleChange} placeholder="Комментарий" className="block w-full border border-gray-200 rounded-xl pl-10 pr-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-900 text-base transition placeholder-gray-400 resize-none" required />
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-green-400 text-white py-3 rounded-xl hover:from-blue-600 hover:to-green-500 transition-all font-bold text-lg shadow-lg mt-2">Отправить отзыв</button>
          </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddReview;