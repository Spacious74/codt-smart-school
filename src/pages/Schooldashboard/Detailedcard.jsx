import React from 'react';
import { Box, Typography, Grid, Button, Card, CardContent } from '@mui/material';
import { School, People, Groups, Announcement, TravelExplore, Engineering } from '@mui/icons-material';

const Dashboard = () => {
  return (
    <Box p={4}>
      <Grid container spacing={4}>
        {/* Top Section: Schools, Students, Teachers */}
        {[
          { count: '430', label: 'Total schools enrolled', icon: <School />, color: '#5860ff' },
          { count: '2,58,000', label: 'Total Students', icon: <People />, color: '#5860ff' },
          { count: '30,000', label: 'Total Teachers', icon: <Groups />, color: '#5860ff' },
        ].map((item, idx) => (
          <Grid item xs={12} md={4} key={idx}>
            <Card sx={{ padding: 4, borderRadius: 2, textAlign: 'center' }}>
              <Typography variant="h4" color={item.color}>
                {item.count}
              </Typography>
              <Typography variant="body1" mt={1}>
                {item.label}
              </Typography>
            </Card>
          </Grid>
        ))}

        {/* Divider */}
        <Grid item xs={12}>
          <hr />
        </Grid>

        {/* Middle Section: Buttons */}
        {[
          { label: 'Post Training Workshop', icon: <Engineering /> },
          { label: 'Post Notice', icon: <Announcement /> },
          { label: 'Create Teams', icon: <Groups /> },
        ].map((item, idx) => (
          <Grid item xs={12} md={4} key={idx}>
            <Button
              variant="outlined"
              startIcon={item.icon}
              fullWidth
              sx={{ justifyContent: 'flex-start', padding: 2 }}
            >
              {item.label}
            </Button>
          </Grid>
        ))}

        {/* Bottom Section: Career Research, Education Abroad, Training Programs */}
        {[
          { count: '50,000', label: 'total students who used Career Research till date' },
          { count: '10,000', label: 'total students who requested for abroad service', highlight: true },
          { count: '50', label: 'Total Teacher Training programs taken by CODT' },
        ].map((item, idx) => (
          <Grid item xs={12} md={4} key={idx}>
            <Card
              sx={{
                padding: 4,
                borderRadius: 2,
                textAlign: 'center',
                border: item.highlight ? '2px solid #5860ff' : 'none',
              }}
            >
              <Typography variant="h4" color={item.highlight ? '#5860ff' : 'black'}>
                {item.count}
              </Typography>
              <Typography variant="body1" mt={1}>
                {item.label}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;



// import React from 'react';
// import { Box, Typography, Grid, Button, Card, CardContent } from '@mui/material';
// import { School, People, Groups, Announcement, TravelExplore, Engineering } from '@mui/icons-material';

// const Dashboard: React.FC = () => {
//   return (
//     <Box p={4}>
//       <Grid container spacing={4}>
//         {/* Top Section: Schools, Students, Teachers */}
//         {[
//           { count: '430', label: 'Total schools enrolled', icon: <School />, color: '#5860ff' },
//           { count: '2,58,000', label: 'Total Students', icon: <People />, color: '#5860ff' },
//           { count: '30,000', label: 'Total Teachers', icon: <Groups />, color: '#5860ff' },
//         ].map((item, idx) => (
//           <Grid item xs={12} md={4} key={idx}>
//             <Card sx={{ padding: 4, borderRadius: 2, textAlign: 'center' }}>
//               <Typography variant="h4" color={item.color}>
//                 {item.count}
//               </Typography>
//               <Typography variant="body1" mt={1}>
//                 {item.label}
//               </Typography>
//             </Card>
//           </Grid>
//         ))}

//         {/* Divider */}
//         <Grid item xs={12}>
//           <hr />
//         </Grid>

//         {/* Middle Section: Buttons */}
//         {[
//           { label: 'Post Training Workshop', icon: <Engineering /> },
//           { label: 'Post Notice', icon: <Announcement /> },
//           { label: 'Create Teams', icon: <Groups /> },
//         ].map((item, idx) => (
//           <Grid item xs={12} md={4} key={idx}>
//             <Button
//               variant="outlined"
//               startIcon={item.icon}
//               fullWidth
//               sx={{ justifyContent: 'flex-start', padding: 2 }}
//             >
//               {item.label}
//             </Button>
//           </Grid>
//         ))}

//         {/* Bottom Section: Career Research, Education Abroad, Training Programs */}
//         {[
//           { count: '50,000', label: 'total students who used Career Research till date' },
//           { count: '10,000', label: 'total students who requested for abroad service', highlight: true },
//           { count: '50', label: 'Total Teacher Training programs taken by CODT' },
//         ].map((item, idx) => (
//           <Grid item xs={12} md={4} key={idx}>
//             <Card
//               sx={{
//                 padding: 4,
//                 borderRadius: 2,
//                 textAlign: 'center',
//                 border: item.highlight ? '2px solid #5860ff' : 'none',
//               }}
//             >
//               <Typography variant="h4" color={item.highlight ? '#5860ff' : 'black'}>
//                 {item.count}
//               </Typography>
//               <Typography variant="body1" mt={1}>
//                 {item.label}
//               </Typography>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default Dashboard;