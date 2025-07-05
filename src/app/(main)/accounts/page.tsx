import { getAccounts, getRecentAccountTransactions } from '@/lib/data';
import { AccountsClient } from '@/components/accounts-client';

export default async function AccountsPage() {
  const accounts = await getAccounts();
  const transactions = await getRecentAccountTransactions();

  return (
    <AccountsClient initialAccounts={accounts} initialTransactions={transactions} />
  );
}
