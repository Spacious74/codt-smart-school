// FinanceReport.tsx
import React from "react"
import { Box, Typography, Button, Grid, Link } from "@mui/material"
import { Bar } from "react-chartjs-2"
import { Link as RouterLink } from "react-router-dom"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// Data for the chart
const chartData = {
  labels: ["2", "4", "6", "8", "10", "12"],
  datasets: [
    {
      label: "Earnings",
      data: [1, 3, 5, 4, 3, 2],
      backgroundColor: "#6ce5e8"
    }
  ]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: { display: false }
  },
  scales: {
    x: { beginAtZero: true },
    y: { beginAtZero: true }
  }
}

const FinanceReport = () => {
  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Typography variant="h6" color="#503dff" gutterBottom>
        Finance Reports
      </Typography>

      {/* Chart */}
      <Box sx={{ height: 400, width: "100%" }}>
        <Bar data={chartData} options={chartOptions} />
      </Box>

      {/* Revenue Calculation */}
      <Box sx={{ my: 2 }}>
        <Typography>
          Calculated as Subscription fee (minus) Phonepe payment gateway fee -2%
          plus 18% GST
        </Typography>
        <Typography variant="h5" sx={{ color: "#503dff" }}>
          Total Revenue: ₹2,19,05,000
        </Typography>
      </Box>

      {/* Statistics Boxes */}
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box
            sx={{
              p: 2,
              border: "1px solid #eee",
              borderRadius: 2,
              textAlign: "center"
            }}
          >
            <Typography variant="h4">430</Typography>
            <Typography>Total Schools Enrolled</Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              p: 2,
              border: "1px solid #eee",
              borderRadius: 2,
              textAlign: "center"
            }}
          >
            <Typography variant="h4">2,58,000</Typography>
            <Typography>Total Students</Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              p: 2,
              border: "1px solid #eee",
              borderRadius: 2,
              textAlign: "center"
            }}
          >
            <Typography variant="h4">2,15,000</Typography>
            <Typography>
              Subscriptions <span style={{ color: "green" }}>Active</span>
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Preferred Subscription Packages */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Preferred Subscription Packages</Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box
              sx={{
                p: 2,
                border: "1px solid #eee",
                borderRadius: 2,
                textAlign: "center"
              }}
            >
              <Typography variant="h5">50,000</Typography>
              <Typography>Enrolled for ₹150 (1 Month)</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                p: 2,
                border: "1px solid #eee",
                borderRadius: 2,
                textAlign: "center"
              }}
            >
              <Typography variant="h5">1,20,000</Typography>
              <Typography>Enrolled for ₹850 (6 Months)</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                p: 2,
                border: "1px solid #eee",
                borderRadius: 2,
                textAlign: "center"
              }}
            >
              <Typography variant="h5">45,000</Typography>
              <Typography>Enrolled for ₹1,750 (1 Year)</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Button to navigate */}
      <Grid item xs={12} sm={12} mt={4} container justifyContent="start">
        <Link
          component={RouterLink}
          to="/admin/earningfromschool"
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: "#503dff", // Use theme primary color
              p: 2,
              width: 250
            }}
          >
            View Earnings from School
          </Button>
        </Link>
      </Grid>
    </Box>
  )
}

export default FinanceReport
