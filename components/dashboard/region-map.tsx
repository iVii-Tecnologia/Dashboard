"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "@/lib/store";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function RegionMap() {
  const { regions } = useStore();

  const data = regions.map((region) => ({
    name: region.name,
    artists: region.artistCount,
    engagement: region.engagement,
  }));

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Regional Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis 
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  borderColor: "hsl(var(--border))",
                  borderRadius: "var(--radius)",
                  color: "hsl(var(--card-foreground))"
                }} 
              />
              <Bar dataKey="artists" fill="hsl(var(--chart-1))" name="Artists" />
              <Bar dataKey="engagement" fill="hsl(var(--chart-2))" name="Engagement Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}