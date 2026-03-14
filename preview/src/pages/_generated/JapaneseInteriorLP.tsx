import styles from './JapaneseInteriorLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>空間工房 KUUKAN KOUBOU</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>サービス</a>
          <a href="#" className={styles.navLink}>施工事例</a>
          <a href="#" className={styles.navLink}>施工の流れ</a>
          <a href="#" className={styles.navLink}>お問い合わせ</a>
        </div>
        <button className={styles.navCta}>無料相談</button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroOverlay}>
        <span className={styles.heroBadge}>INTERIOR DESIGN</span>
        <h1 className={styles.heroTitle}>
          理想の空間を、<br />
          <span className={styles.heroAccent}>かたちに</span>
        </h1>
        <p className={styles.heroSubtitle}>
          住宅・商業施設・リノベーション<br />
          暮らしに寄り添う空間デザインをご提案します
        </p>
        <div className={styles.heroActions}>
          <button className={styles.primaryBtn}>施工事例を見る</button>
          <button className={styles.secondaryBtn}>無料相談はこちら</button>
        </div>
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
      <h2 className={styles.sectionTitle}>サービス</h2>
      <p className={styles.sectionSubtitle}>お客様のニーズに合わせた3つのサービス</p>
      <div className={styles.serviceGrid}>
        <ServiceCard
          icon="🏠"
          title="住宅デザイン"
          description="新築・注文住宅のインテリアデザイン。ご家族のライフスタイルに合わせた快適な住空間をご提案します。"
        />
        <ServiceCard
          icon="🏢"
          title="商業施設デザイン"
          description="オフィス・店舗・レストランなど商業空間のデザイン。ブランドイメージを反映した魅力的な空間を創造します。"
        />
        <ServiceCard
          icon="🔧"
          title="リノベーション"
          description="既存空間の改装・リノベーション。古い空間に新しい命を吹き込み、現代のライフスタイルに合わせて再生します。"
        />
      </div>
    </section>
  );
}

function ProcessStep({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className={styles.processStep}>
      <div className={styles.stepNumber}>{number}</div>
      <h3 className={styles.stepTitle}>{title}</h3>
      <p className={styles.stepDesc}>{description}</p>
    </div>
  );
}

function ProcessSection() {
  return (
    <section className={styles.process}>
      <h2 className={styles.sectionTitle}>施工の流れ</h2>
      <p className={styles.sectionSubtitle}>ご相談からお引き渡しまで丁寧にサポートいたします</p>
      <div className={styles.processFlow}>
        <ProcessStep number="01" title="無料相談" description="お客様のご要望やイメージをヒアリングいたします" />
        <div className={styles.processArrow}>→</div>
        <ProcessStep number="02" title="現地調査" description="施工場所の状態や寸法を詳しく調査いたします" />
        <div className={styles.processArrow}>→</div>
        <ProcessStep number="03" title="デザイン提案" description="3Dパースを用いたデザインプランをご提案します" />
        <div className={styles.processArrow}>→</div>
        <ProcessStep number="04" title="施工" description="熟練の職人が丁寧に施工いたします" />
        <div className={styles.processArrow}>→</div>
        <ProcessStep number="05" title="お引き渡し" description="最終確認後、お引き渡しとなります" />
      </div>
    </section>
  );
}

function PortfolioSection() {
  return (
    <section className={styles.portfolio}>
      <h2 className={styles.sectionTitle}>施工事例</h2>
      <p className={styles.sectionSubtitle}>これまでに手がけた空間デザインの一部をご紹介</p>
      <div className={styles.portfolioGrid}>
        <div className={styles.portfolioItem}>
          <div className={styles.portfolioImg} />
          <div className={styles.portfolioInfo}>
            <span className={styles.portfolioTag}>住宅</span>
            <h3 className={styles.portfolioTitle}>モダン和室のある家</h3>
          </div>
        </div>
        <div className={styles.portfolioItem}>
          <div className={styles.portfolioImg} />
          <div className={styles.portfolioInfo}>
            <span className={styles.portfolioTag}>商業施設</span>
            <h3 className={styles.portfolioTitle}>カフェ＆ギャラリー空間</h3>
          </div>
        </div>
        <div className={styles.portfolioItem}>
          <div className={styles.portfolioImg} />
          <div className={styles.portfolioInfo}>
            <span className={styles.portfolioTag}>リノベーション</span>
            <h3 className={styles.portfolioTitle}>築40年マンション再生</h3>
          </div>
        </div>
        <div className={styles.portfolioItem}>
          <div className={styles.portfolioImg} />
          <div className={styles.portfolioInfo}>
            <span className={styles.portfolioTag}>住宅</span>
            <h3 className={styles.portfolioTitle}>光と風の通る住まい</h3>
          </div>
        </div>
        <div className={styles.portfolioItem}>
          <div className={styles.portfolioImg} />
          <div className={styles.portfolioInfo}>
            <span className={styles.portfolioTag}>商業施設</span>
            <h3 className={styles.portfolioTitle}>ミニマルオフィスデザイン</h3>
          </div>
        </div>
        <div className={styles.portfolioItem}>
          <div className={styles.portfolioImg} />
          <div className={styles.portfolioInfo}>
            <span className={styles.portfolioTag}>リノベーション</span>
            <h3 className={styles.portfolioTitle}>古民家をモダンに再生</h3>
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
        <h2 className={styles.ctaTitle}>無料相談受付中</h2>
        <p className={styles.ctaSubtitle}>
          まずはお気軽にご相談ください。<br />
          経験豊富なデザイナーがお客様の理想をかたちにします。
        </p>
        <button className={styles.ctaButton}>無料相談を予約する</button>
        <p className={styles.ctaNote}>※ オンライン相談も対応しております</p>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <span className={styles.footerLogo}>空間工房 KUUKAN KOUBOU</span>
          <p className={styles.footerTagline}>理想の空間を、かたちに</p>
        </div>
        <div className={styles.footerLinks}>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>サービス</h4>
            <a href="#" className={styles.footerLink}>住宅デザイン</a>
            <a href="#" className={styles.footerLink}>商業施設デザイン</a>
            <a href="#" className={styles.footerLink}>リノベーション</a>
          </div>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>会社情報</h4>
            <a href="#" className={styles.footerLink}>会社概要</a>
            <a href="#" className={styles.footerLink}>アクセス</a>
            <a href="#" className={styles.footerLink}>採用情報</a>
          </div>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>お問い合わせ</h4>
            <a href="#" className={styles.footerLink}>無料相談予約</a>
            <a href="#" className={styles.footerLink}>メールでのお問い合わせ</a>
            <a href="#" className={styles.footerLink}>プライバシーポリシー</a>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>© 2026 空間工房 KUUKAN KOUBOU. All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseInteriorLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <PortfolioSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}
