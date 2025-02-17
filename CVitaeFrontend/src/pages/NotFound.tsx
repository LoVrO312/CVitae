import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md">
        <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          Oops! The page you are looking for does not exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
