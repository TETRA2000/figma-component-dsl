import styles from './JapaneseTravelLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>旅路 TABIJI</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>国内ツアー</a>
          <a href="#" className={styles.navLink}>海外ツアー</a>
          <a href="#" className={styles.navLink}>温泉特集</a>
          <a href="#" className={styles.navLink}>お客様の声</a>
        </div>
        <button className={styles.navCta}>無料相談</button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          心に残る旅を、<br />
          <span className={styles.heroAccent}>あなたと共に</span>
        </h1>
        <p className={styles.heroSubtitle}>
          創業50年の実績と専門スタッフが、<br />
          忘れられない旅の体験をプロデュースします
        </p>
        <div className={styles.heroSearch}>
          <div className={styles.searchField}>
            <span className={styles.searchLabel}>目的地</span>
            <span className={styles.searchValue}>北海道</span>
          </div>
          <div className={styles.searchField}>
            <span className={styles.searchLabel}>日程</span>
            <span className={styles.searchValue}>2泊3日</span>
          </div>
          <div className={styles.searchField}>
            <span className={styles.searchLabel}>人数</span>
            <span className={styles.searchValue}>2名</span>
          </div>
          <button className={styles.searchBtn}>ツアー検索</button>
        </div>
      </div>
    </section>
  );
}

function DestinationCard({ name, region, price, tag }: { name: string; region: string; price: string; tag?: string }) {
  return (
    <div className={styles.destCard}>
      <div className={styles.destImg}>
        {tag && <span className={styles.destTag}>{tag}</span>}
      </div>
      <div className={styles.destInfo}>
        <span className={styles.destRegion}>{region}</span>
        <h3 className={styles.destName}>{name}</h3>
        <span className={styles.destPrice}>{price}〜</span>
      </div>
    </div>
  );
}

function DestinationsSection() {
  return (
    <section className={styles.destinations}>
      <h2 className={styles.sectionTitle}>人気の旅先</h2>
      <p className={styles.sectionSubtitle}>今シーズンおすすめの旅行プラン</p>
      <div className={styles.destGrid}>
        <DestinationCard name="富良野ラベンダー畑ツアー" region="北海道" price="¥49,800" tag="人気No.1" />
        <DestinationCard name="京都紅葉めぐり" region="京都" price="¥35,000" />
        <DestinationCard name="沖縄リゾートステイ" region="沖縄" price="¥59,800" tag="NEW" />
        <DestinationCard name="箱根温泉の旅" region="神奈川" price="¥28,000" />
      </div>
    </section>
  );
}

function FeatureItem({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className={styles.featureItem}>
      <div className={styles.featureNumber}>{number}</div>
      <div className={styles.featureText}>
        <h3 className={styles.featureTitle}>{title}</h3>
        <p className={styles.featureDesc}>{description}</p>
      </div>
    </div>
  );
}

function FeaturesSection() {
  return (
    <section className={styles.features}>
      <h2 className={styles.sectionTitle}>選ばれる理由</h2>
      <div className={styles.featureList}>
        <FeatureItem number="01" title="オーダーメイドの旅行プラン" description="お客様のご要望に合わせて、専任のトラベルコンシェルジュが最適なプランをご提案します。" />
        <FeatureItem number="02" title="安心の24時間サポート" description="旅行中のトラブルにも迅速に対応。日本語対応のサポートデスクを24時間運営しています。" />
        <FeatureItem number="03" title="厳選された宿泊施設" description="実際にスタッフが訪問して品質を確認した、信頼できる宿泊施設のみをご紹介します。" />
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.cta}>
      <h2 className={styles.ctaTitle}>旅の相談、承ります</h2>
      <p className={styles.ctaSubtitle}>行き先が決まっていなくても大丈夫。お気軽にご相談ください。</p>
      <div className={styles.ctaActions}>
        <button className={styles.ctaBtn}>無料相談を予約する</button>
        <button className={styles.ctaPhone}>☎ 0120-000-123</button>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span className={styles.footerBrand}>旅路 TABIJI</span>
        <p className={styles.footerAddr}>観光庁長官登録旅行業第1234号 / 一般社団法人日本旅行業協会 正会員</p>
        <p className={styles.footerCopy}>© 2026 旅路 TABIJI All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseTravelLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <DestinationsSection />
      <FeaturesSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}
