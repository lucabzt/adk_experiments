import React from 'react';
import { BookOpen } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <BookOpen className="h-20 w-20 text-green-600 mx-auto animate-bounce" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-32 w-32 border-4 border-green-200 rounded-full animate-spin border-t-green-600"></div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Cooking up your personalized course
        </h2>

        <div className="space-y-2">
          <p className="text-gray-600 animate-pulse">Analyzing your learning goals...</p>
          <p className="text-gray-600 animate-pulse delay-100">Creating optimal learning path...</p>
          <p className="text-gray-600 animate-pulse delay-200">Generating engaging content...</p>
        </div>

        <div className="mt-8 flex items-center justify-center space-x-2">
          <div className="h-3 w-3 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="h-3 w-3 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="h-3 w-3 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;