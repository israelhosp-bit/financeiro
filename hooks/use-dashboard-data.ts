"use client"

import { useState, useEffect, useCallback } from "react"

export interface DashboardData {
  date: string
  bankEntry: number
  bankBalance: number
}

const STORAGE_KEY = "trafficpilot-dashboard-data"

const getDefaultData = (): DashboardData => ({
  date: new Date().toISOString().split("T")[0],
  bankEntry: 0,
  bankBalance: 0,
})

export function useDashboardData() {
  const [data, setData] = useState<DashboardData>(getDefaultData)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as DashboardData
        setData(parsed)
      }
    } catch {
      // If localStorage fails, use defaults
    }
    setIsLoaded(true)
  }, [])

  const updateData = useCallback(
    (updates: Partial<DashboardData>) => {
      setData((prev) => {
        const next = { ...prev, ...updates }
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        } catch {
          // localStorage might be full or unavailable
        }
        return next
      })
    },
    []
  )

  const resetData = useCallback(() => {
    const defaults = getDefaultData()
    setData(defaults)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // Ignore
    }
  }, [])

  // Computed values
  const trafficCash = data.bankBalance * 0.35
  const dailyBaseBudget = trafficCash / 7
  const FLOOR = 250
  const CEILING = 800
  const finalBudget = Math.min(CEILING, Math.max(FLOOR, dailyBaseBudget))

  let decision: "ESCALAR" | "MANTER" | "REDUZIR"
  if (finalBudget >= CEILING) {
    decision = "ESCALAR"
  } else if (finalBudget <= FLOOR) {
    decision = "REDUZIR"
  } else {
    decision = "MANTER"
  }

  const RENT = 7500
  const FIXED_BILLS = 5000
  const rentStatus: "OK" | "RISCO" = data.bankBalance >= RENT ? "OK" : "RISCO"
  const fixedBillsStatus: "OK" | "RISCO" =
    data.bankBalance >= FIXED_BILLS ? "OK" : "RISCO"

  return {
    data,
    isLoaded,
    updateData,
    resetData,
    computed: {
      trafficCash,
      dailyBaseBudget,
      finalBudget,
      decision,
      rentStatus,
      fixedBillsStatus,
      FLOOR,
      CEILING,
      RENT,
      FIXED_BILLS,
      ROAS: 2.64,
    },
  }
}
