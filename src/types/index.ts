export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface Review {
  id: string;
  companyName: string;
  rating: number;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  category?: string;
}

export interface Company {
  name: string;
  averageRating: number;
  totalReviews: number;
  category: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}