import React from "react"
import { Typography, Box } from "@mui/material"
import TrainingCard from "./TrainingCard.jsx" // Adjust the import according to your file structure

const Training = () => {
  const upcomingTrainings = [
    {
      title: "Web Development Bootcamp",
      description:
        "Join us for an immersive bootcamp on web development starting next week.",
      date: "Start Date: 01/10/2024",
      type: "upcoming"
    },
    {
      title: "Data Science Workshop",
      description: "A hands-on workshop on data science concepts and tools.",
      date: "Start Date: 10/10/2024",
      type: "upcoming"
    }
  ]

  const pastTrainings = [
    {
      title: "AI and Machine Learning Seminar",
      description: "An insightful seminar on AI and its applications.",
      date: "Completed on: 20/09/2024",
      type: "past"
    }
  ]

  return (
    <Box sx={{ padding: 2 }}>
      {upcomingTrainings.map((training, index) => (
        <TrainingCard key={index} {...training} />
      ))}

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Past Trainings
      </Typography>

      {pastTrainings.map((training, index) => (
        <TrainingCard key={index} {...training} />
      ))}
    </Box>
  )
}

export default Training
