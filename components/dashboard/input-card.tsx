"use client"

import { Calendar, Landmark, Wallet } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { DashboardData } from "@/hooks/use-dashboard-data"

interface InputCardProps {
  data: DashboardData
  onUpdate: (updates: Partial<DashboardData>) => void
}

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
}

export function InputCard({ data, onUpdate }: InputCardProps) {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Calendar className="h-4 w-4" />
          Dados do Dia
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="date" className="text-xs text-muted-foreground">
            Data
          </Label>
          <Input
            id="date"
            type="date"
            value={data.date}
            onChange={(e) => onUpdate({ date: e.target.value })}
            className="border-border bg-secondary text-foreground"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="bankEntry" className="text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Landmark className="h-3.5 w-3.5" />
              Valor que entrou no banco hoje
            </span>
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              R$
            </span>
            <Input
              id="bankEntry"
              type="number"
              min={0}
              step={0.01}
              value={data.bankEntry || ""}
              placeholder="0,00"
              onChange={(e) =>
                onUpdate({ bankEntry: Number.parseFloat(e.target.value) || 0 })
              }
              className="border-border bg-secondary pl-9 text-foreground"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="bankBalance"
            className="text-xs text-muted-foreground"
          >
            <span className="flex items-center gap-1.5">
              <Wallet className="h-3.5 w-3.5" />
              Saldo atual do banco
            </span>
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              R$
            </span>
            <Input
              id="bankBalance"
              type="number"
              min={0}
              step={0.01}
              value={data.bankBalance || ""}
              placeholder="0,00"
              onChange={(e) =>
                onUpdate({
                  bankBalance: Number.parseFloat(e.target.value) || 0,
                })
              }
              className="border-border bg-secondary pl-9 text-foreground"
            />
          </div>
          {data.bankBalance > 0 && (
            <p className="text-xs text-muted-foreground">
              Saldo: R$ {formatCurrency(data.bankBalance)}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
