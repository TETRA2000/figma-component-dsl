import styles from './JapaneseOrganicShopLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>大地の恵み</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>こだわり</a>
          <a href="#" className={styles.navLink}>商品一覧</a>
          <a href="#" className={styles.navLink}>生産者紹介</a>
          <a href="#" className={styles.navLink}>配送について</a>
          <a href="#" className={styles.navLink}>お問い合わせ</a>
        </div>
        <button className={styles.navCta}>お試しセット</button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        <span className={styles.heroLabel}>ORGANIC FOOD SHOP</span>
        <h1 className={styles.heroTitle}>自然の恵みを食卓に</h1>
        <p className={styles.heroSubtitle}>
          全国の契約農家から届く、農薬不使用・有機栽培の新鮮野菜と食材。<br />
          安心・安全なオーガニックフードで、家族の健康を守ります。
        </p>
        <div className={styles.heroBtnGroup}>
          <button className={styles.heroBtnPrimary}>お試しセットを注文する</button>
          <button className={styles.heroBtnSecondary}>商品一覧を見る</button>
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
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>CATEGORIES</span>
        <h2 className={styles.sectionTitle}>商品カテゴリ</h2>
      </div>
      <div className={styles.categoriesGrid}>
        <CategoryCard icon="🥬" title="有機野菜" description="旬の有機野菜を産地直送でお届け。農薬を使わず、土づくりからこだわった安心の野菜たちです。" />
        <CategoryCard icon="🍎" title="果物" description="太陽をたっぷり浴びて育ったオーガニックフルーツ。自然の甘みが凝縮された贅沢な味わい。" />
        <CategoryCard icon="🌾" title="お米・穀物" description="有機栽培のコシヒカリや玄米、雑穀など。毎日の主食を安心・安全なものに。" />
        <CategoryCard icon="🥚" title="卵・乳製品" description="平飼い卵や無添加の乳製品。のびのびと育った鶏や牛から届く、自然の恵み。" />
      </div>
    </section>
  );
}

function ProductCard({ name, farm, price }: { name: string; farm: string; price: string }) {
  return (
    <div className={styles.productCard}>
      <div className={styles.productImage} />
      <div className={styles.productInfo}>
        <span className={styles.productFarm}>{farm}</span>
        <h3 className={styles.productName}>{name}</h3>
        <p className={styles.productPrice}>{price}</p>
      </div>
    </div>
  );
}

function FeaturedSection() {
  return (
    <section className={styles.featured}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>FEATURED</span>
        <h2 className={styles.sectionTitle}>今週のおすすめ商品</h2>
      </div>
      <div className={styles.productsGrid}>
        <ProductCard name="有機ほうれん草セット" farm="山田農園（長野県）" price="¥980" />
        <ProductCard name="完熟トマト詰め合わせ" farm="太陽ファーム（熊本県）" price="¥1,480" />
        <ProductCard name="新米コシヒカリ 5kg" farm="田中農場（新潟県）" price="¥3,200" />
        <ProductCard name="平飼い卵 20個入り" farm="森のたまご牧場（千葉県）" price="¥1,200" />
      </div>
    </section>
  );
}

function FarmStorySection() {
  return (
    <section className={styles.farmStory}>
      <div className={styles.farmStoryInner}>
        <div className={styles.farmStoryImage} />
        <div className={styles.farmStoryContent}>
          <span className={styles.sectionLabel}>OUR STORY</span>
          <h2 className={styles.farmStoryTitle}>生産者とつながる、安心の食卓</h2>
          <p className={styles.farmStoryText}>
            私たちは全国50以上の契約農家と直接つながり、栽培方法から収穫、出荷まですべてのプロセスを管理しています。
            農薬や化学肥料に頼らず、土壌の力を最大限に引き出す有機農法で育てた作物だけをお届けします。
          </p>
          <p className={styles.farmStoryText}>
            定期的な農場訪問と品質検査を実施し、お客様に本当に安心できる食材をお届けすることをお約束します。
          </p>
          <button className={styles.farmStoryBtn}>生産者を知る</button>
        </div>
      </div>
    </section>
  );
}

function DeliveryCard({ title, description }: { title: string; description: string }) {
  return (
    <div className={styles.deliveryCard}>
      <div className={styles.deliveryIcon} />
      <h3 className={styles.deliveryTitle}>{title}</h3>
      <p className={styles.deliveryDesc}>{description}</p>
    </div>
  );
}

function DeliverySection() {
  return (
    <section className={styles.delivery}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>DELIVERY</span>
        <h2 className={styles.sectionTitle}>配送について</h2>
      </div>
      <div className={styles.deliveryGrid}>
        <DeliveryCard title="朝採れ即日出荷" description="午前中に収穫した野菜をその日のうちに出荷。最短翌日にはご自宅にお届けします。" />
        <DeliveryCard title="全国送料無料" description="5,000円以上のご注文で送料無料。定期便なら金額に関わらずいつでも送料無料です。" />
        <DeliveryCard title="鮮度保持パッケージ" description="野菜ごとに最適な温度・湿度管理を行い、鮮度を保ったままお届けする独自のパッケージ技術。" />
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaDecor} />
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>まずはお試しセットから</h2>
        <p className={styles.ctaSubtitle}>
          初回限定・送料無料の有機野菜お試しセット。<br />
          旬のおまかせ野菜8品目を特別価格でお届けします。
        </p>
        <div className={styles.ctaPriceBox}>
          <span className={styles.ctaOriginal}>通常 ¥3,980</span>
          <span className={styles.ctaSpecial}>初回限定 ¥1,980</span>
        </div>
        <button className={styles.ctaBtn}>お試しセットを注文する</button>
        <p className={styles.ctaNote}>※ 定期購入の縛りはありません。1回限りのお試しOK</p>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span className={styles.footerBrand}>大地の恵み</span>
        <div className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}>商品一覧</a>
          <a href="#" className={styles.footerLink}>定期便について</a>
          <a href="#" className={styles.footerLink}>生産者紹介</a>
          <a href="#" className={styles.footerLink}>よくある質問</a>
          <a href="#" className={styles.footerLink}>会社概要</a>
          <a href="#" className={styles.footerLink}>プライバシーポリシー</a>
        </div>
        <div className={styles.footerDivider} />
        <p className={styles.footerCopy}>© 2026 大地の恵み All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseOrganicShopLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <CategoriesSection />
      <FeaturedSection />
      <FarmStorySection />
      <DeliverySection />
      <CtaSection />
      <FooterSection />
    </div>
  );
}
