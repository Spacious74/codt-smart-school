import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Chip, Divider } from '@mui/material';

const chapters = [
  { title: 'Chapter 1 - name of chapter', status: '100 % completed in school', completed: true },
  { title: 'Chapter 2 - name of chapter', status: '100 % completed in school', completed: true },
  { title: 'Chapter 3 - name of chapter', status: 'Currently Being Taught', completed: false, inProgress: true },
  { title: 'Chapter 4 - name of chapter', status: 'Not Started', completed: false },
];

const SyllabusCard = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Science
      </Typography>

      <Typography variant="h6" gutterBottom>
        Chapters
      </Typography>

      <List>
        {chapters.map((chapter, index) => (
          <React.Fragment key={index}>
            <ListItem className='m-3'>
              <ListItemText primary={chapter.title} />
              {chapter.completed ? (
                <Typography sx={{ color: 'green' }}>{chapter.status}</Typography>
              ) : chapter.inProgress ? (
                <Chip label={chapter.status} color="primary" />
              ) : (
                <Typography sx={{ color: 'gray' }}>{chapter.status}</Typography>
              )}
            </ListItem>
            {index < chapters.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default SyllabusCard;
