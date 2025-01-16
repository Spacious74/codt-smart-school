import { useState} from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import 'react-quill/dist/quill.snow.css';

const AddSchoolassignment = () => {

  const [editorHtml, setEditorHtml] = useState('');
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    total_marks: "",
    submission_date: "",
    applicable_class: "",
    divi: "",
    questions: "",
    notes: "",
    teacheremail: "",
    schoolcode: localStorage.getItem("schoolCode"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const requestData = { ...formData };

    try {
      const response = await fetch("https://codtsmartschool.strangeweb.in/studentapi/save_assinment.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert("Data submitted successfully:", data);
        // Optionally reset the form or show success message
        setFormData({
          title: "",
          subject: "",
          total_marks: "",
          submission_date: "",
          applicable_class: "",
          divi: "",
          questions: "",
          notes: "",
          teacheremail: "",
          schoolcode: "",
        });
        alert("Form submitted successfully!");
      } else {
        console.error("Failed to submit data:", response.statusText);
        alert("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      console.error("Error occurred while submitting data:", error);
      alert("An error occurred. Please try again later.");
    }
  };


  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        border: '1px solid #503dff',
        padding: '20px',
        borderRadius: '8px',
        margin: '20px auto',
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: '20px', color: '#000' }}>
        Post new assignment
      </Typography>

      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ style: { color: '#503dff' } }}
        variant="outlined"
      />
      <TextField
        label="Subject"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ style: { color: '#503dff' } }}
        variant="outlined"
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <TextField
          label="Total Marks"
          name="total_marks"
          type="number"
          value={formData.total_marks}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ style: { color: '#503dff' } }}
          variant="outlined"
          sx={{ flex: 1, marginRight: '10px' }}
        />
        <TextField
          label="Last date to submit"
          name="submission_date"
          type="date"
          value={formData.submission_date}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ shrink: true, style: { color: '#503dff' } }}
          variant="outlined"
          sx={{ flex: 1 }}
        />
      </Box>
      <TextField
        label="Applicable Class"
        name="applicable_class"
        value={formData.applicable_class}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ style: { color: '#503dff' } }}
        variant="outlined"
      />
      <TextField
        label="Division"
        name="division" // New field for division
        value={formData.division}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ style: { color: '#503dff' } }}
        variant="outlined"
      />
      <TextField
        label="Add questions"
        name="questions"
        value={formData.questions}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
        InputLabelProps={{ style: { color: '#503dff' } }}
        variant="outlined"
      />
      <TextField
        label="Add Notes"
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={2}
        InputLabelProps={{ style: { color: '#503dff' } }}
        variant="outlined"
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: '#503dff',
          color: '#fff',
          marginTop: '20px',
          '&:hover': { backgroundColor: '#3b2cb3' },
          maxWidth: '300px',
        }}
        fullWidth
      >
        Submit Assignment
      </Button>
    </Box>
  );
};

export default AddSchoolassignment;
