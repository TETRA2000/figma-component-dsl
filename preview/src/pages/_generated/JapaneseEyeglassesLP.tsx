import styles from './JapaneseEyeglassesLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <div className={styles.brandGroup}>
          <span className={styles.brandName}>眼鏡工房</span>
          <div className={styles.brandDivider} />
          <span className={styles.brandSub}>MEGANE KOUBOU</span>
        </div>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>フレーム</a>
          <a href="#" className={styles.navLink}>レンズ</a>
          <a href="#" className={styles.navLink}>視力検査</a>
          <a href="#" className={styles.navLink}>店舗案内</a>
          <button className={styles.navCTA}>来店予約</button>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroLeft}>
        <span className={styles.heroSince}>SINCE 1985</span>
        <h1 className={styles.heroTitle}>
          あなたらしい<br />メガネを
        </h1>
        <p className={styles.heroSubtitle}>
          一人ひとりの個性に寄り添い、<br />
          最高の見え心地とデザインをご提案します。
        </p>
        <div className={styles.heroBtns}>
          <button className={styles.primaryBtn}>コレクションを見る</button>
          <button className={styles.secondaryBtn}>来店予約</button>
        </div>
      </div>
      <div className={styles.heroRight}>
        <div className={styles.heroIcon}>MEGANE</div>
      </div>
    </section>
  );
}

function CategoryCard({ name, enName, description }: { name: string; enName: string; description: string }) {
  return (
    <div className={styles.categoryCard}>
      <div className={styles.categoryImg}>
        <span className={styles.categoryImgLabel}>{enName}</span>
      </div>
      <h3 className={styles.categoryName}>{name}</h3>
      <p className={styles.categoryDesc}>{description}</p>
      <a href="#" className={styles.categoryLink}>詳しく見る →</a>
    </div>
  );
}

function CategoriesSection() {
  return (
    <section className={styles.categoriesSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>FRAMES</span>
        <h2 className={styles.sectionTitle}>フレームカテゴリー</h2>
      </div>
      <div className={styles.categoryGrid}>
        <CategoryCard
          name="クラシック"
          enName="CLASSIC"
          description="ウェリントン、ボストンなど時代を超えて愛される定番フレーム"
        />
        <CategoryCard
          name="モダン"
          enName="MODERN"
          description="ミニマルで洗練されたデザイン。ビジネスシーンにも最適"
        />
        <CategoryCard
          name="スポーツ"
          enName="SPORTS"
          description="軽量で丈夫な素材を使用。アクティブなライフスタイルに"
        />
        <CategoryCard
          name="ラグジュアリー"
          enName="LUXURY"
          description="チタン・金張りなど最高級素材。特別な一本をお探しの方に"
        />
      </div>
    </section>
  );
}

function LensOption({ name, price, features }: { name: string; price: string; features: string }) {
  return (
    <div className={styles.lensOption}>
      <div className={styles.lensIcon}>
        <div className={styles.lensDot} />
      </div>
      <div className={styles.lensInfo}>
        <h3 className={styles.lensName}>{name}</h3>
        <p className={styles.lensFeatures}>{features}</p>
      </div>
      <span className={styles.lensPrice}>{price}</span>
    </div>
  );
}

function LensSection() {
  return (
    <section className={styles.lensSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>LENS</span>
        <h2 className={styles.sectionTitle}>レンズオプション</h2>
      </div>
      <div className={styles.lensList}>
        <LensOption name="薄型非球面レンズ" price="¥8,800〜" features="UVカット・反射防止コート付き" />
        <LensOption name="遠近両用レンズ" price="¥16,500〜" features="境目のない自然な見え心地" />
        <LensOption name="ブルーライトカットレンズ" price="¥11,000〜" features="PC作業が多い方におすすめ" />
        <LensOption name="偏光サングラスレンズ" price="¥13,200〜" features="ドライブ・アウトドアに最適" />
      </div>
    </section>
  );
}

function ExamSection() {
  const features = [
    '所要時間：約20分（予約優先）',
    '検査料：メガネご購入の方は無料',
    'コンタクトレンズの処方にも対応',
    'お子様の視力検査も承ります',
  ];

  return (
    <section className={styles.examSection}>
      <div className={styles.examImg}>
        <div className={styles.examIcon}>検査</div>
      </div>
      <div className={styles.examContent}>
        <div>
          <span className={styles.examLabel}>EYE EXAM</span>
          <h2 className={styles.examTitle}>視力検査サービス</h2>
        </div>
        <p className={styles.examDesc}>
          国家資格を持つ認定眼鏡士が、最新の検査機器を使って<br />
          丁寧に視力検査を行います。お気軽にご相談ください。
        </p>
        <div className={styles.examFeatures}>
          {features.map((feat) => (
            <div key={feat} className={styles.examFeature}>
              <span className={styles.checkMark}>✓</span>
              <span className={styles.examFeatureText}>{feat}</span>
            </div>
          ))}
        </div>
        <button className={styles.examCTA}>検査を予約する</button>
      </div>
    </section>
  );
}

function StoreCard({ name, address, hours, phone }: { name: string; address: string; hours: string; phone: string }) {
  return (
    <div className={styles.storeCard}>
      <div className={styles.storeMapArea}>
        <span className={styles.storeMapLabel}>MAP</span>
      </div>
      <div className={styles.storeInfo}>
        <h3 className={styles.storeName}>{name}</h3>
        <div className={styles.storeRow}>
          <span className={styles.storeRowLabel}>住所</span>
          <span className={styles.storeRowValue}>{address}</span>
        </div>
        <div className={styles.storeRow}>
          <span className={styles.storeRowLabel}>営業時間</span>
          <span className={styles.storeRowValue}>{hours}</span>
        </div>
        <div className={styles.storeRow}>
          <span className={styles.storeRowLabel}>電話</span>
          <span className={styles.storeRowValue}>{phone}</span>
        </div>
        <a href="#" className={styles.storeLink}>アクセス詳細 →</a>
      </div>
    </div>
  );
}

function StoreSection() {
  return (
    <section className={styles.storeSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>STORES</span>
        <h2 className={styles.sectionTitle}>店舗案内</h2>
      </div>
      <div className={styles.storeGrid}>
        <StoreCard
          name="銀座本店"
          address="東京都中央区銀座4-5-6 銀座メガネビル1F"
          hours="10:00〜20:00（水曜定休）"
          phone="03-1234-5678"
        />
        <StoreCard
          name="表参道店"
          address="東京都渋谷区神宮前5-10-1 表参道ヒルズB1F"
          hours="11:00〜21:00（年中無休）"
          phone="03-9876-5432"
        />
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <span className={styles.footerBrandName}>眼鏡工房</span>
            <span className={styles.footerBrandSub}>MEGANE KOUBOU</span>
          </div>
          <div className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>フレーム</a>
            <a href="#" className={styles.footerLink}>レンズ</a>
            <a href="#" className={styles.footerLink}>視力検査</a>
            <a href="#" className={styles.footerLink}>店舗案内</a>
            <a href="#" className={styles.footerLink}>お問い合わせ</a>
          </div>
        </div>
        <p className={styles.footerCopy}>© 2026 眼鏡工房 MEGANE KOUBOU All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseEyeglassesLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <CategoriesSection />
      <LensSection />
      <ExamSection />
      <StoreSection />
      <FooterSection />
    </div>
  );
}
