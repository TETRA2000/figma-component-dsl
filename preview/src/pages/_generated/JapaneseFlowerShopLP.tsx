import styles from './JapaneseFlowerShopLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>花結び HANAMUSUBI</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>アレンジメント</a>
          <a href="#" className={styles.navLink}>人気商品</a>
          <a href="#" className={styles.navLink}>配送について</a>
          <a href="#" className={styles.navLink}>ご注文</a>
        </div>
        <button className={styles.navCta}>オンライン注文</button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <span className={styles.heroBadge}>FLOWER SHOP</span>
        <h1 className={styles.heroTitle}>
          花のある<br />
          <span className={styles.heroAccent}>暮らしを</span>
        </h1>
        <p className={styles.heroSubtitle}>
          季節の花々を丁寧にお届け。<br />
          大切な人への贈り物に、日々の暮らしに彩りを。
        </p>
        <div className={styles.heroActions}>
          <button className={styles.primaryBtn}>商品を見る</button>
          <button className={styles.secondaryBtn}>ギフト相談</button>
        </div>
      </div>
      <div className={styles.heroImage}>
        <div className={styles.flowerPlaceholder}>
          <div className={styles.flowerCircle} />
          <div className={styles.leafAccent} />
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className={styles.categoryCard}>
      <div className={styles.categoryIcon}>{icon}</div>
      <h3 className={styles.categoryTitle}>{title}</h3>
      <p className={styles.categoryDesc}>{description}</p>
    </div>
  );
}

function CategoriesSection() {
  return (
    <section className={styles.categories}>
      <h2 className={styles.sectionTitle}>アレンジメント</h2>
      <p className={styles.sectionSubtitle}>シーンに合わせた花をご用意しております</p>
      <div className={styles.categoryGrid}>
        <CategoryCard
          icon="💐"
          title="ブーケ"
          description="日常を彩る花束。誕生日・記念日のプレゼントにも最適です。"
        />
        <CategoryCard
          icon="💒"
          title="ウェディング"
          description="ブーケ・会場装花・テーブルフラワーなど、結婚式をトータルコーディネート。"
        />
        <CategoryCard
          icon="🕯️"
          title="お供え・仏花"
          description="故人を偲ぶ心を込めたアレンジメント。法要用もご用意いたします。"
        />
        <CategoryCard
          icon="🌸"
          title="季節の花"
          description="旬の花材を使った季節限定アレンジメント。四季の美しさをお届けします。"
        />
      </div>
    </section>
  );
}

function ItemCard({ name, description, price }: { name: string; description: string; price: string }) {
  return (
    <div className={styles.itemCard}>
      <div className={styles.itemImgArea} />
      <div className={styles.itemInfo}>
        <h3 className={styles.itemName}>{name}</h3>
        <p className={styles.itemDesc}>{description}</p>
        <p className={styles.itemPrice}>{price}</p>
      </div>
    </div>
  );
}

function PopularItemsSection() {
  return (
    <section className={styles.popularItems}>
      <h2 className={styles.sectionTitle}>人気商品</h2>
      <p className={styles.sectionSubtitle}>お客様に選ばれている人気のアレンジメント</p>
      <div className={styles.itemGrid}>
        <ItemCard
          name="季節のおまかせブーケ M"
          description="旬の花をフローリストがセレクト。ボリューム感たっぷりのブーケです。"
          price="¥4,400"
        />
        <ItemCard
          name="ローズガーデン"
          description="上品なバラを中心に、グリーンを添えた華やかなアレンジメント。"
          price="¥6,600"
        />
        <ItemCard
          name="ナチュラルバスケット"
          description="かごに季節の花を詰め込んだ、そのまま飾れるバスケットアレンジ。"
          price="¥5,500"
        />
      </div>
    </section>
  );
}

function DeliverySection() {
  return (
    <section className={styles.delivery}>
      <h2 className={styles.sectionTitle}>配送について</h2>
      <p className={styles.sectionSubtitle}>全国へ新鮮なお花をお届けいたします</p>
      <div className={styles.deliveryGrid}>
        <div className={styles.deliveryCard}>
          <div className={styles.deliveryIcon}>🚚</div>
          <h3 className={styles.deliveryCardTitle}>全国配送対応</h3>
          <p className={styles.deliveryCardDesc}>北海道から沖縄まで、全国へお届けいたします。</p>
        </div>
        <div className={styles.deliveryCard}>
          <div className={styles.deliveryIcon}>📅</div>
          <h3 className={styles.deliveryCardTitle}>日時指定可能</h3>
          <p className={styles.deliveryCardDesc}>ご希望の日時にお届け。午前・午後の指定も承ります。</p>
        </div>
        <div className={styles.deliveryCard}>
          <div className={styles.deliveryIcon}>🎁</div>
          <h3 className={styles.deliveryCardTitle}>ギフトラッピング</h3>
          <p className={styles.deliveryCardDesc}>メッセージカード付きのギフトラッピングを無料でご用意。</p>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>ご注文はこちらから</h2>
        <p className={styles.ctaSubtitle}>
          オンラインで簡単注文。<br />
          ¥5,500以上のご注文で送料無料。
        </p>
        <button className={styles.ctaButton}>オンラインショップへ</button>
        <p className={styles.ctaNote}>※ 当日配送は14時までのご注文に限ります</p>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <span className={styles.footerLogo}>花結び HANAMUSUBI</span>
          <p className={styles.footerTagline}>花のある暮らしを</p>
        </div>
        <div className={styles.footerLinks}>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>商品</h4>
            <a href="#" className={styles.footerLink}>ブーケ</a>
            <a href="#" className={styles.footerLink}>アレンジメント</a>
            <a href="#" className={styles.footerLink}>季節の花</a>
          </div>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>ご利用ガイド</h4>
            <a href="#" className={styles.footerLink}>ご注文方法</a>
            <a href="#" className={styles.footerLink}>配送について</a>
            <a href="#" className={styles.footerLink}>よくある質問</a>
          </div>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>店舗情報</h4>
            <a href="#" className={styles.footerLink}>店舗案内</a>
            <a href="#" className={styles.footerLink}>お問い合わせ</a>
            <a href="#" className={styles.footerLink}>プライバシーポリシー</a>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>© 2026 花結び HANAMUSUBI. All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseFlowerShopLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <CategoriesSection />
      <PopularItemsSection />
      <DeliverySection />
      <CTASection />
      <FooterSection />
    </div>
  );
}
