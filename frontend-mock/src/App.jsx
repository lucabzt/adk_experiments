import React from 'react';
import './App.css';
import Header from './components/Header';
import InputSection from './components/InputSection';
import Recommendations from './components/Recommendations';

function App() {
  return (
    <> {/* Use a fragment */}
      <Header /> {/* Header is now outside the main constrained content area */}
      <div className="app-container"> {/* This div could be #root or a child of it */}
        <main>
          <InputSection />
          <Recommendations />
        </main>
        <footer className="app-footer">
          <p>© {new Date().getFullYear()} TeachAI. Your Personal AI Learning Companion.</p>
        </footer>
      </div>
    </>
  );
}
export default App;