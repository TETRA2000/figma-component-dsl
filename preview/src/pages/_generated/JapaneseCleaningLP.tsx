import styles from './JapaneseCleaningLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>キラリ清掃サービス</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>サービス内容</a>
          <a href="#" className={styles.navLink}>料金</a>
          <a href="#" className={styles.navLink}>施工事例</a>
          <a href="#" className={styles.navLink}>お客様の声</a>
          <a href="#" className={styles.navLink}>お問い合わせ</a>
        </div>
        <button className={styles.navCta}>無料見積もり</button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroDecor} />
      <div className={styles.heroContent}>
        <span className={styles.heroLabel}>PROFESSIONAL CLEANING</span>
        <h1 className={styles.heroTitle}>プロの技術で<br />ピカピカに</h1>
        <p className={styles.heroSubtitle}>
          ご家庭からオフィス、民泊まで。<br />
          熟練スタッフが最新の設備と環境に優しい洗剤で、徹底的にキレイにします。
        </p>
        <div className={styles.heroBtnGroup}>
          <button className={styles.heroBtnPrimary}>無料見積もりを依頼</button>
          <button className={styles.heroBtnSecondary}>サービス一覧</button>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ title, description, features }: { title: string; description: string; features: string[] }) {
  return (
    <div className={styles.serviceCard}>
      <div className={styles.serviceIcon} />
      <h3 className={styles.serviceTitle}>{title}</h3>
      <p className={styles.serviceDesc}>{description}</p>
      <ul className={styles.serviceFeatures}>
        {features.map((f, i) => (
          <li key={i} className={styles.serviceFeature}>{f}</li>
        ))}
      </ul>
    </div>
  );
}

function ServicesSection() {
  return (
    <section className={styles.services}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>SERVICES</span>
        <h2 className={styles.sectionTitle}>サービス内容</h2>
      </div>
      <div className={styles.servicesGrid}>
        <ServiceCard
          title="ハウスクリーニング"
          description="キッチン・浴室・トイレなど水回りを中心に、お住まい全体をプロの技術でピカピカに。"
          features={['エアコン分解洗浄', '換気扇クリーニング', '浴室カビ除去', 'フローリングワックス']}
        />
        <ServiceCard
          title="オフィスクリーニング"
          description="快適な職場環境づくりをサポート。定期清掃から特別清掃まで柔軟に対応いたします。"
          features={['日常清掃', 'カーペット洗浄', '窓ガラス清掃', 'ワックスがけ']}
        />
        <ServiceCard
          title="民泊清掃"
          description="ゲストの満足度を左右する清潔さ。チェックアウト後の迅速な清掃とセッティングを代行します。"
          features={['リネン交換', 'アメニティ補充', '消耗品管理', 'ゴミ回収']}
        />
      </div>
    </section>
  );
}

function BeforeAfterSection() {
  return (
    <section className={styles.beforeAfter}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>BEFORE / AFTER</span>
        <h2 className={styles.sectionTitle}>施工事例</h2>
      </div>
      <div className={styles.baGrid}>
        <div className={styles.baCard}>
          <div className={styles.baImages}>
            <div className={styles.baBefore}>
              <div className={styles.baImage} />
              <span className={styles.baLabel}>BEFORE</span>
            </div>
            <div className={styles.baAfter}>
              <div className={styles.baImageAfter} />
              <span className={styles.baLabelAfter}>AFTER</span>
            </div>
          </div>
          <p className={styles.baCaption}>キッチン換気扇 — 油汚れを分解洗浄で除去</p>
        </div>
        <div className={styles.baCard}>
          <div className={styles.baImages}>
            <div className={styles.baBefore}>
              <div className={styles.baImage} />
              <span className={styles.baLabel}>BEFORE</span>
            </div>
            <div className={styles.baAfter}>
              <div className={styles.baImageAfter} />
              <span className={styles.baLabelAfter}>AFTER</span>
            </div>
          </div>
          <p className={styles.baCaption}>浴室タイル — カビ・水垢を徹底除去</p>
        </div>
      </div>
    </section>
  );
}

function PriceRow({ service, price, note }: { service: string; price: string; note: string }) {
  return (
    <div className={styles.priceRow}>
      <span className={styles.priceService}>{service}</span>
      <span className={styles.priceAmount}>{price}</span>
      <span className={styles.priceNote}>{note}</span>
    </div>
  );
}

function PricingSection() {
  return (
    <section className={styles.pricing}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>PRICING</span>
        <h2 className={styles.sectionTitle}>料金表</h2>
        <p className={styles.sectionSubtitle}>明朗会計。追加料金は一切ございません。</p>
      </div>
      <div className={styles.priceTable}>
        <PriceRow service="キッチンクリーニング" price="¥12,000〜" note="所要時間：約2時間" />
        <PriceRow service="浴室クリーニング" price="¥14,000〜" note="所要時間：約2.5時間" />
        <PriceRow service="トイレクリーニング" price="¥8,000〜" note="所要時間：約1時間" />
        <PriceRow service="エアコン分解洗浄" price="¥10,000〜" note="所要時間：約1.5時間" />
        <PriceRow service="全体清掃（1LDK）" price="¥28,000〜" note="所要時間：約4時間" />
        <PriceRow service="民泊清掃（1回）" price="¥6,000〜" note="所要時間：約1.5時間" />
      </div>
    </section>
  );
}

function ReviewCard({ text, name }: { text: string; name: string }) {
  return (
    <div className={styles.reviewCard}>
      <div className={styles.reviewStars}>★★★★★</div>
      <p className={styles.reviewText}>{text}</p>
      <p className={styles.reviewName}>{name}</p>
    </div>
  );
}

function ReviewsSection() {
  return (
    <section className={styles.reviews}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>REVIEWS</span>
        <h2 className={styles.sectionTitle}>お客様の声</h2>
      </div>
      <div className={styles.reviewsGrid}>
        <ReviewCard
          text="引っ越し前の退去清掃をお願いしました。自分では手の届かない場所まで隅々までキレイにしていただき、敷金も全額返ってきました。大満足です！"
          name="30代女性 A.K 様"
        />
        <ReviewCard
          text="民泊運営で毎回お世話になっています。ゲストからの清潔感の評価が格段に上がり、予約数も増えました。信頼できるパートナーです。"
          name="40代男性 T.M 様"
        />
        <ReviewCard
          text="エアコンクリーニングをお願いしたところ、真っ黒な汚れが大量に出てきて驚きました。クリーニング後は風の匂いが全然違います。毎年お願いしたいです。"
          name="50代女性 Y.S 様"
        />
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaGlow} />
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>まずは無料見積もりから</h2>
        <p className={styles.ctaSubtitle}>
          お見積もりは完全無料。お電話・メール・LINEで<br />
          お気軽にお問い合わせください。最短翌日対応可能です。
        </p>
        <button className={styles.ctaBtn}>無料見積もりを依頼する</button>
        <p className={styles.ctaNote}>※ 初回限定 全メニュー10%OFF</p>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span className={styles.footerBrand}>キラリ清掃サービス</span>
        <div className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}>サービス内容</a>
          <a href="#" className={styles.footerLink}>料金</a>
          <a href="#" className={styles.footerLink}>施工事例</a>
          <a href="#" className={styles.footerLink}>お客様の声</a>
          <a href="#" className={styles.footerLink}>会社概要</a>
          <a href="#" className={styles.footerLink}>プライバシーポリシー</a>
        </div>
        <div className={styles.footerDivider} />
        <p className={styles.footerCopy}>© 2026 キラリ清掃サービス All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseCleaningLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <ServicesSection />
      <BeforeAfterSection />
      <PricingSection />
      <ReviewsSection />
      <CtaSection />
      <FooterSection />
    </div>
  );
}
