'use client';
import { CheckCircle } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { month: "Jan", desktop: 186 },
  { month: "Feb", desktop: 305 },
  { month: "Mar", desktop: 237 },
  { month: "Apr", desktop: 273 },
  { month: "May", desktop: 209 },
  { month: "Jun", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#B2F35F",
  },
};

const features = [
    { title: "Improve your cashflow", description: "Take control of your cashflow and reduce the risk of late payments with our automated payment solutions." },
    { title: "Take card payments", description: "Accept all major credit and debit cards, plus popular local payment methods from around the world." },
    { title: "Mitigate risk", description: "Reduce your exposure to fraud and chargebacks with our comprehensive risk management solutions." },
];

export function SaveMoney() {
    return (
        <section className="bg-[#052011] text-white py-20 sm:py-28">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl sm:text-5xl font-bold mb-8 tracking-tight">Save money with our bank-beating rates</h2>
                         <div className="bg-[#0A2D1A] p-6 rounded-xl">
                             <ChartContainer config={chartConfig} className="h-[250px] w-full">
                                 <BarChart accessibilityLayer data={chartData}>
                                     <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        stroke="#888888"
                                        fontSize={12}
                                      />
                                      <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        stroke="#888888"
                                        fontSize={12}
                                      />
                                    <Tooltip
                                        cursor={false}
                                        content={<ChartTooltipContent indicator="line" />}
                                        wrapperClassName="bg-transparent"
                                     />
                                     <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                                 </BarChart>
                             </ChartContainer>
                             <p className="text-xs text-center text-white/50 mt-4">
                                This chart is an example only and does not reflect real data.
                             </p>
                         </div>
                    </div>
                     <div className="space-y-8">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-4">
                                <CheckCircle className="w-8 h-8 text-[#B2F35F] mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-bold">{feature.title}</h3>
                                    <p className="text-white/80">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                     </div>
                </div>
            </div>
        </section>
    );
}
