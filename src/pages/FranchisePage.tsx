import React, { useState, useEffect } from "react"
import {
  Box, Typography, TextField, Button,
  Divider, FormControlLabel, Checkbox, Chip,
} from "@mui/material"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import ClearAllIcon from "@mui/icons-material/ClearAll"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import TrendingDownIcon from "@mui/icons-material/TrendingDown"
import {
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

type Expense = { name: string; amount: number | string }
type AccordionState = { income: boolean; expenses: boolean; breakdown: boolean }

const DEFAULT_EXPENSES: Expense[] = [
  { name: "Rent", amount: 5000 },
  { name: "Riksha", amount: 15000 },
  { name: "Fardin", amount: 12000 },
  { name: "Aslam", amount: 7000 },
  { name: "Navin", amount: 3000 },
  { name: "Sureshbhai", amount: 2000 },
  { name: "Petrol", amount: 2500 },
  { name: "Stationery", amount: 1000 },
  { name: "Water/Net", amount: 1500 },
  { name: "Light Bill", amount: 1250 },
  { name: "Misc", amount: 2500 },
]

const DEFAULT_ACCORDION: AccordionState = { income: true, expenses: true, breakdown: true }

const formatINR = (value: number, decimals = 2) =>
  value.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

const getCompanyRate = (amount: number) => {
  if (amount < 100000) return 0.30
  if (amount <= 150000) return 0.32
  return 0.40
}

// ── Read localStorage once at module level (avoids useState default vs load race) ──
const loadSaved = () => {
  try {
    const raw = localStorage.getItem("franchiseData")
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

const FranchisePage: React.FC = () => {
  const p = loadSaved()

  // ── All state initialised directly from localStorage — no race condition ──
  const [accordionState, setAccordionState] = useState<AccordionState>(p?.accordionState ?? DEFAULT_ACCORDION)
  const [sales, setSales] = useState<number | string>(p?.sales ?? 0)
  const [overhead, setOverhead] = useState<number | string>(p?.overhead ?? 0)
  const [excludeOverhead, setExcludeOverhead] = useState<boolean>(p?.excludeOverhead ?? true)
  const [expenses, setExpenses] = useState<Expense[]>(p?.expenses ?? DEFAULT_EXPENSES)
  const [itemsPerRow] = useState<number>(p?.itemsPerRow ?? 3)
  const [softwareFee, setSoftwareFee] = useState<number>(p?.softwareFee ?? 450)
  const [crossing, setCrossing] = useState<number | string>(p?.crossing ?? 0)

  // ── Persist all state on every change ──
  useEffect(() => {
    localStorage.setItem(
      "franchiseData",
      JSON.stringify({ sales, overhead, excludeOverhead, expenses, itemsPerRow, softwareFee, crossing, accordionState })
    )
  }, [sales, overhead, excludeOverhead, expenses, itemsPerRow, softwareFee, crossing, accordionState])

  // ── Calculations ──
  const salesNum = Number(sales)
  const overheadNum = Number(overhead)
  const rate = getCompanyRate(salesNum)
  const brandFees = (salesNum - overheadNum) * 0.01
  const companyCharge = salesNum * rate
  const companyGST = (companyCharge + brandFees + Number(softwareFee)) * 0.18
  const companyFinalTotal = companyCharge + companyGST + brandFees + Number(softwareFee)
  const companyFinalRounded = Math.round(companyFinalTotal)
  const totalExp = expenses.reduce((s, e) => s + Number(e.amount), 0)
  const receivable = excludeOverhead ? salesNum - overheadNum : salesNum
  const overheadLoss = overheadNum * rate
  const profit = receivable - companyCharge - totalExp
  const profitMargin = salesNum > 0 ? (profit / salesNum) * 100 : 0

  const updateName = (i: number, v: string) => {
    const u = [...expenses]; u[i] = { ...u[i], name: v }; setExpenses(u)
  }
  const updateAmount = (i: number, v: string) => {
    const u = [...expenses]; u[i] = { ...u[i], amount: v }; setExpenses(u)
  }
  const addExpense = () => setExpenses([...expenses, { name: "New Expense", amount: 0 }])

  const clearAll = () => {
    localStorage.removeItem("franchiseData")
    setSales(0)
    setOverhead(0)
    setExcludeOverhead(true)
    setExpenses(DEFAULT_EXPENSES)
    setSoftwareFee(450)
    setCrossing(0)
    setAccordionState(DEFAULT_ACCORDION)
  }

  const setAccordion = (key: keyof AccordionState) => (_: React.SyntheticEvent, expanded: boolean) =>
    setAccordionState(prev => ({ ...prev, [key]: expanded }))

  const breakdownRows = [
    { label: "Total Sales", value: `₹${formatINR(salesNum)}` },
    { label: "Overhead", value: `₹${formatINR(overheadNum)}` },
    { label: "Receivable", value: `₹${formatINR(receivable)}` },
    { label: "Company Rate", value: `${(rate * 100).toFixed(0)}%` },
    { label: "Total Expenses", value: `₹${formatINR(totalExp)}` },
    { label: "Profit Margin", value: `${profitMargin.toFixed(2)}%` },
    { label: "Company Charge", value: `₹${formatINR(companyCharge)}` },
    { label: "Company GST (18%)", value: `₹${formatINR(companyGST)}` },
  ]

  return (
  <Box
    sx={{
      maxWidth: 1000,
      mx: "auto",
      px: { xs: 2, sm: 3 },
      py: 2,
      display: "flex",
      flexDirection: "column",
      gap: 3,
    }}
  >
    <Typography
      variant="h5"
      fontWeight={700}
      textAlign={{ xs: "center", sm: "left" }}
    >
      Franchise Profit Tracker
    </Typography>

    {/* ================= INCOME ================= */}
    <Accordion expanded={accordionState.income} onChange={setAccordion("income")}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontWeight={700}>Income Details</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 2,
          }}
        >
          <TextField fullWidth label="Total Sales (₹)" type="number" value={sales} onChange={(e) => setSales(e.target.value)} />
          <TextField fullWidth label="Overhead (₹)" type="number" value={overhead} onChange={(e) => setOverhead(e.target.value)} />
          <TextField fullWidth label="Crossing Charges (₹)" type="number" value={crossing} onChange={(e) => setCrossing(e.target.value)} />
          <TextField fullWidth label="Software Fee (₹)" type="number" value={softwareFee} onChange={(e) => setSoftwareFee(Number(e.target.value))} />
        </Box>

        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            alignItems: { sm: "center" },
            justifyContent: "space-between",
          }}
        >
          <FormControlLabel
            control={<Checkbox checked={excludeOverhead} onChange={(e) => setExcludeOverhead(e.target.checked)} />}
            label="Exclude Overhead from Income"
          />

          <Button
            fullWidth={true}
            startIcon={<ClearAllIcon />}
            variant="outlined"
            color="error"
            onClick={clearAll}
            sx={{ width: { sm: "auto" } }}
          >
            Clear All Data
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>

    {/* ================= EXPENSES ================= */}
    <Accordion expanded={accordionState.expenses} onChange={setAccordion("expenses")}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontWeight={700}>Monthly Expenses</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Chip
          sx={{ fontSize: "1rem", mb: 2 }}
          label={`Total: ₹${formatINR(totalExp)}`}
          color="primary"
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: `repeat(${itemsPerRow}, minmax(250px, 1fr))`,
            },
            gap: 2,
          }}
        >
          {expenses.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                p: 2,
              }}
            >
              <TextField
                fullWidth
                size="small"
                label="Name"
                value={item.name}
                onChange={(e) => updateName(index, e.target.value)}
              />
              <TextField
                fullWidth
                size="small"
                type="number"
                label="Amount"
                value={item.amount}
                onChange={(e) => updateAmount(index, e.target.value)}
              />
            </Box>
          ))}
        </Box>

        <Button
          fullWidth
          startIcon={<AddCircleOutlineIcon />}
          onClick={addExpense}
          sx={{ mt: 2 }}
          variant="outlined"
        >
          Add Expense
        </Button>
      </AccordionDetails>
    </Accordion>

    {/* ================= BREAKDOWN ================= */}
   {/* ================= BREAKDOWN ================= */}
<Accordion expanded={accordionState.breakdown} onChange={setAccordion("breakdown")}>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    <Typography fontWeight={700}>Detailed Breakdown</Typography>
  </AccordionSummary>

  <AccordionDetails>
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>

      {/* NORMAL ROWS */}
      {breakdownRows.map((row) => (
        <Box
          key={row.label}
          sx={{
            width: { xs: "100%", md: "50%" }, // 📱 mobile full, 🖥 desktop 2-column
            display: "flex",
            justifyContent: "space-between",
            py: 1,
            px: 1,
            borderRadius: 1,
            "&:hover": { bgcolor: "action.hover" },
          }}
        >
          <Typography fontWeight={600}>{row.label}</Typography>
          <Typography fontWeight={800}>{row.value}</Typography>
        </Box>
      ))}

      {/* OVERHEAD LOSS FULL WIDTH */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          py: 1,
          px: 1,
          color: "#4f46e5",
          fontWeight: 900,
        }}
      >
        <Typography fontWeight={900}>Overhead Loss (Company %)</Typography>
        <Typography fontWeight={900}>
          ₹{overheadLoss.toFixed(2)}
        </Typography>
      </Box>

      <Divider sx={{ my: 2, width: "100%" }} />

      {/* COMPANY FINAL TOTAL */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          py: 1,
          px: 1,
          color: "error.main",
        }}
      >
        <Typography fontWeight={900}>Company Final Total</Typography>
        <Typography fontWeight={900}>
          ₹{formatINR(companyFinalRounded)}
        </Typography>
      </Box>

      <Divider sx={{ my: 2, width: "100%" }} />

      {/* NET PROFIT BANNER */}
      <Box
        sx={{
          width: "100%",
          p: 2,
          borderRadius: 2,
          bgcolor: profit >= 0 ? "success.light" : "error.light",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {profit >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
          <Typography fontWeight={900}>Net Profit</Typography>
        </Box>
        <Typography fontWeight={900}>
          ₹{formatINR(profit)}
        </Typography>
      </Box>

    </Box>
  </AccordionDetails>
</Accordion>
  </Box>
)
}

export default FranchisePage