import React, { useState, useEffect } from "react"
import {
  Box, Paper, Typography, TextField, Button,
  Divider, FormControlLabel, Checkbox,
   Chip,
} from "@mui/material"
// import DeleteIcon from "@mui/icons-material/Delete"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import ClearAllIcon from "@mui/icons-material/ClearAll"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import TrendingDownIcon from "@mui/icons-material/TrendingDown"

type Expense = { name: string; amount: number | string }

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


const formatINR = (value: number, decimals = 2) =>
     { return value.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals, }) }

const getCompanyRate = (amount: number) => {
  if (amount < 100000) return 0.30
  if (amount <= 150000) return 0.32
  return 0.40
}

const FranchisePage: React.FC = () => {
  const [sales, setSales] = useState<number | string>(0)
  const [overhead, setOverhead] = useState<number | string>(0)
  const [excludeOverhead, setExcludeOverhead] = useState(true)
  const [expenses, setExpenses] = useState<Expense[]>(DEFAULT_EXPENSES)
  const [itemsPerRow, setItemsPerRow] = useState<number>(3)
  const [softwareFee, setSoftwareFee] = useState<number>(450)
  const [crossing, setCrossing] = useState<number | string>(0)

  useEffect(() => {
    const saved = localStorage.getItem("franchiseData")
    if (saved) {
      const p = JSON.parse(saved)
      setSales(p.sales ?? 0)
      setOverhead(p.overhead ?? 0)
      setSoftwareFee(p.softwareFee ?? 450)
      setCrossing(p.crossing ?? 0)
      setExcludeOverhead(p.excludeOverhead ?? true)
      setExpenses(p.expenses ?? DEFAULT_EXPENSES)
      setItemsPerRow(p.itemsPerRow ?? 3)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      "franchiseData",
      JSON.stringify({ sales, overhead, excludeOverhead, expenses, itemsPerRow, softwareFee, crossing })
    )
  }, [sales, overhead, excludeOverhead, expenses, itemsPerRow, softwareFee, crossing])


const salesNum = Number(sales)
const overheadNum = Number(overhead)
const rate = getCompanyRate(salesNum)
const  brandFess =( salesNum - overheadNum) * 0.01
const companyCharge = salesNum * rate
const companyGST = (companyCharge + brandFess + Number(softwareFee)) * 0.18
const companyFinalTotal = companyCharge + companyGST + brandFess + Number(softwareFee)
const companyFinalRounded = Math.round(companyFinalTotal)
const totalExp = expenses.reduce((s, e) => s + Number(e.amount), 0)
const receivable = excludeOverhead ? salesNum - overheadNum : salesNum
  const overheadLoss = overheadNum * rate
  const profit = receivable - companyCharge - totalExp
  const profitMargin = salesNum > 0 ? (profit / salesNum) * 100 : 0

  const updateName = (i: number, v: string) => {
    const u = [...expenses]
    u[i] = { ...u[i], name: v }
    setExpenses(u)
  }

  const updateAmount = (i: number, v: string) => {
    const u = [...expenses]
    u[i] = { ...u[i], amount: v }
    setExpenses(u)
  }

  const addExpense = () =>
    setExpenses([...expenses, { name: "New Expense", amount: 0 }])

//   const delExpense = (i: number) =>
//     setExpenses(expenses.filter((_, idx) => idx !== i))

  const clearAll = () => {
    localStorage.removeItem("franchiseData")
    setSales(0)
    setOverhead(0)
    setExcludeOverhead(true)
    setExpenses(DEFAULT_EXPENSES)
    setItemsPerRow(3)
  }

  const breakdownRows = [
      { label: "Total Sales", value: `₹${formatINR(salesNum)}` },
      { label: "Overhead", value: `₹${formatINR(overheadNum)}` },
      { label: "Receivable", value: `₹${formatINR(receivable)}` },
      { label: "Company Rate", value: `${(rate * 100).toFixed(0)}%` },
      { label: "Total Expenses", value: `₹${formatINR(totalExp)}` },
      { label: "Profit Margin", value: `${profitMargin.toFixed(2)}%` },
      { label: "Company Charge", value: `₹${formatINR(companyCharge)}` },
      // { label: "Software Fee", value: `₹${Number(softwareFee).toFixed(2)}` },
      // { label: "Crossing Charges", value: `₹${crossingNum.toFixed(2)}` },
      // { label: "Brand Fee (1%)", value: `₹${brandFess.toFixed(2)}` },
      { label: "Company GST (18%)", value: `₹${formatINR(companyGST)}` },
    //   { label: "Company Final Total", value: `₹${formatINR(companyFinalRounded)}` },
  ]

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", display: "flex", flexDirection: "column", gap: 3 }}>

      <Typography variant="h5" fontWeight={700}>
        Franchise Profit Tracker
      </Typography>

      {/* Income Section */}
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Income Details</Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <TextField
            label="Total Sales (₹)"
            type="number"
            value={sales}
            onChange={(e) => setSales(e.target.value)}
          />
          <TextField
            label="Overhead (₹)"
            type="number"
            value={overhead}
            onChange={(e) => setOverhead(e.target.value)}
          />
          <TextField
            label="Crossing Charges (₹)"
            type="number"
            value={crossing}
            onChange={(e) => setCrossing(e.target.value)}
          />
            <TextField
            label="Software Fee (₹)"
            type="number"
            value={softwareFee}
            onChange={(e) => setSoftwareFee(Number(e.target.value))}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={excludeOverhead}
                onChange={(e) => setExcludeOverhead(e.target.checked)}
              />
            }
            label="Exclude Overhead from Income"
          />

          
        <Button startIcon={<ClearAllIcon />} variant="outlined" color="error" onClick={clearAll}>
          Clear All Data
        </Button>
        </Box>
      </Paper>

      {/* Monthly Expenses */}
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6">Monthly Expenses</Typography>
          <Chip   sx={{ fontSize: '1.2rem' }} label={`Total: ₹${totalExp.toLocaleString("en-IN")}`} color="primary" />
        </Box>

        {/* Items Per Row Control */}
        {/* <TextField
          label="Items Per Row"
          type="number"
          size="small"
          value={itemsPerRow}
          onChange={(e) => {
            const val = Number(e.target.value)
            if (val > 0 && val <= 6) setItemsPerRow(val)
          }}
          sx={{ mb: 2, width: 150 }}
        /> */}

        {/* Dynamic Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${itemsPerRow}, minmax(250px, 1fr))`,
            gap: 2,
          }}
        >
          {expenses.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                p: 1,
              }}
            >
              <TextField
                size="small"
                label="Name"
                value={item.name}
                onChange={(e) => updateName(index, e.target.value)}
              />
              <TextField
                size="small"
                type="number"
                label="Amount"
                value={item.amount}
                onChange={(e) => updateAmount(index, e.target.value)}
              />
              {/* <IconButton color="error" onClick={() => delExpense(index)}>
                <DeleteIcon />
              </IconButton> */}
            </Box>
          ))}
        </Box>

        <Button
          startIcon={<AddCircleOutlineIcon />}
          onClick={addExpense}
          sx={{ mt: 2 }}
          variant="outlined"
        >
          Add Expense
        </Button>
      </Paper>

      {/* Breakdown */}
         {/* ── Detailed Breakdown ─────────────────────────────── */}
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Detailed Breakdown</Typography>

        {/* 2-column responsive grid via flexbox */}
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {breakdownRows.map((row) => (
            <Box key={row.label} sx={{
              width: { xs: "100%", sm: "50%" },
              display: "flex", justifyContent: "space-between",
              py: 0.75, px: 1, borderRadius: 1,
              "&:hover": { bgcolor: "action.hover" },
            }}>
              <Typography fontWeight={600}>{row.label}</Typography>
              <Typography fontWeight={800}>{row.value}</Typography>
            </Box>
          ))}
          

          
          {/* Overhead loss — full width, red */}
          <Box sx={{
            width: "100%",
            display: "flex", justifyContent: "space-between",
            py: 0.75, px: 1, borderRadius: 1, color: "#4f46e5",
          }}>
            <Typography fontWeight={900}>Overhead Loss (Company %)</Typography>
            <Typography fontWeight={900}>₹{overheadLoss.toFixed(2)}</Typography>
          </Box>

               
        </Box>

        <Divider sx={{ my: 2 }} />

  <Box sx={{
            width: "100%",
            display: "flex", justifyContent: "space-between",
            py: 0.75, px: 1, borderRadius: 1, color: "error.main", 
          }}>
            <Typography fontWeight={900}> Company Final Total</Typography>
            <Typography fontWeight={900}>₹{formatINR(companyFinalRounded)}</Typography>
          </Box>

          
        <Divider sx={{ my: 2 }} />

        {/* Net profit banner */}
          <Box
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: profit >= 0 ? "success.light" : "error.light",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1,}} fontWeight={700}>
            {profit >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
            <Typography fontWeight={900}>Net Profit</Typography>
          </Box>
          <Typography fontWeight={900}>₹{profit.toFixed(2)}</Typography>
        </Box>

     

      </Paper>

    </Box>
  )
}

export default FranchisePage