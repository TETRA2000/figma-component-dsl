import styles from './JapaneseSakeLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>酒蔵 月光 GEKKOU</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>銘酒</a>
          <a href="#" className={styles.navLink}>醸造</a>
          <a href="#" className={styles.navLink}>蔵見学</a>
          <a href="#" className={styles.navLinkAccent}>オンラインショップ</a>
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
        <span className={styles.heroLabel}>SINCE 1842</span>
        <h1 className={styles.heroTitle}>
          伝統と革新の、<br />一滴
        </h1>
        <p className={styles.heroSubtitle}>
          百八十年の歴史が紡ぐ<br />
          月光のもとで醸される至高の日本酒
        </p>
        <button className={styles.heroBtn}>オンラインショップへ</button>
      </div>
    </section>
  );
}

function SakeCard({ name, nameEn, type, description, price }: {
  name: string; nameEn: string; type: string; description: string; price: string;
}) {
  return (
    <div className={styles.sakeCard}>
      <div className={styles.sakeImage}>
        <span className={styles.sakeImageLabel}>BOTTLE</span>
      </div>
      <div className={styles.sakeInfo}>
        <span className={styles.sakeNameEn}>{nameEn}</span>
        <h3 className={styles.sakeName}>{name}</h3>
        <span className={styles.sakeType}>{type}</span>
        <div className={styles.sakeDivider} />
        <p className={styles.sakeDesc}>{description}</p>
        <span className={styles.sakePrice}>{price}</span>
      </div>
    </div>
  );
}

function SakeSection() {
  return (
    <section className={styles.sakeSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>LINEUP</span>
        <h2 className={styles.sectionTitle}>銘酒ラインナップ</h2>
      </div>
      <div className={styles.sakeGrid}>
        <SakeCard
          name="月光 大吟醸"
          nameEn="GEKKOU DAIGINJO"
          type="大吟醸 / 精米歩合35%"
          description="月光の名を冠するフラッグシップ。華やかな吟醸香と透明感のある味わいが特徴。冷やしてワイングラスでお楽しみください。"
          price="¥5,500"
        />
        <SakeCard
          name="月影 純米吟醸"
          nameEn="TSUKIKAGE JUNMAI"
          type="純米吟醸 / 精米歩合50%"
          description="穏やかな香りとまろやかな口当たり。料理との相性が抜群で、和食はもちろん洋食にも合う万能な一本。"
          price="¥3,300"
        />
        <SakeCard
          name="銀河 特別純米"
          nameEn="GINGA TOKUBETSU"
          type="特別純米 / 精米歩合60%"
          description="米の旨味をしっかり感じられる辛口タイプ。燗にしても冷やしても美味しい、日常に寄り添う定番酒。"
          price="¥2,200"
        />
        <SakeCard
          name="雫 スパークリング"
          nameEn="SHIZUKU SPARKLING"
          type="スパークリング / 微発泡"
          description="瓶内二次発酵による自然な泡立ち。フルーティーで軽やかな味わいは日本酒初心者にもおすすめ。"
          price="¥2,800"
        />
      </div>
    </section>
  );
}

function ProcessStep({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className={styles.processCard}>
      <div className={styles.processNumber}>{number}</div>
      <h3 className={styles.processTitle}>{title}</h3>
      <div className={styles.processDivider} />
      <p className={styles.processDesc}>{description}</p>
    </div>
  );
}

function ProcessSection() {
  return (
    <section className={styles.processSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>PROCESS</span>
        <h2 className={styles.sectionTitle}>醸造工程</h2>
      </div>
      <div className={styles.processGrid}>
        <ProcessStep
          number="01"
          title="精米・洗米"
          description="厳選した酒米を丁寧に磨き上げ、清冽な湧水で洗米。米の中心にある心白を活かすため、時間をかけて精米します。"
        />
        <ProcessStep
          number="02"
          title="麹づくり"
          description="蒸した米に麹菌を振りかけ、約48時間かけて麹を育てます。温度と湿度を職人が五感で管理する最重要工程。"
        />
        <ProcessStep
          number="03"
          title="仕込み・発酵"
          description="麹、蒸米、水を三段階に分けて仕込み。低温でゆっくりと発酵させることで、繊細な香りと味わいを引き出します。"
        />
        <ProcessStep
          number="04"
          title="搾り・熟成"
          description="醪を丁寧に搾り、新酒を得ます。その後、蔵内の冷暗所でじっくりと熟成。時間が生み出す深い味わいをお届けします。"
        />
      </div>
    </section>
  );
}

function TourSection() {
  return (
    <section className={styles.tourSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>BREWERY TOUR</span>
        <h2 className={styles.sectionTitle}>蔵見学のご案内</h2>
      </div>
      <div className={styles.tourContent}>
        <div className={styles.tourImage}>
          <span className={styles.tourImageLabel}>BREWERY</span>
        </div>
        <div className={styles.tourInfo}>
          <div className={styles.tourRow}>
            <span className={styles.tourLabel}>開催日</span>
            <span className={styles.tourValue}>毎週土曜・日曜 10:00 / 14:00</span>
          </div>
          <div className={styles.tourRow}>
            <span className={styles.tourLabel}>所要時間</span>
            <span className={styles.tourValue}>約90分（試飲含む）</span>
          </div>
          <div className={styles.tourRow}>
            <span className={styles.tourLabel}>料金</span>
            <span className={styles.tourValue}>お一人様 ¥2,000（試飲3種付き）</span>
          </div>
          <div className={styles.tourRow}>
            <span className={styles.tourLabel}>定員</span>
            <span className={styles.tourValue}>各回10名様まで</span>
          </div>
          <div className={styles.tourRow}>
            <span className={styles.tourLabel}>住所</span>
            <span className={styles.tourValue}>新潟県南魚沼市月光町1-2-3</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaContent}>
        <span className={styles.ctaLabel}>ONLINE SHOP</span>
        <h2 className={styles.ctaTitle}>月光の酒をご自宅で</h2>
        <p className={styles.ctaSubtitle}>
          全国送料無料でお届けいたします<br />
          ギフト包装・のし対応も承ります
        </p>
        <button className={styles.ctaBtn}>オンラインショップへ</button>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span className={styles.footerBrand}>酒蔵 月光 GEKKOU</span>
        <p className={styles.footerCopy}>&copy; 2026 酒蔵月光 All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseSakeLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <SakeSection />
      <ProcessSection />
      <TourSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}
