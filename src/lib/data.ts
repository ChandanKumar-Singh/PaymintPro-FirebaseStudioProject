'use server';

// Simulate a database query with a delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Dashboard Page Data
export async function getDashboardStats() {
    await delay(1000); 
    return {
        totalRevenue: { value: 45231.89, change: 20.1 },
        subscriptions: { value: 2350, change: 180.1 },
        sales: { value: 12234, change: 19 },
        activeNow: { value: 573, change: 201 }
    };
}
export type Sale = {
  name: string;
  email: string;
  amount: number;
  avatar: string;
  dataAiHint: string;
};
const salesData: Sale[] = [
  { name: 'Olivia Martin', email: 'olivia.martin@email.com', amount: 1999.0, avatar: 'https://placehold.co/40x40.png', dataAiHint: 'woman avatar' },
  { name: 'Jackson Lee', email: 'jackson.lee@email.com', amount: 39.0, avatar: 'https://placehold.co/40x40.png', dataAiHint: 'man avatar' },
  { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', amount: 299.0, avatar: 'https://placehold.co/40x40.png', dataAiHint: 'woman avatar' },
  { name: 'William Kim', email: 'will@email.com', amount: 99.0, avatar: 'https://placehold.co/40x40.png', dataAiHint: 'man avatar' },
  { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: 39.0, avatar: 'https://placehold.co/40x40.png', dataAiHint: 'woman avatar' },
];
export async function getRecentSales(): Promise<Sale[]> {
  await delay(500);
  return salesData;
}


// Transactions Page Data
export type Transaction = {
    id: string;
    customer: string;
    email: string;
    type: "Sale" | "Refund" | "Subscription";
    status: "Success" | "Processing" | "Declined";
    date: string;
    amount: number;
};
const transactionsData: Transaction[] = [
  { id: "txn_001", customer: "Liam Johnson", email: "liam@example.com", type: "Sale", status: "Success", date: "2023-06-23", amount: 250.00 },
  { id: "txn_002", customer: "Olivia Smith", email: "olivia@example.com", type: "Refund", status: "Declined", date: "2023-06-24", amount: 150.00, },
  { id: "txn_003", customer: "Noah Williams", email: "noah@example.com", type: "Subscription", status: "Success", date: "2023-06-25", amount: 350.00, },
  { id: "txn_004", customer: "Emma Brown", email: "emma@example.com", type: "Sale", status: "Processing", date: "2023-06-25", amount: 450.00, },
  { id: "txn_005", customer: "James Jones", email: "james@example.com", type: "Sale", status: "Success", date: "2023-06-26", amount: 550.00, },
  { id: "txn_006", customer: "Ava Davis", email: "ava@example.com", type: "Subscription", status: "Success", date: "2023-06-27", amount: 200.00, },
  { id: "txn_007", customer: "Lucas Miller", email: "lucas@example.com", type: "Sale", status: "Success", date: "2023-06-28", amount: 300.00, },
];
export async function getTransactions(): Promise<Transaction[]> {
    await delay(1000);
    return transactionsData;
}

// Accounts Page Data
export type Account = {
    id: string;
    name: string;
    bank: string;
    accountNumber: string;
    balance: number;
    type: 'Checking' | 'Savings' | 'Investment';
};
export type AccountTransaction = {
    id: string;
    description: string;
    date: string;
    amount: number;
    status: "Completed" | "Pending" | "Failed";
};
const accountsData: Account[] = [
  { id: "acc_1", name: "Primary Checking", bank: "Capital One", accountNumber: "**** **** **** 1234", balance: 10530.00, type: 'Checking' },
  { id: "acc_2", name: "Business Savings", bank: "Chase", accountNumber: "**** **** **** 5678", balance: 75250.50, type: 'Savings' },
  { id: "acc_3", name: "Investment Account", bank: "Fidelity", accountNumber: "**** **** **** 9012", balance: 120800.75, type: 'Investment' },
];
const accountTransactionsData: AccountTransaction[] = [
  { id: "txn_1", description: "Stripe Payout", date: "2024-07-25", amount: 5250.00, status: "Completed" },
  { id: "txn_2", description: "Google Ads", date: "2024-07-24", amount: -350.00, status: "Completed" },
  { id: "txn_3", description: "Figma Subscription", date: "2024-07-24", amount: -15.00, status: "Completed" },
  { id: "txn_4", description: "Client Payment - Acme Inc.", date: "2024-07-23", amount: 12000.00, status: "Completed" },
  { id: "txn_5", description: "Office Supplies", date: "2024-07-22", amount: -125.60, status: "Completed" },
];
export async function getAccounts(): Promise<Account[]> {
    await delay(1000);
    return accountsData;
}
export async function getRecentAccountTransactions(): Promise<AccountTransaction[]> {
    await delay(1200);
    return accountTransactionsData;
}

// Cards Page Data
export type CardData = { id: string; brand: 'visa' | 'mastercard'; number: string; holder: string; expiry: string; status: 'Active' | 'Inactive'; type: 'Physical' | 'Virtual'; };
export type CardTransaction = { id: string; description: string; date: string; amount: number; };

const cardsData: CardData[] = [
    { id: 'card-1', brand: 'visa', number: '**** **** **** 1234', holder: 'Olivia Martin', expiry: '08/28', status: 'Active', type: 'Physical' },
    { id: 'card-2', brand: 'mastercard', number: '**** **** **** 5678', holder: 'Olivia Martin', expiry: '11/26', status: 'Active', type: 'Virtual' },
    { id: 'card-3', brand: 'visa', number: '**** **** **** 9012', holder: 'Olivia Martin', expiry: '04/25', status: 'Inactive', type: 'Physical' },
];
const cardTransactionsData: CardTransaction[] = [
  { id: 'txn_c1', description: 'Amazon Purchase', date: '2024-07-25', amount: -78.50 },
  { id: 'txn_c2', description: 'Netflix Subscription', date: '2024-07-24', amount: -15.99 },
  { id: 'txn_c3', description: 'Starbucks', date: '2024-07-23', amount: -5.75 },
  { id: 'txn_c4', description: 'Gas Station', date: '2024-07-22', amount: -55.20 },
  { id: 'txn_c5', description: 'Apple Store', date: '2024-07-21', amount: -999.00 },
];
export async function getCards(): Promise<CardData[]> {
    await delay(1000);
    return cardsData;
}
export async function getCardTransactions(): Promise<CardTransaction[]> {
    await delay(1200);
    return cardTransactionsData;
}


// Payments Page Data
export type Payment = { id: string; recipient: string; date: string; amount: number; status: 'Upcoming' | 'Completed' | 'Failed'; };
const paymentsData: Payment[] = [
  { id: 'pay_1', recipient: 'Rent', date: '2024-08-01', amount: 2200.00, status: 'Upcoming' },
  { id: 'pay_2', recipient: 'AT&T', date: '2024-07-28', amount: 120.55, status: 'Upcoming' },
  { id: 'pay_3', recipient: 'Con Edison', date: '2024-07-22', amount: 85.70, status: 'Completed' },
  { id: 'pay_4', recipient: 'Amex Credit Card', date: '2024-07-20', amount: 540.23, status: 'Completed' },
  { id: 'pay_5', recipient: 'Spotify', date: '2024-07-15', amount: 10.99, status: 'Completed' },
  { id: 'pay_6', recipient: 'Insurance Premium', date: '2024-07-10', amount: 250.00, status: 'Failed' },
  { id: 'pay_7', recipient: 'Car Payment', date: '2024-07-05', amount: 450.00, status: 'Completed' },
];
export async function getPayments(): Promise<Payment[]> {
    await delay(1000);
    return paymentsData;
}


// Budgets Page Data
export type Budget = { id: string; name: string; spent: number; total: number; };
const budgetsData: Budget[] = [
    { id: 'bud_1', name: 'Groceries', spent: 450.75, total: 800 },
    { id: 'bud_2', name: 'Dining Out', spent: 210.50, total: 300 },
    { id: 'bud_3', name: 'Software', spent: 49.99, total: 50 },
    { id: 'bud_4', name: 'Travel', spent: 1200, total: 2500 },
    { id: 'bud_5', name: 'Shopping', spent: 175.20, total: 400 },
];
export async function getBudgets(): Promise<Budget[]> {
    await delay(1000);
    return budgetsData;
}

// Invoicing Page Data
export type Invoice = { id: string; customer: string; invoiceNumber: string; date: string; dueDate: string; amount: number; status: 'Paid' | 'Overdue' | 'Sent' | 'Draft'; };
const invoicesData: Invoice[] = [
  { id: 'inv_1', customer: 'Acme Inc.', invoiceNumber: 'INV-007', date: '2024-07-15', dueDate: '2024-08-14', amount: 12000.00, status: 'Paid' },
  { id: 'inv_2', customer: 'Stark Industries', invoiceNumber: 'INV-006', date: '2024-07-10', dueDate: '2024-07-25', amount: 7500.00, status: 'Overdue' },
  { id: 'inv_3', customer: 'Wayne Enterprises', invoiceNumber: 'INV-005', date: '2024-07-05', dueDate: '2024-08-04', amount: 2500.00, status: 'Sent' },
  { id: 'inv_4', customer: 'Cyberdyne Systems', invoiceNumber: 'INV-004', date: '2024-07-01', dueDate: '2024-07-31', amount: 5000.00, status: 'Draft' },
  { id: 'inv_5', customer: 'Ollivanders Wand Shop', invoiceNumber: 'INV-003', date: '2024-06-25', dueDate: '2024-07-25', amount: 350.00, status: 'Paid' },
];
export async function getInvoices(): Promise<Invoice[]> {
    await delay(1000);
    return invoicesData;
}

// Reports Page Data
export type ReportChartData = {
  incomeExpense: { month: string; income: number; expense: number }[];
  spending: { name: string; value: number }[];
  cashflow: { name: string; cashflow: number }[];
}
const reportChartData: ReportChartData = {
  incomeExpense: [ { month: 'Jan', income: 4000, expense: 2400 }, { month: 'Feb', income: 3000, expense: 1398 }, { month: 'Mar', income: 5000, expense: 3800 }, { month: 'Apr', income: 2780, expense: 1908 }, { month: 'May', income: 1890, expense: 1800 }, { month: 'Jun', income: 2390, expense: 1800 }, ],
  spending: [ { name: 'Rent', value: 2200 }, { name: 'Utilities', value: 300 }, { name: 'Groceries', value: 600 }, { name: 'Software', value: 150 }, { name: 'Travel', value: 450 }, { name: 'Other', value: 200 }, ],
  cashflow: [ { name: 'Jan', cashflow: 1600 }, { name: 'Feb', cashflow: 1602 }, { name: 'Mar', cashflow: 1200 }, { name: 'Apr', cashflow: 872 }, { name: 'May', cashflow: 90 }, { name: 'Jun', cashflow: 590 }, ]
};
export async function getReportChartData(): Promise<ReportChartData> {
  await delay(1000);
  return reportChartData;
}

// Trading Page Data
export type StockDataPoint = { name: string; price: number };
export type PortfolioItem = { symbol: string; name: string; shares: number; value: number; change: number };
export type WatchlistItem = { symbol: string; name: string; price: number; change: number };
export type MarketNewsItem = { id: number; source: string; title: string; time: string };

const stockData: StockDataPoint[] = [ { name: '9:00 AM', price: 150.75 }, { name: '10:00 AM', price: 152.30 }, { name: '11:00 AM', price: 151.90 }, { name: '12:00 PM', price: 153.50 }, { name: '1:00 PM', price: 152.80 }, { name: '2:00 PM', price: 154.20 }, { name: '3:00 PM', price: 153.90 }, { name: '4:00 PM', price: 155.10 }, ];
const portfolioData: PortfolioItem[] = [ { symbol: 'AAPL', name: 'Apple Inc.', shares: 10, value: 1551.00, change: 1.56 }, { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 5, value: 7250.00, change: -0.52 }, { symbol: 'TSLA', name: 'Tesla, Inc.', shares: 15, value: 10500.00, change: 3.12 }, ];
const watchlistData: WatchlistItem[] = [ { symbol: 'MSFT', name: 'Microsoft Corp.', price: 305.50, change: 0.89 }, { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 135.20, change: -1.10 }, { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 450.70, change: 2.50 }, ];
const marketNewsData: MarketNewsItem[] = [ { id: 1, source: "Bloomberg", title: "Tech Stocks Rally on Positive Inflation Data", time: "2h ago" }, { id: 2, source: "Reuters", title: "Federal Reserve Hints at Pausing Rate Hikes", time: "4h ago" }, { id: 3, source: "Wall Street Journal", title: "EV Market Sees Increased Competition", time: "5h ago" }, ];

export async function getTradingData() {
  await delay(1000);
  return {
    stockData,
    portfolio: portfolioData,
    watchlist: watchlistData,
    marketNews: marketNewsData
  }
}
