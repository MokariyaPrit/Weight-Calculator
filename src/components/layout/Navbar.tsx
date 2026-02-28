import React from "react"
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material"
import { Link, useLocation } from "react-router-dom"
import ThemeToggle from "../ui/ThemeToggle.tsx"
import CalculateIcon from "@mui/icons-material/Calculate"
import StoreIcon from "@mui/icons-material/Store"

const navLinks = [
  { label: "Calculator", path: "/", icon: <CalculateIcon fontSize="small" /> },
  { label: "Franchise", path: "/franchise", icon: <StoreIcon fontSize="small" /> },
]

const Navbar: React.FC = () => {
  const location = useLocation()

  return (
    <AppBar position="static">
      <Toolbar sx={{ gap: 1 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 0, mr: 3 }}>
          WeightCalc Pro
        </Typography>

        <Box sx={{ display: "flex", gap: 1, flexGrow: 1 }}>
          {navLinks.map((link) => (
            <Button
              key={link.path}
              component={Link}
              to={link.path}
              color="inherit"
              startIcon={link.icon}
              sx={{
                textTransform: "none",
                fontWeight: location.pathname === link.path ? 700 : 400,
                borderBottom:
                  location.pathname === link.path
                    ? "2px solid white"
                    : "2px solid transparent",
                borderRadius: 0,
                paddingBottom: "4px",
              }}
            >
              {link.label}
            </Button>
          ))}
        </Box>

        <ThemeToggle />
      </Toolbar>
    </AppBar>
  )
}

export default Navbar