"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData1 = [
  {
    label: "Rent/Mortgage",
    value: 1500.0,
  },
  {
    label: "Food",
    value: 450.3,
  },
  {
    label: "Transportation",
    value: 180.0,
  },
  {
    label: "Utilities",
    value: 160.25,
  },
  {
    label: "Entertainment",
    value: 350.0,
  },
  {
    label: "Other",
    value: 859.6,
  },
];

const chartConfig1 = {
  value: {
    label: "value",
    color: "green",
  },
} satisfies ChartConfig;

export function Bar1({
  date,
  chartData,
  chartConfig,
  Name = "Bar Chart",
}: {
  date: string;
  chartData: any;
  chartConfig: any;
  Name?: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{Name}</CardTitle>
        <CardDescription>{date}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig1}>
          <BarChart accessibilityLayer data={chartData1}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={"label"}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 8)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel color="Blue" />}
            />
            <Bar dataKey={chartConfig1.value.label} fill="Blue" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
