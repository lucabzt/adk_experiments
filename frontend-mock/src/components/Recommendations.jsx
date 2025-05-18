import React from 'react';
import './Recommendations.css';

// Star Icon for ratings - Updated for light theme
const StarIcon = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 24 24"
       fill={filled ? "var(--accent-star)" : "none"}
       stroke={filled ? "var(--accent-star)" : "var(--border-color)"} // Border for empty stars
       strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const CourseCard = ({ course }) => {
  const renderStars = (rating) => {
    let stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5; // Simple half-star logic, could be more complex
    for (let i = 1; i <= 5; i++) {
      stars.push(<StarIcon key={i} filled={i <= rating} />); // Simple filled logic
    }
    return stars;
  };

  return (
    <div className="course-card">
      <div className="course-image-container">
        <img src={course.imageUrl || `https://via.placeholder.com/300x170/E9ECEF/5A646E?text=${encodeURIComponent(course.title.substring(0,15))}`} alt={course.title} className="course-image" />
        {course.isBestseller && <span className="bestseller-tag">Bestseller</span>}
      </div>
      <div className="course-content">
        <h3 className="course-title">{course.title}</h3>
        <p className="course-instructor">{course.instructor}</p>
        <div className="course-rating">
          <span className="rating-score">{course.rating.toFixed(1)}</span>
          <span className="stars">{renderStars(course.rating)}</span>
          <span className="rating-count">({course.reviews.toLocaleString()})</span>
        </div>
        <div className="course-price">
          <span className="current-price">€{course.currentPrice.toFixed(2)}</span>
          {course.originalPrice && <span className="original-price">€{course.originalPrice.toFixed(2)}</span>}
        </div>
      </div>
    </div>
  );
};

const Recommendations = () => {
  const courses = [
    {
      id: 1,
      title: 'Ultimate Python Bootcamp: Zero to Hero',
      instructor: 'Angela Yu',
      rating: 4.7,
      reviews: 150309,
      currentPrice: 13.99,
      originalPrice: 89.99,
      imageUrl: 'https://img-c.udemycdn.com/course/240x135/1565838_e54e_16.jpg',
      isBestseller: true,
    },
    {
      id: 2,
      title: 'The Complete JavaScript Course 2024: From Zero to Expert!',
      instructor: 'Jonas Schmedtmann',
      rating: 4.7,
      reviews: 190764,
      currentPrice: 16.99,
      originalPrice: 99.99,
      imageUrl: 'https://img-c.udemycdn.com/course/240x135/851712_fc63_20.jpg',
      isBestseller: true,
    },
    {
      id: 3,
      title: 'React - The Complete Guide (incl Hooks, React Router, Redux)',
      instructor: 'Maximilian Schwarzmüller',
      rating: 4.6,
      reviews: 200301,
      currentPrice: 14.99,
      originalPrice: 94.99,
      imageUrl: 'https://img-c.udemycdn.com/course/240x135/705264_caa9_13.jpg',
      isBestseller: false,
    },
    {
      id: 4,
      title: 'Machine Learning A-Z™: AI, Python & R + ChatGPT Bonus',
      instructor: 'Kirill Eremenko, Hadelin de Ponteves',
      rating: 4.5,
      reviews: 175971,
      currentPrice: 15.99,
      originalPrice: 84.99,
      imageUrl: 'https://img-c.udemycdn.com/course/240x135/950390_270f_3.jpg',
      isBestseller: true,
    },
    {
        id: 5,
        title: 'AWS Certified Solutions Architect - Associate 2024',
        instructor: 'Stephane Maarek | AWS Certified Cloud Practitioner',
        rating: 4.7,
        reviews: 250786,
        currentPrice: 12.99,
        originalPrice: 79.99,
        imageUrl: 'https://img-c.udemycdn.com/course/240x135/3142166_a637_5.jpg',
        isBestseller: false,
    }
  ];

  return (
    <section className="recommendations-section">
      <h2 className="recommendations-title">Explore Popular Courses</h2>
      <div className="courses-grid">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
};

export default Recommendations;