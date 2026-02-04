import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      visaType: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        D2: "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300", // 유학
        D10: "border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300", // 구직
        E7: "border-transparent bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300", // 전문직
        E9: "border-transparent bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300", // 비전문취업
        F2: "border-transparent bg-pink-100 text-pink-800 hover:bg-pink-200 dark:bg-pink-900 dark:text-pink-300", // 거주 (Brand Accent)
        H2: "border-transparent bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900 dark:text-orange-300", // 방문취업
        unknown: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
    },
    defaultVariants: {
      visaType: "default",
    },
  }
)

export interface ResidentBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  countryCode: string // ISO 3166-1 alpha-2 code (e.g., KR, US, VN)
  label?: string
}

// Simple country code to flag emoji converter
const getFlagEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char =>  127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function ResidentBadge({ className, visaType, countryCode, label, ...props }: ResidentBadgeProps) {
  const flag = getFlagEmoji(countryCode);
  const displayText = label || visaType;

  return (
    <div className={cn(badgeVariants({ visaType }), className)} {...props}>
      <span className="mr-1.5 text-base leading-none">{flag}</span>
      {displayText}
    </div>
  )
}

export { ResidentBadge, badgeVariants }
