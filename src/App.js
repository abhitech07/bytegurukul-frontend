import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { CourseProvider } from './contexts/CourseContext';
import { ToastProvider } from './contexts/ToastContext'; // Ye line add karein
import { ThemeProvider } from './contexts/ThemeContext'; // Ye line add karein
import Layout from './components/common/Layout';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Internship from './pages/Internship';
import Projects from './pages/Projects';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import CourseDetail from './pages/CourseDetail';
import LearningPage from './pages/LearningPage';
import './App.css';
import Test from './components/common/Test';

function App() {
  return (
    <ThemeProvider> {/* Ye add karein */}
      <ToastProvider> {/* Ye add karein */}
        <AuthProvider>
          <CartProvider>
            <CourseProvider>
              <Router>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/test" element={<Test/>} />

                    <Route path="/courses" element={<Courses />} />
                    <Route path="/courses/:courseId" element={<CourseDetail />} />
                    <Route path="/learn/:courseId" element={<LearningPage />} />
                    <Route path="/internship" element={<Internship />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                  </Routes>
                </Layout>
              </Router>
            </CourseProvider>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;