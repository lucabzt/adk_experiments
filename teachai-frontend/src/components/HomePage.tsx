import React, { useState } from 'react';
import { BookOpen, Upload, Image, Cloud } from 'lucide-react';

interface HomePageProps {
  onCreateCourse: (query: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onCreateCourse }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onCreateCourse(query);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-green-600" />
              <span className="text-xl font-semibold">TeachAI</span>
            </div>
            <nav className="flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">My Courses</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Flashcards</a>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                Sign In
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Learn Anything, <span className="text-green-600">Personalized for You</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Tell us what you want to learn, upload your materials, and our AI will create a custom
            learning path tailored just for you.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What do you want to learn today? (e.g., 'I want to learn Python' or 'Help me study for my Algorithms class')"
              className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
            />

            {/* Upload Options */}
            <div className="flex items-center justify-center space-x-6 mt-6 mb-8">
              <button type="button" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <Upload className="h-5 w-5" />
                <span>Upload Document</span>
              </button>
              <button type="button" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <Image className="h-5 w-5" />
                <span>Upload Image</span>
              </button>
              <button type="button" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <Cloud className="h-5 w-5" />
                <span>Connect Drive</span>
              </button>
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition flex items-center mx-auto"
            >
              Create My Course
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </form>

          <p className="text-gray-500 mt-6">
            Our AI analyzes your input and materials to create a personalized learning experience
          </p>
        </div>
      </section>

      {/* Recommended Courses Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Recommended Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-100 rounded-lg h-48 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;