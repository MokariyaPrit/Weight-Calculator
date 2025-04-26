"use client"

import type React from "react"
import { IconButton, Tooltip, useTheme } from "@mui/material"
import { Brightness4, Brightness7 } from "@mui/icons-material"
import { useThemeContext } from "../contexts/ThemeContext"

const ThemeToggle: React.FC = () => {
  const theme = useTheme()
  const { toggleColorMode } = useThemeContext()

  return (
    <Tooltip title={theme.palette.mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
      <IconButton onClick={toggleColorMode} color="inherit">
        {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  )
}

export default ThemeToggle
