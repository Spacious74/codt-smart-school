import React, { useState, useEffect} from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio
} from "@mui/material";
import axios from "axios";
const API_URL = 'https://codtsmartschool.strangeweb.in/studentapi/submit_notice.php';


const Noticeform = () => {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [body, setBody] = useState("");
  const [notificationFor, setNotificationFor] = useState("students"); // Default value
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setNotices(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleCreateOrUpdateNotice = async () => {
    const notice = {
      title,
      shortDescription,
      body,
      notificationFor,
    };
    try {
      if (editing) {
        notice.id = editing.id;
        await fetch(API_URL, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(notice),
        });
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(notice),
        });
      }
      fetchNotices();
      clearForm();
    } catch (error) {
      console.error("Error saving notice:", error);
    }
  };

  const handleEdit = (notice) => {
    setTitle(notice.title);
    setShortDescription(notice.short_description);
    setBody(notice.body);
    setNotificationFor(notice.notification_for); // Set the notification_for value
    setEditing(notice);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(API_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id }),
      });
      fetchNotices();
    } catch (error) {
      console.error("Error deleting notice:", error);
    }
  };

  const clearForm = () => {
    setTitle("");
    setShortDescription("");
    setBody("");
    setNotificationFor("students"); // Reset to default
    setEditing(null);
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 3,
        maxWidth: 1200,
        margin: "0 auto",
        backgroundColor: "#ffff",
        borderRadius: "10px",
        boxShadow: 2,
      }}
    >
      <Typography variant="h6" color="#6B50FF">
        Notice
      </Typography>

      <TextField
        label="Title"
        variant="outlined"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        sx={{ borderColor: "#6B50FF" }}
      />

      <TextField
        label="Short Description"
        variant="outlined"
        name="shortDescription"
        value={shortDescription}
        onChange={(e) => setShortDescription(e.target.value)}
        multiline
        minRows={2}
        fullWidth
        sx={{ borderColor: "#6B50FF" }}
      />

      <TextField
        label="Body"
        variant="outlined"
        name="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        multiline
        minRows={10}
        fullWidth
        sx={{ borderColor: "#6B50FF" }}
      />

      <Typography variant="body1">Target Audience:</Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        {/* <FormControlLabel
          control={
            <Checkbox
              name="isSchool"
              checked={formData.isSchool}
              onChange={handleInputChange}
              color="primary"
            />
          }
          label="School"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="isStudents"
              checked={formData.isStudents}
              onChange={handleInputChange}
              color="primary"
            />
          }
          label="Students"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="isTeachers"
              checked={formData.isTeachers}
              onChange={handleInputChange}
              color="primary"
            />
          }
          label="Teachers"
        /> */}

        <RadioGroup value={notificationFor} onChange={(e) => setNotificationFor(e.target.value)} row>
          <FormControlLabel
            value="students"
            control={<Radio color="primary" />}
            label="Students"
          />
          <FormControlLabel
            value="teachers"
            control={<Radio color="primary" />}
            label="Teachers"
          />
          <FormControlLabel
            value="school"
            control={<Radio color="primary" />}
            label="School"
          />
        </RadioGroup>
      </Box>

      <Button
        variant="contained"
        onClick={handleCreateOrUpdateNotice}
        sx={{
          backgroundColor: "#6B50FF",
          color: "#FFF",
          alignSelf: "flex-end",
          ":hover": {
            backgroundColor: "#5638D6",
          },
        }}
      >
        {editing ? "Update Notice" : "Create Notice"}
      </Button>
    </Box>
  );
};

export default Noticeform;
