import React from "react"
import { Box, Typography, Button } from "@mui/material"
import { Link } from "react-router-dom"
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied"

const NotFoundPage: React.FC = () => {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        py: 8,
      }}
    >
      <SentimentDissatisfiedIcon sx={{ fontSize: 80, color: "text.secondary" }} />
      <Typography variant="h4" fontWeight={700}>
        404 – Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary">
        The page you're looking for doesn't exist.
      </Typography>
      <Button variant="contained" component={Link} to="/">
        Go Home
      </Button>
    </Box>
  )
}

export default NotFoundPage