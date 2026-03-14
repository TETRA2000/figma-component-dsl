import styles from './JapaneseBakeryLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>こむぎ堂</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>こだわり</a>
          <a href="#" className={styles.navLink}>商品一覧</a>
          <a href="#" className={styles.navLink}>私たちの想い</a>
          <a href="#" className={styles.navLink}>アクセス</a>
        </div>
        <button className={styles.navCta}>オンライン注文</button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        <span className={styles.heroLabel}>ARTISAN BAKERY SINCE 2005</span>
        <h1 className={styles.heroTitle}>
          毎朝焼きたて<br />
          <span className={styles.heroTitleAccent}>手作りの幸せ</span>
        </h1>
        <p className={styles.heroSubtitle}>
          厳選した国産小麦と天然酵母で、ひとつひとつ丁寧に焼き上げる。<br />
          毎日食べても飽きない、素朴で温かいパンをお届けします。
        </p>
        <button className={styles.heroBtnPrimary}>商品を見る</button>
      </div>
    </section>
  );
}

function BreadCard({ name, price, description }: { name: string; price: string; description: string }) {
  return (
    <div className={styles.breadCard}>
      <div className={styles.breadPhoto} />
      <div className={styles.breadInfo}>
        <h3 className={styles.breadName}>{name}</h3>
        <p className={styles.breadDesc}>{description}</p>
        <span className={styles.breadPrice}>{price}</span>
      </div>
    </div>
  );
}

function ProductSection() {
  return (
    <section className={styles.products}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>OUR BREADS</span>
        <h2 className={styles.sectionTitle}>人気のパン</h2>
        <p className={styles.sectionDesc}>毎朝ひとつひとつ心を込めて焼き上げています。</p>
      </div>
      <div className={styles.productGrid}>
        <BreadCard
          name="天然酵母の食パン"
          price="¥380"
          description="自家培養の天然酵母でじっくり発酵。もちもちの食感と小麦本来の甘みが楽しめる看板商品です。"
        />
        <BreadCard
          name="くるみとレーズンのカンパーニュ"
          price="¥450"
          description="香ばしいくるみとジューシーなレーズンをたっぷり練り込んだ、食べ応えのあるハードパン。"
        />
        <BreadCard
          name="バターロール"
          price="¥160"
          description="北海道産発酵バターを贅沢に使用。ふわふわで口溶けの良い、お子様にも人気の定番パン。"
        />
        <BreadCard
          name="クロワッサン"
          price="¥280"
          description="36層に折り込んだ生地をサクサクに焼き上げ。芳醇なバターの香りが広がります。"
        />
        <BreadCard
          name="あんぱん"
          price="¥200"
          description="自家製つぶあんをしっとりとした生地で包みました。甘さ控えめで大人にも人気。"
        />
        <BreadCard
          name="フォカッチャ"
          price="¥320"
          description="オリーブオイルとローズマリーが香る、イタリア伝統のパン。ワインとの相性も抜群です。"
        />
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className={styles.about}>
      <div className={styles.aboutInner}>
        <div className={styles.aboutPhoto} />
        <div className={styles.aboutContent}>
          <span className={styles.sectionLabel}>OUR STORY</span>
          <h2 className={styles.aboutTitle}>私たちの想い</h2>
          <p className={styles.aboutText}>
            「毎日食べるものだからこそ、安心で美味しいものを。」
            <br /><br />
            創業者の祖母が焼いてくれた素朴なパンの味を原点に、
            2005年にこの小さなベーカリーを始めました。
            <br /><br />
            国産小麦100%、天然酵母、無添加にこだわり、
            季節の素材を活かしたパン作りを続けています。
            手間を惜しまず、時間をかけてじっくりと。
            それが私たちの変わらない信念です。
          </p>
        </div>
      </div>
    </section>
  );
}

function AccessSection() {
  return (
    <section className={styles.access}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>ACCESS &amp; HOURS</span>
        <h2 className={styles.sectionTitle}>アクセス・営業時間</h2>
      </div>
      <div className={styles.accessInner}>
        <div className={styles.accessMap} />
        <div className={styles.accessInfo}>
          <div className={styles.accessItem}>
            <span className={styles.accessLabel}>住所</span>
            <p className={styles.accessValue}>東京都世田谷区三軒茶屋2-14-8</p>
          </div>
          <div className={styles.accessItem}>
            <span className={styles.accessLabel}>営業時間</span>
            <p className={styles.accessValue}>7:00〜19:00（売り切れ次第終了）</p>
          </div>
          <div className={styles.accessItem}>
            <span className={styles.accessLabel}>定休日</span>
            <p className={styles.accessValue}>毎週月曜日・第3火曜日</p>
          </div>
          <div className={styles.accessItem}>
            <span className={styles.accessLabel}>最寄り駅</span>
            <p className={styles.accessValue}>東急田園都市線 三軒茶屋駅 徒歩5分</p>
          </div>
          <div className={styles.accessItem}>
            <span className={styles.accessLabel}>電話番号</span>
            <p className={styles.accessValue}>03-1234-5678</p>
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
        <span className={styles.footerBrand}>こむぎ堂</span>
        <div className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}>こだわり</a>
          <a href="#" className={styles.footerLink}>商品一覧</a>
          <a href="#" className={styles.footerLink}>私たちの想い</a>
          <a href="#" className={styles.footerLink}>アクセス</a>
          <a href="#" className={styles.footerLink}>プライバシーポリシー</a>
        </div>
        <div className={styles.footerDivider} />
        <p className={styles.footerCopy}>&copy; 2026 こむぎ堂 All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseBakeryLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <ProductSection />
      <AboutSection />
      <AccessSection />
      <FooterSection />
    </div>
  );
}
