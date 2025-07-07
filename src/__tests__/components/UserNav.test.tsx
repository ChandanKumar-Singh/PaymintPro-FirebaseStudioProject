import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserNav } from '@/components/user-nav';
import { useAuth } from '@/components/auth-provider';
import { useRouter } from 'next/navigation';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/components/auth-provider', () => ({
  useAuth: jest.fn(),
}));
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: jest.fn() }),
}));
jest.mock('@/lib/firebase', () => ({
  auth: { signOut: jest.fn() },
}));

describe('UserNav', () => {
  const mockUseAuth = useAuth as jest.Mock;
  const mockUseRouter = useRouter as jest.Mock;

  beforeEach(() => {
    mockUseRouter.mockReturnValue({ push: jest.fn() });
    mockUseAuth.mockReturnValue({
      user: {
        displayName: 'Olivia Martin',
        email: 'olivia.martin@example.com',
        photoURL: 'https://placehold.co/40x40.png',
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the user avatar', () => {
    render(<UserNav />);
    const avatar = screen.getByRole('button');
    expect(avatar).toBeInTheDocument();
    const avatarImage = screen.getByAltText('User avatar');
    expect(avatarImage).toHaveAttribute('src', 'https://placehold.co/40x40.png');
  });

  it('renders fallback initials if no photoURL is available', () => {
    mockUseAuth.mockReturnValue({
      user: {
        displayName: 'Olivia Martin',
        email: 'olivia.martin@example.com',
        photoURL: null,
      },
    });
    render(<UserNav />);
    expect(screen.getByText('OM')).toBeInTheDocument();
  });

  it('opens the dropdown menu on click', async () => {
    render(<UserNav />);
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    // Assert that the menu content is visible
    expect(await screen.findByText('olivia.martin@example.com')).toBeVisible();
    expect(screen.getByText('Profile')).toBeVisible();
    expect(screen.getByText('Billing')).toBeVisible();
    expect(screen.getByText('Settings')).toBeVisible();
    expect(screen.getByText('Log out')).toBeVisible();
  });

  it('shows the user\'s name and email in the dropdown', async () => {
    render(<UserNav />);
    fireEvent.click(screen.getByRole('button'));

    expect(await screen.findByText('Olivia Martin')).toBeVisible();
    expect(screen.getByText('olivia.martin@example.com')).toBeVisible();
  });
});
