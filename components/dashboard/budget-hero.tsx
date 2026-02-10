"use client"

import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface BudgetHeroProps {
  finalBudget: number
  decision: "ESCALAR" | "MANTER" | "REDUZIR"
  floor: number
  ceiling: number
}

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function BudgetHero({
  finalBudget,
  decision,
  floor,
  ceiling,
}: BudgetHeroProps) {
  const decisionConfig = {
    ESCALAR: {
      label: "ESCALAR",
      description: "Aumente o investimento",
      colorClass: "text-success",
      bgClass: "bg-success/10",
      borderClass: "border-success/30",
      icon: TrendingUp,
    },
    MANTER: {
      label: "MANTER",
      description: "Mantenha o ritmo atual",
      colorClass: "text-warning",
      bgClass: "bg-warning/10",
      borderClass: "border-warning/30",
      icon: Minus,
    },
    REDUZIR: {
      label: "REDUZIR",
      description: "Reduza o investimento",
      colorClass: "text-destructive",
      bgClass: "bg-destructive/10",
      borderClass: "border-destructive/30",
      icon: TrendingDown,
    },
  }

  const config = decisionConfig[decision]
  const Icon = config.icon

  // Budget bar percentage
  const range = ceiling - floor
  const position = ((finalBudget - floor) / range) * 100
  const clampedPosition = Math.min(100, Math.max(0, position))

  return (
    <Card
      className={`border-2 ${config.borderClass} bg-card overflow-hidden`}
    >
      <CardContent className="flex flex-col items-center gap-6 py-8 px-6">
        <div className="flex flex-col items-center gap-1">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Orcamento de Hoje
          </p>
          <p className="text-5xl font-bold tracking-tight text-foreground md:text-6xl">
            R$ {formatCurrency(finalBudget)}
          </p>
        </div>

        {/* Decision Badge */}
        <div
          className={`flex items-center gap-2 rounded-full px-5 py-2 ${config.bgClass}`}
        >
          <Icon className={`h-4 w-4 ${config.colorClass}`} />
          <span
            className={`text-sm font-bold tracking-wider ${config.colorClass}`}
          >
            {config.label}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">{config.description}</p>

        {/* Budget bar */}
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-between pb-2">
            <span className="text-[10px] text-muted-foreground">
              Min R$ {floor}
            </span>
            <span className="text-[10px] text-muted-foreground">
              Max R$ {ceiling}
            </span>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className={`absolute left-0 top-0 h-full rounded-full transition-all duration-500 ${
                decision === "ESCALAR"
                  ? "bg-success"
                  : decision === "MANTER"
                    ? "bg-warning"
                    : "bg-destructive"
              }`}
              style={{ width: `${clampedPosition}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
