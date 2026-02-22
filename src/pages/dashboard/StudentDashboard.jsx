import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpenIcon,
  CurrencyRupeeIcon,
  EyeIcon,
  HeartIcon,
  ShoppingBagIcon,
  ClockIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../services/api';

export const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [myListings, setMyListings] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showTrackModal, setShowTrackModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    loadMyListings();
  }, []);

  const loadMyListings = async () => {
    try {
      const response = await apiService.getMyListings();
      if (response.success) {
        setMyListings(response.data);
      }
    } catch (error) {
      console.error('Failed to load listings:', error);
    }
  };

  const stats = [
    { label: 'Books Sold', value: '12', icon: BookOpenIcon, color: 'text-green-600' },
    { label: 'Total Earnings', value: '₹8,450', icon: CurrencyRupeeIcon, color: 'text-blue-600' },
    { label: 'Active Listings', value: '5', icon: EyeIcon, color: 'text-purple-600' },
    { label: 'Wishlist Items', value: '8', icon: HeartIcon, color: 'text-red-600' }
  ];

  const recentListings = [
    {
      id: 1,
      title: 'Physics for JEE',
      author: 'H.C. Verma',
      price: 380,
      status: 'active',
      views: 45,
      listedDate: '2 days ago',
      image: 'https://picsum.photos/300/400?random=3'
    },
    {
      id: 2,
      title: 'Organic Chemistry',
      author: 'Morrison & Boyd',
      price: 450,
      status: 'sold',
      views: 89,
      listedDate: '1 week ago',
      image: 'https://picsum.photos/300/400?random=1'
    }
  ];

  const recentOrders = [
    {
      id: 1,
      title: 'Mathematics Class 12',
      seller: 'Priya Sharma',
      amount: 320,
      status: 'delivered',
      orderDate: '3 days ago',
      image: 'https://picsum.photos/300/400?random=5'
    },
    {
      id: 2,
      title: 'Computer Science Python',
      seller: 'Tech Library',
      amount: 290,
      status: 'shipped',
      orderDate: '5 days ago',
      image: 'https://picsum.photos/300/400?random=11'
    }
  ];

  const wishlistItems = [
    {
      id: 1,
      title: 'Biology NEET Preparation',
      author: 'Trueman',
      currentPrice: 420,
      targetPrice: 350,
      priceAlert: true,
      image: 'https://picsum.photos/300/400?random=9'
    },
    {
      id: 2,
      title: 'Economics Principles',
      author: 'Sandeep Garg',
      currentPrice: 350,
      targetPrice: 300,
      priceAlert: false,
      image: 'https://picsum.photos/300/400?random=13'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'listings', label: 'My Listings' },
    { id: 'orders', label: 'My Orders' },
    { id: 'wishlist', label: 'Wishlist' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-secondary-900 mb-2">Dashboard</h1>
          <p className="text-secondary-600">Manage your books and track your activity</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-secondary-600 mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-secondary-900">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full bg-secondary-100 ${stat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-display font-bold text-secondary-900">Recent Listings</h3>
                  <Button onClick={() => setActiveTab('listings')} variant="outline" size="sm">View All</Button>
                </div>
                <div className="space-y-3">
                  {myListings.slice(0, 2).map((listing) => (
                    <div key={listing._id} className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg shadow-soft">
                      <div className="w-12 h-16 bg-secondary-200 rounded overflow-hidden flex-shrink-0">
                        <img src={listing.images?.[0] || 'https://via.placeholder.com/300x400'} alt={listing.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-secondary-900">{listing.title}</h4>
                        <p className="text-sm text-secondary-600">{listing.author}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-secondary-900">₹{listing.price}</p>
                        <Badge variant={listing.status === 'sold' ? 'success' : 'secondary'}>
                          {listing.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {myListings.length === 0 && (
                    <p className="text-center text-gray-500 py-4">No listings yet</p>
                  )}
                </div>
              </Card>

              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-display font-bold text-secondary-900">Recent Orders</h3>
                  <Button onClick={() => setActiveTab('orders')} variant="outline" size="sm">View All</Button>
                </div>
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg shadow-soft">
                      <div className="w-12 h-16 bg-secondary-200 rounded overflow-hidden flex-shrink-0">
                        <img src={order.image} alt={order.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-secondary-900">{order.title}</h4>
                        <p className="text-sm text-secondary-600">by {order.seller}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-secondary-900">₹{order.amount}</p>
                        <Badge variant={order.status === 'delivered' ? 'success' : 'warning'}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'listings' && (
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-display font-bold text-secondary-900">My Listings</h3>
                <Button onClick={() => navigate('/sell')}>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add New Listing
                </Button>
              </div>
              <div className="space-y-4">
                {myListings.map((listing) => (
                  <div key={listing._id} className="flex items-center space-x-4 p-4 border border-secondary-200 rounded-xl shadow-soft hover:shadow-medium transition-all duration-200">
                    <div className="w-16 h-20 bg-secondary-200 rounded overflow-hidden flex-shrink-0">
                      <img src={listing.images?.[0] || 'https://via.placeholder.com/300x400'} alt={listing.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-secondary-900">{listing.title}</h4>
                      <p className="text-sm text-secondary-600 mb-2">{listing.author}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-secondary-600">Price: ₹{listing.price}</span>
                        <span className="text-secondary-600">Views: {listing.views || 0}</span>
                        <Badge variant={listing.status === 'sold' ? 'success' : 'secondary'}>
                          {listing.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={() => { setSelectedItem(listing); setShowEditModal(true); }} variant="outline" size="sm">Edit</Button>
                      <Button onClick={async () => { if (confirm('Delete this listing?')) { await apiService.deleteListing(listing._id); loadMyListings(); } }} variant="outline" size="sm">Delete</Button>
                    </div>
                  </div>
                ))}
                {myListings.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">No listings yet</p>
                    <Button onClick={() => navigate('/sell')}>Create Your First Listing</Button>
                  </div>
                )}
              </div>
            </Card>
          )}

          {activeTab === 'orders' && (
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-display font-bold text-secondary-900">My Orders</h3>
                <div className="flex space-x-2">
                  <Button onClick={() => alert('Orders filtered successfully')} variant="outline" size="sm">Filter</Button>
                  <Button onClick={() => alert('Orders exported successfully')} variant="outline" size="sm">Export</Button>
                </div>
              </div>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center space-x-4 p-4 border border-secondary-200 rounded-xl shadow-soft hover:shadow-medium transition-all duration-200">
                    <div className="w-16 h-20 bg-secondary-200 rounded overflow-hidden flex-shrink-0">
                      <img src={order.image} alt={order.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-secondary-900">{order.title}</h4>
                      <p className="text-sm text-secondary-600 mb-2">Seller: {order.seller}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-secondary-600">Amount: ₹{order.amount}</span>
                        <span className="text-secondary-600">{order.orderDate}</span>
                        <Badge variant={order.status === 'delivered' ? 'success' : 'warning'}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={() => { setSelectedItem(order); setShowTrackModal(true); }} variant="outline" size="sm">Track</Button>
                      <Button onClick={() => alert(`Opening chat with ${order.seller}...`)} variant="outline" size="sm">Chat</Button>
                      {order.status === 'delivered' && (
                        <Button onClick={() => { setSelectedItem(order); setRating(0); setShowReviewModal(true); }} size="sm">Review</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === 'wishlist' && (
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-display font-bold text-secondary-900">My Wishlist</h3>
                <p className="text-sm text-secondary-600">{wishlistItems.length} items</p>
              </div>
              <div className="space-y-4">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border border-secondary-200 rounded-xl shadow-soft hover:shadow-medium transition-all duration-200">
                    <div className="w-16 h-20 bg-secondary-200 rounded overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-secondary-900">{item.title}</h4>
                      <p className="text-sm text-secondary-600 mb-2">{item.author}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-secondary-600">Current: ₹{item.currentPrice}</span>
                        <span className="text-primary-600">Target: ₹{item.targetPrice}</span>
                        {item.priceAlert && (
                          <Badge variant="success" size="sm">Price Alert On</Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={() => confirm('Remove from wishlist?') && alert('Removed from wishlist!')} variant="outline" size="sm">Remove</Button>
                      <Button onClick={() => alert(`Redirecting to buy ${item.title}...`)} size="sm">Buy Now</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Edit Listing Modal */}
        {showEditModal && selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4">Edit Listing</h3>
              <form className="space-y-4" onSubmit={async (e) => { e.preventDefault(); const formData = new FormData(e.target); await apiService.updateListing(selectedItem._id, { title: formData.get('title'), author: formData.get('author'), price: formData.get('price') }); setShowEditModal(false); loadMyListings(); }}>
                <input type="text" name="title" defaultValue={selectedItem.title} placeholder="Book Title" className="w-full p-2 border rounded" required />
                <input type="text" name="author" defaultValue={selectedItem.author} placeholder="Author" className="w-full p-2 border rounded" required />
                <input type="number" name="price" defaultValue={selectedItem.price} placeholder="Price" className="w-full p-2 border rounded" required />
                <div className="flex space-x-2">
                  <Button type="button" onClick={() => setShowEditModal(false)} variant="outline" className="flex-1">Cancel</Button>
                  <Button type="submit" className="flex-1">Update</Button>
                </div>
              </form>
            </Card>
          </div>
        )}

        {/* Track Order Modal */}
        {showTrackModal && selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4">Track Order</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded">
                  <p className="font-semibold">{selectedItem.title}</p>
                  <p className="text-sm text-gray-600">Order Status: {selectedItem.status}</p>
                  <p className="text-sm text-gray-600">Tracking: TRK{selectedItem.id}234567</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <p className="text-sm">Order Placed - {selectedItem.orderDate}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <p className="text-sm">Order Confirmed</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 ${selectedItem.status === 'delivered' ? 'bg-green-500' : 'bg-gray-300'} rounded-full`}></div>
                    <p className="text-sm">Delivered</p>
                  </div>
                </div>
                <Button onClick={() => setShowTrackModal(false)} className="w-full">Close</Button>
              </div>
            </Card>
          </div>
        )}

        {/* Review Modal */}
        {showReviewModal && selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4">Write Review</h3>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert(`Review submitted with ${rating} stars!`); setShowReviewModal(false); }}>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="font-semibold">{selectedItem.title}</p>
                  <p className="text-sm text-gray-600">Seller: {selectedItem.seller}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  <div className="flex space-x-2">
                    {[1,2,3,4,5].map(star => (
                      <button key={star} type="button" onClick={() => setRating(star)} className="text-2xl">
                        {star <= rating ? '⭐' : '☆'}
                      </button>
                    ))}
                  </div>
                </div>
                <textarea placeholder="Write your review..." className="w-full p-2 border rounded" rows="4" required></textarea>
                <div className="flex space-x-2">
                  <Button type="button" onClick={() => setShowReviewModal(false)} variant="outline" className="flex-1">Cancel</Button>
                  <Button type="submit" className="flex-1">Submit Review</Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};