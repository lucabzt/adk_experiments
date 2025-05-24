import React, { useState } from 'react';
import { X, Clock } from 'lucide-react';

interface TimeSelectionModalProps {
  onTimeSelected: (hours: number) => void;
  onCancel: () => void;
}

const TimeSelectionModal: React.FC<TimeSelectionModalProps> = ({ onTimeSelected, onCancel }) => {
  const [hours, setHours] = useState(2);

  const getTimeLabel = (hrs: number) => {
    if (hrs < 1) return `${hrs * 60} minutes`;
    if (hrs === 1) return '1 hour';
    return `${hrs} hours`;
  };

  const getMotivationalText = (hrs: number) => {
    if (hrs < 1) return "Perfect for a quick learning session!";
    if (hrs <= 2) return "Great for focused learning!";
    if (hrs <= 4) return "Excellent choice for deep understanding!";
    return "Ambitious! Let's create a comprehensive course!";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center mb-8">
          <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">How much time do you have?</h2>
          <p className="text-gray-600">
            Drag the slider to set your learning duration
          </p>
        </div>

        <div className="mb-8">
          <div className="text-center mb-4">
            <span className="text-4xl font-bold text-green-600">{getTimeLabel(hours)}</span>
            <p className="text-sm text-gray-500 mt-2">{getMotivationalText(hours)}</p>
          </div>

          <input
            type="range"
            min="0.5"
            max="8"
            step="0.5"
            value={hours}
            onChange={(e) => setHours(parseFloat(e.target.value))}
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #16a34a 0%, #16a34a ${(hours / 8) * 100}%, #e5e7eb ${(hours / 8) * 100}%, #e5e7eb 100%)`
            }}
          />

          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>30 min</span>
            <span>8 hours</span>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onTimeSelected(hours)}
            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
          >
            Start Learning
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeSelectionModal;