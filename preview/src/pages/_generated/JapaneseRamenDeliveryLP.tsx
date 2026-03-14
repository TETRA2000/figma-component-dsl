import styles from './JapaneseRamenDeliveryLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <div className={styles.brandGroup}>
          <span className={styles.brandName}>ラーメン速達</span>
          <span className={styles.brandSub}>RAMEN SOKUTATSU</span>
        </div>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>メニュー</a>
          <a href="#" className={styles.navLink}>配達エリア</a>
          <a href="#" className={styles.navLink}>ご注文方法</a>
          <button className={styles.navCTA}>今すぐ注文</button>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroLeft}>
        <span className={styles.heroBadge}>最短30分でお届け</span>
        <h1 className={styles.heroTitle}>
          アツアツの<br />ラーメンを<br />ご自宅に
        </h1>
        <p className={styles.heroSubtitle}>
          こだわりの一杯を、出来たての美味しさのまま<br />
          ご自宅やオフィスにお届けします。
        </p>
        <div className={styles.heroBtns}>
          <button className={styles.primaryBtn}>メニューを見る</button>
          <button className={styles.secondaryBtn}>アプリで注文</button>
        </div>
      </div>
      <div className={styles.heroRight}>
        <span className={styles.heroImgText}>RAMEN</span>
        <span className={styles.heroImgSubText}>DELIVERY</span>
      </div>
    </section>
  );
}

function MenuCard({ name, description, price, tag }: { name: string; description: string; price: string; tag?: string }) {
  return (
    <div className={styles.menuCard}>
      <div className={styles.menuImgArea}>
        {tag && <span className={styles.menuTag}>{tag}</span>}
      </div>
      <div className={styles.menuBody}>
        <h3 className={styles.menuName}>{name}</h3>
        <p className={styles.menuDesc}>{description}</p>
        <div className={styles.menuPriceRow}>
          <span className={styles.menuPrice}>{price}</span>
          <button className={styles.addBtn}>追加</button>
        </div>
      </div>
    </div>
  );
}

function MenuSection() {
  return (
    <section className={styles.menuSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>MENU</span>
        <h2 className={styles.sectionTitle}>人気メニュー</h2>
      </div>
      <div className={styles.menuGrid}>
        <MenuCard name="特製豚骨ラーメン" description="濃厚な豚骨スープに自家製麺。チャーシュー3枚付き" price="¥1,080" tag="人気No.1" />
        <MenuCard name="味噌バターラーメン" description="北海道味噌にバターの風味。コーンたっぷり" price="¥1,150" />
        <MenuCard name="醤油ラーメン" description="鶏ガラベースの澄んだスープ。あっさり派に" price="¥980" />
        <MenuCard name="辛味噌つけ麺" description="特製辛味噌のつけ汁で楽しむ極太麺" price="¥1,200" tag="期間限定" />
        <MenuCard name="塩レモンラーメン" description="爽やかなレモン香る塩ラーメン。夏季限定" price="¥1,050" />
        <MenuCard name="チャーシュー丼セット" description="お好きなラーメン+ミニチャーシュー丼" price="¥1,380" />
      </div>
    </section>
  );
}

function DeliverySection() {
  const areas = [
    { area: '渋谷区', time: '約25分' },
    { area: '新宿区', time: '約30分' },
    { area: '港区', time: '約35分' },
    { area: '目黒区', time: '約30分' },
    { area: '世田谷区', time: '約40分' },
    { area: '中野区', time: '約35分' },
  ];

  return (
    <section className={styles.deliverySection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>DELIVERY AREA</span>
        <h2 className={styles.sectionTitle}>配達エリア</h2>
      </div>
      <div className={styles.areaGrid}>
        {areas.map((a) => (
          <div key={a.area} className={styles.areaCard}>
            <div className={styles.areaName}>{a.area}</div>
            <div className={styles.areaTime}>{a.time}</div>
          </div>
        ))}
      </div>
      <p className={styles.deliveryNote}>※ 交通状況により配達時間が前後する場合がございます</p>
    </section>
  );
}

function HowToSection() {
  const steps = [
    { step: '1', title: 'メニューを選ぶ', desc: 'アプリまたはWebサイトからお好きなラーメンをお選びください' },
    { step: '2', title: 'お届け先を入力', desc: 'ご住所とお届け時間をご指定ください' },
    { step: '3', title: 'アツアツをお届け', desc: '専用の保温容器で出来たての美味しさをお届けします' },
  ];

  return (
    <section className={styles.howToSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>HOW TO ORDER</span>
        <h2 className={styles.sectionTitle}>ご注文方法</h2>
      </div>
      <div className={styles.stepGrid}>
        {steps.map((s) => (
          <div key={s.step} className={styles.stepCard}>
            <div className={styles.stepCircle}>{s.step}</div>
            <h3 className={styles.stepTitle}>{s.title}</h3>
            <p className={styles.stepDesc}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AppSection() {
  return (
    <section className={styles.appSection}>
      <div className={styles.appLeft}>
        <h2 className={styles.appTitle}>アプリでもっと便利に</h2>
        <p className={styles.appDesc}>
          初回ダウンロードで500円OFFクーポンプレゼント！<br />
          ポイントも貯まってお得にラーメンを楽しめます。
        </p>
        <div className={styles.appBtns}>
          <button className={styles.appStoreBtn}>App Store</button>
          <button className={styles.appStoreBtn}>Google Play</button>
        </div>
      </div>
      <div className={styles.appRight}>
        <div className={styles.phoneMock}>APP</div>
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
            <span className={styles.footerBrandName}>ラーメン速達</span>
            <span className={styles.footerBrandSub}>RAMEN SOKUTATSU</span>
          </div>
          <div className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>メニュー</a>
            <a href="#" className={styles.footerLink}>配達エリア</a>
            <a href="#" className={styles.footerLink}>ご注文方法</a>
            <a href="#" className={styles.footerLink}>お問い合わせ</a>
            <a href="#" className={styles.footerLink}>利用規約</a>
          </div>
        </div>
        <p className={styles.footerCopy}>© 2026 ラーメン速達 RAMEN SOKUTATSU All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseRamenDeliveryLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <MenuSection />
      <DeliverySection />
      <HowToSection />
      <AppSection />
      <FooterSection />
    </div>
  );
}
