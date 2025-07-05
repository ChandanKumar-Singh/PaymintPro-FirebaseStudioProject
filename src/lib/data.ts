'use client';
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc, writeBatch } from "firebase/firestore";
import { db } from "./firebase";

// This file now contains functions to interact with Firestore.
// Each function requires a userId to ensure data is user-specific.

// Type definitions remain the same
export type Sale = { id?: string; name: string; email: string; amount: number; avatar: string; dataAiHint: string; };
export type Transaction = { id?: string; customer: string; email: string; type: "Sale" | "Refund" | "Subscription"; status: "Success" | "Processing" | "Declined"; date: string; amount: number; };
export type Account = { id?: string; name: string; bank: string; accountNumber: string; balance: number; type: 'Checking' | 'Savings' | 'Investment'; };
export type AccountTransaction = { id?: string; description: string; date: string; amount: number; status: "Completed" | "Pending" | "Failed"; };
export type CardData = { id?: string; brand: 'visa' | 'mastercard'; number: string; holder: string; expiry: string; status: 'Active' | 'Inactive'; type: 'Physical' | 'Virtual'; };
export type CardTransaction = { id?: string; description: string; date: string; amount: number; };
export type Payment = { id?: string; recipient: string; date: string; amount: number; status: 'Upcoming' | 'Completed' | 'Failed'; };
export type Budget = { id?: string; name: string; spent: number; total: number; };
export type Invoice = { id?: string; customer: string; invoiceNumber: string; date: string; dueDate: string; amount: number; status: 'Paid' | 'Overdue' | 'Sent' | 'Draft'; };
export type StockDataPoint = { name: string; price: number };
export type PortfolioItem = { id?: string; symbol: string; name: string; shares: number; value: number; change: number };
export type WatchlistItem = { id?: string; symbol: string; name: string; price: number; change: number };
export type MarketNewsItem = { id?: string; source: string; title: string; time: string };

// Generic function to fetch a collection
async function getCollectionData<T>(userId: string, collectionName: string): Promise<T[]> {
    if (!userId) return [];
    const colRef = collection(db, 'users', userId, collectionName);
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
}

// Specific data fetching functions
export const getDashboardStats = async (userId: string) => {
    if (!userId) return null;
    const transactions = await getCollectionData<Transaction>(userId, 'transactions');
    const totalRevenue = transactions.reduce((sum, tx) => sum + tx.amount, 0);
    const salesCount = transactions.filter(tx => tx.type === 'Sale').length;
    return {
        totalRevenue: { value: totalRevenue, change: 20.1 },
        subscriptions: { value: 2350, change: 180.1 },
        sales: { value: salesCount, change: 19 },
        activeNow: { value: 573, change: 201 }
    };
};
export const getRecentSales = (userId: string) => getCollectionData<Sale>(userId, 'sales');
export const getTransactions = (userId: string) => getCollectionData<Transaction>(userId, 'transactions');
export const getAccounts = (userId: string) => getCollectionData<Account>(userId, 'accounts');
export const getRecentAccountTransactions = (userId: string) => getCollectionData<AccountTransaction>(userId, 'accountTransactions');
export const getCards = (userId: string) => getCollectionData<CardData>(userId, 'cards');
export const getCardTransactions = (userId: string) => getCollectionData<CardTransaction>(userId, 'cardTransactions');
export const getPayments = (userId: string) => getCollectionData<Payment>(userId, 'payments');
export const getBudgets = (userId: string) => getCollectionData<Budget>(userId, 'budgets');
export const getInvoices = (userId: string) => getCollectionData<Invoice>(userId, 'invoices');
export const getTradingData = async (userId: string) => {
    const [portfolio, watchlist, marketNews] = await Promise.all([
        getCollectionData<PortfolioItem>(userId, 'portfolio'),
        getCollectionData<WatchlistItem>(userId, 'watchlist'),
        getCollectionData<MarketNewsItem>(userId, 'marketNews'),
    ]);
    return {
        stockData: [ { name: '9:00 AM', price: 150.75 }, { name: '10:00 AM', price: 152.30 }, { name: '11:00 AM', price: 151.90 }, { name: '12:00 PM', price: 153.50 }, { name: '1:00 PM', price: 152.80 }, { name: '2:00 PM', price: 154.20 }, { name: '3:00 PM', price: 153.90 }, { name: '4:00 PM', price: 155.10 }, ],
        portfolio,
        watchlist,
        marketNews,
    }
}


// Generic CRUD operations
export const addDocument = async <T>(userId: string, collectionName: string, data: T) => {
    if (!userId) throw new Error("User not authenticated");
    const colRef = collection(db, 'users', userId, collectionName);
    return await addDoc(colRef, data as any);
};

export const updateDocument = async <T>(userId: string, collectionName: string, docId: string, data: Partial<T>) => {
    if (!userId) throw new Error("User not authenticated");
    const docRef = doc(db, 'users', userId, collectionName, docId);
    return await updateDoc(docRef, data as any);
};

export const deleteDocument = async (userId: string, collectionName: string, docId: string) => {
    if (!userId) throw new Error("User not authenticated");
    const docRef = doc(db, 'users', userId, collectionName, docId);
    return await deleteDoc(docRef);
};
