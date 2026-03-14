import styles from './JapanesePetGroomingLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>🐾 ペットサロン ぽかぽか</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>サービス</a>
          <a href="#" className={styles.navLink}>料金</a>
          <a href="#" className={styles.navLink}>ギャラリー</a>
          <a href="#" className={styles.navLink}>お客様の声</a>
          <a href="#" className={styles.navLink}>ご予約</a>
        </div>
        <button className={styles.bookBtn}>今すぐ予約</button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          大切な家族に<br />プロのケアを
        </h1>
        <p className={styles.heroSubtitle}>
          愛するペットの健康と美しさを守る、<br />
          やさしさあふれるグルーミングサロンです。
        </p>
        <div className={styles.heroActions}>
          <button className={styles.primaryBtn}>無料カウンセリング</button>
          <button className={styles.secondaryBtn}>サービスを見る</button>
        </div>
      </div>
      <div className={styles.heroImagePlaceholder}>
        <span className={styles.heroImageText}>🐕 ペットイメージ</span>
      </div>
    </section>
  );
}

function ServiceCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className={styles.serviceCard}>
      <div className={styles.serviceIcon}>{icon}</div>
      <h3 className={styles.serviceTitle}>{title}</h3>
      <p className={styles.serviceDesc}>{description}</p>
    </div>
  );
}

function ServicesSection() {
  return (
    <section className={styles.services}>
      <h2 className={styles.sectionTitle}>サービス一覧</h2>
      <p className={styles.sectionSubtitle}>大切なペットに合わせた多彩なケアメニュー</p>
      <div className={styles.serviceGrid}>
        <ServiceCard icon="✂️" title="トリミング" description="犬種に合わせたカットスタイルで、可愛さを最大限に引き出します。" />
        <ServiceCard icon="🛁" title="シャンプー・ブロー" description="低刺激の天然シャンプーで、ふわふわの仕上がりに。" />
        <ServiceCard icon="🦷" title="デンタルケア" description="歯磨きや口腔ケアで、健康な歯と息を保ちます。" />
        <ServiceCard icon="💅" title="爪切り・耳掃除" description="定期的なお手入れで、清潔で快適な状態をキープ。" />
        <ServiceCard icon="🧴" title="スパトリートメント" description="保湿パックやマッサージで、毛並みと肌を美しく。" />
        <ServiceCard icon="🏥" title="健康チェック" description="グルーミング時に皮膚や健康状態を丁寧にチェック。" />
      </div>
    </section>
  );
}

function PriceMenu() {
  return (
    <section className={styles.priceSection}>
      <h2 className={styles.sectionTitle}>料金メニュー</h2>
      <p className={styles.sectionSubtitle}>すべてのメニューにシャンプー・ブロー込み</p>
      <div className={styles.priceTable}>
        <div className={styles.priceRow}>
          <span className={styles.priceLabel}>小型犬 トリミングコース</span>
          <span className={styles.priceValue}>¥5,500〜</span>
        </div>
        <div className={styles.priceRow}>
          <span className={styles.priceLabel}>中型犬 トリミングコース</span>
          <span className={styles.priceValue}>¥7,700〜</span>
        </div>
        <div className={styles.priceRow}>
          <span className={styles.priceLabel}>大型犬 トリミングコース</span>
          <span className={styles.priceValue}>¥11,000〜</span>
        </div>
        <div className={styles.priceRow}>
          <span className={styles.priceLabel}>シャンプー・ブローのみ</span>
          <span className={styles.priceValue}>¥3,300〜</span>
        </div>
        <div className={styles.priceRow}>
          <span className={styles.priceLabel}>デンタルケア</span>
          <span className={styles.priceValue}>¥1,100</span>
        </div>
        <div className={styles.priceRow}>
          <span className={styles.priceLabel}>スパトリートメント</span>
          <span className={styles.priceValue}>¥2,200〜</span>
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section className={styles.gallery}>
      <h2 className={styles.sectionTitle}>ギャラリー</h2>
      <p className={styles.sectionSubtitle}>施術前後のビフォーアフターをご覧ください</p>
      <div className={styles.galleryGrid}>
        {['トイプードル', 'ポメラニアン', 'シーズー', 'マルチーズ', 'ヨークシャーテリア', 'ミニチュアシュナウザー'].map((breed, i) => (
          <div key={i} className={styles.galleryItem}>
            <div className={styles.galleryImage}>🐶</div>
            <span className={styles.galleryLabel}>{breed}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialCard({ name, pet, comment }: { name: string; pet: string; comment: string }) {
  return (
    <div className={styles.testimonialCard}>
      <p className={styles.testimonialComment}>「{comment}」</p>
      <div className={styles.testimonialAuthor}>
        <div className={styles.testimonialAvatar}>👤</div>
        <div>
          <span className={styles.testimonialName}>{name}</span>
          <span className={styles.testimonialPet}>{pet}</span>
        </div>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  return (
    <section className={styles.testimonials}>
      <h2 className={styles.sectionTitle}>お客様の声</h2>
      <p className={styles.sectionSubtitle}>たくさんの飼い主さまからお喜びの声をいただいています</p>
      <div className={styles.testimonialGrid}>
        <TestimonialCard name="田中さま" pet="トイプードル・ココちゃん" comment="いつもふわふわに仕上げてもらえて大満足です。スタッフの方も優しくて安心して預けられます。" />
        <TestimonialCard name="佐藤さま" pet="ポメラニアン・モコちゃん" comment="怖がりなうちの子も、ここなら落ち着いて過ごせるみたいです。毎月通っています。" />
        <TestimonialCard name="鈴木さま" pet="シーズー・ハナちゃん" comment="デンタルケアも一緒にお願いできるのが嬉しいです。仕上がりもいつも完璧です。" />
      </div>
    </section>
  );
}

function BookingCTA() {
  return (
    <section className={styles.bookingCta}>
      <h2 className={styles.ctaTitle}>ご予約・お問い合わせ</h2>
      <p className={styles.ctaSubtitle}>初回限定20%OFF！お気軽にお問い合わせください。</p>
      <div className={styles.ctaActions}>
        <button className={styles.ctaPrimaryBtn}>オンライン予約</button>
        <button className={styles.ctaPhoneBtn}>📞 03-1234-5678</button>
      </div>
      <p className={styles.ctaNote}>営業時間：10:00〜19:00（火曜定休）</p>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <span className={styles.footerLogo}>🐾 ペットサロン ぽかぽか</span>
          <p className={styles.footerTagline}>大切な家族にプロのケアを</p>
          <p className={styles.footerAddress}>〒150-0001 東京都渋谷区神宮前1-2-3</p>
        </div>
        <div className={styles.footerLinks}>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>メニュー</h4>
            <a href="#" className={styles.footerLink}>サービス一覧</a>
            <a href="#" className={styles.footerLink}>料金表</a>
            <a href="#" className={styles.footerLink}>ギャラリー</a>
          </div>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>サロン情報</h4>
            <a href="#" className={styles.footerLink}>スタッフ紹介</a>
            <a href="#" className={styles.footerLink}>アクセス</a>
            <a href="#" className={styles.footerLink}>よくある質問</a>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>© 2026 ペットサロン ぽかぽか All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapanesePetGroomingLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <ServicesSection />
      <PriceMenu />
      <GallerySection />
      <TestimonialsSection />
      <BookingCTA />
      <FooterSection />
    </div>
  );
}
