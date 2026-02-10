"use client"

import {
  Home,
  FileText,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BillsStatusProps {
  bankBalance: number
  rentStatus: "OK" | "RISCO"
  fixedBillsStatus: "OK" | "RISCO"
  rent: number
  fixedBills: number
}

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function BillsStatus({
  bankBalance,
  rentStatus,
  fixedBillsStatus,
  rent,
  fixedBills,
}: BillsStatusProps) {
  const bills = [
    {
      label: "Aluguel",
      dueDay: "Vence dia 20",
      amount: rent,
      status: rentStatus,
      icon: Home,
    },
    {
      label: "Contas Fixas",
      dueDay: "Vence dia 01",
      amount: fixedBills,
      status: fixedBillsStatus,
      icon: FileText,
    },
  ]

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <FileText className="h-4 w-4" />
          Contas Fixas
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {bills.map((bill) => {
          const isOk = bill.status === "OK"
          return (
            <div
              key={bill.label}
              className={`flex items-center justify-between rounded-lg border p-4 ${
                isOk
                  ? "border-success/20 bg-success/5"
                  : "border-destructive/20 bg-destructive/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    isOk ? "bg-success/10" : "bg-destructive/10"
                  }`}
                >
                  <bill.icon
                    className={`h-4 w-4 ${
                      isOk ? "text-success" : "text-destructive"
                    }`}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {bill.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {bill.dueDay} - R$ {formatCurrency(bill.amount)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isOk ? (
                  <ShieldCheck className="h-4 w-4 text-success" />
                ) : (
                  <ShieldAlert className="h-4 w-4 text-destructive" />
                )}
                <span
                  className={`text-xs font-bold ${
                    isOk ? "text-success" : "text-destructive"
                  }`}
                >
                  {bill.status}
                </span>
              </div>
            </div>
          )
        })}

        <div className="rounded-lg bg-secondary p-3">
          <p className="text-xs text-muted-foreground">
            Saldo disponivel:{" "}
            <span className="font-semibold text-foreground">
              R$ {formatCurrency(bankBalance)}
            </span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Necessario para contas:{" "}
            <span className="font-semibold text-foreground">
              R$ {formatCurrency(rent + fixedBills)}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
