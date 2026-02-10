"use client"

import { useDashboardData } from "@/hooks/use-dashboard-data"
import { DashboardHeader } from "./header"
import { InputCard } from "./input-card"
import { BudgetHero } from "./budget-hero"
import { MetricsCards } from "./metrics-cards"
import { BillsStatus } from "./bills-status"
import { RulesSummary } from "./rules-summary"

export function Dashboard() {
  const { data, isLoaded, updateData, resetData, computed } =
    useDashboardData()

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader onReset={resetData} />

      <main className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-8">
        <div className="flex flex-col gap-6">
          {/* Top section: Input + Budget Hero */}
          <div className="grid gap-6 md:grid-cols-[320px_1fr]">
            <InputCard data={data} onUpdate={updateData} />
            <BudgetHero
              finalBudget={computed.finalBudget}
              decision={computed.decision}
              floor={computed.FLOOR}
              ceiling={computed.CEILING}
            />
          </div>

          {/* Metrics row */}
          <MetricsCards
            trafficCash={computed.trafficCash}
            dailyBaseBudget={computed.dailyBaseBudget}
            roas={computed.ROAS}
            bankEntry={data.bankEntry}
          />

          {/* Bottom section: Bills + Rules */}
          <div className="grid gap-6 md:grid-cols-2">
            <BillsStatus
              bankBalance={data.bankBalance}
              rentStatus={computed.rentStatus}
              fixedBillsStatus={computed.fixedBillsStatus}
              rent={computed.RENT}
              fixedBills={computed.FIXED_BILLS}
            />
            <RulesSummary />
          </div>
        </div>
      </main>
    </div>
  )
}
