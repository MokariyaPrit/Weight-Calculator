import React, { useState } from "react"
import { Box, Paper } from "@mui/material"
import InputPanel from "../components/ui/InputPanel"
import OutputPanel from "../components/ui/OutputPanel"

const CalculatorPage: React.FC = () => {
  const [totalWeight, setTotalWeight] = useState("")
  const [totalBox, setTotalBox] = useState("")

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        flex: 1,
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
            else setTotalBox(value)
          }}
        />
      </Paper>

      <Paper elevation={3} className="content-panel" sx={{ flex: 1, p: 3 }}>
        <OutputPanel totalWeight={totalWeight} totalBox={totalBox} />
      </Paper>
    </Box>
  )
}

export default CalculatorPage