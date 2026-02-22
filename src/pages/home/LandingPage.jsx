import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import {
  MagnifyingGlassIcon,
  BookOpenIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export const LandingPage = () => {
  const { user } = useAuth();
  const categories = [
    'UPSC', 'GATE', 'NEET', 'JEE', 'Engineering', 'Medical', 'Law', 'MBA'
  ];

  const features = [
    {
      icon: BookOpenIcon,
      title: 'Vast Collection',
      description: 'Access thousands of textbooks, notes, and study materials from KYC-verified sellers'
    },
    {
      icon: UserGroupIcon,
      title: 'Verified Community',
      description: 'All sellers undergo KYC verification. Connect with trusted students and libraries'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Escrow Protection',
      description: 'Secure escrow system holds payments until you confirm receipt of books'
    }
  ];

  const trendingBooks = [
    { title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', price: '₹450', image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f' },
    { title: 'Physics for Engineers', author: 'Halliday & Resnick', price: '₹350', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba' },
    { title: 'Mathematics for ML', author: 'Marc Peter Deisenroth', price: '₹500', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794' },
    { title: 'Database System Concepts', author: 'Silberschatz', price: '₹400', image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d' }
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-accent-400/20 rounded-full blur-xl animate-pulse-soft"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent-300/10 rounded-full blur-2xl animate-bounce-soft"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight relative z-10">
                <span className="bg-gradient-to-r from-white to-accent-200 bg-clip-text text-transparent">OnlineBook</span>
                <span className="block bg-gradient-to-r from-accent-300 to-accent-500 bg-clip-text text-transparent">Sharing</span>
              </h1>
              <p className="text-xl text-primary-100 mb-8 leading-relaxed relative z-10">
                India's premier marketplace for second-hand books and academic materials. 
                Connect with verified students and libraries for secure transactions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                <Link to="/browse">
                  <Button size="lg" className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-semibold shadow-large border-0">
                    Start Browsing
                    <ArrowRightIcon className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/sell">
                  <Button size="lg" variant="outline" className="border-2 border-accent-300 text-accent-300 hover:bg-accent-300 hover:text-primary-900 font-semibold">
                    Sell Your Books
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for books, notes, or authors..."
                    onKeyPress={(e) => e.key === 'Enter' && e.target.value && (window.location.href = `/browse?search=${encodeURIComponent(e.target.value)}`)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-900 text-lg focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                  />
                </div>
                <div className="mt-6">
                  <p className="text-blue-100 mb-3">Popular categories:</p>
                  <div className="flex flex-wrap gap-2">
                    {categories.slice(0, 4).map((category) => (
                      <span
                        key={category}
                        onClick={() => window.location.href = `/browse?category=${category}`}
                        className="px-3 py-1 bg-white/20 rounded-full text-sm hover:bg-white/30 cursor-pointer transition-colors"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-secondary-900 mb-4">Why Choose SmartBook Sharing?</h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
              India's most trusted platform for buying and selling academic materials with KYC verification and escrow protection
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card hover className="text-center h-full">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-medium">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-secondary-900 mb-4">{feature.title}</h3>
                    <p className="text-secondary-600 leading-relaxed">{feature.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-display font-bold text-secondary-900 mb-2">Trending Books</h2>
              <p className="text-secondary-600">Most popular books this week</p>
            </div>
            <Link to="/browse">
              <Button variant="outline">
                View All
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trendingBooks.map((book, index) => (
              <motion.div
                key={book.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card hover className="group cursor-pointer" onClick={() => window.location.href = '/book/1'}>
                  <div className="aspect-[3/4] bg-gray-200 rounded-xl mb-4 overflow-hidden">
                    <img 
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-secondary-900 mb-1 group-hover:text-primary-600 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-sm text-secondary-600 mb-2">{book.author}</p>
                  <p className="text-lg font-bold text-primary-600">{book.price}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {!user && (
        <section className="py-20 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-4xl font-display font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-primary-100 mb-8">
              Join thousands of students and libraries already using SmartBook Sharing
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-semibold shadow-large border-0">
                  Create Account
                </Button>
              </Link>
              <Link to="/browse">
                <Button size="lg" variant="outline" className="border-2 border-accent-300 text-accent-300 hover:bg-accent-300 hover:text-primary-900 font-semibold">
                  Browse Books
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};