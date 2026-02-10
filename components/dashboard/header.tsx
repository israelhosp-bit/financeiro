"use client"

import { BarChart3, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onReset: () => void
}

export function DashboardHeader({ onReset }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-border px-4 py-4 md:px-8">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
          <BarChart3 className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-foreground">
            TrafficPilot
          </h1>
          <p className="text-xs text-muted-foreground">
            Dashboard de Investimento em Trafego
          </p>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onReset}
        className="gap-2 text-muted-foreground hover:text-destructive bg-transparent"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Resetar dados</span>
      </Button>
    </header>
  )
}
