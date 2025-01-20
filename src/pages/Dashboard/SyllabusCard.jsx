import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Chip, Divider,
  Table, TableRow, TableBody, TableHead, TableContainer, TableCell
 } from '@mui/material';
import { useParams } from 'react-router-dom'; // to get the `id` from the URL
import { fetchData } from '../../src/Service/apiService'; // Ensure this is the correct path for your API service

const SyllabusCard = () => {
  const { id } = useParams(); // Extract `id` from the URL
  const [data, setData] = useState(null); // State to store fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [chapterArr, setChapterArr] = useState([]);
  let chapterObjArr = [];
  // Function to fetch syllabus data
  const fetchSyllabusData = async () => {
    try {
      const query = `SELECT * FROM syllabus WHERE id = ${id}`; // Adjust as needed
      const { data: fetchedData, error: fetchError } = await fetchData(query);

      let chapters = fetchedData[0].syllabus.split(',');
      chapterObjArr = chapters.map((dt)=>{
        return {
          chapterName: dt.split('-')[0].trim(),
          status: dt.split('-')[1].trim(),
        }
      })
      if (fetchError) {
        setError(fetchError);
      } else if (fetchedData && fetchedData[0]?.chapters) {
        // Parse the chapters string safely
        try {
          const rawChapters = fetchedData[0].chapters;
          const parsedChapters = JSON.parse(JSON.parse(rawChapters));
          setData({ ...fetchedData[0], chapters: Array.isArray(parsedChapters) ? parsedChapters : [] });
        } catch (err) {
          console.error("Error parsing chapters:", err);
          setError("Failed to parse chapters data.");
        }
      } else {
        setChapterArr(chapterObjArr);
        setData(fetchedData[0]);
      }
    } catch (err) {
      setError('An error occurred while fetching syllabus data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSyllabusData(); // Fetch data when component mounts
  }, [id]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  // Ensure chapters is an array before calling map
  // const chapters = Array.isArray(data?.chapters) ? data.chapters : [];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        {data?.subject || "Subject"} {/* Syllabus name or default to 'Science' */}
      </Typography>

      <Typography variant="body1" sx={{mb:2, }}>
        Detailed Syllabus
      </Typography>

      <TableContainer  >
        <Table sx={{ minWidth: 400, width:600 }} aria-label="Syllabus table">
          <TableHead>
            <TableRow>
              <TableCell sx={{backgroundColor : '#cac4ff', fontSize:'16px', fontWeight : 'bold'}}>Chapter</TableCell>
              <TableCell sx={{backgroundColor : '#cac4ff', fontSize:'16px', fontWeight : 'bold'}}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chapterArr.map((row) => (
              <TableRow key={row.chapterName} >
                <TableCell component="th" scope="row" sx={{backgroundColor : '#fff'}}>{row.chapterName}</TableCell>
                <TableCell component="th" scope="row" sx={{backgroundColor : '#fff'}}>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <List>
        {chapters.length > 0 ? (
          chapters.map((chapter, index) => (
            <React.Fragment key={index}>
              <ListItem className="m-3">
                <ListItemText primary={chapter.name || chapter.title} />
                {chapter.status === 'completed' ? (
                  <Typography sx={{ color: 'green' }}>{chapter.status}</Typography>
                ) : chapter.status === 'inProgress' ? (
                  <Chip label={chapter.status} color="primary" />
                ) : (
                  <Typography sx={{ color: 'gray' }}>{chapter.status}</Typography>
                )}
              </ListItem>
              {index < chapters.length - 1 && <Divider />}
            </React.Fragment>
          ))
        ) : (
          <Typography>No chapters available for this syllabus.</Typography>
        )}
      </List> */}
    </Box>
  );
};

export default SyllabusCard;
