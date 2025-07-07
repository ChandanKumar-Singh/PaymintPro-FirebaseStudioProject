import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EmptyState } from '@/components/empty-state';
import { Landmark } from 'lucide-react';
import { Button } from '@/components/ui/button';

describe('EmptyState', () => {
  it('renders the title, description, and icon', () => {
    render(
      <EmptyState
        icon={Landmark}
        title="No Accounts"
        description="There are no accounts to display."
      />
    );

    expect(screen.getByText('No Accounts')).toBeInTheDocument();
    expect(screen.getByText('There are no accounts to display.')).toBeInTheDocument();
    // The icon is rendered, we can check for its presence in a generic way
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  it('renders an action button when provided', () => {
    render(
      <EmptyState
        icon={Landmark}
        title="No Accounts"
        description="There are no accounts to display."
        actionButton={<Button>Add Account</Button>}
      />
    );

    const button = screen.getByRole('button', { name: 'Add Account' });
    expect(button).toBeInTheDocument();
  });

  it('does not render an action button when not provided', () => {
     render(
      <EmptyState
        icon={Landmark}
        title="No Accounts"
        description="There are no accounts to display."
      />
    );

    const button = screen.queryByRole('button');
    expect(button).not.toBeInTheDocument();
  });
});
