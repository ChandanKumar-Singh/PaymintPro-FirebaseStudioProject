import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StatCard } from '@/components/stat-card';
import { DollarSign } from 'lucide-react';

describe('StatCard', () => {
  it('renders the stat card with correct title, value, and change', () => {
    render(
      <StatCard
        title="Total Revenue"
        value="$45,231.89"
        change="+20.1% from last month"
        icon={DollarSign}
      />
    );

    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('$45,231.89')).toBeInTheDocument();
    expect(screen.getByText('+20.1% from last month')).toBeInTheDocument();
  });
});
