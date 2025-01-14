import React, { useEffect, useState } from 'react';
import { fetchData } from '../../src/Service/apiService';
import {
  Box,
  Avatar,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  TextField,
  InputAdornment,
} from '@mui/material';
import { FaSearch } from 'react-icons/fa';

const CareerCard = ({ title, tags, image, desc }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' }, // Stack vertically on small screens
        alignItems: 'center',
        padding: 2,
        borderRadius: 2,
        mb: 2,
        boxShadow: 3
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
        <Typography variant="h6"
          sx={{ color: 'primary.main', fontWeight: 'bold', mb: 1 }} // Added margin-bottom
        >
          {title}
        </Typography>
        <Typography variant="body2"sx={{ color: 'black' }} className='showMoreText'>{desc}</Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#503dff',
            color: 'white',
            borderRadius: 1, mt : 2,
            width: { xs: '100%', sm: 'auto' }, // Full width on phones
            '&:hover': {
              backgroundColor: '#3a2dcc',
            }
          }}
        >
          Know More
        </Button>
      </CardContent>
    </Card>
  );
};

const TeacherCareer = () => {

  const [data, setData] = useState([]);
  // const [activeCount, setActiveCount] = useState(0);
  // const [inactiveCount, setInactiveCount] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  // const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const fetchDataAsync = async () => {
      const { data: fetchedData, error: fetchError } = await fetchData('SELECT * FROM careers Where notification_for="teachers"'); // Replace with your actual SQL query
      if (fetchedData) {
        setData(fetchedData);
      } else {
        setError(fetchError);
      }
      setLoading(false);
    };

    fetchDataAsync();
  }, []);




  console.log("data is sata ", data)


  const careers = [
    {
      title: 'Data Scientist',
      tags: ['Information Technology'],
      image: 'https://th.bing.com/th?id=OIP.FMvBDoSKPl55TBG1e_G6PAHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.1&pid=3.1&rm=2',
    },
    {
      title: 'Software Developer',
      tags: ['Information Technology', 'Engineering', 'Coding'],
      image: 'https://th.bing.com/th?id=OIP.FMvBDoSKPl55TBG1e_G6PAHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.1&pid=3.1&rm=2',
    },
    {
      title: 'Architect',
      tags: ['Design', 'Project Management', 'Urban Planning'],
      image: 'https://th.bing.com/th?id=OIP.FMvBDoSKPl55TBG1e_G6PAHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.1&pid=3.1&rm=2',
    },
  ];

  const categories = [
    'Medical',
    'Science',
    'Design',
    'Photography',
    'Business',
    'Art',
    'Stock Market',
    'Construction',
  ];

  return (
    <Box className="">
      {/* Search Bar */}

      {/* Top Categories */}
      {/* <Typography variant="h6" className="font-semibold mt-6" style={{ marginBottom: '20px' }}>
        Top Categories
      </Typography> */}
      {/* <Box className="flex flex-wrap gap-2 mb-3">
        {categories.map((category, index) => (
          <Button
            key={index}
            variant="outlined"
            className="text-blueshade border-blueshade rounded-full"
          >
            {category}
          </Button>
        ))}
      </Box> */}

      {/* Popular Careers */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Popular Careers
      </Typography>

      <Grid container spacing={2}>
        {data.map((item, index) => (
          <Grid item xs={12} key={index}>
            <CareerCard
              title={item.title}
              tags={item.categories}
              image={item.thumbnail}
              desc={item.description}
            />
          </Grid>
        ))}
      </Grid>

    </Box>
  );
};

export default TeacherCareer;
