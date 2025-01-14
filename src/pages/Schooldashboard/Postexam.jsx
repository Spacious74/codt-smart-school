import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const ExamForm = () => {
  return (
    <Box
      sx={{
        border: '2px solid #503dff',
        padding: '20px',
        borderRadius: '8px',
        margin: '20px auto',
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: '20px', color: '#000' }}>
        Post new exam
      </Typography>

      <TextField
        label="Subject"
        fullWidth
        margin="normal"
        InputLabelProps={{ style: { color: '#503dff' } }}
        variant="outlined"
      />
      <TextField
        label="Exam Date"
        type="date"
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true, style: { color: '#503dff' } }}
        variant="outlined"
      />
      <TextField
        label="Total Marks"
        type="number"
        fullWidth
        margin="normal"
        InputLabelProps={{ style: { color: '#503dff' } }}
        variant="outlined"
      />
      <TextField
        label="For which class the exam is applicable?"
        fullWidth
        margin="normal"
        InputLabelProps={{ style: { color: '#503dff' } }}
        variant="outlined"
      />
      <TextField
        label="Add Notes"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        InputLabelProps={{ style: { color: '#503dff' } }}
        variant="outlined"
      />
      {/* Create Time Field */}
      <TextField
        label="Create Time"
        type="datetime-local"
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true, style: { color: '#503dff' } }} // Label in blue and always visible
        variant="outlined"
      />
      <Button
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
        Submit Exam
      </Button>
    </Box>
  );
};

export default ExamForm;



// import React from 'react';
// import { TextField, Button, Box, Typography } from '@mui/material';

// const ExamForm: React.FC = () => {
//   return (
//     <Box
//       sx={{
//         border: '2px solid #503dff',
//         padding: '20px',
//         borderRadius: '8px',
//         margin: '20px auto',
//       }}
//     >
//       <Typography variant="h6" sx={{ marginBottom: '20px', color: '#000' }}>
//         Post new exam
//       </Typography>

//       <TextField
//         label="Subject"
//         fullWidth
//         margin="normal"
//         InputLabelProps={{ style: { color: '#503dff' } }}
//         variant="outlined"
//       />
//       <TextField
//         label="Exam Date"
//         type="date"
//         fullWidth
//         margin="normal"
//         InputLabelProps={{ shrink: true, style: { color: '#503dff' } }}
//         variant="outlined"
//       />
//       <TextField
//         label="Total Marks"
//         type="number"
//         fullWidth
//         margin="normal"
//         InputLabelProps={{ style: { color: '#503dff' } }}
//         variant="outlined"
//       />
//       <TextField
//         label="For which class the exam is applicable?"
//         fullWidth
//         margin="normal"
//         InputLabelProps={{ style: { color: '#503dff' } }}
//         variant="outlined"
//       />
//       <TextField
//         label="Add Notes"
//         fullWidth
//         margin="normal"
//         multiline
//         rows={4}
//         InputLabelProps={{ style: { color: '#503dff' } }}
//         variant="outlined"
//       />
//       {/* Create Time Field */}
//       <TextField
//         label="Create Time"
//         type="datetime-local"
//         fullWidth
//         margin="normal"
//         InputLabelProps={{ shrink: true, style: { color: '#503dff' } }} // Label in blue and always visible
//         variant="outlined"
//       />
//       <Button
//         variant="contained"
//         sx={{
//           backgroundColor: '#503dff',
//           color: '#fff',
//           marginTop: '20px',
//           '&:hover': { backgroundColor: '#3b2cb3' },
//           maxWidth: '300px',
//         }}
//         fullWidth
//       >
//         Submit Exam
//       </Button>
//     </Box>
//   );
// };

// export default ExamForm;
