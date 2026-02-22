import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DocumentArrowUpIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { FileUploader } from '../../components/ui/FileUploader';

export const KYCUploadPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [kycType, setKycType] = useState('library');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = (files) => {
    setUploadedFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate KYC submission
      console.log('KYC submitted:', { kycType, files: uploadedFiles });
      
      // After successful submission, redirect to dashboard
      setTimeout(() => {
        navigate('/library/dashboard');
      }, 1000);
    } catch (error) {
      console.error('KYC submission failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-display font-bold text-secondary-900 mb-4">KYC Verification</h1>
          <p className="text-secondary-600">
            Upload your documents to verify your identity and start selling on SmartBook Sharing
          </p>
        </motion.div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select your role
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setKycType('student')}
                  className={`p-4 border-2 rounded-xl text-center transition-colors ${
                    kycType === 'student'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">Student</div>
                  <div className="text-sm text-gray-500">College ID required</div>
                </button>
                <button
                  type="button"
                  onClick={() => setKycType('library')}
                  className={`p-4 border-2 rounded-xl text-center transition-colors ${
                    kycType === 'library'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">Library</div>
                  <div className="text-sm text-gray-500">GST/Registration required</div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Upload Documents
              </label>
              <FileUploader
                onFilesChange={handleFileUpload}
                acceptedTypes={['image/*', '.pdf']}
                maxFiles={3}
                maxSize={10 * 1024 * 1024}
              />
              <div className="mt-2 text-sm text-gray-500">
                {kycType === 'student' 
                  ? 'Upload your college ID card and any additional verification documents'
                  : 'Upload GST certificate, library registration, and official ID proof'
                }
              </div>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Uploaded Files:</h4>
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircleIcon className="h-4 w-4 text-green-500" />
                    <span>{file.name}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 shadow-soft">
              <div className="flex items-start space-x-3">
                <DocumentArrowUpIcon className="h-5 w-5 text-primary-600 mt-0.5" />
                <div className="text-sm text-primary-700">
                  <p className="font-semibold mb-1">Verification Process</p>
                  <p>Your documents will be reviewed within 24-48 hours. You'll receive an email notification once verified.</p>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={uploadedFiles.length === 0 || loading}
            >
              {loading ? 'Submitting...' : 'Submit for Verification'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};