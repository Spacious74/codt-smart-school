import React from "react"
import { Card, CardContent, Typography, Button, Grid } from "@mui/material"

const NoticeCard = ({ title, description, postedOn, type }) => {
  return (
    <Card sx={{ mb: 2, backgroundColor: "#f9f9f9" }}>
      <CardContent>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={9}>
            <Typography variant="h6" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {description}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: type === "latest" ? "#089451" : "gray", mt: 1 }}
            >
              Posted by school - {postedOn}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#503dff",
                color: "#fff",
                marginTop: "10px"
              }}
            >
              Read
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default NoticeCard
