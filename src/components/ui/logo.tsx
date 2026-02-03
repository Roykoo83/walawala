import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "icon" | "full"; // icon: 심볼만, full: 텍스트 포함(향후 확장)
}

const SIZES = {
  sm: { width: 32, height: 32 }, // 헤더용
  md: { width: 48, height: 48 }, // 카드용
  lg: { width: 80, height: 80 }, // 히어로/로그인용
};

export function Logo({ className, size = "md", variant = "icon" }: LogoProps) {
  const { width, height } = SIZES[size];

  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <div className="relative overflow-hidden rounded-full border border-border/10 shadow-sm bg-white">
        <Image
          src="/assets/walawala-logo.jpeg"
          alt="WalaWala Logo"
          width={width}
          height={height}
          className="object-cover"
          priority
        />
      </div>
      {variant === "full" && (
        <span className={cn("font-bold text-brand-black tracking-tight", 
          size === 'sm' && "text-lg",
          size === 'md' && "text-xl",
          size === 'lg' && "text-3xl"
        )}>
          WalaWala
        </span>
      )}
    </Link>
  );
}
