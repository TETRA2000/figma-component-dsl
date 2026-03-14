import styles from './JapaneseCampingLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>WILD BASE</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>コンセプト</a>
          <a href="#" className={styles.navLink}>カテゴリー</a>
          <a href="#" className={styles.navLink}>商品一覧</a>
          <a href="#" className={styles.navLink}>キャンプ場</a>
          <a href="#" className={styles.navLink}>ストーリー</a>
        </div>
        <button className={styles.navCta}>SHOP</button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroAccent} />
      <div className={styles.heroContent}>
        <span className={styles.heroLabel}>OUTDOOR GEAR BRAND</span>
        <h1 className={styles.heroTitle}>自然と、本気で遊ぼう</h1>
        <p className={styles.heroSubtitle}>
          日本の四季を知り尽くしたキャンプギアブランド。<br />
          厳選された素材と職人の技術で、あなたのアウトドアを支える。
        </p>
        <div className={styles.heroBtnGroup}>
          <button className={styles.heroBtnPrimary}>商品を見る</button>
          <button className={styles.heroBtnSecondary}>ブランドストーリー</button>
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
      <div className={styles.categoryDivider} />
      <p className={styles.categoryDesc}>{description}</p>
    </div>
  );
}

function CategoriesSection() {
  return (
    <section className={styles.categories}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>CATEGORIES</span>
        <h2 className={styles.sectionTitle}>プロダクトカテゴリー</h2>
      </div>
      <div className={styles.categoriesGrid}>
        <CategoryCard icon="TENT" title="テント" description="軽量かつ高耐久。日本の気候に最適化された構造で、四季を通じて快適な居住空間を提供。" />
        <CategoryCard icon="COOK" title="クッキング" description="コンパクトに収納できる調理器具。アウトドアでも本格的な料理を楽しめる逸品揃い。" />
        <CategoryCard icon="SLEEP" title="スリーピング" description="極寒から真夏まで対応するシュラフとマット。快適な睡眠がアウトドアの質を変える。" />
        <CategoryCard icon="LIGHT" title="ライティング" description="LEDからオイルランタンまで。自然の中で過ごす夜を、暖かく美しく照らします。" />
      </div>
    </section>
  );
}

function ProductCard({ name, category, price, description }: { name: string; category: string; price: string; description: string }) {
  return (
    <div className={styles.productCard}>
      <div className={styles.productImage} />
      <div className={styles.productInfo}>
        <span className={styles.productCategory}>{category}</span>
        <h3 className={styles.productName}>{name}</h3>
        <p className={styles.productDesc}>{description}</p>
        <p className={styles.productPrice}>{price}</p>
      </div>
    </div>
  );
}

function ProductsSection() {
  return (
    <section className={styles.products}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>FEATURED</span>
        <h2 className={styles.sectionTitle}>注目のアイテム</h2>
      </div>
      <div className={styles.productsGrid}>
        <ProductCard
          name="SUMMIT DOME 2P"
          category="TENT"
          price="¥49,800"
          description="2人用の軽量ドームテント。ダブルウォール構造で結露を防ぎ、4シーズン対応。重量わずか1.8kg。"
        />
        <ProductCard
          name="FOREST BURNER PRO"
          category="COOKING"
          price="¥12,800"
          description="高火力コンパクトバーナー。風防一体型で安定した炎を実現。ソロからファミリーまで。"
        />
        <ProductCard
          name="AURORA LANTERN"
          category="LIGHTING"
          price="¥8,500"
          description="USB充電式LEDランタン。暖色から白色まで無段階調光。最大400ルーメン、連続36時間。"
        />
      </div>
    </section>
  );
}

function CampsiteCard({ name, location, features }: { name: string; location: string; features: string }) {
  return (
    <div className={styles.campsiteCard}>
      <div className={styles.campsiteImg} />
      <div className={styles.campsiteInfo}>
        <h3 className={styles.campsiteName}>{name}</h3>
        <p className={styles.campsiteLocation}>{location}</p>
        <p className={styles.campsiteFeatures}>{features}</p>
      </div>
    </div>
  );
}

function CampsiteSection() {
  return (
    <section className={styles.campsite}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>PARTNERS</span>
        <h2 className={styles.sectionTitle}>提携キャンプ場</h2>
      </div>
      <div className={styles.campsiteList}>
        <CampsiteCard
          name="ふもとっぱらキャンプ場"
          location="静岡県富士宮市"
          features="富士山の絶景を独占できるフリーサイト。広大な草原で開放感抜群。WILD BASE製品のレンタル・試用が可能。"
        />
        <CampsiteCard
          name="北軽井沢スウィートグラス"
          location="群馬県長野原町"
          features="四季折々の美しい高原キャンプ場。薪ストーブ付きコテージも。WILD BASE直営ショップ併設。"
        />
        <CampsiteCard
          name="笠置キャンプ場"
          location="京都府笠置町"
          features="木津川沿いの自然豊かなキャンプ場。関西エリアの拠点として、ギアの展示・体験イベントを定期開催。"
        />
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section className={styles.story}>
      <div className={styles.storyImage} />
      <div className={styles.storyContent}>
        <span className={styles.sectionLabel}>OUR STORY</span>
        <h2 className={styles.storyTitle}>自然への敬意を、<br />ギアに込めて。</h2>
        <p className={styles.storyText}>
          WILD BASE は2018年、長野県の小さな工房から始まりました。「日本の自然を、日本のギアで楽しむ」という想いのもと、国産素材にこだわり、職人の手で一つひとつ丁寧に作り上げています。
        </p>
        <p className={styles.storyText}>
          大量生産ではなく、品質と耐久性を追求。使い込むほどに味わいが増し、一生寄り添えるギアを目指しています。
        </p>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaGlow} />
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>キャンプシーズン到来</h2>
        <p className={styles.ctaSubtitle}>
          今なら新規会員登録で全商品10% OFF。<br />
          送料無料キャンペーンも実施中。
        </p>
        <button className={styles.ctaBtn}>オンラインショップへ</button>
        <p className={styles.ctaNote}>※ 初回購入に限り30日間返品保証</p>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span className={styles.footerBrand}>WILD BASE ワイルドベース</span>
        <div className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}>カテゴリー</a>
          <a href="#" className={styles.footerLink}>商品一覧</a>
          <a href="#" className={styles.footerLink}>キャンプ場</a>
          <a href="#" className={styles.footerLink}>ブランド</a>
          <a href="#" className={styles.footerLink}>お問い合わせ</a>
          <a href="#" className={styles.footerLink}>特定商取引法</a>
        </div>
        <div className={styles.footerDivider} />
        <p className={styles.footerCopy}>© 2026 WILD BASE All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseCampingLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <CategoriesSection />
      <ProductsSection />
      <CampsiteSection />
      <StorySection />
      <CtaSection />
      <FooterSection />
    </div>
  );
}
