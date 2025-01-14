import React from 'react';
import { Box, Button, Stack, Typography, Link, useMediaQuery } from '@mui/material';

const Resource = () => {
  const articles = [
    { title: 'How to score better in exams?', link: '#' },
    { title: 'Balance your School & Personal life', link: '#' },
    { title: 'Learn to be multilingual', link: '#' },
  ];

  // Use media query to check if the screen is small
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Box width="100%" mx="auto" p={0}>
      <Stack spacing={4}>
        {articles.map((article, index) => (
          <Box
            key={index}
            display="flex"
            flexDirection={isMobile ? 'column' : 'row'} // Change direction for mobile
            justifyContent="space-between"
            alignItems="center"
            borderBottom="1px solid #E0E0E0"
            borderRadius="8px"
            p={2}
          >
            <Typography variant="h6" fontWeight="medium" color="black" textAlign={isMobile ? 'center' : 'left'}>
              {article.title}
            </Typography>
            <Button
              component={Link}
              href={article.link}
              variant="outlined"
              size="small"
              sx={{
                textDecoration: 'none',
                color: '#503dff',
                borderColor: '#503dff',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
                marginTop: isMobile ? '8px' : '0', // Add margin on top for mobile
              }}
            >
              Read More
            </Button>
          </Box>
        ))}
      </Stack>
      <Box textAlign="center" mt={4}>
        <Link href="#" color="textSecondary" variant="body2">
          See All
        </Link>
      </Box>
    </Box>
  );
};

export default Resource;
