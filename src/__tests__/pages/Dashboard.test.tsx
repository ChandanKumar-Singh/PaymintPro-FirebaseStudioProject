import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardPage from '@/app/(main)/dashboard/page';

// Mock child components to isolate the test to the DashboardPage
jest.mock('@/components/stat-card', () => ({
  StatCard: ({ title }: { title: string }) => <div data-testid="stat-card">{title}</div>,
}));
jest.mock('@/components/transaction-chart', () => ({
  TransactionChart: () => <div data-testid="transaction-chart">Transaction Chart</div>,
}));
jest.mock('@/components/recent-transactions', () => ({
  RecentTransactions: () => <div data-testid="recent-transactions">Recent Transactions</div>,
}));
jest.mock('@/components/my-cards', () => ({
  MyCards: () => <div data-testid="my-cards">My Cards</div>,
}));
jest.mock('@/components/quick-transfer', () => ({
  QuickInvoice: () => <div data-testid="quick-invoice">Quick Invoice</div>,
}));
jest.mock('@/components/date-range-picker', () => ({
  DateRangePicker: () => <button>Date Range</button>
}));


describe('DashboardPage', () => {
  beforeAll(() => {
    // Mock for matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('renders the main dashboard heading', () => {
    render(<DashboardPage />);
    expect(screen.getByRole('heading', { name: /Welcome back, Olivia!/i })).toBeInTheDocument();
  });

  it('renders all the main sections of the dashboard', () => {
    render(<DashboardPage />);
    
    // Check for all 4 stat cards
    expect(screen.getAllByTestId('stat-card')).toHaveLength(4);
    expect(screen.getByText('Total Revenue')).toBeInTheDocument();

    // Check for main components
    expect(screen.getByTestId('transaction-chart')).toBeInTheDocument();
    expect(screen.getByTestId('recent-transactions')).toBeInTheDocument();
    expect(screen.getByTestId('my-cards')).toBeInTheDocument();
    expect(screen.getByTestId('quick-invoice')).toBeInTheDocument();
  });
});
