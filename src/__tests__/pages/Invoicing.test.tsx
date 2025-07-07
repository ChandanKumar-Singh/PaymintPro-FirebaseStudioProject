import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import InvoicingPage from '@/app/(main)/invoicing/page';
import { useAuth } from '@/components/auth-provider';
import * as data from '@/lib/data';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
  usePathname: () => '/invoicing',
  useSearchParams: () => new URLSearchParams(),
}));

jest.mock('@/components/auth-provider');
jest.mock('@/lib/data');

jest.mock('@/components/stat-card', () => ({
  StatCard: ({ title, value }: { title: string; value: string }) => (
    <div data-testid="stat-card">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  ),
}));
jest.mock('@/components/data-table', () => ({
  DataTable: ({ data }: { data: any[] }) => <div data-testid="data-table">{data.length} items</div>,
}));
jest.mock('@/components/empty-state', () => ({
  EmptyState: ({ title }: { title: string }) => <div data-testid="empty-state">{title}</div>,
}));
jest.mock('@/components/dialogs/confirm-dialog', () => ({
  ConfirmDialog: () => null,
}));
jest.mock('@/components/sheets/edit-invoice-sheet', () => ({
    EditInvoiceSheet: () => null,
}));
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: jest.fn() }),
}));


describe('InvoicingPage', () => {
  const mockUseAuth = useAuth as jest.Mock;
  const mockGetInvoices = data.getInvoices as jest.Mock;

  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      user: { uid: 'test-user' },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the main heading and stat cards', async () => {
    mockGetInvoices.mockResolvedValue([]); // No invoices needed for this test
    render(<InvoicingPage />);
    
    await waitFor(() => {
        expect(screen.getByRole('heading', { name: /Invoicing/i })).toBeInTheDocument();
        expect(screen.getAllByTestId('stat-card')).toHaveLength(3);
    });
  });

  it('renders the data table when invoices are available', async () => {
    const sampleInvoices = [
      { id: '1', customer: 'Acme Inc', amount: 1200, status: 'Paid', date: new Date().toISOString() },
      { id: '2', customer: 'Stark Industries', amount: 750, status: 'Overdue', date: new Date().toISOString() },
    ];
    mockGetInvoices.mockResolvedValue(sampleInvoices);

    render(<InvoicingPage />);

    await waitFor(() => {
        expect(screen.getByTestId('data-table')).toHaveTextContent('2 items');
        expect(screen.queryByTestId('empty-state')).not.toBeInTheDocument();
    });
  });

  it('renders the empty state when no invoices are available', async () => {
    mockGetInvoices.mockResolvedValue([]);
    render(<InvoicingPage />);

    await waitFor(() => {
        expect(screen.getByTestId('empty-state')).toHaveTextContent('No invoices created');
        expect(screen.queryByTestId('data-table')).not.toBeInTheDocument();
    });
  });

  it('displays correct stats based on invoice data', async () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 15);

    const sampleInvoices = [
      { id: '1', customer: 'Stark Industries', amount: 750.50, status: 'Overdue', date: new Date().toISOString(), dueDate: new Date().toISOString() },
      { id: '2', customer: 'Wayne Enterprises', amount: 1200, status: 'Overdue', date: new Date().toISOString(), dueDate: new Date().toISOString() },
      { id: '3', customer: 'Cyberdyne', amount: 500, status: 'Draft', date: new Date().toISOString(), dueDate: new Date().toISOString() },
      { id: '4', customer: 'Acme Inc', amount: 2000, status: 'Paid', date: thirtyDaysAgo.toISOString(), dueDate: new Date().toISOString() },
    ];
    mockGetInvoices.mockResolvedValue(sampleInvoices);

    render(<InvoicingPage />);
    
    await waitFor(() => {
        // Overdue total: 750.50 + 1200 = 1950.50
        expect(screen.getByText('$1,950.50')).toBeInTheDocument();
        // Draft total: 500
        expect(screen.getByText('$500.00')).toBeInTheDocument();
        // Paid (last 30d) total: 2000
        expect(screen.getByText('$2,000.00')).toBeInTheDocument();
    });
  });
});
