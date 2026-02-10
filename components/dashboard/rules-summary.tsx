"use client"

import { Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function RulesSummary() {
  const rules = [
    { label: "Caixa de Trafego", value: "35% do saldo bancario" },
    { label: "Base diaria", value: "Caixa de Trafego / 7" },
    { label: "Piso minimo", value: "R$ 250,00" },
    { label: "Teto maximo", value: "R$ 800,00" },
    { label: "ROAS referencia", value: "2,64x" },
  ]

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Info className="h-4 w-4" />
          Regras de Calculo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {rules.map((rule) => (
            <div
              key={rule.label}
              className="flex items-center justify-between border-b border-border pb-2 last:border-0 last:pb-0"
            >
              <span className="text-xs text-muted-foreground">
                {rule.label}
              </span>
              <span className="text-xs font-medium text-foreground">
                {rule.value}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg bg-secondary p-3">
          <p className="text-[10px] leading-relaxed text-muted-foreground">
            O orcamento final nunca sera menor que o piso (R$ 250) ou maior que
            o teto (R$ 800). A decisao automatica baseia-se na posicao do
            orcamento dentro dessa faixa.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
