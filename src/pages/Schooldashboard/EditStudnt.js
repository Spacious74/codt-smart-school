import React, { useState } from 'react';
import axios from 'axios';

const EditStudentForm = () => {
  const [student, setStudent] = useState({
    id: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    school_name: '',
    grade: '',
    divi: '',
    address: '',
    city: '',
    pin_code: '',
    state: '',
    subjects: '',
    password: '',
    schoolcode: '',
    image: '',
    rolenum: '',
    status: '',
  });

  const [message, setMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('https://codtsmartschool.strangeweb.in/studentapi/edit_student.php', student, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.data.success) {
        setMessage('Student updated successfully!');
      } else {
        setMessage('Failed to update student.');
      }
    } catch (error) {
      console.error('Error updating student:', error);
      setMessage('An error occurred while updating student.');
    }
  };

  return (
    <div>
      <h2>Edit Student Details</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          value={student.first_name}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="last_name"
          value={student.last_name}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          type="text"
          name="phone_number"
          value={student.phone_number}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <input
          type="email"
          name="email"
          value={student.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="school_name"
          value={student.school_name}
          onChange={handleChange}
          placeholder="School Name"
        />
        <input
          type="number"
          name="grade"
          value={student.grade}
          onChange={handleChange}
          placeholder="Grade"
        />
        <input
          type="text"
          name="divi"
          value={student.divi}
          onChange={handleChange}
          placeholder="Division"
        />
        <textarea
          name="address"
          value={student.address}
          onChange={handleChange}
          placeholder="Address"
        />
        <input
          type="text"
          name="city"
          value={student.city}
          onChange={handleChange}
          placeholder="City"
        />
        <input
          type="text"
          name="pin_code"
          value={student.pin_code}
          onChange={handleChange}
          placeholder="Pin Code"
        />
        <input
          type="text"
          name="state"
          value={student.state}
          onChange={handleChange}
          placeholder="State"
        />
        <input
          type="text"
          name="subjects"
          value={student.subjects}
          onChange={handleChange}
          placeholder="Subjects"
        />
        <input
          type="password"
          name="password"
          value={student.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <input
          type="text"
          name="schoolcode"
          value={student.schoolcode}
          onChange={handleChange}
          placeholder="School Code"
        />
        <input
          type="text"
          name="image"
          value={student.image}
          onChange={handleChange}
          placeholder="Image Path"
        />
        <input
          type="text"
          name="rolenum"
          value={student.rolenum}
          onChange={handleChange}
          placeholder="Roll Number"
        />
        <input
          type="text"
          name="status"
          value={student.status}
          onChange={handleChange}
          placeholder="Status"
        />
        
        <button type="submit">Update Student</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default EditStudentForm;
