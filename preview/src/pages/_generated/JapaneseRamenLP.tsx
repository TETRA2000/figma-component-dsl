import styles from './JapaneseRamenLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>麺匠 一番</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>こだわり</a>
          <a href="#" className={styles.navLink}>メニュー</a>
          <a href="#" className={styles.navLink}>店舗情報</a>
          <a href="#" className={styles.navLink}>ご予約</a>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        <span className={styles.heroLabel}>創業三十年の味</span>
        <h1 className={styles.heroTitle}>
          一杯に込めた<br />職人の魂
        </h1>
        <p className={styles.heroSubtitle}>
          厳選された素材と伝統の製法が生み出す<br />
          至極の一杯をお届けします
        </p>
        <button className={styles.heroBtn}>ご予約はこちら</button>
      </div>
    </section>
  );
}

function KodawariCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className={styles.kodawariCard}>
      <div className={styles.kodawariNumber}>{number}</div>
      <h3 className={styles.kodawariTitle}>{title}</h3>
      <div className={styles.kodawariDivider} />
      <p className={styles.kodawariDesc}>{description}</p>
    </div>
  );
}

function KodawariSection() {
  return (
    <section className={styles.kodawari}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>KODAWARI</span>
        <h2 className={styles.sectionTitle}>三つのこだわり</h2>
      </div>
      <div className={styles.kodawariGrid}>
        <KodawariCard
          number="01"
          title="自家製麺"
          description="毎朝店内で打つ自家製麺。小麦の香りと独特のコシが自慢です。太さや硬さもお好みに合わせてお選びいただけます。"
        />
        <KodawariCard
          number="02"
          title="豚骨スープ"
          description="丸二日間じっくりと炊き上げた濃厚豚骨スープ。臭みのない深いコクと旨味をお楽しみください。"
        />
        <KodawariCard
          number="03"
          title="厳選チャーシュー"
          description="国産豚バラ肉を低温でじっくりと調理。口の中でとろけるような食感が人気の秘密です。"
        />
      </div>
    </section>
  );
}

function MenuItem({ name, price, description, tag }: { name: string; price: string; description: string; tag?: string }) {
  return (
    <div className={styles.menuItem}>
      <div className={styles.menuImgArea}>
        {tag && <span className={styles.menuTag}>{tag}</span>}
      </div>
      <div className={styles.menuInfo}>
        <h3 className={styles.menuName}>{name}</h3>
        <p className={styles.menuDesc}>{description}</p>
        <span className={styles.menuPrice}>{price}</span>
      </div>
    </div>
  );
}

function MenuSection() {
  return (
    <section className={styles.menu}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>MENU</span>
        <h2 className={styles.sectionTitle}>おすすめメニュー</h2>
      </div>
      <div className={styles.menuGrid}>
        <MenuItem
          name="特製濃厚豚骨ラーメン"
          price="¥980"
          description="看板メニュー。濃厚スープと自家製太麺の最強コンビ"
          tag="一番人気"
        />
        <MenuItem
          name="味玉醤油ラーメン"
          price="¥880"
          description="香り高い醤油ダレと半熟味玉の王道の一杯"
        />
        <MenuItem
          name="辛味噌ラーメン"
          price="¥950"
          description="自家製辛味噌が効いたパンチのある一杯"
          tag="期間限定"
        />
        <MenuItem
          name="つけ麺（並）"
          price="¥900"
          description="極太麺を濃厚つけ汁でいただく。麺量変更無料"
        />
      </div>
    </section>
  );
}

function AccessSection() {
  return (
    <section className={styles.access}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabelLight}>ACCESS</span>
        <h2 className={styles.sectionTitleLight}>店舗情報</h2>
      </div>
      <div className={styles.accessContent}>
        <div className={styles.accessMap}>
          <div className={styles.mapPlaceholder}>MAP</div>
        </div>
        <div className={styles.accessInfo}>
          <div className={styles.accessRow}>
            <span className={styles.accessLabel}>住所</span>
            <span className={styles.accessValue}>東京都渋谷区道玄坂1-2-3 ラーメンビル1F</span>
          </div>
          <div className={styles.accessRow}>
            <span className={styles.accessLabel}>電話</span>
            <span className={styles.accessValue}>03-1234-5678</span>
          </div>
          <div className={styles.accessRow}>
            <span className={styles.accessLabel}>営業時間</span>
            <span className={styles.accessValue}>11:00〜23:00（L.O. 22:30）</span>
          </div>
          <div className={styles.accessRow}>
            <span className={styles.accessLabel}>定休日</span>
            <span className={styles.accessValue}>年中無休</span>
          </div>
          <div className={styles.accessRow}>
            <span className={styles.accessLabel}>席数</span>
            <span className={styles.accessValue}>カウンター12席 / テーブル20席</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span className={styles.footerBrand}>麺匠 一番</span>
        <p className={styles.footerCopy}>© 2026 麺匠一番 All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseRamenLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <KodawariSection />
      <MenuSection />
      <AccessSection />
      <FooterSection />
    </div>
  );
}
