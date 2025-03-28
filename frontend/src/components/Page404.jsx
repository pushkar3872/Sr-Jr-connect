import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Page404 = () => {
  const handleGoHome = () => {
    // Simple navigation without React Router
    window.location.href = '/';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <AlertCircle className="w-24 h-24 text-red-500" />
        </div>
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-6">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        <Button 
          onClick={handleGoHome} 
          variant="default" 
          size="lg"
        >
          Go to Home Page
        </Button>
      </div>
    </div>
  );
};

export default Page404;