import styles from './JapaneseSmartHomeLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>LIVIO <span className={styles.brandJa}>リヴィオ</span></span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>機能</a>
          <a href="#" className={styles.navLink}>製品</a>
          <a href="#" className={styles.navLink}>導入の流れ</a>
          <a href="#" className={styles.navLink}>お客様の声</a>
        </div>
        <button className={styles.navCta}>無料相談</button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        <span className={styles.heroLabel}>SMART HOME SYSTEM</span>
        <h1 className={styles.heroTitle}>暮らしを、<br />もっとスマートに</h1>
        <p className={styles.heroSubtitle}>
          照明、空調、セキュリティ。すべてをひとつに。<br />
          AIが学習し、あなたの理想の住まいを実現します。
        </p>
        <div className={styles.heroActions}>
          <button className={styles.heroPrimary}>無料相談を予約</button>
          <button className={styles.heroSecondary}>製品デモを見る</button>
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
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>FEATURES</span>
        <h2 className={styles.sectionTitle}>6つのスマート機能</h2>
        <p className={styles.sectionSubtitle}>家中のデバイスをシームレスに連携。快適な暮らしをワンタップで。</p>
      </div>
      <div className={styles.featureGrid}>
        <FeatureCard
          icon="💡"
          title="スマート照明"
          description="時間帯や気分に合わせて、照明を自動調整。シーン設定で一括コントロール。"
        />
        <FeatureCard
          icon="🔐"
          title="セキュリティ"
          description="顔認証ドアロック、侵入検知、リアルタイム通知。家族の安全を24時間守ります。"
        />
        <FeatureCard
          icon="❄️"
          title="空調管理"
          description="AIが室温・湿度を学習し、最適な環境を自動維持。省エネ効果も抜群。"
        />
        <FeatureCard
          icon="🎤"
          title="音声操作"
          description="「おはよう」の一言ですべてが動き出す。主要な音声アシスタントに対応。"
        />
        <FeatureCard
          icon="⚡"
          title="エネルギー管理"
          description="電力消費をリアルタイムで可視化。太陽光発電との連携で電気代を最適化。"
        />
        <FeatureCard
          icon="📹"
          title="見守りカメラ"
          description="4K対応カメラで室内外を確認。お子様やペットの見守りにも活用できます。"
        />
      </div>
    </section>
  );
}

function PackageCard({
  name,
  price,
  description,
  features,
  highlighted,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}) {
  return (
    <div className={`${styles.packageCard} ${highlighted ? styles.packageHighlighted : ''}`}>
      {highlighted && <span className={styles.packageBadge}>人気No.1</span>}
      <h3 className={styles.packageName}>{name}</h3>
      <p className={styles.packagePrice}>{price}</p>
      <p className={styles.packageDesc}>{description}</p>
      <ul className={styles.packageFeatures}>
        {features.map((f, i) => (
          <li key={i} className={styles.packageFeature}>{f}</li>
        ))}
      </ul>
      <button className={highlighted ? styles.packageCtaHighlighted : styles.packageCta}>
        {highlighted ? '今すぐ相談' : '詳しく見る'}
      </button>
    </div>
  );
}

function ProductSection() {
  return (
    <section className={styles.products}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabelLight}>PRODUCT LINEUP</span>
        <h2 className={styles.sectionTitleLight}>製品ラインナップ</h2>
      </div>
      <div className={styles.packageGrid}>
        <PackageCard
          name="LIVIO Lite"
          price="¥198,000〜"
          description="スマートホームを気軽に始めたい方に。基本機能を厳選したエントリーモデル。"
          features={['スマート照明（4部屋）', '音声操作対応', 'スマートロック', 'スマホアプリ管理']}
        />
        <PackageCard
          name="LIVIO Standard"
          price="¥398,000〜"
          description="家族みんなが快適に。充実の機能でスマートライフを実現。"
          features={['スマート照明（全室）', 'セキュリティシステム', 'AI空調管理', '音声操作対応', 'エネルギーモニター']}
          highlighted
        />
        <PackageCard
          name="LIVIO Premium"
          price="¥698,000〜"
          description="最先端のテクノロジーで、究極のスマートホームを。"
          features={['Standardの全機能', '4K見守りカメラ（4台）', '太陽光発電連携', 'カスタムシーン無制限', '専任サポート']}
        />
      </div>
    </section>
  );
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className={styles.stepCard}>
      <div className={styles.stepNumber}>{number}</div>
      <h3 className={styles.stepTitle}>{title}</h3>
      <p className={styles.stepDesc}>{description}</p>
    </div>
  );
}

function InstallationSection() {
  return (
    <section className={styles.installation}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>INSTALLATION</span>
        <h2 className={styles.sectionTitle}>導入の流れ</h2>
        <p className={styles.sectionSubtitle}>ご相談から導入まで、最短2週間で完了します。</p>
      </div>
      <div className={styles.stepsGrid}>
        <StepCard number="01" title="無料相談" description="お住まいの間取りやご要望をヒアリング。最適なプランをご提案します。" />
        <StepCard number="02" title="プラン設計" description="専任エンジニアが設置場所やデバイス構成を設計。お見積もりをご提示。" />
        <StepCard number="03" title="設置工事" description="経験豊富な技術者が丁寧に設置。配線もすっきり美しく仕上げます。" />
        <StepCard number="04" title="操作レクチャー" description="ご家族全員への操作説明と初期設定。導入後のサポートも万全です。" />
      </div>
    </section>
  );
}

function TestimonialCard({ name, role, text }: { name: string; role: string; text: string }) {
  return (
    <div className={styles.testimonialCard}>
      <p className={styles.testimonialText}>{text}</p>
      <div className={styles.testimonialAuthor}>
        <div className={styles.testimonialAvatar} />
        <div>
          <p className={styles.testimonialName}>{name}</p>
          <p className={styles.testimonialRole}>{role}</p>
        </div>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  return (
    <section className={styles.testimonials}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabelLight}>TESTIMONIALS</span>
        <h2 className={styles.sectionTitleLight}>お客様の声</h2>
      </div>
      <div className={styles.testimonialGrid}>
        <TestimonialCard
          name="田中 健太郎さん"
          role="LIVIO Standard / 戸建て"
          text="「おはよう」と言うだけでカーテンが開き、照明がつき、コーヒーメーカーが動き出す。この体験は本当に感動的です。家族全員がスマートホームの虜になりました。"
        />
        <TestimonialCard
          name="佐藤 美穂さん"
          role="LIVIO Premium / マンション"
          text="子供が帰宅すると自動で通知が届くので安心です。エネルギー管理で電気代が月3,000円以上節約できているのも嬉しいポイント。導入して本当によかったです。"
        />
      </div>
    </section>
  );
}

function ConsultationSection() {
  return (
    <section className={styles.consultation}>
      <div className={styles.consultContent}>
        <h2 className={styles.consultTitle}>まずは無料相談から</h2>
        <p className={styles.consultSubtitle}>
          専門スタッフがお住まいに最適なスマートホームプランをご提案。<br />
          オンラインまたはご自宅での相談が可能です。
        </p>
        <div className={styles.consultActions}>
          <button className={styles.consultPrimary}>無料相談を予約する</button>
          <button className={styles.consultSecondary}>資料をダウンロード</button>
        </div>
        <p className={styles.consultNote}>相談無料 / 強引な営業は一切いたしません</p>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrandBlock}>
            <span className={styles.footerBrand}>LIVIO</span>
            <p className={styles.footerTagline}>暮らしを、もっとスマートに</p>
          </div>
          <div className={styles.footerColumns}>
            <div className={styles.footerCol}>
              <span className={styles.footerColTitle}>製品</span>
              <a href="#" className={styles.footerLink}>LIVIO Lite</a>
              <a href="#" className={styles.footerLink}>LIVIO Standard</a>
              <a href="#" className={styles.footerLink}>LIVIO Premium</a>
            </div>
            <div className={styles.footerCol}>
              <span className={styles.footerColTitle}>サポート</span>
              <a href="#" className={styles.footerLink}>よくある質問</a>
              <a href="#" className={styles.footerLink}>お問い合わせ</a>
              <a href="#" className={styles.footerLink}>保証について</a>
            </div>
            <div className={styles.footerCol}>
              <span className={styles.footerColTitle}>会社情報</span>
              <a href="#" className={styles.footerLink}>会社概要</a>
              <a href="#" className={styles.footerLink}>採用情報</a>
              <a href="#" className={styles.footerLink}>プライバシーポリシー</a>
            </div>
          </div>
        </div>
        <div className={styles.footerDivider} />
        <p className={styles.footerCopy}>&copy; 2026 LIVIO Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseSmartHomeLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <FeaturesSection />
      <ProductSection />
      <InstallationSection />
      <TestimonialsSection />
      <ConsultationSection />
      <FooterSection />
    </div>
  );
}
