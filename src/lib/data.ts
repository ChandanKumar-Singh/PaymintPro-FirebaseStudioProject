'use client';
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc, writeBatch, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns';

// Type definitions
export type Transaction = { id?: string; customer: string; email: string; type: "Sale" | "Refund" | "Subscription" | "Expense"; status: "Success" | "Processing" | "Declined"; date: string; amount: number; category: string; avatar?: string; dataAiHint?: string; };
export type Account = { id?: string; name: string; bank: string; accountNumber: string; balance: number; type: 'Checking' | 'Savings' | 'Investment'; };
export type AccountTransaction = { id?: string; description: string; date: string; amount: number; status: "Completed" | "Pending" | "Failed"; };
export type CardData = { id?: string; brand: 'visa' | 'mastercard'; number: string; holder: string; expiry: string; status: 'Active' | 'Inactive'; type: 'Physical' | 'Virtual'; };
export type CardTransaction = { id?: string; description:string; date: string; amount: number; };
export type Payment = { id?: string; recipient: string; date: string; amount: number; status: 'Upcoming' | 'Completed' | 'Failed'; };
export type Budget = { id?: string; name: string; spent: number; total: number; };
export type Invoice = { id?: string; customer: string; invoiceNumber: string; date: string; dueDate: string; amount: number; status: 'Paid' | 'Overdue' | 'Sent' | 'Draft'; };
export type StockDataPoint = { name: string; price: number };
export type PortfolioItem = { id?: string; symbol: string; name: string; shares: number; value: number; change: number };
export type WatchlistItem = { id?: string; symbol: string; name: string; price: number; change: number };
export type MarketNewsItem = { id?: string; source: string; title: string; time: string };
export type Ticket = { id?: string; subject: string; department: string; priority: 'Low' | 'Medium' | 'High'; status: 'Open' | 'In Progress' | 'Closed'; createdAt: string; updatedAt: string; };
export type TicketMessage = { id?: string; content: string; createdAt: string; sender: 'user' | 'agent'; agentName?: string; };


// Generic function to fetch a collection
async function getCollectionData<T>(userId: string, collectionName: string, subCollectionPath: string[] = []): Promise<T[]> {
    if (!userId) return [];
    let colRef;
    if(subCollectionPath.length > 0) {
        colRef = collection(db, 'users', userId, collectionName, ...subCollectionPath);
    } else {
        colRef = collection(db, 'users', userId, collectionName);
    }
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
}

// Generic function to fetch a single document
async function getDocument<T>(userId: string, collectionName: string, docId: string): Promise<T | null> {
    if (!userId || !docId) return null;
    const docRef = doc(db, 'users', userId, collectionName, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as T;
    } else {
        return null;
    }
}


// Specific data fetching functions
export const getDashboardStats = async (userId: string) => {
    if (!userId) return null;
    const transactions = await getCollectionData<Transaction>(userId, 'transactions');
    const lastMonth = subMonths(new Date(), 1);
    
    const currentMonthTxs = transactions.filter(tx => new Date(tx.date) >= startOfMonth(new Date()));
    const lastMonthTxs = transactions.filter(tx => new Date(tx.date) >= startOfMonth(lastMonth) && new Date(tx.date) <= endOfMonth(lastMonth));

    const totalRevenue = currentMonthTxs.filter(tx => tx.amount > 0).reduce((sum, tx) => sum + tx.amount, 0);
    const lastMonthRevenue = lastMonthTxs.filter(tx => tx.amount > 0).reduce((sum, tx) => sum + tx.amount, 0);

    const subscriptions = currentMonthTxs.filter(tx => tx.type === 'Subscription').length;
    const lastMonthSubscriptions = lastMonthTxs.filter(tx => tx.type === 'Subscription').length;
    
    const sales = currentMonthTxs.filter(tx => tx.type === 'Sale').length;
    const lastMonthSales = lastMonthTxs.filter(tx => tx.type === 'Sale').length;

    const calculateChange = (current: number, previous: number) => {
        if (previous === 0) return current > 0 ? 100 : 0;
        return ((current - previous) / previous) * 100;
    }

    const stats = {
        totalRevenue: { value: totalRevenue, change: calculateChange(totalRevenue, lastMonthRevenue) },
        subscriptions: { value: subscriptions, change: calculateChange(subscriptions, lastMonthSubscriptions) },
        sales: { value: sales, change: calculateChange(sales, lastMonthSales) },
        activeNow: { value: 573, change: 201 } // Simulated
    };

    const recentSales = transactions
        .filter(tx => tx.type === 'Sale')
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);
    
    return { stats, recentSales };
};

export const getOverviewData = async (userId: string) => {
    if (!userId) return [];
    const transactions = await getCollectionData<Transaction>(userId, 'transactions');
    const monthlyTotals: { [key: string]: number } = {};

    transactions.forEach(tx => {
        if(tx.amount > 0) { // Only count revenue
            const month = format(new Date(tx.date), 'MMM');
            monthlyTotals[month] = (monthlyTotals[month] || 0) + tx.amount;
        }
    });

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthNames.map(name => ({
        name,
        total: monthlyTotals[name] || 0,
    }));
}

export const getSpendingByCategory = async (userId: string) => {
    if(!userId) return [];
    const transactions = await getCollectionData<Transaction>(userId, 'transactions');
    const spending: { [key: string]: number } = {};
    transactions.forEach(tx => {
        if (tx.amount < 0) { // Only expenses
            spending[tx.category] = (spending[tx.category] || 0) + Math.abs(tx.amount);
        }
    });
    return Object.entries(spending).map(([name, value]) => ({ name, value }));
};

export const getIncomeExpenseData = async (userId: string) => {
    if (!userId) return [];
    const transactions = await getCollectionData<Transaction>(userId, 'transactions');
    const monthlyData: { [key: string]: { income: number, expense: number } } = {};

    transactions.forEach(tx => {
        const month = format(new Date(tx.date), 'MMM');
        if (!monthlyData[month]) {
            monthlyData[month] = { income: 0, expense: 0 };
        }
        if (tx.amount > 0) {
            monthlyData[month].income += tx.amount;
        } else {
            monthlyData[month].expense += Math.abs(tx.amount);
        }
    });
    
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthNames.map(name => ({
        month: name,
        income: monthlyData[name]?.income || 0,
        expense: monthlyData[name]?.expense || 0,
    }));
};

export const getCashflowData = async (userId: string) => {
    if (!userId) return [];
    const incomeExpense = await getIncomeExpenseData(userId);
    return incomeExpense.map(d => ({ name: d.month, cashflow: d.income - d.expense }));
}

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
};

// Support Ticket functions
export const getTickets = (userId: string) => getCollectionData<Ticket>(userId, 'tickets');
export const getTicketById = (userId: string, ticketId: string) => getDocument<Ticket>(userId, 'tickets', ticketId);
export const getTicketMessages = (userId: string, ticketId: string) => getCollectionData<TicketMessage>(userId, 'tickets', [ticketId, 'messages']);

export const addTicketAndFirstMessage = async (userId: string, ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'status'>, firstMessage: string) => {
    if (!userId) throw new Error("User not authenticated");
    
    const batch = writeBatch(db);
    const now = new Date().toISOString();

    // Create ticket document
    const ticketRef = doc(collection(db, 'users', userId, 'tickets'));
    const newTicket: Omit<Ticket, 'id'> = {
        ...ticketData,
        status: 'Open',
        createdAt: now,
        updatedAt: now,
    };
    batch.set(ticketRef, newTicket);

    // Create first message in subcollection
    const messageRef = doc(collection(ticketRef, 'messages'));
    const newMessage: Omit<TicketMessage, 'id'> = {
        content: firstMessage,
        createdAt: now,
        sender: 'user',
    };
    batch.set(messageRef, newMessage);

    await batch.commit();
    return ticketRef.id;
}

export const addMessageToTicket = async (userId: string, ticketId: string, messageData: Omit<TicketMessage, 'id'>) => {
    if (!userId) throw new Error("User not authenticated");

    const batch = writeBatch(db);
    const now = new Date().toISOString();

    // Add new message to subcollection
    const ticketRef = doc(db, 'users', userId, 'tickets', ticketId);
    const messageRef = doc(collection(ticketRef, 'messages'));
    batch.set(messageRef, { ...messageData, createdAt: now });

    // Update ticket's 'updatedAt' timestamp
    batch.update(ticketRef, { updatedAt: now });

    await batch.commit();
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