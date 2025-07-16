const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware
app.use(cors());
app.use(express.json());

// Data file paths
const dataDir = path.join(__dirname, 'data');
const usersFile = path.join(dataDir, 'users.json');
const reviewsFile = path.join(dataDir, 'reviews.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Helper functions
const readJSONFile = (filePath, defaultData = []) => {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
    return defaultData;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return defaultData;
  }
};

const writeJSONFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
  }
};

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Read existing users
    const users = readJSONFile(usersFile, []);
    
    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = {
      id: uuidv4(),
      username,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    writeJSONFile(usersFile, users);

    // Create JWT token
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return user data without password
    const { password: _, ...userWithoutPassword } = newUser;
    
    res.status(201).json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Read existing users
    const users = readJSONFile(usersFile, []);
    
    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Review routes
app.get('/api/reviews', (req, res) => {
  try {
    const reviews = readJSONFile(reviewsFile, []);
    // Sort by creation date (newest first)
    const sortedReviews = reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(sortedReviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

app.get('/api/reviews/company/:companyName', (req, res) => {
  try {
    const { companyName } = req.params;
    const reviews = readJSONFile(reviewsFile, []);
    
    // Filter reviews by company name (case-insensitive)
    const companyReviews = reviews.filter(
      review => review.companyName.toLowerCase() === companyName.toLowerCase()
    );
    
    // Sort by creation date (newest first)
    const sortedReviews = companyReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    res.json(sortedReviews);
  } catch (error) {
    console.error('Error fetching company reviews:', error);
    res.status(500).json({ error: 'Failed to fetch company reviews' });
  }
});

app.post('/api/reviews', authenticateToken, (req, res) => {
  try {
    const { companyName, rating, title, content } = req.body;
    
    // Validate input
    if (!companyName || !rating || !title || !content) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    // Read existing reviews
    const reviews = readJSONFile(reviewsFile, []);
    
    // Create new review
    const newReview = {
      id: uuidv4(),
      companyName,
      rating: parseInt(rating),
      title,
      content,
      authorId: req.user.id,
      authorName: req.user.username,
      createdAt: new Date().toISOString()
    };

    reviews.push(newReview);
    writeJSONFile(reviewsFile, reviews);
    
    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
});

// Initialize with sample data if files don't exist
const initializeSampleData = () => {
  // Sample users
  if (!fs.existsSync(usersFile)) {
    const sampleUsers = [];
    writeJSONFile(usersFile, sampleUsers);
  }
  
  // Sample reviews
  if (!fs.existsSync(reviewsFile)) {
    const sampleReviews = [
      {
        id: '1',
        companyName: 'TechCorp',
        rating: 4,
        title: 'Отличный сервис',
        content: 'Компания предоставляет качественные услуги. Персонал вежливый и профессиональный. Рекомендую!',
        authorId: 'sample-user-1',
        authorName: 'Иван Петров',
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: '2',
        companyName: 'WebStudio',
        rating: 5,
        title: 'Превосходная работа',
        content: 'Заказывал разработку сайта. Результат превзошел все ожидания. Работа выполнена в срок, качество на высшем уровне.',
        authorId: 'sample-user-2',
        authorName: 'Мария Сидорова',
        createdAt: new Date(Date.now() - 172800000).toISOString()
      },
      {
        id: '3',
        companyName: 'FoodDelivery',
        rating: 3,
        title: 'Средне',
        content: 'Доставка еды работает, но есть проблемы с качеством блюд. Иногда привозят холодную еду.',
        authorId: 'sample-user-3',
        authorName: 'Александр Козлов',
        createdAt: new Date(Date.now() - 259200000).toISOString()
      }
    ];
    writeJSONFile(reviewsFile, sampleReviews);
  }
};

// Initialize sample data
initializeSampleData();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});