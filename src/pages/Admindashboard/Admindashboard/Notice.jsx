import React from "react"
import { Box } from "@mui/material"
import NoticeCard from "./NoticeCard.jsx" // Adjust the import based on your file structure

const Notice = () => {
  const trainings = [
    {
      title: "Web Development Bootcamp",
      description:
        "Join us for an immersive bootcamp on web development starting next week.",
      postedOn: "Start Date: 01/10/2024",
      type: "latest"
    },
    {
      title: "Data Science Workshop",
      description: "A hands-on workshop on data science concepts and tools.",
      postedOn: "Start Date: 10/10/2024",
      type: "latest"
    },
    {
      title: "AI and Machine Learning Seminar",
      description: "An insightful seminar on AI and its applications.",
      postedOn: "Completed on: 20/09/2024",
      type: "previous"
    }
  ]

  return (
    <Box sx={{ padding: 2 }}>
      {trainings.map((training, index) => (
        <NoticeCard key={index} {...training} />
      ))}
    </Box>
  )
}

export default Notice
