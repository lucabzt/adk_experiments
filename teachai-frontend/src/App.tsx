import React, { useState } from 'react';
import HomePage from './components/HomePage';
import TimeSelectionModal from './components/TimeSelectionModal';
import LoadingScreen from './components/LoadingScreen';
import CourseView from './components/CourseView';
import './App.css';

export interface McQuestion {
  question: string;
  answer_a: string;
  answer_b: string;
  answer_c: string;
  answer_d: string;
  correct_answer: 'a' | 'b' | 'c' | 'd';
  explanation: string;
}

export interface Chapter {
  index: number;
  caption: string;
  summary: string;
  content: string;
  mc_questions: McQuestion[];
}

export interface Course {
  status: string;
  chapters: Chapter[];
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'timeSelection' | 'loading' | 'course'>('home');
  const [userQuery, setUserQuery] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [course, setCourse] = useState<Course | null>(null);
  const [userId] = useState(`user-${Date.now()}`); // Random user ID

  const handleCreateCourse = (query: string) => {
    setUserQuery(query);
    setCurrentView('timeSelection');
  };

  const handleTimeSelected = async (hours: number) => {
    setCurrentView('loading');

    try {
      // Create session
      const sessionResponse = await fetch(`http://localhost:8000/create_session/${userId}`, {
        method: 'POST',
      });
      const sessionData = await sessionResponse.json();
      setSessionId(sessionData.session_id);

      // Create course
      const courseResponse = await fetch(`http://localhost:8000/create_course/${userId}/${sessionData.session_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: userQuery,
          time: hours,
        }),
      });
      const courseData = await courseResponse.json();
      setCourse(courseData);
      setCurrentView('course');
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Failed to create course. Please try again.');
      setCurrentView('home');
    }
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setUserQuery('');
    setCourse(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'home' && (
        <HomePage onCreateCourse={handleCreateCourse} />
      )}
      {currentView === 'timeSelection' && (
        <TimeSelectionModal
          onTimeSelected={handleTimeSelected}
          onCancel={() => setCurrentView('home')}
        />
      )}
      {currentView === 'loading' && (
        <LoadingScreen />
      )}
      {currentView === 'course' && course && (
        <CourseView
          course={course}
          onBackToHome={handleBackToHome}
        />
      )}
    </div>
  );
};

export default App;
