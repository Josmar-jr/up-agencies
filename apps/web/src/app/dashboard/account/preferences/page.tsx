'use client'

import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Moon, Settings, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function Preferences() {
  const { setTheme, theme } = useTheme()

  return (
    <Card className="mx-auto w-full max-w-[760px]">
      <CardContent className="p-6">
        <CardTitle>Preferências</CardTitle>

        <RadioGroup
          value={theme}
          onValueChange={setTheme}
          defaultValue="comfortable"
          className="mt-6 grid gap-4 lg:grid-cols-3"
        >
          <Label htmlFor="r1">
            <div className="bg-background-foreground/40 flex flex-col gap-2 rounded-md border border-border p-3">
              <div className="grid h-[110px] w-full place-content-center rounded-sm bg-gradient-to-br from-[#11998e] to-[#78ffd6]">
                <Settings className="size-10 text-zinc-200" />
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="system" id="r1" />
                <span>Sistema</span>
              </div>
            </div>
          </Label>
          <Label htmlFor="r2">
            <div className="bg-background-foreground/40 flex flex-col gap-2 rounded-md border border-border p-3">
              <div className="grid h-[110px] w-full place-content-center rounded-sm bg-gradient-to-br from-[#11998e] to-[#78ffd6]">
                <Sun className="size-10 text-zinc-200" />
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="light" id="r2" />
                <span>Claro</span>
              </div>
            </div>
          </Label>
          <Label htmlFor="r3">
            <div className="bg-background-foreground/40 flex flex-col gap-2 rounded-md border border-border p-3">
              <div className="grid h-[110px] w-full place-content-center rounded-sm bg-gradient-to-br from-[#11998e] to-[#78ffd6]">
                <Moon className="size-10 text-zinc-200" />
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="dark" id="r3" />
                <span>Escuro</span>
              </div>
            </div>
          </Label>
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
