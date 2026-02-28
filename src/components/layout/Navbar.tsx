import React, { useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { Link, useLocation } from "react-router-dom"
import ThemeToggle from "../ui/ThemeToggle"
import CalculateIcon from "@mui/icons-material/Calculate"
import StoreIcon from "@mui/icons-material/Store"

const navLinks = [
  { label: "Calculator", path: "/", icon: <CalculateIcon /> },
  { label: "Franchise", path: "/franchise", icon: <StoreIcon /> },
]

const Navbar: React.FC = () => {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>

          {/* Logo */}
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            WeightCalc Pro
          </Typography>

          {/* Desktop Menu */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 2,
              alignItems: "center",
            }}
          >
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
                }}
              >
                {link.label}
              </Button>
            ))}

            <ThemeToggle />
          </Box>

          {/* Mobile Menu Button */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }} onClick={toggleDrawer}>
          <List>
            {navLinks.map((link) => (
              <ListItemButton
                key={link.path}
                component={Link}
                to={link.path}
                selected={location.pathname === link.path}
              >
                <ListItemIcon>{link.icon}</ListItemIcon>
                <ListItemText primary={link.label} />
              </ListItemButton>
            ))}

            <Box sx={{ px: 2, pt: 2 }}>
              <ThemeToggle />
            </Box>
          </List>
        </Box>
      </Drawer>
    </>
  )
}

export default Navbar