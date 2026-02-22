import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  DocumentTextIcon,
  StarIcon,
  ArrowDownTrayIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { apiService } from '../../services/api';

export const NotesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [notesData, setNotesData] = useState([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const response = await apiService.getNotes();
      setNotesData(response.data.map(note => ({
        id: note._id,
        title: note.title,
        subject: note.subject,
        class: note.class,
        board: note.board,
        author: note.author.name,
        price: note.price,
        rating: note.rating,
        downloads: note.downloads,
        pages: note.pages,
        type: 'PDF',
        preview: `https://via.placeholder.com/300x400/3b82f6/white?text=${note.subject}+Notes`
      })));
    } catch (error) {
      console.error('Failed to load notes:', error);
    }
  };

  const categories = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'];

  const filteredNotes = notesData.filter(note => {
    const matchesSearch = searchQuery === '' || 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || note.subject === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Digital Notes Marketplace</h1>
          <p className="text-gray-600">Download high-quality study notes from top students</p>
        </div>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-2xl">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes by title or subject..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <Button onClick={() => navigate('/notes/upload')}>Upload Notes</Button>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="w-64 flex-shrink-0">
            <Card>
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category 
                        ? 'bg-primary-50 text-primary-600 font-medium' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </Card>
          </div>

          <div className="flex-1">
            <div className="mb-6">
              <p className="text-gray-600">Showing {filteredNotes.length} notes</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card hover className="cursor-pointer">
                    <div className="aspect-[3/4] bg-gray-200 rounded-xl mb-4 overflow-hidden">
                      <img 
                        src={note.preview}
                        alt={note.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" size="sm">{note.subject}</Badge>
                        <Badge variant="outline" size="sm">{note.class}</Badge>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{note.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">by {note.author}</p>
                      
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(note.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-1">({note.rating})</span>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold text-primary-600">₹{note.price}</span>
                        <div className="flex items-center text-sm text-gray-500">
                          <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                          {note.downloads}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>{note.pages} pages</span>
                        <span>{note.type}</span>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <EyeIcon className="h-4 w-4" />
                          Preview
                        </Button>
                        <Button size="sm" className="flex-1">
                          <ArrowDownTrayIcon className="h-4 w-4" />
                          Buy
                        </Button>
                      </div>
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