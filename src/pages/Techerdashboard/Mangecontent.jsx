import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { FaClipboardList, FaUserGraduate, FaPlus, FaClipboardCheck } from 'react-icons/fa';

const ManageContent = () => {
  const cardData = [
    { title: 'Post Assignment', icon: <FaClipboardList /> },
    { title: 'Manage Students', icon: <FaUserGraduate /> },
    { title: 'Add Topics', icon: <FaPlus /> },
    { title: 'New Exam', icon: <FaClipboardCheck /> }
  ];

  return (
    <Grid container spacing={2} style={{ padding: '5px' }}>
      {cardData.map((card, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          key={index}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px'
          }}
        >
          <Card
            style={{
              width: '180%',
              maxWidth: '350px',
              border: '1px solid #e8e8e8',
              borderRadius: '10px',
              textAlign: 'center'
            }}
          >
            <CardContent>

                <div  style={{display:'flex' , alignItems :'center', justifyContent:'center',gap:'20px'}}>

               
              <div style={{ fontSize: '20px', color: '#503dff' }}>{card.icon}</div>
              <Typography
                variant="h6"
                component="div"
                style={{ marginTop: '10px', color: '#503dff' }}
              >
                {card.title}
              </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ManageContent;
