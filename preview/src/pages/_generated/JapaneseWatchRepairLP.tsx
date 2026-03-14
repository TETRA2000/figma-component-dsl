import styles from './JapaneseWatchRepairLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <div className={styles.brandGroup}>
          <div className={styles.brandIcon}>精</div>
          <div className={styles.brandText}>
            <span className={styles.brandName}>時計工房 精巧</span>
            <span className={styles.brandSub}>SEIKO KOUBOU</span>
          </div>
        </div>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>サービス</a>
          <a href="#" className={styles.navLink}>職人紹介</a>
          <a href="#" className={styles.navLink}>料金案内</a>
          <a href="#" className={styles.navLink}>お問い合わせ</a>
        </div>
        <button className={styles.navCta}>ご相談予約</button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <span className={styles.heroBadge}>創業45年の信頼と実績</span>
        <h1 className={styles.heroTitle}>
          時を刻む、<br />
          <span className={styles.heroAccent}>職人の技</span>
        </h1>
        <p className={styles.heroSubtitle}>
          スイス・ドイツ・日本の名門ブランドを知り尽くした<br />
          時計技師が、大切な一本を丁寧に修理いたします。
        </p>
        <div className={styles.heroActions}>
          <button className={styles.primaryBtn}>無料お見積もり</button>
          <button className={styles.secondaryBtn}>修理事例を見る</button>
        </div>
      </div>
      <div className={styles.heroImage}>
        <div className={styles.watchPlaceholder}>
          <div className={styles.watchFace} />
          <div className={styles.watchInner} />
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ icon, title, description, price }: { icon: string; title: string; description: string; price: string }) {
  return (
    <div className={styles.serviceCard}>
      <div className={styles.serviceIcon}>{icon}</div>
      <h3 className={styles.serviceTitle}>{title}</h3>
      <p className={styles.serviceDesc}>{description}</p>
      <div className={styles.serviceDivider} />
      <span className={styles.servicePrice}>{price}</span>
    </div>
  );
}

function ServicesSection() {
  return (
    <section className={styles.services}>
      <h2 className={styles.sectionTitle}>サービス案内</h2>
      <p className={styles.sectionSubtitle}>あらゆる時計のお悩みに対応いたします</p>
      <div className={styles.serviceGrid}>
        <ServiceCard
          icon="修"
          title="修理"
          description="ムーブメントの分解洗浄から精密調整まで、熟練の技術で対応。メーカー修理不可のヴィンテージも承ります。"
          price="¥15,000~"
        />
        <ServiceCard
          icon="整"
          title="メンテナンス"
          description="定期的なオーバーホールで、時計の寿命を延ばします。3~5年に一度のメンテナンスをおすすめします。"
          price="¥20,000~"
        />
        <ServiceCard
          icon="電"
          title="電池交換"
          description="各種ブランド対応の電池交換。防水検査付きで安心。即日対応も可能です。"
          price="¥2,000~"
        />
        <ServiceCard
          icon="復"
          title="レストレーション"
          description="傷んだケースの研磨、文字盤の修復、ベルト交換など。大切な時計を美しく蘇らせます。"
          price="¥30,000~"
        />
      </div>
    </section>
  );
}

function BrandExpertiseSection() {
  const brandsRow1 = ['ROLEX', 'OMEGA', 'PATEK PHILIPPE', 'GRAND SEIKO', 'BREITLING', 'CARTIER'];
  const brandsRow2 = ['IWC', 'JAEGER-LECOULTRE', 'TAG HEUER', 'LONGINES', 'TUDOR'];

  return (
    <section className={styles.brandExpertise}>
      <h2 className={styles.sectionTitle}>取扱ブランド</h2>
      <p className={styles.sectionSubtitle}>国内外の一流ブランドに精通した技術者が対応</p>
      <div className={styles.brandGrid}>
        {brandsRow1.map(brand => (
          <span key={brand} className={styles.brandItem}>{brand}</span>
        ))}
      </div>
      <div className={styles.brandGrid}>
        {brandsRow2.map(brand => (
          <span key={brand} className={styles.brandItem}>{brand}</span>
        ))}
      </div>
      <p className={styles.brandNote}>その他、国内外100以上のブランドに対応しております</p>
    </section>
  );
}

function ProcessStep({ stepNumber, title, description }: { stepNumber: string; title: string; description: string }) {
  return (
    <div className={styles.processStep}>
      <div className={styles.stepNumber}>{stepNumber}</div>
      <h3 className={styles.stepTitle}>{title}</h3>
      <p className={styles.stepDesc}>{description}</p>
    </div>
  );
}

function ProcessFlowSection() {
  return (
    <section className={styles.processFlow}>
      <h2 className={styles.sectionTitle}>修理の流れ</h2>
      <p className={styles.sectionSubtitle}>お預かりから完了まで丁寧に対応いたします</p>
      <div className={styles.processGrid}>
        <ProcessStep
          stepNumber="1"
          title="ご相談・お見積もり"
          description="お持ち込みまたは郵送にて承ります。症状を確認し、修理内容と料金をご案内いたします。"
        />
        <ProcessStep
          stepNumber="2"
          title="修理・調整"
          description="熟練の時計技師が丁寧に作業。進捗はメールまたはお電話でお知らせいたします。"
        />
        <ProcessStep
          stepNumber="3"
          title="検品・お届け"
          description="修理後の精度検査を行い、万全の状態でお引き渡し。1年間の修理保証付き。"
        />
      </div>
    </section>
  );
}

function PriceRow({ service, price, note }: { service: string; price: string; note: string }) {
  return (
    <div className={styles.priceRow}>
      <span className={styles.priceService}>{service}</span>
      <span className={styles.priceNote}>{note}</span>
      <span className={styles.priceAmount}>{price}</span>
    </div>
  );
}

function PriceGuideSection() {
  return (
    <section className={styles.priceGuide}>
      <h2 className={styles.sectionTitle}>料金案内</h2>
      <p className={styles.sectionSubtitle}>修理内容に応じた料金目安</p>
      <div className={styles.priceTable}>
        <PriceRow service="電池交換（一般）" price="¥2,000~" note="防水検査込み・即日対応可" />
        <PriceRow service="電池交換（高級ブランド）" price="¥5,000~" note="ブランド専用工具使用" />
        <PriceRow service="オーバーホール（クォーツ）" price="¥15,000~" note="分解洗浄・注油・調整" />
        <PriceRow service="オーバーホール（機械式）" price="¥25,000~" note="分解洗浄・注油・精度調整" />
        <PriceRow service="ケース研磨" price="¥8,000~" note="傷取り・鏡面仕上げ" />
        <PriceRow service="文字盤修復" price="¥30,000~" note="再塗装・印字・夜光塗布" />
      </div>
      <p className={styles.priceDisclaimer}>※ 正確な料金は実物を拝見した上でお見積もりいたします</p>
    </section>
  );
}

function ContactCTASection() {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>大切な時計のご相談は</h2>
        <p className={styles.ctaSubtitle}>お見積もりは無料です。お気軽にご相談ください。</p>
        <div className={styles.ctaButtons}>
          <button className={styles.ctaButton}>無料お見積もり</button>
          <button className={styles.ctaButtonSecondary}>03-9876-5432</button>
        </div>
        <p className={styles.ctaNote}>営業時間: 10:00-19:00（水曜定休）</p>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <span className={styles.footerLogo}>時計工房 精巧</span>
          <span className={styles.footerLogoSub}>SEIKO KOUBOU</span>
          <p className={styles.footerTagline}>時を刻む、職人の技</p>
        </div>
        <div className={styles.footerLinks}>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>サービス</h4>
            <a href="#" className={styles.footerLink}>修理</a>
            <a href="#" className={styles.footerLink}>メンテナンス</a>
            <a href="#" className={styles.footerLink}>レストレーション</a>
          </div>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>ご案内</h4>
            <a href="#" className={styles.footerLink}>料金表</a>
            <a href="#" className={styles.footerLink}>修理の流れ</a>
            <a href="#" className={styles.footerLink}>よくある質問</a>
          </div>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>会社情報</h4>
            <a href="#" className={styles.footerLink}>会社概要</a>
            <a href="#" className={styles.footerLink}>アクセス</a>
            <a href="#" className={styles.footerLink}>プライバシーポリシー</a>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>© 2026 時計工房 精巧 SEIKO KOUBOU. All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseWatchRepairLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <ServicesSection />
      <BrandExpertiseSection />
      <ProcessFlowSection />
      <PriceGuideSection />
      <ContactCTASection />
      <FooterSection />
    </div>
  );
}
