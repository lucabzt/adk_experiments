import React, { useState } from 'react';
import './InputSection.css';

// SVG Icons
const PlusIcon = () => ( /* ... same as before ... */
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const FileTextIcon = () => ( /* ... same as before ... */
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const ImageUploadIcon = () => ( // New icon for photo upload
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <circle cx="8.5" cy="8.5" r="1.5"></circle>
        <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
);


const InputSection = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    event.target.style.height = 'inherit';
    // Set a base height, then allow it to grow up to a max
    const newHeight = Math.max(100, event.target.scrollHeight); // Min height of 100px
    event.target.style.height = `${Math.min(newHeight, 250)}px`; // Max height cap
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      console.log("Submitting with TeachAI:", inputValue);
      setInputValue('');
      const textarea = document.getElementById('ai-prompt-input');
      if (textarea) {
          textarea.style.height = '100px'; // Reset to initial min-height
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <section className="input-section">
      <h1 className="input-section-title">What do you want to learn today?</h1>
      <p className="input-section-subtitle">
        Simply tell TeachAI your learning goal. We'll generate a personalized course for you.
      </p>
      <div className="input-area-wrapper">
        <div className="main-input-container">
          <textarea
            id="ai-prompt-input"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="e.g., I want to learn Python from scratch..."
            rows="3" // Initial rows, CSS will control min-height
          />
          <button
            className="submit-prompt-button"
            onClick={handleSubmit}
            disabled={!inputValue.trim()}
            aria-label="Generate Course"
          >
            Start Learning
          </button>
        </div>
        <div className="attachment-actions">
          <button className="attachment-button" aria-label="Upload documents">
            <FileTextIcon />
            <span>Upload Document</span>
          </button>
          <button className="attachment-button" aria-label="Upload photos">
            <ImageUploadIcon />
            <span>Upload Photo</span>
          </button>
          <button className="attachment-button" aria-label="Add content">
            <PlusIcon />
            <span>Add from Drive</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default InputSection;