import styles from './JapaneseFitnessLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>BEAST GYM</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>コンセプト</a>
          <a href="#" className={styles.navLink}>トレーナー</a>
          <a href="#" className={styles.navLink}>料金プラン</a>
          <a href="#" className={styles.navLink}>お客様の声</a>
          <a href="#" className={styles.navLink}>アクセス</a>
        </div>
        <button className={styles.navCta}>無料体験</button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroAccent} />
      <div className={styles.heroContent}>
        <span className={styles.heroLabel}>PERSONAL TRAINING GYM</span>
        <h1 className={styles.heroTitle}>
          理想の<span className={styles.heroTitleAccent}>カラダ</span>へ
        </h1>
        <p className={styles.heroSubtitle}>
          科学的根拠に基づいたトレーニングと食事管理で<br />
          あなたの限界を超える。結果にコミットする完全個室ジム。
        </p>
        <div className={styles.heroBtnGroup}>
          <button className={styles.heroBtnPrimary}>無料カウンセリング予約</button>
          <button className={styles.heroBtnSecondary}>詳しく見る</button>
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
      <div className={styles.featureDivider} />
      <p className={styles.featureDesc}>{description}</p>
    </div>
  );
}

function FeaturesSection() {
  return (
    <section className={styles.features}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>WHY CHOOSE US</span>
        <h2 className={styles.sectionTitle}>選ばれる3つの理由</h2>
      </div>
      <div className={styles.featuresGrid}>
        <FeatureCard
          icon="01"
          title="完全マンツーマン指導"
          description="経験豊富なトレーナーがあなた専属で担当。一人ひとりの体質・目標に合わせた完全オーダーメイドのプログラムを提供します。"
        />
        <FeatureCard
          icon="02"
          title="科学的トレーニング"
          description="最新のスポーツ科学に基づいたメソッドを採用。InBodyによる体組成分析で効果を数値で可視化し、最短ルートで結果を出します。"
        />
        <FeatureCard
          icon="03"
          title="食事管理サポート"
          description="管理栄養士監修の食事プランを毎日LINEでアドバイス。無理な食事制限はなし。一生続けられる食習慣を身につけます。"
        />
      </div>
    </section>
  );
}

function TrainerCard({ name, role, bio }: { name: string; role: string; bio: string }) {
  return (
    <div className={styles.trainerCard}>
      <div className={styles.trainerPhoto} />
      <h3 className={styles.trainerName}>{name}</h3>
      <p className={styles.trainerRole}>{role}</p>
      <p className={styles.trainerBio}>{bio}</p>
    </div>
  );
}

function TrainersSection() {
  return (
    <section className={styles.trainers}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>TRAINERS</span>
        <h2 className={styles.sectionTitle}>トレーナー紹介</h2>
      </div>
      <div className={styles.trainersGrid}>
        <TrainerCard
          name="田中 翔太"
          role="HEAD TRAINER"
          bio="NSCA-CSCS認定。ボディビル大会優勝経験あり。延べ3,000名以上の指導実績。筋肥大・ダイエット両方に精通。"
        />
        <TrainerCard
          name="佐藤 美咲"
          role="DIET SPECIALIST"
          bio="管理栄養士・NESTA-PFT取得。女性特有の悩みに寄り添い、美しいボディラインを作るプログラムが人気。"
        />
        <TrainerCard
          name="山本 健一"
          role="STRENGTH COACH"
          bio="元プロアスリート。JATI-ATI認定。パワーリフティング指導のスペシャリスト。初心者から上級者まで対応。"
        />
      </div>
    </section>
  );
}

function PriceCard({
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
    <div className={popular ? styles.priceCardPopular : styles.priceCard}>
      {popular && <span className={styles.popularBadge}>人気 No.1</span>}
      <p className={styles.planName}>{plan}</p>
      <p className={styles.planPrice}>
        {price}<span className={styles.planPriceUnit}>/月</span>
      </p>
      <div className={styles.planDivider} />
      <ul className={styles.planFeatures}>
        {features.map((f, i) => (
          <li key={i} className={styles.planFeature}>{f}</li>
        ))}
      </ul>
      <button className={popular ? styles.planBtnPrimary : styles.planBtnSecondary}>
        {popular ? '今すぐ申し込む' : '詳細を見る'}
      </button>
    </div>
  );
}

function PricingSection() {
  return (
    <section className={styles.pricing}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>PRICING</span>
        <h2 className={styles.sectionTitle}>料金プラン</h2>
      </div>
      <div className={styles.pricingGrid}>
        <PriceCard
          plan="LIGHT"
          price="¥29,800"
          features={[
            '月4回パーソナルトレーニング',
            '1回50分',
            '食事アドバイス（週1回）',
            'ウェア・タオルレンタル',
            'プロテイン1杯無料',
          ]}
        />
        <PriceCard
          plan="STANDARD"
          price="¥49,800"
          popular
          features={[
            '月8回パーソナルトレーニング',
            '1回50分',
            '毎日LINE食事指導',
            'ウェア・タオルレンタル',
            'プロテイン飲み放題',
            'InBody測定月1回無料',
          ]}
        />
        <PriceCard
          plan="PREMIUM"
          price="¥79,800"
          features={[
            '月12回パーソナルトレーニング',
            '1回80分',
            '毎日LINE食事指導',
            '全レンタル無料',
            'プロテイン飲み放題',
            'InBody測定無制限',
            '整体・ストレッチ月2回',
          ]}
        />
      </div>
    </section>
  );
}

function TestimonialCard({
  result,
  text,
  meta,
}: {
  result: string;
  text: string;
  meta: string;
}) {
  return (
    <div className={styles.testimonialCard}>
      <div className={styles.beforeAfter}>
        <div className={styles.beforeBox}>
          <div className={styles.beforeImg} />
          <span className={styles.beforeLabel}>BEFORE</span>
        </div>
        <div className={styles.afterBox}>
          <div className={styles.afterImg} />
          <span className={styles.afterLabel}>AFTER</span>
        </div>
      </div>
      <div className={styles.testimonialContent}>
        <p className={styles.testimonialResult}>{result}</p>
        <p className={styles.testimonialText}>{text}</p>
        <p className={styles.testimonialMeta}>{meta}</p>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  return (
    <section className={styles.testimonials}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>VOICE</span>
        <h2 className={styles.sectionTitle}>お客様の声</h2>
      </div>
      <div className={styles.testimonialsGrid}>
        <TestimonialCard
          result="3ヶ月で体重 -12kg / 体脂肪率 -8%"
          text="仕事が忙しく運動習慣がなかった私でも、トレーナーさんの的確な指導で無理なく続けられました。食事制限もストレスなく、会社の健康診断でもすべてA判定に。人生が変わりました。"
          meta="30代男性・会社員 K.T 様（STANDARDプラン 3ヶ月）"
        />
        <TestimonialCard
          result="2ヶ月でウエスト -10cm / 体重 -7kg"
          text="産後太りが気になり入会。女性トレーナーの佐藤さんに担当していただき、安心してトレーニングに集中できました。姿勢も改善され、肩こりや腰痛もなくなりました。"
          meta="30代女性・主婦 M.S 様（STANDARDプラン 2ヶ月）"
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
        <h2 className={styles.ctaTitle}>まずは無料体験から</h2>
        <p className={styles.ctaSubtitle}>
          カウンセリング＋体験トレーニング60分が完全無料。<br />
          強引な勧誘は一切ございません。お気軽にお申し込みください。
        </p>
        <button className={styles.ctaBtn}>無料体験を予約する</button>
        <p className={styles.ctaNote}>※ 当日入会で入会金33,000円が無料</p>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span className={styles.footerBrand}>BEAST GYM</span>
        <div className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}>コンセプト</a>
          <a href="#" className={styles.footerLink}>トレーナー</a>
          <a href="#" className={styles.footerLink}>料金プラン</a>
          <a href="#" className={styles.footerLink}>お客様の声</a>
          <a href="#" className={styles.footerLink}>よくある質問</a>
          <a href="#" className={styles.footerLink}>プライバシーポリシー</a>
        </div>
        <div className={styles.footerDivider} />
        <p className={styles.footerCopy}>© 2026 BEAST GYM All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseFitnessLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <FeaturesSection />
      <TrainersSection />
      <PricingSection />
      <TestimonialsSection />
      <CtaSection />
      <FooterSection />
    </div>
  );
}
