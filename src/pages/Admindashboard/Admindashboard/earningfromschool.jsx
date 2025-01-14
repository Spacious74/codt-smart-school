import React from "react"
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Select,
  MenuItem
} from "@mui/material"
import school from "../../images/School.png"
import { Link } from "react-router-dom"

const Earningfromschool = () => {
  const primaryColor = "#503dff" // Define the primary color

  return (
    <Box
      sx={{
        padding: 4,
        bgcolor: "white",
        mx: "auto",
        boxShadow: 3,
        borderRadius: 2
      }}
    >
      <Typography variant="h5" gutterBottom>
        Earnings from schools
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <TextField label="School Name" fullWidth />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField label="State" fullWidth />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField label="City" fullWidth />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField label="Pincode" fullWidth />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField label="School Code" fullWidth />
        </Grid>
        <Grid item xs={12} sm={12} container justifyContent="center">
          <Button
            variant="contained"
            sx={{ bgcolor: primaryColor, width: 200 }}
          >
            Search
          </Button>
        </Grid>
      </Grid>

      <Grid
        container
        alignItems="center"
        justifyContent="start"
        gap={5}
        sx={{ mb: 2 }}
      >
        <Typography variant="h6">School list</Typography>
        <Box>
          <Select defaultValue="Filter" sx={{ mr: 2 }}>
            <MenuItem value="Filter">Filter</MenuItem>
            <MenuItem value="option1">Option 1</MenuItem>
          </Select>

          <Select defaultValue="Sort by">
            <MenuItem value="Sort by">Sort by</MenuItem>
            <MenuItem value="name">Name</MenuItem>
          </Select>
        </Box>
      </Grid>

      <Box
        sx={{
          border: `1px solid ${primaryColor}`,
          borderRadius: 2,
          p: 2,
          mb: 2
        }}
      >
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={2}>
            <img
              src={school}
              alt="School Logo"
              style={{ width: "60px", height: "auto", maxWidth: "100%" }}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">
              Cambridge International School
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Jalna, Maharashtra
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2" sx={{ color: "green" }}>
              650 Active
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2" sx={{ color: "red" }}>
              25 Inactive
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="body2">ci04mh</Typography>
          </Grid>
          <Grid item xs={1}>
            <Button
              component={Link}
              to="/admin/manageschools"
              variant="contained"
              sx={{ bgcolor: primaryColor }}
            >
              Manage
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ border: `1px solid ${primaryColor}`, borderRadius: 2, p: 2 }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={2}>
            <img
              src={school}
              alt="School Logo"
              style={{ width: "60px", height: "auto", maxWidth: "100%" }}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">St. Zeviars International</Typography>
            <Typography variant="body2" color="textSecondary">
              Mumbai, Maharashtra
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2" sx={{ color: "green" }}>
              650 Active
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2" sx={{ color: "red" }}>
              25 Inactive
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="body2">ze06mh</Typography>
          </Grid>
          <Grid item xs={1}>
            <Button
              component={Link}
              to="/admin/manageschools"
              variant="contained"
              sx={{ bgcolor: primaryColor }}
            >
              Manage
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Earningfromschool
