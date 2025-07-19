// Тип для основного отзыва в центральной колонке
export type Review = {
  id: string;
  companyName: string;
  companyCategory: 'tech' | 'web' | 'food' | 'auto';
  rating: number;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  category?: string;
  logoUrl?: string;
};

// Тип для новости в правом сайдбаре
export type NewsArticle = {
  id: string;
  title: string;
  source: string;
  imageUrl: string;
};

// Тип для пользователя
export type User = {
  id: string;
  username: string;
  email: string;
  password?: string;
  createdAt: string;
};

// Тип для контекста аутентификации
export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
};