import React from "react"
import { Outlet } from "react-router-dom"
import { Box, CssBaseline } from "@mui/material"
import Navbar from "./Navbar"
import Footer from "./Footer"

const AppShell: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />

        <Box
          component="main"
          sx={{
            flex: 1,
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Outlet />
        </Box>

        <Footer />
      </Box>
    </>
  )
}

export default AppShell