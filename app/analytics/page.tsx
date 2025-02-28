"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from "recharts";
import { useStore } from "@/lib/store";

// Mock data for analytics
const engagementData = [
  { date: 'Jan 1', engagement: 5.2, plays: 12000 },
  { date: 'Jan 8', engagement: 5.8, plays: 15000 },
  { date: 'Jan 15', engagement: 6.3, plays: 18000 },
  { date: 'Jan 22', engagement: 6.7, plays: 22000 },
  { date: 'Jan 29', engagement: 7.2, plays: 28000 },
  { date: 'Feb 5', engagement: 7.8, plays: 32000 },
  { date: 'Feb 12', engagement: 8.3, plays: 38000 },
  { date: 'Feb 19', engagement: 8.7, plays: 45000 },
  { date: 'Feb 26', engagement: 9.1, plays: 52000 },
  { date: 'Mar 5', engagement: 9.5, plays: 58000 },
  { date: 'Mar 12', engagement: 9.8, plays: 65000 }
];

const genreGrowthData = [
  { name: 'Pop', lastMonth: 8.2, thisMonth: 12.5 },
  { name: 'Hip Hop', lastMonth: 10.5, thisMonth: 15.2 },
  { name: 'Electronic', lastMonth: 5.3, thisMonth: 8.7 },
  { name: 'R&B', lastMonth: 3.8, thisMonth: 5.3 },
  { name: 'Alternative', lastMonth: 4.2, thisMonth: 7.1 },
  { name: 'Indie', lastMonth: 6.1, thisMonth: 9.8 }
];

const regionEngagementData = [
  { name: 'North America', value: 35 },
  { name: 'Europe', value: 30 },
  { name: 'Asia', value: 20 },
  { name: 'South America', value: 10 },
  { name: 'Australia', value: 5 }
];

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))"
];

const ageGroupData = [
  { name: '18-24', value: 45 },
  { name: '25-34', value: 30 },
  { name: '35-44', value: 15 },
  { name: '45+', value: 10 }
];

export default function AnalyticsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Trends & Analytics</h1>
        
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="genres">Genre Trends</TabsTrigger>
            <TabsTrigger value="audience">Audience Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6 space-y-6">
            {/* Engagement Over Time */}
            <Card>
              <CardHeader>
                <CardTitle>Engagement & Plays Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={engagementData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                        axisLine={{ stroke: "hsl(var(--border))" }}
                      />
                      <YAxis 
                        yAxisId="left"
                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                        axisLine={{ stroke: "hsl(var(--border))" }}
                      />
                      <YAxis 
                        yAxisId="right"
                        orientation="right"
                        domain={[0, 10]}
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
                      <Legend />
                      <Area 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="plays" 
                        stroke="hsl(var(--chart-1))" 
                        fill="hsl(var(--chart-1)/0.2)" 
                        name="Total Plays"
                      />
                      <Area 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="engagement" 
                        stroke="hsl(var(--chart-2))" 
                        fill="hsl(var(--chart-2)/0.2)" 
                        name="Engagement (%)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Regional Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Regional Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={regionEngagementData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {regionEngagementData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: "hsl(var(--card))", 
                            borderColor: "hsl(var(--border))",
                            borderRadius: "var(--radius)",
                            color: "hsl(var(--card-foreground))"
                          }} 
                          formatter={(value) => [`${value}%`, 'Engagement']}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Age Group Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={ageGroupData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {ageGroupData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: "hsl(var(--card))", 
                            borderColor: "hsl(var(--border))",
                            borderRadius: "var(--radius)",
                            color: "hsl(var(--card-foreground))"
                          }} 
                          formatter={(value) => [`${value}%`, 'Users']}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="genres" className="mt-6 space-y-6">
            {/* Genre Growth */}
            <Card>
              <CardHeader>
                <CardTitle>Genre Growth Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={genreGrowthData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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
                        formatter={(value) => [`${value}%`, 'Growth Rate']}
                      />
                      <Legend />
                      <Bar dataKey="lastMonth" fill="hsl(var(--chart-3))" name="Last Month" />
                      <Bar dataKey="thisMonth" fill="hsl(var(--chart-1))" name="This Month" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}