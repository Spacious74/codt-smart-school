import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Box
} from '@mui/material';
import { FaPlayCircle, FaClock, FaClosedCaptioning, FaExchangeAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './carousel.css';

// Data Definition
const cardData = [
  {
    id: 1,
    image: 'https://codt.in/uploads/thumbnails/course_thumbnails/optimized/course_thumbnail_default_321722068242.jpg',
    title: 'Basics of Art',
    description: 'Learn the fundamentals of art and design.',
  },
  {
    id: 2,
    image: 'https://codt.in/uploads/thumbnails/course_thumbnails/optimized/course_thumbnail_default_321722068242.jpg',
    title: 'Advanced Painting',
    description: 'Explore advanced painting techniques and concepts.',
  },
  {
    id: 3,
    image: 'https://codt.in/uploads/thumbnails/course_thumbnails/optimized/course_thumbnail_default_321722068242.jpg',
    title: 'Photography',
    description: 'Master the basics of photography and composition.',
  },
  {
    id: 4,
    image: 'https://codt.in/uploads/thumbnails/course_thumbnails/optimized/course_thumbnail_default_321722068242.jpg',
    title: 'Digital Illustration',
    description: 'Create stunning digital illustrations with modern tools.',
  },
  {
    id: 5,
    image: 'https://codt.in/uploads/thumbnails/course_thumbnails/optimized/course_thumbnail_default_321722068242.jpg',
    title: 'Graphic Design',
    description: 'Learn essential graphic design principles.',
  },
];

// Card Component
const ImageCard = ({ image, title, description }) => {
  return (
    <Card sx={{ maxWidth: 375, mb: 2, mr: 1 }}>
      <CardMedia component="img" height="140" image={image} alt={title} />
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {description}
        </Typography>

        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <Box display="flex" alignItems="center" gap={0.5}>
            <FaPlayCircle size={18} />
            <Typography
              variant="body2"
              sx={{ fontSize: '0.775rem', color: '#8a8a8a', whiteSpace: 'nowrap' }}
            >
              0 Lessons
            </Typography>
          </Box>
          
          <Box display="flex" alignItems="center">
            <FaClock size={18} />
            <Typography
              variant="body2"
              ml={0.5}
              sx={{ fontSize: '0.775rem', color: '#8a8a8a', whiteSpace: 'nowrap' }}
            >
              00:00:00 Hours
            </Typography>
          </Box>
          
          <Box display="flex" alignItems="center">
            <FaClosedCaptioning size={18} />
            <Typography
              variant="body2"
              ml={0.5}
              sx={{ fontSize: '0.775rem', color: '#8a8a8a' }}
            >
              English
            </Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <Button variant="contained" color="primary" size="small">
            Advanced
          </Button>
          <Button variant="outlined" startIcon={<FaExchangeAlt />} size="small">
            Compare
          </Button>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

const CustomPrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-prev-arrow`} onClick={onClick}>
      <FaChevronLeft size={50} color="#4d4d4d" />
    </div>
  );
};

const CustomNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-next-arrow`} onClick={onClick}>
      <FaChevronRight size={50} color="#4d4d4d" />
    </div>
  );
};

// Carousel Component
const Courses = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {cardData.map((card) => (
        <div key={card.id}>
          <ImageCard
            image={card.image}
            title={card.title}
            description={card.description}
          />
        </div>
      ))}
    </Slider>
  );
};

export default Courses;
