import React from "react";
import Slider from "react-slick";
import img11 from "../../assets/k.png";
import img12 from "../../assets/l.png";
import img13 from "../../assets/m.png";
import img14 from "../../assets/n.png";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Arrow icons
import { Box, Button } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './styles.css'; // Adjust path if necessary
// Slider settings with customized arrows
const settings = {
  infinite: true, // Infinite scroll
  speed: 500, // Speed of transition
  slidesToShow: 4, // Number of slides visible on desktop
  slidesToScroll: 1, // Number of slides to scroll at a time
  arrows: true, // Show previous/next arrows
  prevArrow: (
    <button className="slick-prev custom-arrow">
      <FaChevronLeft className="text-white text-2xl" />
    </button>
  ), // Custom Previous Arrow
  nextArrow: (
    <button className="slick-next custom-arrow">
      <FaChevronRight className="text-white text-2xl" />
    </button>
  ), // Custom Next Arrow
  responsive: [
    {
      breakpoint: 1024, // Tablet view
      settings: {
        slidesToShow: 2, // 2 slides visible on tablets
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768, // Mobile view
      settings: {
        slidesToShow: 1, // 1 slide visible on mobile
        slidesToScroll: 1,
      },
    },
  ],
};

const CourseCarousel = () => {
  const courses = [
    {
      id: 1,
      title: "Web Development",
      tutor: "John Doe",
      image: img11,
      price: "$99.99",
      reviews: 120,
    },
    {
      id: 2,
      title: "Mobile App Development",
      tutor: "Jane Smith",
      image: img12,
      price: "$89.99",
      reviews: 98,
    },
    {
      id: 3,
      title: "UI/UX Design",
      tutor: "Alex Johnson",
      image: img13,
      price: "$79.99",
      reviews: 84,
    },
    {
      id: 4,
      title: "Data Science Essentials",
      tutor: "Emily Davis",
      image: img14,
      price: "$109.99",
      reviews: 150,
    },
    {
      id: 5,
      title: "Machine Learning Basics",
      tutor: "Chris Wilson",
      image: img11,
      price: "$119.99",
      reviews: 200,
    },
    {
      id: 6,
      title: "Cloud Computing",
      tutor: "Sarah Lee",
      image: img12,
      price: "$94.99",
      reviews: 134,
    },
  ];

  return (
    <>
      <div className="relative w-full overflow-hidden bg-gray-100 p-8 px-5 md:px-12 lg:px-50 mt-15">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 text-[30px] mb-8">
            Explore online courses
          </h2>
        </div>

        {/* React Slick Carousel */}
        <Slider {...settings}>
          {courses.map((course) => (
            <div
              key={course.id}
              className="w-full sm:w-1/4 px-2 flex-shrink-0"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{course.tutor}</p>
                  <div className="flex items-center mb-2">
                    <FaStar className="text-yellow-500 mr-1" />
                    <p className="text-sm text-gray-600">{course.reviews} reviews</p>
                  </div>
                  <p className="text-blue-600 font-bold">{course.price}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Explore More Button */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              borderRadius: "40px",
              padding: { xs: "8px 16px", md: "10px 20px" },
              fontSize: "20px",
              marginTop: "10px",
              margin: '40px',
              border:'0.5px solid #ff3d00',
              textTransform: "capitalize",
fontWeight:'600'
            }}
          >
            Explore More
            <ArrowForwardIcon
              sx={{
                bgcolor: "#ff3d00",
                borderRadius: "70%",
                color: "#fff",
                padding: "4px",
                fontSize: { xs: "24px", md: "30px" },
                ml: 2,
              }}
            />
          </Button>
        </Box>
      </div>
    </>
  );
};

export default CourseCarousel;
 