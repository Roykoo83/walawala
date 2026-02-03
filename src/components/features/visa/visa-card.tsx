'use client'

import { Card, CardContent } from '@/components/ui/card'
import { differenceInDays } from 'date-fns'

interface VisaCardProps {
  visaType?: string
  expiryDate?: string
  nickname: string
}

export function VisaCard({ visaType, expiryDate, nickname }: VisaCardProps) {
  // Mock D-Day Logic if no expiry date provided (Simulation for MVP)
  // In real app, expiryDate should be mandatory.
  const today = new Date()
  let dDay = null
  let progress = 0

  if (expiryDate) {
    const expiry = new Date(expiryDate)
    const daysLeft = differenceInDays(expiry, today)
    dDay = daysLeft

    // Simple progress calculation (assuming 1 year validity for visualisation)
    const totalDuration = 365
    progress = Math.max(0, Math.min(100, ((totalDuration - daysLeft) / totalDuration) * 100))
  } else {
    // Default/Empty state
    dDay = 0
  }

  // Brand colors mapping based on Visa Type (ROY's Design)
  const getVisaColor = (type?: string) => {
    const t = type?.toUpperCase()
    if (t?.startsWith('D-2')) return 'bg-brand-accent' // Student - Pink
    if (t?.startsWith('E-7')) return 'bg-brand-primary' // Work - Dark
    if (t?.startsWith('F-')) return 'bg-green-500' // Resident - Green
    return 'bg-gray-400'
  }

  return (
    <Card className="overflow-hidden border-none shadow-md bg-white">
      <div className={`h-2 w-full ${getVisaColor(visaType)}`} />
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
              Visa Status
            </p>
            <h3 className="text-xl font-bold text-gray-800">
              {visaType || 'No Visa Info'}
            </h3>
          </div>
          <div className="text-right">
            <span className="text-sm text-muted-foreground block">
              Hello,
            </span>
            <span className="text-lg font-bold text-brand-primary">
              {nickname}
            </span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between border border-gray-100">
          <div>
            <span className="text-sm text-gray-500">Remaining</span>
          </div>
          <div className="text-right">
            {expiryDate ? (
              <div className="flex items-baseline gap-1 justify-end">
                <span className="text-3xl font-extrabold text-brand-primary">
                  D-{dDay}
                </span>
                <span className="text-xs text-gray-400">days</span>
              </div>
            ) : (
              <span className="text-sm font-medium text-gray-400">
                Set your expiry date
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
