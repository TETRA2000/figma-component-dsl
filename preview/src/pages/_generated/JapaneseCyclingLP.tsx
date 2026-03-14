import styles from './JapaneseCyclingLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <div className={styles.brandGroup}>
          <span className={styles.brand}>PEDAL HOUSE</span>
          <span className={styles.brandJa}>ペダルハウス</span>
        </div>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>バイク</a>
          <a href="#" className={styles.navLink}>サービス</a>
          <a href="#" className={styles.navLink}>イベント</a>
          <a href="#" className={styles.navLink}>店舗情報</a>
        </div>
        <button className={styles.navCta}>来店予約</button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <span className={styles.heroBadge}>2026 NEW MODEL</span>
        <h1 className={styles.heroTitle}>
          風を切って<br />
          <span className={styles.heroAccent}>走ろう</span>
        </h1>
        <p className={styles.heroSubtitle}>
          ロードバイクからシティサイクルまで、あなたの<br />
          ライフスタイルに合った最高の一台を見つけよう
        </p>
        <div className={styles.heroActions}>
          <button className={styles.primaryBtn}>ラインナップを見る</button>
          <button className={styles.secondaryBtn}>試乗予約</button>
        </div>
      </div>
      <div className={styles.heroImage}>
        <div className={styles.bikePlaceholder}>
          <div className={styles.bikeWheel1} />
          <div className={styles.bikeWheel2} />
          <div className={styles.bikeFrame} />
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ title, description, priceRange, icon }: { title: string; description: string; priceRange: string; icon: string }) {
  return (
    <div className={styles.categoryCard}>
      <div className={styles.categoryIcon}>{icon}</div>
      <h3 className={styles.categoryTitle}>{title}</h3>
      <p className={styles.categoryDesc}>{description}</p>
      <p className={styles.categoryPrice}>{priceRange}</p>
    </div>
  );
}

function CategoriesSection() {
  return (
    <section className={styles.categories}>
      <h2 className={styles.sectionTitle}>バイクカテゴリー</h2>
      <p className={styles.sectionSubtitle}>あなたの走りに合った一台を</p>
      <div className={styles.categoryGrid}>
        <CategoryCard
          title="ロードバイク"
          description="高速走行やロングライドに最適。軽量カーボンフレームで快適な走りを実現"
          priceRange="¥120,000〜"
          icon="RD"
        />
        <CategoryCard
          title="マウンテンバイク"
          description="オフロードやトレイルを駆け抜ける。高い走破性と耐久性を備えた本格モデル"
          priceRange="¥98,000〜"
          icon="MT"
        />
        <CategoryCard
          title="シティサイクル"
          description="毎日の通勤・通学に。快適性と実用性を両立したスタイリッシュモデル"
          priceRange="¥45,000〜"
          icon="CT"
        />
      </div>
    </section>
  );
}

function ServiceCard({ title, description, price }: { title: string; description: string; price: string }) {
  return (
    <div className={styles.serviceCard}>
      <div className={styles.serviceDot} />
      <div className={styles.serviceInfo}>
        <h3 className={styles.serviceTitle}>{title}</h3>
        <p className={styles.serviceDesc}>{description}</p>
      </div>
      <span className={styles.servicePrice}>{price}</span>
    </div>
  );
}

function ServiceSection() {
  return (
    <section className={styles.service}>
      <h2 className={styles.sectionTitle}>サービスメニュー</h2>
      <p className={styles.sectionSubtitle}>購入後も安心のサポート体制</p>
      <div className={styles.serviceList}>
        <ServiceCard title="修理・メンテナンス" description="パンク修理からオーバーホールまで。経験豊富なメカニックが対応します" price="¥1,100〜" />
        <ServiceCard title="フィッティング" description="体格やライディングスタイルに合わせた最適なポジション調整" price="¥5,500" />
        <ServiceCard title="レンタサイクル" description="試してから決めたい方に。最新モデルを1日からレンタル可能" price="¥3,300/日" />
      </div>
    </section>
  );
}

function BikeCard({ name, category, price, spec }: { name: string; category: string; price: string; spec: string }) {
  return (
    <div className={styles.bikeCard}>
      <div className={styles.bikeImgArea}>
        <span className={styles.bikeTag}>{category}</span>
      </div>
      <div className={styles.bikeInfo}>
        <h3 className={styles.bikeName}>{name}</h3>
        <p className={styles.bikeSpec}>{spec}</p>
        <p className={styles.bikePrice}>{price}</p>
      </div>
    </div>
  );
}

function FeaturedSection() {
  return (
    <section className={styles.featured}>
      <h2 className={styles.sectionTitle}>注目のバイク</h2>
      <p className={styles.sectionSubtitle}>スタッフおすすめの厳選モデル</p>
      <div className={styles.bikeGrid}>
        <BikeCard name="AERO SWIFT R9" category="ROAD" price="¥298,000" spec="カーボンフレーム / 22速 / 7.2kg" />
        <BikeCard name="TRAIL BLAZER X7" category="MTB" price="¥178,000" spec="アルミフレーム / フルサス / 29er" />
        <BikeCard name="URBAN GLIDE S3" category="CITY" price="¥68,000" spec="クロモリフレーム / 内装8速 / ベルトドライブ" />
      </div>
    </section>
  );
}

function EventItem({ date, title, description }: { date: string; title: string; description: string }) {
  return (
    <div className={styles.eventItem}>
      <div className={styles.eventDate}>{date}</div>
      <div className={styles.eventInfo}>
        <h3 className={styles.eventTitle}>{title}</h3>
        <p className={styles.eventDesc}>{description}</p>
      </div>
      <button className={styles.eventJoinBtn}>参加する</button>
    </div>
  );
}

function EventsSection() {
  return (
    <section className={styles.events}>
      <h2 className={styles.sectionTitle}>イベント情報</h2>
      <p className={styles.sectionSubtitle}>仲間と一緒に走ろう</p>
      <div className={styles.eventsList}>
        <EventItem date="4/12 SAT" title="初心者ライド in 多摩川" description="平坦コース30km。初めてのグループライドにぴったり" />
        <EventItem date="4/20 SUN" title="ヒルクライムチャレンジ" description="箱根旧道を攻略。上級者向けのチャレンジイベント" />
        <EventItem date="5/3 SAT" title="メンテナンス講座" description="自分でできるパンク修理・チェーン清掃を学ぼう" />
      </div>
    </section>
  );
}

function StoreSection() {
  return (
    <section className={styles.store}>
      <div className={styles.storeMap}>MAP</div>
      <div className={styles.storeInfo}>
        <h2 className={styles.storeTitle}>店舗情報</h2>
        <div className={styles.infoBlock}>
          <p className={styles.storeName}>PEDAL HOUSE ペダルハウス 本店</p>
          <p className={styles.storeAddress}>〒150-0001 東京都渋谷区神宮前3-15-8</p>
        </div>
        <div className={styles.infoBlock}>
          <p className={styles.infoLabel}>営業時間</p>
          <p className={styles.infoText}>平日 11:00〜20:00 / 土日祝 10:00〜19:00</p>
          <p className={styles.infoText}>定休日: 毎週火曜日</p>
        </div>
        <div className={styles.infoBlock}>
          <p className={styles.storeTel}>TEL: 03-XXXX-XXXX</p>
          <p className={styles.infoText}>駐車場: 3台 / 駐輪場: 20台</p>
        </div>
        <button className={styles.storeBtn}>Google Maps で開く</button>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <span className={styles.footerLogo}>PEDAL HOUSE</span>
          <p className={styles.footerTagline}>あなたの自転車ライフをサポート</p>
        </div>
        <div className={styles.footerLinks}>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>バイク</h4>
            <a href="#" className={styles.footerLink}>ロードバイク</a>
            <a href="#" className={styles.footerLink}>マウンテンバイク</a>
            <a href="#" className={styles.footerLink}>シティサイクル</a>
          </div>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>サービス</h4>
            <a href="#" className={styles.footerLink}>修理・メンテナンス</a>
            <a href="#" className={styles.footerLink}>フィッティング</a>
            <a href="#" className={styles.footerLink}>レンタル</a>
          </div>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>情報</h4>
            <a href="#" className={styles.footerLink}>イベント</a>
            <a href="#" className={styles.footerLink}>ブログ</a>
            <a href="#" className={styles.footerLink}>プライバシーポリシー</a>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>© 2026 PEDAL HOUSE. All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseCyclingLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <CategoriesSection />
      <ServiceSection />
      <FeaturedSection />
      <EventsSection />
      <StoreSection />
      <FooterSection />
    </div>
  );
}
