"use client"

import { useState } from "react"
import { Box, Paper, AppBar, Toolbar, Typography, CssBaseline } from "@mui/material"
import InputPanel from "./components/InputPanel"
import OutputPanel from "./components/OutputPanel"
import ThemeToggle from "./components/ThemeToggle"
import { ThemeProvider } from "./contexts/ThemeContext"

function App() {
  const [totalWeight, setTotalWeight] = useState("")
  const [totalBox, setTotalBox] = useState("")

  return (
    <ThemeProvider>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Weight Distribution Calculator
            </Typography>
            <ThemeToggle />
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            flex: 1,
            p: 2,
            gap: 2,
          }}
        >
          <Paper
            elevation={3}
            className="content-panel"
            sx={{
              flex: 1,
              p: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <InputPanel
              totalWeight={totalWeight}
              totalBox={totalBox}
              onChange={(field, value) => {
                if (field === "totalWeight") setTotalWeight(value)
                else if (field === "totalBox") setTotalBox(value)
              }}
            />
          </Paper>
          <Paper
            elevation={3}
            className="content-panel"
            sx={{
              flex: 1,
              p: 3,
            }}
          >
            <OutputPanel totalWeight={totalWeight} totalBox={totalBox} />
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
