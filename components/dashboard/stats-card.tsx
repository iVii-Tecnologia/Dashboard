import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  trend?: number;
  className?: string;
}

export function StatsCard({
  title,
  value,
  icon,
  description,
  trend,
  className,
}: StatsCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || trend !== undefined) && (
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            {trend !== undefined && (
              <span
                className={cn(
                  "mr-1 font-medium",
                  trend > 0 ? "text-emerald-500" : "text-rose-500"
                )}
              >
                {trend > 0 ? "+" : ""}
                {trend}%
              </span>
            )}
            {description && <span>{description}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}