import React from "react"
import { Card, CardContent, Typography, Button, Box } from "@mui/material"

const TrainingCard = ({ title, description, date }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Box sx={{ flex: 1, textAlign: "left" }}>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {description}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {date}
          </Typography>
        </Box>

        <Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#503dff",
              color: "white",
              borderRadius: "5px"
            }}
          >
            Know More
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default TrainingCard
