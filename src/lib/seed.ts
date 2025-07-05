'use client';
import { collection, writeBatch, doc } from "firebase/firestore";
import { db } from "./firebase";
import { type Sale, type Transaction, type Account, type AccountTransaction, type CardData, type CardTransaction, type Payment, type Budget, type Invoice, type PortfolioItem, type WatchlistItem, type MarketNewsItem } from "./data";

// Sample Data
const salesData: Omit<Sale, 'id'>[] = [
  { name: 'Olivia Martin', email: 'olivia.martin@email.com', amount: 1999.0, avatar: 'https://placehold.co/40x40.png', dataAiHint: 'woman avatar' },
  { name: 'Jackson Lee', email: 'jackson.lee@email.com', amount: 39.0, avatar: 'https://placehold.co/40x40.png', dataAiHint: 'man avatar' },
  { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', amount: 299.0, avatar: 'https://placehold.co/40x40.png', dataAiHint: 'woman avatar' },
  { name: 'William Kim', email: 'will@email.com', amount: 99.0, avatar: 'https://placehold.co/40x40.png', dataAiHint: 'man avatar' },
  { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: 39.0, avatar: 'https://placehold.co/40x40.png', dataAiHint: 'woman avatar' },
];
const transactionsData: Omit<Transaction, 'id'>[] = [
  { customer: "Liam Johnson", email: "liam@example.com", type: "Sale", status: "Success", date: "2023-06-23", amount: 250.00 },
  { customer: "Olivia Smith", email: "olivia@example.com", type: "Refund", status: "Declined", date: "2023-06-24", amount: 150.00, },
  { customer: "Noah Williams", email: "noah@example.com", type: "Subscription", status: "Success", date: "2023-06-25", amount: 350.00, },
  { customer: "Emma Brown", email: "emma@example.com", type: "Sale", status: "Processing", date: "2023-06-25", amount: 450.00, },
  { customer: "James Jones", email: "james@example.com", type: "Sale", status: "Success", date: "2023-06-26", amount: 550.00, },
];
const accountsData: Omit<Account, 'id'>[] = [
  { name: "Primary Checking", bank: "Capital One", accountNumber: "**** **** **** 1234", balance: 10530.00, type: 'Checking' },
  { name: "Business Savings", bank: "Chase", accountNumber: "**** **** **** 5678", balance: 75250.50, type: 'Savings' },
  { name: "Investment Account", bank: "Fidelity", accountNumber: "**** **** **** 9012", balance: 120800.75, type: 'Investment' },
];
const accountTransactionsData: Omit<AccountTransaction, 'id'>[] = [
  { description: "Stripe Payout", date: "2024-07-25", amount: 5250.00, status: "Completed" },
  { description: "Google Ads", date: "2024-07-24", amount: -350.00, status: "Completed" },
  { description: "Client Payment - Acme Inc.", date: "2024-07-23", amount: 12000.00, status: "Completed" },
];
const cardsData: Omit<CardData, 'id'>[] = [
    { brand: 'visa', number: '**** **** **** 1234', holder: 'Olivia Martin', expiry: '08/28', status: 'Active', type: 'Physical' },
    { brand: 'mastercard', number: '**** **** **** 5678', holder: 'Olivia Martin', expiry: '11/26', status: 'Active', type: 'Virtual' },
];
const cardTransactionsData: Omit<CardTransaction, 'id'>[] = [
  { description: 'Amazon Purchase', date: '2024-07-25', amount: -78.50 },
  { description: 'Netflix Subscription', date: '2024-07-24', amount: -15.99 },
];
const paymentsData: Omit<Payment, 'id'>[] = [
  { recipient: 'Rent', date: '2024-08-01', amount: 2200.00, status: 'Upcoming' },
  { recipient: 'AT&T', date: '2024-07-28', amount: 120.55, status: 'Upcoming' },
  { recipient: 'Con Edison', date: '2024-07-22', amount: 85.70, status: 'Completed' },
];
const budgetsData: Omit<Budget, 'id'>[] = [
    { name: 'Groceries', spent: 450.75, total: 800 },
    { name: 'Dining Out', spent: 210.50, total: 300 },
];
const invoicesData: Omit<Invoice, 'id'>[] = [
  { customer: 'Acme Inc.', invoiceNumber: 'INV-007', date: '2024-07-15', dueDate: '2024-08-14', amount: 12000.00, status: 'Paid' },
  { customer: 'Stark Industries', invoiceNumber: 'INV-006', date: '2024-07-10', dueDate: '2024-07-25', amount: 7500.00, status: 'Overdue' },
];
const portfolioData: Omit<PortfolioItem, 'id'>[] = [ { symbol: 'AAPL', name: 'Apple Inc.', shares: 10, value: 1551.00, change: 1.56 }, { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 5, value: 7250.00, change: -0.52 }, ];
const watchlistData: Omit<WatchlistItem, 'id'>[] = [ { symbol: 'MSFT', name: 'Microsoft Corp.', price: 305.50, change: 0.89 }, { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 135.20, change: -1.10 },];
const marketNewsData: Omit<MarketNewsItem, 'id'>[] = [ { source: "Bloomberg", title: "Tech Stocks Rally on Positive Inflation Data", time: "2h ago" }, { source: "Reuters", title: "Federal Reserve Hints at Pausing Rate Hikes", time: "4h ago" },];

// Function to add a collection to a batch
const addCollectionToBatch = (batch: ReturnType<typeof writeBatch>, userId: string, collectionName: string, data: any[]) => {
    const userDocRef = doc(db, 'users', userId);
    data.forEach(item => {
        const docRef = doc(collection(userDocRef, collectionName));
        batch.set(docRef, item);
    });
};

export const seedDatabase = async (userId: string) => {
    const batch = writeBatch(db);

    addCollectionToBatch(batch, userId, 'sales', salesData);
    addCollectionToBatch(batch, userId, 'transactions', transactionsData);
    addCollectionToBatch(batch, userId, 'accounts', accountsData);
    addCollectionToBatch(batch, userId, 'accountTransactions', accountTransactionsData);
    addCollectionToBatch(batch, userId, 'cards', cardsData);
    addCollectionToBatch(batch, userId, 'cardTransactions', cardTransactionsData);
    addCollectionToBatch(batch, userId, 'payments', paymentsData);
    addCollectionToBatch(batch, userId, 'budgets', budgetsData);
    addCollectionToBatch(batch, userId, 'invoices', invoicesData);
    addCollectionToBatch(batch, userId, 'portfolio', portfolioData);
    addCollectionToBatch(batch, userId, 'watchlist', watchlistData);
    addCollectionToBatch(batch, userId, 'marketNews', marketNewsData);

    await batch.commit();
}
