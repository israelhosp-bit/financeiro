"use client"

import {
  PiggyBank,
  CircleDollarSign,
  Target,
  Calculator,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface MetricsCardsProps {
  trafficCash: number
  dailyBaseBudget: number
  roas: number
  bankEntry: number
}

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function MetricsCards({
  trafficCash,
  dailyBaseBudget,
  roas,
  bankEntry,
}: MetricsCardsProps) {
  const metrics = [
    {
      label: "Caixa de Trafego",
      sublabel: "35% do saldo",
      value: `R$ ${formatCurrency(trafficCash)}`,
      icon: PiggyBank,
    },
    {
      label: "Base Diaria",
      sublabel: "Caixa / 7 dias",
      value: `R$ ${formatCurrency(dailyBaseBudget)}`,
      icon: Calculator,
    },
    {
      label: "Entrada de Hoje",
      sublabel: "Valor recebido",
      value: `R$ ${formatCurrency(bankEntry)}`,
      icon: CircleDollarSign,
    },
    {
      label: "ROAS Ref.",
      sublabel: "Retorno esperado",
      value: `${roas.toFixed(2)}x`,
      icon: Target,
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.label} className="border-border bg-card">
          <CardContent className="flex flex-col gap-3 p-4">
            <div className="flex items-center gap-2">
              <metric.icon className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs font-medium text-foreground">
                  {metric.label}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {metric.sublabel}
                </p>
              </div>
            </div>
            <p className="text-xl font-bold tracking-tight text-foreground">
              {metric.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
