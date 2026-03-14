import { BalanceCard } from '../components/BalanceCard/BalanceCard';
import { TransactionRow } from '../components/TransactionRow/TransactionRow';
import { AccountSelector } from '../components/AccountSelector/AccountSelector';

export function BankingShowcase() {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', padding: '40px 48px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        {/* Header */}
        <h1 style={{ color: '#1a237e', fontSize: 24, fontWeight: 700, margin: '0 0 24px 0' }}>
          My Accounts
        </h1>

        {/* Account Selector */}
        <AccountSelector
          accounts={[
            { label: 'Checking', active: true },
            { label: 'Savings' },
            { label: 'Credit' },
          ]}
        />

        {/* Balance Card */}
        <div style={{ marginTop: 24 }}>
          <BalanceCard
            accountName="Checking Account"
            accountNumber="•••• 4821"
            balance="$12,847.50"
          />
        </div>

        {/* Quick Actions */}
        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          {['Send', 'Request', 'Pay Bills'].map((label) => (
            <div
              key={label}
              style={{
                flex: 1,
                textAlign: 'center' as const,
                padding: '14px 0',
                background: '#e3f2fd',
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 600,
                color: '#1a237e',
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Transactions */}
        <div style={{ marginTop: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ color: '#1a237e', fontSize: 18, fontWeight: 600, margin: 0 }}>
              Recent Transactions
            </h2>
            <span style={{ color: '#5c6bc0', fontSize: 13, fontWeight: 500 }}>View All</span>
          </div>
          <TransactionRow title="Coffee Shop" category="Food & Drink" amount="-$4.50" date="Today" type="debit" iconBg="#fce4ec" />
          <TransactionRow title="Salary Deposit" category="Income" amount="+$3,200.00" date="Mar 12" type="credit" iconBg="#e8f5e9" />
          <TransactionRow title="Electric Bill" category="Utilities" amount="-$89.00" date="Mar 11" type="debit" iconBg="#fff3e0" />
          <TransactionRow title="Transfer In" category="Savings" amount="+$500.00" date="Mar 10" type="credit" iconBg="#e3f2fd" />
        </div>
      </div>
    </div>
  );
}
