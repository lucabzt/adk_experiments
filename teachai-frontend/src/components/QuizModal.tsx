import React, { useState, useEffect } from 'react';
import { X, CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { McQuestion } from '../App';

interface QuizQuestionProps {
  question: McQuestion;
  questionIndex: number;
  onAnswerSelect?: (questionIndex: number, selectedAnswer: string, isCorrect: boolean) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, questionIndex, onAnswerSelect }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerClick = (answerKey: string) => {
    if (showResult) return; // Prevent changing answer after submission

    setSelectedAnswer(answerKey);
    setShowResult(true);

    // Call parent callback if needed
    if (onAnswerSelect) {
      onAnswerSelect(questionIndex, answerKey, answerKey === question.correct_answer);
    }
  };

  const isCorrect = selectedAnswer === question.correct_answer;

  const answers = [
    { key: 'a', text: question.answer_a },
    { key: 'b', text: question.answer_b },
    { key: 'c', text: question.answer_c },
    { key: 'd', text: question.answer_d }
  ];

  return (
    <div className="quiz-question mb-6 p-4 border border-gray-200 rounded-lg bg-white">
      <h4 className="font-semibold mb-4 text-lg text-gray-800 flex items-start">
        <HelpCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
        <span>Question {questionIndex + 1}: {question.question}</span>
      </h4>

      <div className="space-y-2">
        {answers.map(({ key, text }) => {
          let buttonClass = "w-full text-left p-3 border rounded-lg transition-all duration-200 flex items-center ";

          if (!showResult) {
            // Before answering
            buttonClass += "border-gray-300 hover:border-blue-400 hover:bg-blue-50 cursor-pointer hover:shadow-sm";
          } else {
            // After answering
            if (key === question.correct_answer) {
              // Correct answer - always green
              buttonClass += "border-green-500 bg-green-100 text-green-800";
            } else if (key === selectedAnswer && key !== question.correct_answer) {
              // Wrong selected answer - red
              buttonClass += "border-red-500 bg-red-100 text-red-800";
            } else {
              // Other options - gray
              buttonClass += "border-gray-300 bg-gray-50 text-gray-600";
            }
          }

          return (
            <button
              key={key}
              onClick={() => handleAnswerClick(key)}
              className={buttonClass}
              disabled={showResult}
            >
              <span className="font-semibold mr-2 flex-shrink-0 w-6">
                {key.toUpperCase()})
              </span>
              <span className="flex-1">{text}</span>
              {showResult && key === question.correct_answer && (
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 ml-2" />
              )}
              {showResult && key === selectedAnswer && key !== question.correct_answer && (
                <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 ml-2" />
              )}
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className={`mt-4 p-4 rounded-lg ${
          isCorrect 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <div className={`font-semibold flex items-center mb-2 ${
            isCorrect ? 'text-green-800' : 'text-red-800'
          }`}>
            {isCorrect ? (
              <>
                <CheckCircle className="h-5 w-5 mr-2" />
                Correct!
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 mr-2" />
                Incorrect
              </>
            )}
          </div>
          <div className="text-gray-700">
            <strong>Explanation:</strong> {question.explanation}
          </div>
          {!isCorrect && (
            <div className="mt-2 text-sm text-gray-600">
              The correct answer was <strong>{question.correct_answer.toUpperCase()}</strong>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  mcQuestions: McQuestion[];
  chapterIndex: number;
  chapterTitle: string;
}

const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  mcQuestions,
  chapterIndex,
  chapterTitle
}) => {
  const [userAnswers, setUserAnswers] = useState<Record<number, { answer: string; correct: boolean }>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Reset quiz state when modal opens or chapter changes
  useEffect(() => {
    if (isOpen) {
      setUserAnswers({});
      setQuizCompleted(false);
    }
  }, [isOpen, chapterIndex]);

  const handleAnswerSelect = (questionIndex: number, selectedAnswer: string, isCorrect: boolean) => {
    const newAnswers = {
      ...userAnswers,
      [questionIndex]: {
        answer: selectedAnswer,
        correct: isCorrect
      }
    };
    setUserAnswers(newAnswers);

    // Check if all questions are answered
    if (Object.keys(newAnswers).length === mcQuestions.length) {
      setQuizCompleted(true);
    }
  };

  const getQuizStats = () => {
    const totalQuestions = mcQuestions.length;
    const correctAnswers = Object.values(userAnswers).filter(answer => answer.correct).length;
    const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

    return { totalQuestions, correctAnswers, percentage };
  };

  const handleClose = () => {
    setUserAnswers({});
    setQuizCompleted(false);
    onClose();
  };

  if (!isOpen) return null;

  const stats = getQuizStats();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <HelpCircle className="h-7 w-7 text-blue-600 mr-3" />
              Chapter {chapterIndex + 1} Quiz
            </h2>
            <p className="text-gray-600 mt-1">{chapterTitle}</p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <p className="text-gray-600">
              Test your understanding with these {mcQuestions.length} questions:
            </p>
            {Object.keys(userAnswers).length > 0 && (
              <div className="mt-2 text-sm text-blue-600">
                Progress: {Object.keys(userAnswers).length}/{mcQuestions.length} answered
              </div>
            )}
          </div>

          <div className="space-y-6">
            {mcQuestions.map((question, index) => (
              <QuizQuestion
                key={`${chapterIndex}-${index}`} // Key includes chapter to force re-render
                question={question}
                questionIndex={index}
                onAnswerSelect={handleAnswerSelect}
              />
            ))}
          </div>

          {quizCompleted && (
            <div className="mt-8 p-6 bg-white border border-blue-200 rounded-lg shadow-sm">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Quiz Complete! 🎉
              </h4>
              <div className="text-blue-700 mb-2">
                You scored <span className="font-bold">{stats.correctAnswers}</span> out of{' '}
                <span className="font-bold">{stats.totalQuestions}</span> ({stats.percentage}%)
              </div>
              {stats.percentage >= 80 && (
                <div className="mt-2 text-green-700 font-medium p-2 bg-green-50 rounded border-l-4 border-green-400">
                  🌟 Excellent! You have a strong understanding of this chapter.
                </div>
              )}
              {stats.percentage >= 60 && stats.percentage < 80 && (
                <div className="mt-2 text-yellow-700 font-medium p-2 bg-yellow-50 rounded border-l-4 border-yellow-400">
                  👍 Good effort! You might want to review some concepts from this chapter.
                </div>
              )}
              {stats.percentage < 60 && (
                <div className="mt-2 text-red-700 font-medium p-2 bg-red-50 rounded border-l-4 border-red-400">
                  📚 Consider reviewing this chapter material before moving on.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
          <button
            onClick={handleClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            Close Quiz
          </button>
          {quizCompleted && (
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Continue Learning
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizModal;