import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import CompanyPage from './pages/CompanyPage';
import Login from './pages/Login';
import Register from './pages/Register';
import AddReview from './pages/AddReview';
import CategoryPage from './pages/CategoryPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/company/:companyName" element={<CompanyPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add-review" element={<AddReview />} />
            <Route path="/category/:categorySlug" element={<CategoryPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;