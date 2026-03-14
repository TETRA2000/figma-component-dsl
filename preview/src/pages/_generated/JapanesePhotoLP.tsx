import styles from './JapanesePhotoLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>HIKARI STUDIO</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>ポートフォリオ</a>
          <a href="#" className={styles.navLink}>フォトグラファー</a>
          <a href="#" className={styles.navLink}>料金</a>
          <a href="#" className={styles.navLink}>お問い合わせ</a>
        </div>
        <button className={styles.contactBtn}>撮影のご相談</button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroOverlay}>
        <h1 className={styles.heroTitle}>一瞬を、永遠に。</h1>
        <p className={styles.heroSubtitle}>光と影で紡ぐ、あなただけの物語</p>
      </div>
    </section>
  );
}

function PortfolioSection() {
  return (
    <section className={styles.portfolio}>
      <h2 className={styles.sectionTitle}>ポートフォリオ</h2>
      <div className={styles.portfolioGrid}>
        {[
          { label: 'ウェディング', aspect: 'tall' },
          { label: 'ポートレート', aspect: 'wide' },
          { label: '商品撮影', aspect: 'square' },
          { label: '建築・空間', aspect: 'tall' },
          { label: '家族写真', aspect: 'wide' },
          { label: 'イベント', aspect: 'square' },
        ].map((item, i) => (
          <div key={i} className={`${styles.portfolioItem} ${styles[item.aspect]}`}>
            <div className={styles.portfolioImage}>
              <span className={styles.portfolioIcon}>📷</span>
            </div>
            <div className={styles.portfolioLabel}>
              <span>{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PhotographerSection() {
  return (
    <section className={styles.photographer}>
      <div className={styles.photographerInner}>
        <div className={styles.photographerImage}>
          <span className={styles.photographerIcon}>👤</span>
        </div>
        <div className={styles.photographerContent}>
          <span className={styles.photographerLabel}>フォトグラファー</span>
          <h2 className={styles.photographerName}>山田 光 / Hikari Yamada</h2>
          <p className={styles.photographerBio}>
            東京を拠点に活動するフォトグラファー。武蔵野美術大学卒業後、ロンドンで3年間修業。
            自然光を活かした繊細な表現と、被写体の本質を捉える力が評価され、
            国内外の雑誌やブランドの撮影を手掛ける。
          </p>
          <div className={styles.photographerAwards}>
            <span className={styles.award}>東京写真賞 2024</span>
            <span className={styles.award}>国際写真コンペ銀賞</span>
            <span className={styles.award}>個展 5回開催</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className={styles.pricing}>
      <h2 className={styles.sectionTitleLight}>撮影プラン</h2>
      <div className={styles.pricingGrid}>
        <div className={styles.pricingCard}>
          <h3 className={styles.pricingName}>ライトプラン</h3>
          <div className={styles.pricingPrice}>
            <span className={styles.pricingAmount}>¥38,000</span>
            <span className={styles.pricingTax}>（税込）</span>
          </div>
          <ul className={styles.pricingFeatures}>
            <li>撮影時間 1時間</li>
            <li>納品枚数 30枚</li>
            <li>レタッチ 基本補正</li>
            <li>データ納品</li>
          </ul>
        </div>
        <div className={`${styles.pricingCard} ${styles.pricingFeatured}`}>
          <span className={styles.pricingBadge}>人気</span>
          <h3 className={styles.pricingName}>スタンダードプラン</h3>
          <div className={styles.pricingPrice}>
            <span className={styles.pricingAmount}>¥78,000</span>
            <span className={styles.pricingTax}>（税込）</span>
          </div>
          <ul className={styles.pricingFeatures}>
            <li>撮影時間 3時間</li>
            <li>納品枚数 80枚</li>
            <li>レタッチ 丁寧な補正</li>
            <li>データ＋プリント10枚</li>
            <li>ロケーション撮影対応</li>
          </ul>
        </div>
        <div className={styles.pricingCard}>
          <h3 className={styles.pricingName}>プレミアムプラン</h3>
          <div className={styles.pricingPrice}>
            <span className={styles.pricingAmount}>¥150,000</span>
            <span className={styles.pricingTax}>（税込）</span>
          </div>
          <ul className={styles.pricingFeatures}>
            <li>撮影時間 終日</li>
            <li>納品枚数 200枚</li>
            <li>レタッチ フルレタッチ</li>
            <li>データ＋アルバム制作</li>
            <li>衣装・ヘアメイク手配</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className={styles.contact}>
      <h2 className={styles.sectionTitle}>お問い合わせ</h2>
      <p className={styles.contactSubtitle}>
        撮影のご相談・お見積りはお気軽にどうぞ。<br />
        ご要望に合わせたプランをご提案いたします。
      </p>
      <div className={styles.contactActions}>
        <button className={styles.contactPrimaryBtn}>お問い合わせフォーム</button>
        <span className={styles.contactEmail}>info@hikari-studio.jp</span>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <span className={styles.footerLogo}>HIKARI STUDIO</span>
          <p className={styles.footerTagline}>一瞬を、永遠に。</p>
        </div>
        <div className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}>ポートフォリオ</a>
          <a href="#" className={styles.footerLink}>料金</a>
          <a href="#" className={styles.footerLink}>フォトグラファー</a>
          <a href="#" className={styles.footerLink}>お問い合わせ</a>
          <a href="#" className={styles.footerLink}>Instagram</a>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>© 2026 HIKARI STUDIO All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapanesePhotoLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <PortfolioSection />
      <PhotographerSection />
      <PricingSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
