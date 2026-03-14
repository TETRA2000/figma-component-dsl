import styles from './JapaneseCosmeticsLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>SAKURA BEAUTY</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>商品一覧</a>
          <a href="#" className={styles.navLink}>成分について</a>
          <a href="#" className={styles.navLink}>お客様の声</a>
          <a href="#" className={styles.navLink}>お問い合わせ</a>
        </div>
        <button className={styles.navCta}>今すぐ購入</button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <span className={styles.heroBadge}>新発売</span>
        <h1 className={styles.heroTitle}>
          あなたの肌に<br />
          <span className={styles.heroAccent}>自然の恵みを</span>
        </h1>
        <p className={styles.heroSubtitle}>
          日本古来の美容成分と最新テクノロジーが融合した<br />
          プレミアムスキンケアシリーズ
        </p>
        <div className={styles.heroActions}>
          <button className={styles.primaryBtn}>詳しく見る</button>
          <button className={styles.secondaryBtn}>無料サンプル</button>
        </div>
      </div>
      <div className={styles.heroImage}>
        <div className={styles.productPlaceholder}>
          <div className={styles.productBottle} />
          <div className={styles.productGlow} />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureIcon}>{icon}</div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDesc}>{description}</p>
    </div>
  );
}

function FeaturesSection() {
  return (
    <section className={styles.features}>
      <h2 className={styles.sectionTitle}>こだわりの3つのポイント</h2>
      <p className={styles.sectionSubtitle}>お肌のことを第一に考えた処方設計</p>
      <div className={styles.featureGrid}>
        <FeatureCard
          icon="🌸"
          title="天然由来成分98%"
          description="桜エキス・米ぬか・椿オイルなど、日本の自然が育んだ美容成分をたっぷり配合"
        />
        <FeatureCard
          icon="🧪"
          title="皮膚科医監修"
          description="敏感肌の方にも安心してお使いいただけるよう、皮膚科専門医が処方を監修"
        />
        <FeatureCard
          icon="🌿"
          title="無添加処方"
          description="パラベン・合成着色料・鉱物油不使用。お肌に優しい無添加処方にこだわりました"
        />
      </div>
    </section>
  );
}

function ProductCard({ name, price, tag }: { name: string; price: string; tag?: string }) {
  return (
    <div className={styles.productCard}>
      <div className={styles.productImgArea}>
        {tag && <span className={styles.productTag}>{tag}</span>}
      </div>
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{name}</h3>
        <p className={styles.productPrice}>{price}</p>
      </div>
    </div>
  );
}

function ProductsSection() {
  return (
    <section className={styles.products}>
      <h2 className={styles.sectionTitle}>人気商品</h2>
      <p className={styles.sectionSubtitle}>お客様に愛されるベストセラー商品</p>
      <div className={styles.productGrid}>
        <ProductCard name="桜モイスチャークリーム" price="¥4,980" tag="BEST SELLER" />
        <ProductCard name="米ぬか洗顔フォーム" price="¥2,480" />
        <ProductCard name="椿オイル美容液" price="¥6,980" tag="NEW" />
        <ProductCard name="抹茶フェイスマスク" price="¥1,980" />
      </div>
    </section>
  );
}

function TestimonialCard({ name, text, rating }: { name: string; text: string; rating: number }) {
  return (
    <div className={styles.testimonialCard}>
      <div className={styles.stars}>{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</div>
      <p className={styles.testimonialText}>{text}</p>
      <div className={styles.testimonialAuthor}>
        <div className={styles.authorAvatar} />
        <span className={styles.authorName}>{name}</span>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  return (
    <section className={styles.testimonials}>
      <h2 className={styles.sectionTitle}>お客様の声</h2>
      <p className={styles.sectionSubtitle}>実際にご使用いただいたお客様からの感想</p>
      <div className={styles.testimonialGrid}>
        <TestimonialCard
          name="田中 美咲 様"
          text="使い始めて2週間で肌のハリが変わりました。朝のスキンケアが楽しみになりました。"
          rating={5}
        />
        <TestimonialCard
          name="佐藤 花子 様"
          text="敏感肌ですが、刺激もなく安心して使えています。香りも自然で心地よいです。"
          rating={5}
        />
        <TestimonialCard
          name="鈴木 優子 様"
          text="母と一緒に使っています。年齢に関係なく使える万能クリームです。"
          rating={4}
        />
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>初回限定 50%OFF</h2>
        <p className={styles.ctaSubtitle}>今なら送料無料＆30日間返金保証付き</p>
        <div className={styles.ctaPricing}>
          <span className={styles.ctaOriginal}>¥9,960</span>
          <span className={styles.ctaSale}>¥4,980</span>
        </div>
        <button className={styles.ctaButton}>今すぐ申し込む</button>
        <p className={styles.ctaNote}>※ 定期縛りなし・いつでも解約可能</p>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <span className={styles.footerLogo}>SAKURA BEAUTY</span>
          <p className={styles.footerTagline}>日本の美を、あなたの肌へ</p>
        </div>
        <div className={styles.footerLinks}>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>商品</h4>
            <a href="#" className={styles.footerLink}>スキンケア</a>
            <a href="#" className={styles.footerLink}>メイクアップ</a>
            <a href="#" className={styles.footerLink}>ボディケア</a>
          </div>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>サポート</h4>
            <a href="#" className={styles.footerLink}>よくある質問</a>
            <a href="#" className={styles.footerLink}>お問い合わせ</a>
            <a href="#" className={styles.footerLink}>返品・交換</a>
          </div>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>会社情報</h4>
            <a href="#" className={styles.footerLink}>会社概要</a>
            <a href="#" className={styles.footerLink}>プライバシーポリシー</a>
            <a href="#" className={styles.footerLink}>特定商取引法に基づく表記</a>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>© 2026 SAKURA BEAUTY. All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseCosmeticsLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <FeaturesSection />
      <ProductsSection />
      <TestimonialsSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}
