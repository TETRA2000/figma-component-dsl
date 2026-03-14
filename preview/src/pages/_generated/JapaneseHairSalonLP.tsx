import styles from './JapaneseHairSalonLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>TSUBAKI Hair</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>コンセプト</a>
          <a href="#" className={styles.navLink}>メニュー・料金</a>
          <a href="#" className={styles.navLink}>スタイリスト</a>
          <a href="#" className={styles.navLink}>サロン情報</a>
        </div>
        <button className={styles.navCta}>予約する</button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <span className={styles.heroBadge}>SINCE 2010</span>
        <h1 className={styles.heroTitle}>
          あなただけの<br />
          美しさを引き出す
        </h1>
        <p className={styles.heroSubtitle}>
          一人ひとりの髪質と骨格に合わせた<br />
          オーダーメイドスタイルをご提案します
        </p>
        <button className={styles.heroBtn}>ホットペッパーで予約</button>
      </div>
    </section>
  );
}

function ConceptSection() {
  return (
    <section className={styles.concept}>
      <div className={styles.conceptInner}>
        <div className={styles.conceptText}>
          <span className={styles.conceptLabel}>CONCEPT</span>
          <h2 className={styles.conceptTitle}>髪と向き合う<br />贅沢な時間を</h2>
          <p className={styles.conceptDesc}>
            TSUBAKIは、表参道の隠れ家サロン。完全予約制・マンツーマン施術で、
            カウンセリングから仕上げまで一人のスタイリストが担当します。
            お客様一人ひとりのライフスタイルに寄り添った、
            再現性の高いヘアスタイルをご提案します。
          </p>
        </div>
        <div className={styles.conceptImage} />
      </div>
    </section>
  );
}

function MenuCard({ category, items }: { category: string; items: { name: string; price: string }[] }) {
  return (
    <div className={styles.menuCard}>
      <h3 className={styles.menuCategory}>{category}</h3>
      <div className={styles.menuItems}>
        {items.map((item, i) => (
          <div key={i} className={styles.menuItem}>
            <span className={styles.menuName}>{item.name}</span>
            <span className={styles.menuPrice}>{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MenuSection() {
  return (
    <section className={styles.menu}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>MENU</span>
        <h2 className={styles.sectionTitle}>メニュー・料金</h2>
      </div>
      <div className={styles.menuGrid}>
        <MenuCard category="カット" items={[
          { name: 'カット', price: '¥6,600' },
          { name: 'カット＋シャンプーブロー', price: '¥7,700' },
          { name: '前髪カット', price: '¥1,100' },
        ]} />
        <MenuCard category="カラー" items={[
          { name: 'ワンカラー', price: '¥8,800〜' },
          { name: 'ハイライト', price: '¥11,000〜' },
          { name: 'グラデーション', price: '¥13,200〜' },
        ]} />
        <MenuCard category="パーマ" items={[
          { name: 'デジタルパーマ', price: '¥13,200〜' },
          { name: 'コールドパーマ', price: '¥9,900〜' },
          { name: '縮毛矯正', price: '¥16,500〜' },
        ]} />
        <MenuCard category="トリートメント" items={[
          { name: 'ベーシックトリートメント', price: '¥3,300' },
          { name: 'プレミアムトリートメント', price: '¥5,500' },
          { name: 'ヘッドスパ', price: '¥4,400' },
        ]} />
      </div>
    </section>
  );
}

function StylistCard({ name, role, description }: { name: string; role: string; description: string }) {
  return (
    <div className={styles.stylistCard}>
      <div className={styles.stylistImg} />
      <div className={styles.stylistInfo}>
        <span className={styles.stylistRole}>{role}</span>
        <h3 className={styles.stylistName}>{name}</h3>
        <p className={styles.stylistDesc}>{description}</p>
      </div>
    </div>
  );
}

function StylistSection() {
  return (
    <section className={styles.stylists}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>STYLIST</span>
        <h2 className={styles.sectionTitle}>スタイリスト</h2>
      </div>
      <div className={styles.stylistGrid}>
        <StylistCard name="佐藤 美紀" role="オーナースタイリスト" description="キャリア15年。ナチュラルで再現性の高いスタイルが得意。" />
        <StylistCard name="田中 隆" role="トップスタイリスト" description="メンズカットに定評あり。骨格に合わせた似合わせカットが人気。" />
        <StylistCard name="鈴木 あい" role="カラーリスト" description="透明感のあるカラーリングが得意。イルミナカラー認定スタイリスト。" />
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.cta}>
      <h2 className={styles.ctaTitle}>ご予約・お問い合わせ</h2>
      <p className={styles.ctaSubtitle}>初めての方はカウンセリング付きカットがおすすめです</p>
      <div className={styles.ctaActions}>
        <button className={styles.ctaBtn}>ホットペッパーで予約</button>
        <button className={styles.ctaPhone}>☎ 03-1234-5678</button>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span className={styles.footerBrand}>TSUBAKI Hair</span>
        <div className={styles.footerInfo}>
          <p>〒150-0001 東京都渋谷区神宮前4-5-6 表参道ビル3F</p>
          <p>営業時間：10:00〜20:00（最終受付 19:00）/ 定休日：毎週火曜日</p>
        </div>
        <p className={styles.footerCopy}>© 2026 TSUBAKI Hair. All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseHairSalonLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <ConceptSection />
      <MenuSection />
      <StylistSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}
