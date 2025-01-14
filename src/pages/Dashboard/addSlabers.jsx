import React, { useState } from 'react';

const SyllabusForm = () => {
  const [subject, setSubject] = useState('');
  const [syllabus, setSyllabus] = useState('');
  const [schoolcode, setSchoolcode] = useState('');
  const [chapters, setChapters] = useState('');
  const [completed, setCompleted] = useState(0);  // Default to 0 (not completed)
  const [status, setStatus] = useState('active');
  const [message, setMessage] = useState('');

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create the data object to send in the POST request
    const requestData = {
      subject,
      syllabus,
      schoolcode,
      chapters,
      completed,
      status,
    };

    // Send POST request to the PHP API
    try {
      const response = await fetch('https://codtsmartschool.strangeweb.in/sallaybers.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error occurred while submitting data');
    }
  };

  return (
    <div>
      <h2>Syllabus Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Syllabus:</label>
          <input
            type="text"
            value={syllabus}
            onChange={(e) => setSyllabus(e.target.value)}
            required
          />
        </div>

        <div>
          <label>School Code:</label>
          <input
            type="text"
            value={schoolcode}
            onChange={(e) => setSchoolcode(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Chapters:</label>
          <input
            type="text"
            value={chapters}
            onChange={(e) => setChapters(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Completed:</label>
          <input
            type="checkbox"
            checked={completed === 1}
            onChange={(e) => setCompleted(e.target.checked ? 1 : 0)}
          />
        </div>

        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default SyllabusForm;
