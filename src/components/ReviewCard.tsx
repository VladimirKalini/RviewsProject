import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import { Review } from '../types';
import StarRating from './StarRating';
import CompanyIcon from './CompanyIcon';

interface ReviewCardProps {
  review: Review;
  showCompanyName?: boolean;
  compact?: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ 
  review, 
  showCompanyName = true,
  compact = false 
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          {showCompanyName && (
            <Link
              to={`/company/${encodeURIComponent(review.companyName)}`}
              className="text-lg font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              <CompanyIcon category={review.companyCategory} className="h-6 w-6 mr-2" />
              {review.companyName}
            </Link>
          )}
          <div className="flex items-center space-x-2 mt-2">
            <StarRating rating={review.rating} size="sm" />
            <span className="text-sm text-gray-600">{review.rating}/5</span>
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {review.title}
      </h3>

      {/* Content */}
      <p className="text-gray-700 mb-4 leading-relaxed">
        {compact ? truncateText(review.content, 200) : review.content}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>{review.authorName}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(review.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;