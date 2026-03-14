import styles from './JapaneseAccountingLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>青葉会計事務所</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>サービス</a>
          <a href="#" className={styles.navLink}>実績</a>
          <a href="#" className={styles.navLink}>会社概要</a>
          <a href="#" className={styles.navLink}>お知らせ</a>
        </div>
        <button className={styles.contactBtn}>無料相談</button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <span className={styles.heroBadge}>創業30年の実績</span>
        <h1 className={styles.heroTitle}>経営を数字で支える</h1>
        <p className={styles.heroSubtitle}>
          税務・会計のプロフェッショナルとして、<br />
          お客様の事業成長を財務面からサポートいたします。
        </p>
        <div className={styles.heroActions}>
          <button className={styles.primaryBtn}>無料相談を予約</button>
          <button className={styles.secondaryBtn}>サービス詳細</button>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className={styles.serviceCard}>
      <div className={styles.serviceIconWrapper}>
        <span className={styles.serviceIcon}>{icon}</span>
      </div>
      <h3 className={styles.serviceTitle}>{title}</h3>
      <p className={styles.serviceDesc}>{description}</p>
    </div>
  );
}

function ServicesSection() {
  return (
    <section className={styles.services}>
      <h2 className={styles.sectionTitle}>サービス内容</h2>
      <p className={styles.sectionSubtitle}>幅広い専門サービスで経営課題を解決します</p>
      <div className={styles.serviceGrid}>
        <ServiceCard icon="📋" title="税務申告・税務相談" description="法人税・消費税・所得税の申告代行。節税対策から税務調査対応までトータルサポート。" />
        <ServiceCard icon="🔍" title="会計監査" description="法定監査から任意監査まで。財務諸表の信頼性を確保し、ステークホルダーの信頼を獲得。" />
        <ServiceCard icon="📈" title="経営コンサルティング" description="事業計画策定、M&Aアドバイザリー、事業承継支援。経営の意思決定をサポート。" />
        <ServiceCard icon="💰" title="記帳代行・経理代行" description="日常の経理業務をアウトソーシング。コア業務に集中できる環境を実現。" />
        <ServiceCard icon="🏢" title="会社設立支援" description="法人設立から届出まで。スムーズな事業開始をワンストップでサポート。" />
        <ServiceCard icon="🌐" title="国際税務" description="海外進出・外国法人の日本進出における税務戦略を専門チームが支援。" />
      </div>
    </section>
  );
}

function CaseStudyCard({ industry, title, result }: { industry: string; title: string; result: string }) {
  return (
    <div className={styles.caseCard}>
      <span className={styles.caseBadge}>{industry}</span>
      <h3 className={styles.caseTitle}>{title}</h3>
      <p className={styles.caseResult}>{result}</p>
    </div>
  );
}

function CaseStudiesSection() {
  return (
    <section className={styles.caseStudies}>
      <h2 className={styles.sectionTitle}>導入事例</h2>
      <p className={styles.sectionSubtitle}>お客様の成功事例をご紹介します</p>
      <div className={styles.caseGrid}>
        <CaseStudyCard industry="製造業" title="税務最適化で年間500万円のコスト削減" result="適切な税制優遇措置の活用と経費見直しにより、大幅なコスト削減を実現しました。" />
        <CaseStudyCard industry="IT企業" title="IPO準備の会計体制構築をサポート" result="上場に必要な内部統制の整備から監査法人との連携まで、2年間のIPO準備を伴走しました。" />
        <CaseStudyCard industry="飲食チェーン" title="多店舗展開における経理業務の効率化" result="クラウド会計の導入と業務フロー改善により、経理工数を40%削減しました。" />
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className={styles.stats}>
      <div className={styles.statsGrid}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>30</span>
          <span className={styles.statUnit}>年</span>
          <span className={styles.statLabel}>業界経験</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>1,200</span>
          <span className={styles.statUnit}>社+</span>
          <span className={styles.statLabel}>顧問先企業</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>50</span>
          <span className={styles.statUnit}>名</span>
          <span className={styles.statLabel}>専門スタッフ</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>98</span>
          <span className={styles.statUnit}>%</span>
          <span className={styles.statLabel}>顧客満足度</span>
        </div>
      </div>
    </section>
  );
}

function ConsultationCTA() {
  return (
    <section className={styles.consultation}>
      <h2 className={styles.consultTitle}>まずは無料相談から</h2>
      <p className={styles.consultSubtitle}>
        経営のお悩み、税務のご相談、何でもお気軽にお問い合わせください。<br />
        初回相談は無料です。
      </p>
      <div className={styles.consultActions}>
        <button className={styles.consultPrimaryBtn}>無料相談を予約する</button>
        <button className={styles.consultPhoneBtn}>📞 03-5678-9012</button>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <span className={styles.footerLogo}>青葉会計事務所</span>
          <p className={styles.footerTagline}>経営を数字で支える</p>
          <p className={styles.footerAddress}>〒100-0005 東京都千代田区丸の内1-1-1</p>
        </div>
        <div className={styles.footerLinks}>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>サービス</h4>
            <a href="#" className={styles.footerLink}>税務申告</a>
            <a href="#" className={styles.footerLink}>会計監査</a>
            <a href="#" className={styles.footerLink}>経営コンサルティング</a>
          </div>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>企業情報</h4>
            <a href="#" className={styles.footerLink}>代表挨拶</a>
            <a href="#" className={styles.footerLink}>スタッフ紹介</a>
            <a href="#" className={styles.footerLink}>採用情報</a>
          </div>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>お問い合わせ</h4>
            <a href="#" className={styles.footerLink}>無料相談予約</a>
            <a href="#" className={styles.footerLink}>アクセス</a>
            <a href="#" className={styles.footerLink}>プライバシーポリシー</a>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>© 2026 青葉会計事務所 All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseAccountingLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <ServicesSection />
      <CaseStudiesSection />
      <StatsSection />
      <ConsultationCTA />
      <FooterSection />
    </div>
  );
}
