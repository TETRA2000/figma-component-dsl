import styles from './JapaneseRealEstateLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>SUMIKA 住まい</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>物件検索</a>
          <a href="#" className={styles.navLink}>エリア情報</a>
          <a href="#" className={styles.navLink}>お客様の声</a>
          <a href="#" className={styles.navLink}>会社概要</a>
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
          理想の暮らしを、<br />
          <span className={styles.heroAccent}>ここから見つけよう</span>
        </h1>
        <p className={styles.heroSubtitle}>
          東京・神奈川・千葉・埼玉エリアの厳選物件を<br />
          あなたのライフスタイルに合わせてご提案します
        </p>
        <div className={styles.searchBox}>
          <div className={styles.searchField}>
            <span className={styles.searchLabel}>エリア</span>
            <span className={styles.searchValue}>東京都</span>
          </div>
          <div className={styles.searchDivider} />
          <div className={styles.searchField}>
            <span className={styles.searchLabel}>種別</span>
            <span className={styles.searchValue}>マンション</span>
          </div>
          <div className={styles.searchDivider} />
          <div className={styles.searchField}>
            <span className={styles.searchLabel}>価格</span>
            <span className={styles.searchValue}>〜5,000万円</span>
          </div>
          <button className={styles.searchBtn}>検索する</button>
        </div>
      </div>
    </section>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className={styles.statItem}>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

function StatsSection() {
  return (
    <section className={styles.stats}>
      <StatItem value="15,000+" label="取扱物件数" />
      <div className={styles.statDivider} />
      <StatItem value="98.5%" label="顧客満足度" />
      <div className={styles.statDivider} />
      <StatItem value="30年" label="創業実績" />
      <div className={styles.statDivider} />
      <StatItem value="5,200+" label="成約件数" />
    </section>
  );
}

function PropertyCard({ title, location, price, specs, tag }: {
  title: string; location: string; price: string; specs: string; tag?: string;
}) {
  return (
    <div className={styles.propertyCard}>
      <div className={styles.propertyImg}>
        {tag && <span className={styles.propertyTag}>{tag}</span>}
      </div>
      <div className={styles.propertyInfo}>
        <h3 className={styles.propertyTitle}>{title}</h3>
        <p className={styles.propertyLocation}>{location}</p>
        <p className={styles.propertySpecs}>{specs}</p>
        <p className={styles.propertyPrice}>{price}</p>
      </div>
    </div>
  );
}

function PropertiesSection() {
  return (
    <section className={styles.properties}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>おすすめ物件</h2>
        <p className={styles.sectionSubtitle}>プロが厳選した注目の物件情報</p>
      </div>
      <div className={styles.propertyGrid}>
        <PropertyCard
          title="パークタワー目黒"
          location="東京都目黒区 目黒駅 徒歩5分"
          price="4,980万円"
          specs="3LDK / 72.5m² / 築3年 / 15階"
          tag="NEW"
        />
        <PropertyCard
          title="グランドメゾン世田谷"
          location="東京都世田谷区 三軒茶屋駅 徒歩8分"
          price="6,280万円"
          specs="4LDK / 95.2m² / 築1年 / 8階"
          tag="おすすめ"
        />
        <PropertyCard
          title="レジデンス武蔵小杉"
          location="神奈川県川崎市 武蔵小杉駅 徒歩3分"
          price="3,780万円"
          specs="2LDK / 58.3m² / 築5年 / 22階"
        />
      </div>
    </section>
  );
}

function FlowStep({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className={styles.flowStep}>
      <div className={styles.flowNumber}>{number}</div>
      <h3 className={styles.flowTitle}>{title}</h3>
      <p className={styles.flowDesc}>{description}</p>
    </div>
  );
}

function FlowSection() {
  return (
    <section className={styles.flow}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>ご購入の流れ</h2>
        <p className={styles.sectionSubtitle}>はじめての方でも安心のサポート体制</p>
      </div>
      <div className={styles.flowGrid}>
        <FlowStep number="01" title="無料相談" description="ご希望の条件をお聞かせください。専任のアドバイザーがご対応します。" />
        <div className={styles.flowArrow}>→</div>
        <FlowStep number="02" title="物件見学" description="気になる物件を実際にご見学いただけます。オンライン内覧も可能です。" />
        <div className={styles.flowArrow}>→</div>
        <FlowStep number="03" title="契約・引渡し" description="住宅ローンのご相談から契約手続きまで、ワンストップでサポートします。" />
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.cta}>
      <h2 className={styles.ctaTitle}>まずは無料相談から</h2>
      <p className={styles.ctaSubtitle}>専任アドバイザーがあなたの理想の住まい探しをサポートします</p>
      <div className={styles.ctaActions}>
        <button className={styles.ctaPhone}>☎ 0120-123-456</button>
        <button className={styles.ctaOnline}>オンライン相談予約</button>
      </div>
      <p className={styles.ctaNote}>受付時間：10:00〜19:00（年中無休）</p>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <span className={styles.footerLogo}>SUMIKA 住まい</span>
          <p className={styles.footerTagline}>理想の暮らしを、ここから</p>
        </div>
        <div className={styles.footerLinks}>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>サービス</h4>
            <a href="#" className={styles.footerLink}>売買物件</a>
            <a href="#" className={styles.footerLink}>賃貸物件</a>
            <a href="#" className={styles.footerLink}>リノベーション</a>
          </div>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>サポート</h4>
            <a href="#" className={styles.footerLink}>住宅ローン相談</a>
            <a href="#" className={styles.footerLink}>よくある質問</a>
            <a href="#" className={styles.footerLink}>お問い合わせ</a>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>© 2026 SUMIKA All rights reserved. 宅地建物取引業者 国土交通大臣(1)第12345号</p>
      </div>
    </footer>
  );
}

export function JapaneseRealEstateLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <StatsSection />
      <PropertiesSection />
      <FlowSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}
