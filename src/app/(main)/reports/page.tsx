'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRangePicker } from "@/components/date-range-picker";
import { Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/components/auth-provider";
import { getIncomeExpenseData, getSpendingByCategory, getCashflowData } from "@/lib/data";
import { Skeleton } from "@/components/ui/skeleton";

const PIE_CHART_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ff4d4d'];

const recentReports = [
    { id: 'rep_1', name: 'Q2 2024 Summary', date: '2024-07-01', type: 'PDF' },
    { id: 'rep_2', name: 'June 2024 Expense Report', date: '2024-07-01', type: 'CSV' },
    { id: 'rep_3', name: '2023 Annual Report', date: '2024-01-15', type: 'PDF' },
];

export default function ReportsPage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [incomeExpenseData, setIncomeExpenseData] = useState<any[]>([]);
    const [spendingData, setSpendingData] = useState<any[]>([]);
    const [cashflowData, setCashflowData] = useState<any[]>([]);

    const fetchData = useCallback(async () => {
        if (user?.uid) {
            setLoading(true);
            const [incomeExpense, spending, cashflow] = await Promise.all([
                getIncomeExpenseData(user.uid),
                getSpendingByCategory(user.uid),
                getCashflowData(user.uid)
            ]);
            setIncomeExpenseData(incomeExpense);
            setSpendingData(spending);
            setCashflowData(cashflow);
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
                <div className="flex items-center gap-2">
                    <DateRangePicker />
                    <Button>
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>
            
            {loading ? (
                <div className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Skeleton className="h-[400px] w-full" />
                        <Skeleton className="h-[400px] w-full" />
                    </div>
                    <Skeleton className="h-[400px] w-full" />
                    <Skeleton className="h-64 w-full" />
                </div>
            ) : (
                <>
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Income vs. Expense</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={{}} className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={incomeExpenseData}>
                                            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                            <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} content={<ChartTooltipContent />} />
                                            <Legend />
                                            <Bar dataKey="income" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                                            <Bar dataKey="expense" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Spending by Category</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={{}} className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={spendingData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                                                {spendingData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip content={<ChartTooltipContent />} />
                                            <Legend />
                                        </PieChart>
                                </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Cash Flow</CardTitle>
                            <CardDescription>Your cash flow over the selected period.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={{}} className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={cashflowData}>
                                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                        <Tooltip content={<ChartTooltipContent />} />
                                        <Legend />
                                        <Line type="monotone" dataKey="cashflow" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--chart-1))" }} activeDot={{ r: 8 }} />
                                    </LineChart>
                            </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Reports</CardTitle>
                            <CardDescription>Your recently generated reports.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Report Name</TableHead>
                                        <TableHead className="hidden sm:table-cell">Date Generated</TableHead>
                                        <TableHead className="hidden sm:table-cell">Type</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentReports.map(report => (
                                        <TableRow key={report.id}>
                                            <TableCell className="font-medium">{report.name}</TableCell>
                                            <TableCell className="hidden sm:table-cell">{new Date(report.date).toLocaleDateString()}</TableCell>
                                            <TableCell className="hidden sm:table-cell"><Badge variant="secondary">{report.type}</Badge></TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon">
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </>
            )}
        </div>
    );
}
