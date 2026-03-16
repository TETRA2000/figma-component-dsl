import { BalanceCard } from '../../components/_generated/BalanceCard/BalanceCard';
import { TransactionRow } from '../../components/_generated/TransactionRow/TransactionRow';
import { AccountSelector } from '../../components/_generated/AccountSelector/AccountSelector';

export function BankingAppShowcase() {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ background: '#1a237e', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#ffffff', fontSize: 20, fontWeight: 700, margin: 0 }}>SecureBank</h1>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ width: 36, height: 36, borderRadius: 18, background: '#e3f2fd' }} />
          <span style={{ color: '#ffffff', fontSize: 14, fontWeight: 500 }}>John D.</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 32, padding: 32 }}>
        {/* Left sidebar - accounts */}
        <div style={{ width: 260, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#90a4ae', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Accounts</span>
          <AccountSelector name="Main Account" type="Checking" active />
          <AccountSelector name="Savings" type="Savings Account" active={false} />
          <AccountSelector name="Business" type="Business Account" active={false} />
        </div>

        {/* Main content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Balance card */}
          <BalanceCard />

          {/* Transactions */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1a237e', margin: 0 }}>Recent Transactions</h2>
              <span style={{ fontSize: 13, fontWeight: 500, color: '#90a4ae' }}>View all</span>
            </div>
            <TransactionRow title="Apple Store" category="Shopping" amount="-$129.00" date="Mar 15" />
            <TransactionRow title="Salary Deposit" category="Income" amount="+$4,500.00" positive date="Mar 14" />
            <TransactionRow title="Netflix" category="Subscription" amount="-$15.99" date="Mar 13" />
            <TransactionRow title="Grocery Store" category="Food" amount="-$67.42" date="Mar 12" />
            <TransactionRow title="Freelance Payment" category="Income" amount="+$850.00" positive date="Mar 11" />
          </div>
        </div>
      </div>
    </div>
  );
}
