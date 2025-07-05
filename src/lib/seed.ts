'use client';
import { collection, writeBatch, doc } from "firebase/firestore";
import { db } from "./firebase";
import { type Transaction, type Account, type AccountTransaction, type CardData, type CardTransaction, type Payment, type Budget, type Invoice, type PortfolioItem, type WatchlistItem, type MarketNewsItem, type Ticket, type TicketMessage } from "./data";

// Sample Data
const transactionsData: Omit<Transaction, 'id'>[] = [
  { customer: "Liam Johnson", email: "liam@example.com", type: "Sale", status: "Success", date: "2023-06-23", amount: 250.00, category: 'Software', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'man avatar' },
  { customer: "Olivia Smith", email: "olivia@example.com", type: "Sale", status: "Success", date: "2023-07-12", amount: 150.00, category: 'Design', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'woman avatar' },
  { customer: "Noah Williams", email: "noah@example.com", type: "Subscription", status: "Success", date: "2023-06-25", amount: 350.00, category: 'SaaS' },
  { customer: "Emma Brown", email: "emma@example.com", type: "Sale", status: "Success", date: "2023-05-12", amount: 450.00, category: 'Consulting' },
  { customer: "James Jones", email: "james@example.com", type: "Sale", status: "Success", date: "2023-05-26", amount: 550.00, category: 'Hardware' },
  { customer: "Adobe", email: "contact@adobe.com", type: "Expense", status: "Success", date: "2023-06-01", amount: -54.99, category: 'Software' },
  { customer: "Figma", email: "support@figma.com", type: "Expense", status: "Success", date: "2023-06-15", amount: -15.00, category: 'Software' },
  { customer: "Staples", email: "orders@staples.com", type: "Expense", status: "Success", date: "2023-05-02", amount: -42.80, category: 'Office Supplies' },
  { customer: "Upwork", email: "payments@upwork.com", type: "Sale", status: "Success", date: "2023-04-22", amount: 1200.00, category: 'Consulting' },
  { customer: "Delta Airlines", email: "noreply@delta.com", type: "Expense", status: "Success", date: "2023-04-10", amount: -450.00, category: 'Travel' },
  { customer: "Isabella Nguyen", email: 'isabella.nguyen@email.com', type: "Sale", status: "Success", date: '2023-07-28', amount: 299.0, category: 'Software', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'woman avatar' },
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
    { name: 'Software', spent: 450.75, total: 1000 },
    { name: 'Marketing', spent: 210.50, total: 500 },
    { name: 'Travel', spent: 750.00, total: 1500 },
];
const invoicesData: Omit<Invoice, 'id'>[] = [
  { customer: 'Acme Inc.', invoiceNumber: 'INV-007', date: '2024-07-15', dueDate: '2024-08-14', amount: 12000.00, status: 'Paid' },
  { customer: 'Stark Industries', invoiceNumber: 'INV-006', date: '2024-07-10', dueDate: '2024-07-25', amount: 7500.00, status: 'Overdue' },
];
const portfolioData: Omit<PortfolioItem, 'id'>[] = [ { symbol: 'AAPL', name: 'Apple Inc.', shares: 10, value: 1551.00, change: 1.56 }, { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 5, value: 7250.00, change: -0.52 }, ];
const watchlistData: Omit<WatchlistItem, 'id'>[] = [ { symbol: 'MSFT', name: 'Microsoft Corp.', price: 305.50, change: 0.89 }, { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 135.20, change: -1.10 },];
const marketNewsData: Omit<MarketNewsItem, 'id'>[] = [ { source: "Bloomberg", title: "Tech Stocks Rally on Positive Inflation Data", time: "2h ago" }, { source: "Reuters", title: "Federal Reserve Hints at Pausing Rate Hikes", time: "4h ago" },];

type SeedTicket = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'status'> & { messages: Omit<TicketMessage, 'id' | 'createdAt'>[] };

const ticketsData: SeedTicket[] = [
    {
        subject: "Cannot access my latest invoice",
        department: "Billing",
        priority: "High",
        messages: [
            { content: "Hello, I'm trying to download my invoice for July but I keep getting an error. Can you help?", sender: "user" },
            { content: "Hi there! We're sorry to hear you're having trouble. Could you please provide the invoice number you are trying to access?", sender: "agent", agentName: "Jane" }
        ]
    },
    {
        subject: "Question about Pro plan features",
        department: "General Inquiry",
        priority: "Low",
        messages: [
            { content: "I was wondering if the AI Advisor feature is available on the Pro plan. Thanks!", sender: "user" },
        ]
    }
];

// Function to add a collection to a batch
const addCollectionToBatch = (batch: ReturnType<typeof writeBatch>, userId: string, collectionName: string, data: any[]) => {
    const userDocRef = doc(db, 'users', userId);
    data.forEach(item => {
        const docRef = doc(collection(userDocRef, collectionName));
        batch.set(docRef, item);
    });
};

const addTicketsToBatch = (batch: ReturnType<typeof writeBatch>, userId: string, tickets: SeedTicket[]) => {
    const userDocRef = doc(db, 'users', userId);
    tickets.forEach(ticket => {
        const now = new Date().toISOString();
        const ticketRef = doc(collection(userDocRef, 'tickets'));
        batch.set(ticketRef, {
            subject: ticket.subject,
            department: ticket.department,
            priority: ticket.priority,
            status: 'Open',
            createdAt: now,
            updatedAt: now,
        });

        ticket.messages.forEach(message => {
            const messageRef = doc(collection(ticketRef, 'messages'));
            batch.set(messageRef, {
                ...message,
                createdAt: now,
            });
        });
    });
};

export const seedDatabase = async (userId: string) => {
    const batch = writeBatch(db);

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
    
    // Add tickets with subcollections
    addTicketsToBatch(batch, userId, ticketsData);

    await batch.commit();
}