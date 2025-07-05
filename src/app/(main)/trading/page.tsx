'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Image from 'next/image';
import { useState, useEffect, useCallback } from "react";
import { TradeOrderDialog } from "@/components/dialogs/trade-order-dialog";
import { useAuth } from "@/components/auth-provider";
import { getTradingData, updateDocument, type PortfolioItem, type WatchlistItem, type MarketNewsItem, type StockDataPoint } from "@/lib/data";
import { Skeleton } from "@/components/ui/skeleton";

export default function TradingPage() {
    const { user } = useAuth();
    const [stockData, setStockData] = useState<StockDataPoint[]>([]);
    const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
    const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
    const [marketNews, setMarketNews] = useState<MarketNewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    const [tradeDialogOpen, setTradeDialogOpen] = useState(false);
    const [tradeDetails, setTradeDetails] = useState({ action: 'Buy' as 'Buy' | 'Sell', symbol: 'AAPL', shares: 0, price: 155.10 });
    const [buyShares, setBuyShares] = useState('');
    const [sellShares, setSellShares] = useState('');

    const fetchData = useCallback(async () => {
        if (user?.uid) {
            setLoading(true);
            const data = await getTradingData(user.uid);
            setStockData(data.stockData);
            setPortfolio(data.portfolio);
            setWatchlist(data.watchlist);
            setMarketNews(data.marketNews);
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleTradeClick = (action: 'Buy' | 'Sell') => {
        const shares = action === 'Buy' ? parseInt(buyShares) : parseInt(sellShares);
        if (shares > 0) {
            setTradeDetails({
                action,
                symbol: 'AAPL',
                shares,
                price: stockData[stockData.length - 1]?.price || 155.10
            });
            setTradeDialogOpen(true);
        }
    }

    const handleConfirmTrade = async () => {
        if(!user) return;
        
        const aaplStock = portfolio.find(s => s.symbol === 'AAPL');
        if(!aaplStock || !aaplStock.id) {
            // In a real app, you might want to create the stock in the portfolio
            return;
        }

        const newShares = tradeDetails.action === 'Buy' ? aaplStock.shares + tradeDetails.shares : aaplStock.shares - tradeDetails.shares;
        
        await updateDocument(user.uid, 'portfolio', aaplStock.id, {
            shares: newShares,
            value: newShares * tradeDetails.price
        });
        
        setTradeDialogOpen(false);
        await fetchData(); // Refresh data
    }


    if (loading) {
        return (
            <div className="space-y-6">
                 <h1 className="text-3xl font-bold tracking-tight">Trading</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Skeleton className="h-[480px] w-full" />
                        <Skeleton className="h-64 w-full" />
                    </div>
                    <div className="space-y-6">
                        <Skeleton className="h-64 w-full" />
                        <Skeleton className="h-64 w-full" />
                        <Skeleton className="h-64 w-full" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <TradeOrderDialog 
                open={tradeDialogOpen} 
                onOpenChange={setTradeDialogOpen} 
                tradeDetails={tradeDetails} 
                onConfirm={handleConfirmTrade}
            />
            <h1 className="text-3xl font-bold tracking-tight">Trading</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <Image src="https://placehold.co/40x40.png" data-ai-hint="apple logo" alt="AAPL" width={40} height={40} className="rounded-full"/>
                                <div>
                                    <CardTitle className="text-2xl">Apple Inc. (AAPL)</CardTitle>
                                    <div className="flex items-center gap-2">
                                        <p className="text-2xl font-bold">${stockData[stockData.length - 1]?.price.toFixed(2)}</p>
                                        <p className="text-sm font-medium text-green-600 flex items-center">
                                            <ArrowUp className="h-4 w-4"/> +2.40 (1.56%)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                             <div className="h-[350px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={stockData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={['dataMin - 2', 'dataMax + 2']} tickFormatter={(value) => `$${value}`} tickLine={false} axisLine={false}/>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: "hsl(var(--background))",
                                                borderColor: "hsl(var(--border))"
                                            }}
                                            formatter={(value: number) => `$${value.toFixed(2)}`} />
                                        <Line type="monotone" dataKey="price" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>My Portfolio</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Asset</TableHead>
                                        <TableHead>Shares</TableHead>
                                        <TableHead>Value</TableHead>
                                        <TableHead className="text-right">24h Change</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {portfolio.map(stock => (
                                        <TableRow key={stock.symbol}>
                                            <TableCell>
                                                <div className="font-bold">{stock.symbol}</div>
                                                <div className="text-sm text-muted-foreground">{stock.name}</div>
                                            </TableCell>
                                            <TableCell>{stock.shares}</TableCell>
                                            <TableCell>{stock.value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</TableCell>
                                            <TableCell className={`text-right font-medium ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-6">
                    <Card>
                        <Tabs defaultValue="buy" className="w-full">
                            <CardHeader>
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="buy">Buy</TabsTrigger>
                                    <TabsTrigger value="sell">Sell</TabsTrigger>
                                </TabsList>
                            </CardHeader>
                            <TabsContent value="buy">
                                <CardContent className="space-y-4">
                                    <Input placeholder="Amount (shares)" type="number" value={buyShares} onChange={e => setBuyShares(e.target.value)} />
                                    <p className="text-sm text-muted-foreground">Market Price: ~${stockData[stockData.length - 1]?.price.toFixed(2)}</p>
                                    <p className="text-sm font-bold">Estimated Cost: {(parseFloat(buyShares) * (stockData[stockData.length - 1]?.price || 0) || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                                    <Button className="w-full" onClick={() => handleTradeClick('Buy')} disabled={!buyShares || parseInt(buyShares) <= 0}>Buy AAPL</Button>
                                </CardContent>
                            </TabsContent>
                            <TabsContent value="sell">
                                 <CardContent className="space-y-4">
                                    <Input placeholder="Amount (shares)" type="number" value={sellShares} onChange={e => setSellShares(e.target.value)} />
                                    <p className="text-sm text-muted-foreground">You own: {portfolio.find(s => s.symbol === 'AAPL')?.shares || 0} shares</p>
                                    <p className="text-sm font-bold">Estimated Credit: {(parseFloat(sellShares) * (stockData[stockData.length - 1]?.price || 0) || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                                    <Button variant="destructive" className="w-full" onClick={() => handleTradeClick('Sell')} disabled={!sellShares || parseInt(sellShares) <= 0}>Sell AAPL</Button>
                                </CardContent>
                            </TabsContent>
                        </Tabs>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Watchlist</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {watchlist.map(stock => (
                                    <div key={stock.symbol} className="flex justify-between items-center">
                                        <div>
                                            <p className="font-bold">{stock.symbol}</p>
                                            <p className="text-sm text-muted-foreground">{stock.name}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium">{stock.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                                            <p className={`text-sm ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>{stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Market News</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {marketNews.map(news => (
                                    <div key={news.id}>
                                        <p className="font-medium text-sm">{news.title}</p>
                                        <p className="text-xs text-muted-foreground">{news.source} &middot; {news.time}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
