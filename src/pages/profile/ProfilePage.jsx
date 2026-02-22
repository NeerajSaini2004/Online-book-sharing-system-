import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserCircleIcon,
  PencilIcon,
  ShieldCheckIcon,
  MapPinIcon,
  AcademicCapIcon,
  BuildingLibraryIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Rating } from '../../components/ui/Rating';

export const ProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card className="p-6">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                <UserCircleIcon className="h-16 w-16 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-2xl font-display font-bold text-secondary-900">
                    {user?.name}
                  </h1>
                  {user?.kycStatus === 'verified' && (
                    <ShieldCheckIcon className="h-6 w-6 text-green-500" />
                  )}
                  <Badge variant={user?.role === 'library' ? 'primary' : 'secondary'}>
                    {user?.role}
                  </Badge>
                </div>
                <p className="text-secondary-600 mb-2">{user?.email}</p>
                <div className="flex items-center space-x-4">
                  <Rating value={user?.rating?.average || 0} size="sm" />
                  <span className="text-sm text-secondary-600">
                    ({user?.rating?.count || 0} reviews)
                  </span>
                </div>
              </div>
              <Button onClick={() => setIsEditing(!isEditing)} variant="outline">
                <PencilIcon className="h-4 w-4 mr-2" />
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-xl font-display font-bold text-secondary-900 mb-4">
                Personal Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Full Name
                  </label>
                  <p className="text-secondary-900">{user?.name}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Email Address
                  </label>
                  <p className="text-secondary-900">{user?.email}</p>
                </div>

                {user?.role === 'student' && (
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      College/University
                    </label>
                    <div className="flex items-center space-x-2">
                      <AcademicCapIcon className="h-4 w-4 text-secondary-500" />
                      <span className="text-secondary-900">{user?.college}</span>
                    </div>
                  </div>
                )}

                {user?.role === 'library' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">
                        Library Name
                      </label>
                      <div className="flex items-center space-x-2">
                        <BuildingLibraryIcon className="h-4 w-4 text-secondary-500" />
                        <span className="text-secondary-900">{user?.libraryName}</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">
                        Location
                      </label>
                      <div className="flex items-center space-x-2">
                        <MapPinIcon className="h-4 w-4 text-secondary-500" />
                        <span className="text-secondary-900">
                          {user?.location?.city}, {user?.location?.state}
                        </span>
                      </div>
                    </div>
                  </>
                )}

                {isEditing && (
                  <div className="flex space-x-3 pt-4">
                    <Button onClick={handleSave} className="flex-1">Save Changes</Button>
                    <Button onClick={() => setIsEditing(false)} variant="outline" className="flex-1">Cancel</Button>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-display font-bold text-secondary-900 mb-4">
                Account Status
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                  <span className="text-secondary-700">KYC Verification</span>
                  <Badge variant={user?.kycStatus === 'verified' ? 'success' : 'warning'}>
                    {user?.kycStatus}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                  <span className="text-secondary-700">Account Status</span>
                  <Badge variant={user?.isActive ? 'success' : 'error'}>
                    {user?.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>

                <div className="pt-4 space-y-2">
                  <Button onClick={() => alert('Opening KYC verification...')} variant="outline" className="w-full">
                    Update KYC Documents
                  </Button>
                  <Button onClick={() => alert('Opening security settings...')} variant="outline" className="w-full">
                    Security Settings
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};