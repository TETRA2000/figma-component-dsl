import styles from './JapaneseMovingLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>引越し名人 HIKKOSHI MEIJIN</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>サービス</a>
          <a href="#" className={styles.navLink}>ご利用の流れ</a>
          <a href="#" className={styles.navLink}>料金</a>
          <a href="#" className={styles.navLink}>お客様の声</a>
          <a href="#" className={styles.navLink}>お見積もり</a>
        </div>
        <button className={styles.navCta}>無料見積もり</button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroAccent} />
      <div className={styles.heroContent}>
        <span className={styles.heroLabel}>MOVING SERVICE</span>
        <h1 className={styles.heroTitle}>安心・丁寧・お引越し</h1>
        <p className={styles.heroSubtitle}>
          経験豊富なスタッフが大切なお荷物を心を込めてお届けします。<br />
          単身からオフィスまで、あらゆるお引越しに対応。
        </p>
        <div className={styles.heroBtnGroup}>
          <button className={styles.heroBtnPrimary}>無料お見積もり</button>
          <button className={styles.heroBtnSecondary}>サービス詳細</button>
        </div>
      </div>
    </section>
  );
}

function PlanCard({
  plan,
  price,
  features,
  popular,
}: {
  plan: string;
  price: string;
  features: string[];
  popular?: boolean;
}) {
  return (
    <div className={popular ? styles.planCardPopular : styles.planCard}>
      {popular && <span className={styles.popularBadge}>人気 No.1</span>}
      <p className={styles.planName}>{plan}</p>
      <p className={styles.planPrice}>
        {price}<span className={styles.planPriceUnit}>〜</span>
      </p>
      <div className={styles.planDivider} />
      <ul className={styles.planFeatures}>
        {features.map((f, i) => (
          <li key={i} className={styles.planFeature}>{f}</li>
        ))}
      </ul>
      <button className={popular ? styles.planBtnPrimary : styles.planBtnSecondary}>
        {popular ? '今すぐ見積もり' : '詳細を見る'}
      </button>
    </div>
  );
}

function PlansSection() {
  return (
    <section className={styles.plans}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>SERVICE PLANS</span>
        <h2 className={styles.sectionTitle}>お引越しプラン</h2>
      </div>
      <div className={styles.plansGrid}>
        <PlanCard
          plan="単身プラン"
          price="¥29,800"
          features={[
            '1R〜1LDKの荷物量',
            'スタッフ2名',
            '梱包資材サービス',
            '養生作業込み',
            '不用品回収1点無料',
          ]}
        />
        <PlanCard
          plan="ファミリープラン"
          price="¥69,800"
          popular
          features={[
            '2LDK〜4LDKの荷物量',
            'スタッフ4名',
            '梱包・開梱サービス',
            '養生作業込み',
            'エアコン脱着1台無料',
            '不用品回収3点無料',
          ]}
        />
        <PlanCard
          plan="オフィスプラン"
          price="¥198,000"
          features={[
            'オフィス・店舗移転',
            '専任チーム編成',
            '什器の分解・組立',
            'IT機器の梱包対応',
            '休日・夜間対応可',
            'レイアウト相談無料',
            '原状回復サポート',
          ]}
        />
      </div>
    </section>
  );
}

function ProcessStep({ step, title, description }: { step: string; title: string; description: string }) {
  return (
    <div className={styles.processStep}>
      <div className={styles.stepNumber}>{step}</div>
      <h3 className={styles.stepTitle}>{title}</h3>
      <p className={styles.stepDesc}>{description}</p>
    </div>
  );
}

function ProcessSection() {
  return (
    <section className={styles.process}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>PROCESS</span>
        <h2 className={styles.sectionTitle}>ご利用の流れ</h2>
      </div>
      <div className={styles.processGrid}>
        <ProcessStep
          step="01"
          title="お問い合わせ"
          description="お電話またはWebフォームからお気軽にご連絡ください。ご希望の日程や荷物量をお伺いします。"
        />
        <div className={styles.processArrow} />
        <ProcessStep
          step="02"
          title="訪問見積もり"
          description="経験豊富なスタッフがお伺いし、正確なお見積もりをご提示。追加料金は一切ございません。"
        />
        <div className={styles.processArrow} />
        <ProcessStep
          step="03"
          title="梱包・搬出"
          description="当日は丁寧に養生を施し、大切な家具や家電を安全に梱包・搬出いたします。"
        />
        <div className={styles.processArrow} />
        <ProcessStep
          step="04"
          title="搬入・設置"
          description="新居への搬入後、家具の配置や家電の設置まで責任を持って対応いたします。"
        />
      </div>
    </section>
  );
}

function PriceCalculator() {
  return (
    <section className={styles.calculator}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>PRICE SIMULATOR</span>
        <h2 className={styles.sectionTitleDark}>料金シミュレーション</h2>
      </div>
      <div className={styles.calcCard}>
        <div className={styles.calcRow}>
          <label className={styles.calcLabel}>お引越しタイプ</label>
          <div className={styles.calcSelect}>ファミリープラン</div>
        </div>
        <div className={styles.calcRow}>
          <label className={styles.calcLabel}>現在のお住まい</label>
          <div className={styles.calcSelect}>東京都</div>
        </div>
        <div className={styles.calcRow}>
          <label className={styles.calcLabel}>お引越し先</label>
          <div className={styles.calcSelect}>神奈川県</div>
        </div>
        <div className={styles.calcRow}>
          <label className={styles.calcLabel}>お引越し時期</label>
          <div className={styles.calcSelect}>4月（繁忙期）</div>
        </div>
        <div className={styles.calcDivider} />
        <div className={styles.calcResult}>
          <span className={styles.calcResultLabel}>概算お見積もり</span>
          <span className={styles.calcResultPrice}>¥89,800〜¥128,000</span>
        </div>
        <p className={styles.calcNote}>※ 正確な金額は訪問見積もりにてご案内いたします</p>
        <button className={styles.calcBtn}>正式なお見積もりを依頼する</button>
      </div>
    </section>
  );
}

function ReviewCard({ text, meta, rating }: { text: string; meta: string; rating: string }) {
  return (
    <div className={styles.reviewCard}>
      <div className={styles.reviewStars}>{rating}</div>
      <p className={styles.reviewText}>{text}</p>
      <p className={styles.reviewMeta}>{meta}</p>
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
          rating="★★★★★"
          text="急な転勤で時間がない中、迅速に対応していただきました。梱包も丁寧で、新居では傷一つなく荷物が届きました。スタッフの方の笑顔も印象的でした。"
          meta="30代男性・会社員 T.K 様（単身プラン）"
        />
        <ReviewCard
          rating="★★★★★"
          text="小さな子どもがいるため不安でしたが、スタッフの方が気遣ってくださり安心してお任せできました。エアコンの取り外し・取り付けも無料で助かりました。"
          meta="30代女性・主婦 M.Y 様（ファミリープラン）"
        />
        <ReviewCard
          rating="★★★★★"
          text="オフィス移転で利用しました。IT機器の取り扱いも慣れており、月曜日から通常営業できる段取りで作業してくれました。次回もお願いしたいです。"
          meta="40代男性・経営者 S.H 様（オフィスプラン）"
        />
      </div>
    </section>
  );
}

function EstimateCta() {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaGlow} />
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>まずは無料お見積もりから</h2>
        <p className={styles.ctaSubtitle}>
          お電話・Webフォームで簡単お見積もり。<br />
          お気軽にご相談ください。強引な営業は一切いたしません。
        </p>
        <div className={styles.ctaBtnGroup}>
          <button className={styles.ctaBtn}>Web無料見積もり</button>
          <button className={styles.ctaBtnPhone}>0120-123-456</button>
        </div>
        <p className={styles.ctaNote}>※ 受付時間：8:00〜20:00（年中無休）</p>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span className={styles.footerBrand}>引越し名人 HIKKOSHI MEIJIN</span>
        <div className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}>サービス</a>
          <a href="#" className={styles.footerLink}>料金プラン</a>
          <a href="#" className={styles.footerLink}>ご利用の流れ</a>
          <a href="#" className={styles.footerLink}>お客様の声</a>
          <a href="#" className={styles.footerLink}>よくある質問</a>
          <a href="#" className={styles.footerLink}>プライバシーポリシー</a>
        </div>
        <div className={styles.footerDivider} />
        <p className={styles.footerCopy}>© 2026 引越し名人 All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseMovingLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <PlansSection />
      <ProcessSection />
      <PriceCalculator />
      <ReviewsSection />
      <EstimateCta />
      <FooterSection />
    </div>
  );
}
