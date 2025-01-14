import React, { useEffect, useState } from 'react';
import DropdownUser from './DropdownUser';
import { Box, TextField, InputAdornment, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
const AppHeader = () => {
  // State to store schoolCode
  const [schoolCode, setSchoolCode] = useState('');

  // Fetch schoolCode from localStorage when the component mounts
  useEffect(() => {
    const storedSchoolCode = localStorage.getItem('schoolCode');
    if (storedSchoolCode) {
      setSchoolCode(storedSchoolCode);
    }
  }, []);

  return (
    <>

      <Box className='app_header' sx={{ px: 3 }}>

        <div className="header_left" style={{ width: '50%' }}>
          <DropdownUser />
          School Code : <span style={{color : '#503dff'}} >{schoolCode}</span>
        </div>


        <div className="header_right">
          <div className="search-bar">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
              <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.5 17.5L22 22m-2-11a9 9 0 1 0-18 0a9 9 0 0 0 18 0" /></svg>
            <input type="text" placeholder="Search..." />
          </div>

          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>

            <IconButton aria-label="notification" size="small">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" color="currentColor"><path d="M5.158 11.491c-.073 1.396.011 2.882-1.236 3.817A2.3 2.3 0 0 0 3 17.153C3 18.15 3.782 19 4.8 19h14.4c1.018 0 1.8-.85 1.8-1.847c0-.726-.342-1.41-.922-1.845c-1.247-.935-1.163-2.421-1.236-3.817a6.851 6.851 0 0 0-13.684 0"/><path d="M10.5 3.125C10.5 3.953 11.172 5 12 5s1.5-1.047 1.5-1.875S12.828 2 12 2s-1.5.297-1.5 1.125M15 19a3 3 0 1 1-6 0"/></g></svg>
            </IconButton>

            <IconButton aria-label="message" size="small">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 13.5h8m-8-5h4M6.099 19q-1.949-.192-2.927-1.172C2 16.657 2 14.771 2 11v-.5c0-3.771 0-5.657 1.172-6.828S6.229 2.5 10 2.5h4c3.771 0 5.657 0 6.828 1.172S22 6.729 22 10.5v.5c0 3.771 0 5.657-1.172 6.828S17.771 19 14 19c-.56.012-1.007.055-1.445.155c-1.199.276-2.309.89-3.405 1.424c-1.563.762-2.344 1.143-2.834.786c-.938-.698-.021-2.863.184-3.865" color="currentColor"/></svg>
            </IconButton>

          </Stack>
        </div>

      </Box>

    </>
  );
};

export default AppHeader;
