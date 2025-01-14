import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const AssignmentForm = () => {
  return (
    <Box
      sx={{
        border: '1px solid #503dff', // Using the color you specified for the border
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
        fullWidth
        margin="normal"
        InputLabelProps={{ style: { color: '#503dff' } }} // Label color
        variant="outlined"
      />
      <TextField
        label="Subject"
        fullWidth
        margin="normal"
        InputLabelProps={{ style: { color: '#503dff' } }}
        variant="outlined"
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <TextField
          label="Total Marks"
          type="number"
          margin="normal"
          InputLabelProps={{ style: { color: '#503dff' } }}
          variant="outlined"
          sx={{ flex: 1, marginRight: '10px' }}
        />
        <TextField
          label="Last date to submit"
          type="date"
          margin="normal"
          InputLabelProps={{ shrink: true, style: { color: '#503dff' } }}
          variant="outlined"
          sx={{ flex: 1 }}
        />
      </Box>
      <TextField
        label="For which class the assignment is applicable?"
        fullWidth
        margin="normal"
        InputLabelProps={{ style: { color: '#503dff' } }}
        variant="outlined"
      />
      <TextField
        label="Add questions"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        InputLabelProps={{ style: { color: '#503dff' } }}
        variant="outlined"
      />
      <TextField
        label="Add Notes"
        fullWidth
        margin="normal"
        multiline
        rows={2}
        InputLabelProps={{ style: { color: '#503dff' } }}
        variant="outlined"
      />
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#503dff',
          color: '#fff',
          marginTop: '20px',
          '&:hover': { backgroundColor: '#3b2cb3' },
          maxWidth: '300px', // Adjusted width for a more expansive form
        }}
        fullWidth
      >
        Submit Assignment
      </Button>
    </Box>
  );
};

export default AssignmentForm;





/* import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const AssignmentForm: React.FC = () => {
  return (
    <Box
      sx={{
        border: '1px solid #503dff', // Using the color you specified for the border
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
        fullWidth
        margin="normal"
        InputLabelProps={{ style: { color: '#503dff' } }} // Label color
        InputProps={{
            // Input field border color
        }}
        variant="outlined"
      />
      <TextField
        label="Subject"
        fullWidth
        margin="normal"
        InputLabelProps={{ style: { color: '#503dff' } }}
        InputProps={{
           
        }}
        variant="outlined"
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <TextField
          label="Total Marks"
          type="number"
          margin="normal"
          InputLabelProps={{ style: { color: '#503dff' } }}
          InputProps={{
             
          }}
          variant="outlined"
          sx={{ flex: 1, marginRight: '10px' }}
        />
        <TextField
          label="Last date to submit"
          type="date"
          margin="normal"
          InputLabelProps={{ shrink: true, style: { color: '#503dff' } }}
          InputProps={{
             
          }}
          variant="outlined"
          sx={{ flex: 1 }}
        />
      </Box>
      <TextField
        label="For which class the assignment is applicable?"
        fullWidth
        margin="normal"
        InputLabelProps={{ style: { color: '#503dff' } }}
        InputProps={{
           
        }}
        variant="outlined"
      />
      <TextField
        label="Add questions"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        InputLabelProps={{ style: { color: '#503dff' } }}
        InputProps={{
           
        }}
        variant="outlined"
      />
      <TextField
        label="Add Notes"
        fullWidth
        margin="normal"
        multiline
        rows={2}
        InputLabelProps={{ style: { color: '#503dff' } }}
        InputProps={{
           
        }}
        variant="outlined"
      />
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#503dff',
          color: '#fff',
          marginTop: '20px',
          '&:hover': { backgroundColor: '#3b2cb3' },
          maxWidth: '300px', // Adjusted width for a more expansive form
        }}
        fullWidth
      >
        Submit Assignment
      </Button>
    </Box>
  );
};

export default AssignmentForm;
*/