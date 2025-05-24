import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { BookOpen, ChevronLeft, ChevronRight, Menu, Home, CheckCircle } from 'lucide-react';
import { Course, Chapter } from '../App';

interface CourseViewProps {
  course: Course;
  onBackToHome: () => void;
}

const CourseView: React.FC<CourseViewProps> = ({ course, onBackToHome }) => {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [completedChapters, setCompletedChapters] = useState<Set<number>>(new Set());

  const currentChapter = course.chapters[currentChapterIndex];

  const handleNextChapter = () => {
    if (currentChapterIndex < course.chapters.length - 1) {
      setCompletedChapters(prev => new Set(prev).add(currentChapterIndex));
      setCurrentChapterIndex(currentChapterIndex + 1);
    }
  };

  const handlePreviousChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
    }
  };

  const handleChapterSelect = (index: number) => {
    setCurrentChapterIndex(index);
  };

  const markAsComplete = () => {
    setCompletedChapters(prev => new Set(prev).add(currentChapterIndex));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 bg-white border-r border-gray-200 overflow-hidden`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <BookOpen className="h-6 w-6 text-green-600" />
            <span className="text-lg font-semibold">Course Content</span>
          </div>
          <div className="text-sm text-gray-600">
            {completedChapters.size} of {course.chapters.length} chapters completed
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-120px)]">
          {course.chapters.map((chapter, index) => (
            <div
              key={chapter.index}
              onClick={() => handleChapterSelect(index)}
              className={`p-4 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition ${
                currentChapterIndex === index ? 'bg-green-50 border-l-4 border-l-green-600' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {completedChapters.has(index) ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <div className={`h-5 w-5 rounded-full border-2 ${
                      currentChapterIndex === index ? 'border-green-600' : 'border-gray-300'
                    }`} />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    Chapter {chapter.index}: {chapter.caption}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {chapter.summary}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-600 hover:text-gray-900"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-green-600" />
                <span className="text-lg font-semibold">TeachAI</span>
              </div>
            </div>
            <button
              onClick={onBackToHome}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <Home className="h-5 w-5" />
              <span>Back to Home</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
              {/* Chapter Header */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl font-bold text-gray-800">
                    Chapter {currentChapter.index}: {currentChapter.caption}
                  </h1>
                  {!completedChapters.has(currentChapterIndex) && (
                    <button
                      onClick={markAsComplete}
                      className="text-green-600 hover:text-green-700 font-medium"
                    >
                      Mark as complete
                    </button>
                  )}
                </div>
                <div className="text-gray-600">
                  {currentChapterIndex + 1} of {course.chapters.length}
                </div>
              </div>

              {/* Markdown Content */}
              <div className="markdown-content">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => <h1 className="text-3xl font-bold mb-4 text-gray-800">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-2xl font-bold mb-3 mt-6 text-gray-800">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-xl font-bold mb-2 mt-4 text-gray-800">{children}</h3>,
                    p: ({ children }) => <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>,
                    ul: ({ children }) => <ul className="mb-4 list-disc list-inside space-y-2">{children}</ul>,
                    ol: ({ children }) => <ol className="mb-4 list-decimal list-inside space-y-2">{children}</ol>,
                    li: ({ children }) => <li className="text-gray-700">{children}</li>,
                    code: ({ node, className, children, ...props }) => {
                      const match = /language-(\w+)/.exec(className || '');
                      const isInline = !match && (!node || node.position?.start.line === node.position?.end.line);

                      return isInline ? (
                        <code className="bg-gray-100 text-green-600 px-2 py-1 rounded" {...props}>
                          {children}
                        </code>
                      ) : (
                        <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4" {...props}>
                          {children}
                        </code>
                      );
                    },
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-green-600 pl-4 my-4 italic text-gray-700">
                        {children}
                      </blockquote>
                    ),
                  }}
                >
                  {currentChapter.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <button
              onClick={handlePreviousChapter}
              disabled={currentChapterIndex === 0}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                currentChapterIndex === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Previous</span>
            </button>

            <span className="text-gray-600">
              Chapter {currentChapterIndex + 1} of {course.chapters.length}
            </span>

            <button
              onClick={handleNextChapter}
              disabled={currentChapterIndex === course.chapters.length - 1}
              className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition font-semibold ${
                currentChapterIndex === course.chapters.length - 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              <span>Next</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseView;