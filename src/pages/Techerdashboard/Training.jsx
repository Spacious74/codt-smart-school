import React, { useEffect, useState } from 'react';
import { fetchData } from '../../src/Service/apiService'; // Adjust the path as necessary
import {
  Card, CardContent, Typography, Box, Button, CardActionArea, Dialog, DialogActions,
  DialogContent, DialogTitle,
} from '@mui/material';
import { format } from 'date-fns';
const SchoolTraniing = () => {

  const [data, setData] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [trainingContent, setTrainingContent] = useState(null);


  useEffect(() => {
    const fetchDataAsync = async () => {
      const { data: fetchedData, error: fetchError } = await fetchData('SELECT * FROM training_programs Where notification_for = "teachers"'); // Replace with your actual SQL query
      if (fetchedData) {
        setData(fetchedData);
      } else {
        setError(fetchError);
      }
      setLoading(false);
    };

    fetchDataAsync();
  }, []);

  // date formater using date-fns library 
  const formatDate = (dateString) => {
    // this format() method is imported from date-fns library
    return format(new Date(dateString), 'dd MMM, yyyy');
  };

  const handleReadClick = (notice) => {
    setTrainingContent(notice);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setTrainingContent(null);
  }


  return (
    <div>

      <Typography variant="h6" sx={{ mb: 2, color: '#7d7d7d', fontWeight: 'bold' }}>
        Traning Programs
      </Typography>

      {data.map((item, index) => (
        //   <Card sx={{ display: 'flex', width: '100%', margin: '16px 0' }}>
        //   <CardActionArea sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
        //     <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        //       <CardContent>
        //         <Typography variant="h6" component="div" gutterBottom>
        //           {item.title}
        //         </Typography>
        //         <Typography variant="subtitle1" color="text.secondary" component="div">
        //           <strong>Trainer:</strong> {item.trainer_name}
        //         </Typography>
        //         <Typography variant="body2" color="text.secondary">
        //         {item.trainer_description}
        //         </Typography>
        //         <Typography variant="body1" sx={{ marginTop: 1 }}>
        //         {item.body}
        //         </Typography>
        //         <Typography variant="caption" color="text.secondary" sx={{ marginTop: 1 }}>
        //           posted date: {new Date(item.created_at).toLocaleString()}
        //         </Typography>
        //       </CardContent>
        //     </Box>
        //   </CardActionArea>
        // </Card>
        <Card sx={{ mb: 2, backgroundColor: '#ffffff', borderRadius: '10px' }} variant="outlined" key={index}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <CardContent sx={{ width: '90%' }}> {/* Extra padding for the content above */}
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                {item.title}
              </Typography>
              <Typography variant="caption" component="div" sx={{ fontWeight: 'bold' }}>
                Trainer : {item.trainer_name}
              </Typography>

              <Typography variant="body2" sx={{ marginTop: 1 }} className='showMoreText'>
                {item.short_description}
              </Typography>
              <Typography variant="caption" sx={{ color: '#2f9e58', fontWeight: 'bold' }} color="textSecondary">
                Posted at {formatDate(item.created_at)}
              </Typography>
            </CardContent>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
              <Button variant="contained" onClick={() => handleReadClick(item)}
                sx={{ backgroundColor: '#503dff', color: '#fff', padding: '5px 28px', textTransform: "capitalize" }}
              >
                Read
              </Button>
            </Box>
          </Box>
        </Card>

      ))}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle>{trainingContent?.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{trainingContent?.short_description}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SchoolTraniing;
