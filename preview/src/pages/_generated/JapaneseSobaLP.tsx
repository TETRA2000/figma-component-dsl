import styles from './JapaneseSobaLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>そば処 清流庵 SEIRYUAN</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>こだわり</a>
          <a href="#" className={styles.navLink}>お品書き</a>
          <a href="#" className={styles.navLink}>季節の一品</a>
          <a href="#" className={styles.navLink}>店舗情報</a>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <span className={styles.heroLabel}>創業明治三十年</span>
        <h1 className={styles.heroTitle}>
          手打ちの一杯、<br />至福のひととき
        </h1>
        <p className={styles.heroSubtitle}>
          厳選した国産蕎麦粉を石臼挽きし、<br />
          毎朝職人が丁寧に手打ちしています
        </p>
        <button className={styles.heroCta}>お品書きを見る</button>
      </div>
    </section>
  );
}

function KodawariCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className={styles.kodawariCard}>
      <span className={styles.kodawariNum}>{number}</span>
      <h3 className={styles.kodawariTitle}>{title}</h3>
      <div className={styles.kodawariDivider} />
      <p className={styles.kodawariDesc}>{description}</p>
    </div>
  );
}

function KodawariSection() {
  return (
    <section className={styles.kodawari}>
      <span className={styles.sectionLabel}>KODAWARI</span>
      <h2 className={styles.sectionTitle}>三つのこだわり</h2>
      <div className={styles.kodawariGrid}>
        <KodawariCard number="01" title="蕎麦粉" description="北海道幌加内産の最上級蕎麦粉を使用。石臼で丁寧に挽くことで、豊かな香りと風味を引き出します。" />
        <KodawariCard number="02" title="水" description="奥多摩の天然湧水を使用。蕎麦の繊細な味わいを最大限に活かす、まろやかな軟水です。" />
        <KodawariCard number="03" title="手打ちの技" description="三代に渡り受け継がれた手打ちの技。その日の気温や湿度に合わせ、最適な加減で打ち上げます。" />
      </div>
    </section>
  );
}

function MenuSection() {
  const items = [
    { name: 'ざるそば', price: '¥950', desc: '挽きたて・打ちたて・茹でたての三たてを味わう基本の一枚', tag: '定番' },
    { name: '天ざるそば', price: '¥1,650', desc: '旬の野菜と海老の天ぷらを添えた贅沢な一品' },
    { name: '鴨南蛮そば', price: '¥1,450', desc: '合鴨の旨味が溶け出した温かいつゆが絶品', tag: '人気' },
    { name: 'とろろそば', price: '¥1,100', desc: '粘りの強い大和芋のとろろで味わう、のど越し抜群の一杯' },
  ];
  return (
    <section className={styles.menu}>
      <span className={styles.sectionLabel}>MENU</span>
      <h2 className={styles.sectionTitle}>お品書き</h2>
      <div className={styles.menuGrid}>
        {[0, 2].map((startIdx) => (
          <div key={startIdx} className={styles.menuRow}>
            {items.slice(startIdx, startIdx + 2).map((item) => (
              <div key={item.name} className={styles.menuItem}>
                <div className={styles.menuImgArea}>
                  {item.tag && <span className={styles.menuTag}>{item.tag}</span>}
                </div>
                <div className={styles.menuInfo}>
                  <h3 className={styles.menuName}>{item.name}</h3>
                  <p className={styles.menuDesc}>{item.desc}</p>
                  <span className={styles.menuPrice}>{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function SeasonalSection() {
  const specials = [
    { name: '春の山菜天ぷらそば', price: '¥1,550' },
    { name: '新そば（秋季限定）', price: '¥1,200' },
    { name: '冬の牡蠣そば', price: '¥1,650' },
  ];
  return (
    <section className={styles.seasonal}>
      <span className={styles.sectionLabel}>SEASONAL</span>
      <h2 className={styles.sectionTitle}>季節のおすすめ</h2>
      <div className={styles.seasonalGrid}>
        {specials.map((item) => (
          <div key={item.name} className={styles.seasonalCard}>
            <div className={styles.seasonalImg} />
            <h3 className={styles.seasonalName}>{item.name}</h3>
            <span className={styles.seasonalPrice}>{item.price}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function AtmosphereSection() {
  return (
    <section className={styles.atmosphere}>
      <span className={styles.sectionLabel}>ATMOSPHERE</span>
      <h2 className={styles.sectionTitle}>店内の雰囲気</h2>
      <div className={styles.atmosphereContent}>
        <div className={styles.atmosphereImg}>PHOTO</div>
        <div className={styles.atmosphereText}>
          <h3 className={styles.atmosphereHeading}>古民家を改装した<br />落ち着きの空間</h3>
          <p className={styles.atmosphereDesc}>
            築百年の古民家を改装した店内は、太い梁と土壁が織りなす温かみのある空間。
            四季折々の庭を眺めながら、ゆったりとお蕎麦をお楽しみいただけます。
            個室もご用意しておりますので、接待やお祝いの席にもご利用いただけます。
          </p>
        </div>
      </div>
    </section>
  );
}

function AccessSection() {
  const rows = [
    ['住所', '東京都世田谷区深沢4-5-6'],
    ['電話', '03-9876-5432'],
    ['営業時間', '昼 11:00〜15:00 / 夜 17:00〜21:00'],
    ['定休日', '毎週水曜日'],
    ['席数', 'テーブル24席 / 座敷16席 / 個室2室'],
  ];
  return (
    <section className={styles.access}>
      <span className={styles.sectionLabelLight}>ACCESS</span>
      <h2 className={styles.sectionTitleLight}>店舗情報</h2>
      <div className={styles.accessContent}>
        <div className={styles.mapPlaceholder}>MAP</div>
        <div className={styles.accessInfo}>
          {rows.map(([label, value]) => (
            <div key={label} className={styles.accessRow}>
              <span className={styles.accessLabel}>{label}</span>
              <span className={styles.accessValue}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <span className={styles.footerBrand}>そば処 清流庵 SEIRYUAN</span>
      <p className={styles.footerCopy}>© 2026 そば処 清流庵 All rights reserved.</p>
    </footer>
  );
}

export function JapaneseSobaLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <KodawariSection />
      <MenuSection />
      <SeasonalSection />
      <AtmosphereSection />
      <AccessSection />
      <FooterSection />
    </div>
  );
}
