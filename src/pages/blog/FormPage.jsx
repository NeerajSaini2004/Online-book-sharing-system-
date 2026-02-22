import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  ChatBubbleLeftIcon,
  EyeIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  FireIcon
} from '@heroicons/react/24/outline';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export const FormPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Posts', count: 156 },
    { id: 'textbooks', name: 'Textbooks', count: 45 },
    { id: 'notes', name: 'Study Notes', count: 32 },
    { id: 'exams', name: 'Exam Prep', count: 28 },
    { id: 'general', name: 'General', count: 51 }
  ];

  const posts = [
    {
      id: 1,
      title: 'Best Physics textbook for JEE preparation?',
      content: 'Looking for recommendations for physics books that cover JEE syllabus comprehensively...',
      author: 'Rahul Kumar',
      authorRole: 'student',
      category: 'textbooks',
      replies: 12,
      views: 234,
      likes: 18,
      timeAgo: '2 hours ago',
      tags: ['JEE', 'Physics', 'Textbooks']
    },
    {
      id: 2,
      title: 'Organic Chemistry notes sharing',
      content: 'I have compiled detailed notes for organic chemistry reactions. Happy to share with fellow students...',
      author: 'Priya Sharma',
      authorRole: 'student',
      category: 'notes',
      replies: 8,
      views: 156,
      likes: 25,
      timeAgo: '4 hours ago',
      tags: ['Chemistry', 'Notes', 'Organic']
    },
    {
      id: 3,
      title: 'NEET Biology preparation strategy',
      content: 'What is the most effective way to prepare biology for NEET? Should I focus more on NCERT or reference books?',
      author: 'Central Library',
      authorRole: 'library',
      category: 'exams',
      replies: 15,
      views: 389,
      likes: 32,
      timeAgo: '1 day ago',
      tags: ['NEET', 'Biology', 'Strategy']
    }
  ];

  const filteredPosts = posts.filter(post =>
    (activeTab === 'all' || post.category === activeTab) &&
    (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Forum</h1>
            <p className="text-gray-600 mt-2">Ask questions, share knowledge, and connect with fellow learners</p>
          </div>
          <Button className="flex items-center gap-2">
            <PlusIcon className="h-5 w-5" />
            New Post
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={`w-full flex justify-between items-center p-3 rounded-lg text-left transition-colors ${activeTab === category.id
                        ? 'bg-primary-50 text-primary-600 border border-primary-200'
                        : 'hover:bg-gray-50'
                      }`}
                  >
                    <span className="font-medium">{category.name}</span>
                    <Badge variant="secondary">{category.count}</Badge>
                  </button>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FireIcon className="h-5 w-5 text-orange-500" />
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {['JEE', 'NEET', 'Physics', 'Chemistry', 'Mathematics', 'Biology'].map((tag) => (
                  <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-primary-50">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <div className="mb-6">
              <Input
                placeholder="Search discussions..."
                icon={<MagnifyingGlassIcon />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card hover className="cursor-pointer">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {post.author.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                            {post.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{post.author}</span>
                            <Badge variant={post.authorRole === 'library' ? 'primary' : 'secondary'} size="sm">
                              {post.authorRole}
                            </Badge>
                            <span>•</span>
                            <span>{post.timeAgo}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{post.content}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <ChatBubbleLeftIcon className="h-4 w-4" />
                          <span>{post.replies} replies</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <EyeIcon className="h-4 w-4" />
                          <span>{post.views} views</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <HeartIcon className="h-4 w-4" />
                          <span>{post.likes} likes</span>
                        </div>
                      </div>
                      <Badge variant="outline" size="sm">
                        {post.category}
                      </Badge>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};