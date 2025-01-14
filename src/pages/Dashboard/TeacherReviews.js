import React, { useState } from 'react';

const SubmitReview = () => {
  const [uid, setUid] = useState('');
  const [review, setReview] = useState('');
  const [schoolCode, setSchoolCode] = useState('');
  const [role, setRole] = useState('');
  const [rating, setRating] = useState(0); // New state for rating
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation to ensure fields are not empty
    if (!uid || !review || !schoolCode || !role || !rating) {
      setMessage('Please fill in all fields including the rating.');
      return;
    }

    // Set loading to true while the request is in progress
    setLoading(true);

    try {
      const response = await fetch('https://codtsmartschool.strangeweb.in/teacherapi/submit_review.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid,
          review,
          school_code: schoolCode,
          role,
          rating, // Include the rating in the request body
        }),
      });

      const data = await response.json();

      // Check if the request was successful
      if (data.success) {
        setMessage('Review submitted successfully!');
      } else {
        setMessage(data.message || 'Failed to submit the review');
      }
    } catch (error) {
      setMessage('Error occurred while submitting the review');
    }

    // Set loading to false after the request is completed
    setLoading(false);
  };

  return (
    <div>
      <h2>Submit Your Review</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>UID:</label>
          <input
            type="number"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Review:</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </div>
        <div>
          <label>School Code:</label>
          <input
            type="text"
            value={schoolCode}
            onChange={(e) => setSchoolCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Rating (1-5):</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SubmitReview;
