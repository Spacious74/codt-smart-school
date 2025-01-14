import React, { useEffect, useState } from 'react';
import { fetchData } from '../../src/Service/apiService';
import {
  Box,
  Avatar,
  Typography,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

const CareerCard = ({ title, tags, image, desc, onKnowMoreClick }) => {
  const truncateDescription = (description, limit = 100) => {
    return description.length > limit ? `${description.substring(0, limit)}...` : description;
  };

  return (
    <Card
      elevation={0}
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' }, // Stack vertically on small screens
        alignItems: 'center',
        padding: 2,
        borderRadius: 2,
        mb: 2,
        boxShadow: 0,
      }}
    >
      <Avatar
        variant="square"
        src={`https://codtsmartschool.strangeweb.in/studentapi/${image}`}
        alt={title}
        sx={{
          width: { xs: 150, sm: 150 }, // Smaller width on phones
          height: { xs: 150, sm: 150 },
          borderRadius: 1,
          mb: { xs: 2, sm: 0 }, // Add bottom margin on small screens
        }}
      />
      <CardContent sx={{ flexGrow: 1, textAlign: { xs: 'center', sm: 'left' } }}>
        <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold', mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'black', mb: 2 }}>
          {truncateDescription(desc)}
        </Typography>
        {/* Know More Button */}
        <Button
          variant="contained"
          size="small"
          sx={{
            mt: 1,
            backgroundColor: '#503dff', // Custom background color
            '&:hover': {
              backgroundColor: '#4021cc', // Darker shade for hover effect
            },
          }}
          onClick={onKnowMoreClick}
        >
          Know More
        </Button>
      </CardContent>
    </Card>
  );
};

const SchoolCareer = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCareer, setSelectedCareer] = useState(null); // Store the selected career for the modal
  const [openModal, setOpenModal] = useState(false); // Control modal visibility

  useEffect(() => {
    const fetchDataAsync = async () => {
      const { data: fetchedData, error: fetchError } = await fetchData('SELECT * FROM careers Where notification_for="school"');
      if (fetchedData) {
        setData(fetchedData);
      } else {
        setError(fetchError);
      }
      setLoading(false);
    };

    fetchDataAsync();
  }, []);

  const handleKnowMoreClick = (career) => {
    setSelectedCareer(career); // Set selected career data for modal
    setOpenModal(true); // Open modal
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close modal
    setSelectedCareer(null); // Reset selected career
  };

  return (
    <Box className="">
      {/* Careers List */}
      <Typography variant="h6" sx={{ mb: 2 }}>Careers</Typography>

      {data.map((item, index) => (
        <CareerCard
          key={index}
          title={item.title}
          tags={item.categories}
          image={item.thumbnail}
          desc={item.description}
          onKnowMoreClick={() => handleKnowMoreClick(item)}
        />
      ))}

      {/* Modal to Show Full Description */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth >
        <DialogTitle>{selectedCareer?.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{selectedCareer?.description}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SchoolCareer;
