import styles from './JapaneseSaaSLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>TaskFlow</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>機能</a>
          <a href="#" className={styles.navLink}>料金</a>
          <a href="#" className={styles.navLink}>導入事例</a>
          <a href="#" className={styles.navLink}>サポート</a>
        </div>
        <div className={styles.navActions}>
          <button className={styles.loginBtn}>ログイン</button>
          <button className={styles.trialBtn}>無料で始める</button>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <span className={styles.heroBadge}>🎉 シリーズA 10億円調達</span>
        <h1 className={styles.heroTitle}>
          チームの生産性を<br />
          <span className={styles.heroGradient}>10倍にする</span>
        </h1>
        <p className={styles.heroSubtitle}>
          AIが自動でタスクを整理・優先順位付け。<br />
          面倒な進捗管理から解放されます。
        </p>
        <div className={styles.heroActions}>
          <button className={styles.primaryBtn}>無料トライアル</button>
          <button className={styles.demoBtn}>デモを見る</button>
        </div>
        <div className={styles.heroStats}>
          <span className={styles.heroStat}><strong>5,000+</strong> 導入企業</span>
          <span className={styles.heroStat}><strong>99.9%</strong> 稼働率</span>
          <span className={styles.heroStat}><strong>4.8</strong> App Store評価</span>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureIconWrapper}>
        <span className={styles.featureIcon}>{icon}</span>
      </div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDesc}>{description}</p>
    </div>
  );
}

function FeaturesSection() {
  return (
    <section className={styles.features}>
      <h2 className={styles.sectionTitle}>主な機能</h2>
      <p className={styles.sectionSubtitle}>シンプルなのに高機能。必要な機能がすべて揃っています。</p>
      <div className={styles.featureGrid}>
        <FeatureCard icon="🤖" title="AI自動整理" description="タスクを自動的にカテゴリ分け・優先順位付け。手動で整理する手間がなくなります。" />
        <FeatureCard icon="📊" title="リアルタイム分析" description="チームの生産性をダッシュボードで可視化。ボトルネックを即座に発見。" />
        <FeatureCard icon="🔗" title="外部連携" description="Slack, Teams, GitHub, Jiraなど100以上のツールと簡単に連携。" />
        <FeatureCard icon="🔒" title="エンタープライズセキュリティ" description="SOC2 Type II準拠、SSO対応、監査ログ完備。安心のセキュリティ。" />
        <FeatureCard icon="📱" title="マルチデバイス" description="PC、タブレット、スマートフォン。いつでもどこでもアクセス可能。" />
        <FeatureCard icon="⚡" title="高速パフォーマンス" description="大量のタスクでもサクサク動作。ストレスのない操作感を実現。" />
      </div>
    </section>
  );
}

function PricingCard({ name, price, period, features, highlighted }: {
  name: string; price: string; period: string; features: string[]; highlighted?: boolean;
}) {
  return (
    <div className={`${styles.pricingCard} ${highlighted ? styles.highlighted : ''}`}>
      {highlighted && <span className={styles.pricingBadge}>人気No.1</span>}
      <h3 className={styles.pricingName}>{name}</h3>
      <div className={styles.pricingPrice}>
        <span className={styles.pricingAmount}>{price}</span>
        <span className={styles.pricingPeriod}>{period}</span>
      </div>
      <div className={styles.pricingFeatures}>
        {features.map((f, i) => (
          <div key={i} className={styles.pricingFeature}>✓ {f}</div>
        ))}
      </div>
      <button className={highlighted ? styles.pricingBtnPrimary : styles.pricingBtnSecondary}>
        {highlighted ? '今すぐ始める' : '詳しく見る'}
      </button>
    </div>
  );
}

function PricingSection() {
  return (
    <section className={styles.pricing}>
      <h2 className={styles.sectionTitle}>料金プラン</h2>
      <p className={styles.sectionSubtitle}>14日間の無料トライアル付き。クレジットカード不要。</p>
      <div className={styles.pricingGrid}>
        <PricingCard name="スターター" price="¥980" period="/ユーザー/月" features={['5プロジェクト', '基本的なタスク管理', 'メール通知', 'モバイルアプリ']} />
        <PricingCard name="プロ" price="¥2,980" period="/ユーザー/月" features={['無制限プロジェクト', 'AI自動整理', 'ダッシュボード分析', '外部ツール連携', '優先サポート']} highlighted />
        <PricingCard name="エンタープライズ" price="要相談" period="" features={['プロの全機能', 'SSO/SAML対応', '専任サポート', 'カスタム連携', 'SLA保証']} />
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.cta}>
      <h2 className={styles.ctaTitle}>今すぐ始めましょう</h2>
      <p className={styles.ctaSubtitle}>14日間無料。いつでもキャンセル可能。</p>
      <button className={styles.ctaBtn}>無料トライアルを開始</button>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <span className={styles.footerLogo}>TaskFlow</span>
          <p className={styles.footerTagline}>チームの生産性を10倍にする</p>
        </div>
        <div className={styles.footerLinks}>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>製品</h4>
            <a href="#" className={styles.footerLink}>機能一覧</a>
            <a href="#" className={styles.footerLink}>料金プラン</a>
            <a href="#" className={styles.footerLink}>セキュリティ</a>
          </div>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>リソース</h4>
            <a href="#" className={styles.footerLink}>ヘルプセンター</a>
            <a href="#" className={styles.footerLink}>API ドキュメント</a>
            <a href="#" className={styles.footerLink}>ブログ</a>
          </div>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>会社情報</h4>
            <a href="#" className={styles.footerLink}>チーム紹介</a>
            <a href="#" className={styles.footerLink}>採用情報</a>
            <a href="#" className={styles.footerLink}>プライバシーポリシー</a>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>© 2026 TaskFlow Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseSaaSLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}
