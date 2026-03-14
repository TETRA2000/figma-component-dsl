import { AccountCard } from '@/components/AccountCard/AccountCard';
import { TransactionRow } from '@/components/TransactionRow/TransactionRow';
import { QuickAction } from '@/components/QuickAction/QuickAction';

export function BankingAppShowcase() {
  return (
    <div style={{
      background: '#f8fafc',
      minHeight: '100vh',
      padding: '32px',
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
      maxWidth: '440px',
      margin: '0 auto',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#94a3b8', margin: 0 }}>
            Good morning,
          </p>
          <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: '24px', fontWeight: 700, color: '#1e293b', margin: '4px 0 0' }}>
            Sarah
          </h1>
        </div>
        <div style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        }} />
      </div>

      {/* Account Card */}
      <AccountCard
        type="Checking"
        accountNumber="**** 4829"
        balance="$12,450.80"
        currency="USD"
      />

      {/* Quick Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <QuickAction label="Send" iconColor="#3b82f6" />
        <QuickAction label="Request" iconColor="#10b981" />
        <QuickAction label="Pay" iconColor="#f59e0b" />
        <QuickAction label="More" iconColor="#6366f1" />
      </div>

      {/* Transactions */}
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid #e2e8f0',
      }}>
        <h2 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '16px',
          fontWeight: 600,
          color: '#1e293b',
          margin: '0 0 4px',
        }}>
          Recent Transactions
        </h2>
        <TransactionRow merchant="Apple Store" category="Shopping" amount="$129.00" date="Today" iconColor="#1e293b" />
        <TransactionRow merchant="Salary Deposit" category="Income" amount="$4,500.00" date="Mar 12" positive iconColor="#10b981" />
        <TransactionRow merchant="Uber" category="Transport" amount="$24.50" date="Mar 11" iconColor="#1e293b" />
        <TransactionRow merchant="Netflix" category="Entertainment" amount="$15.99" date="Mar 10" iconColor="#ef4444" />
      </div>
    </div>
  );
}
