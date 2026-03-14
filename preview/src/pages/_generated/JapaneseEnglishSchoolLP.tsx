import styles from './JapaneseEnglishSchoolLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>GlobalTalk 英会話</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>特徴</a>
          <a href="#" className={styles.navLink}>コース</a>
          <a href="#" className={styles.navLink}>講師紹介</a>
          <a href="#" className={styles.navLink}>受講者の声</a>
          <a href="#" className={styles.navLink}>よくある質問</a>
          <button className={styles.navCta}>無料体験予約</button>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        <span className={styles.heroLabel}>初心者から上級者まで対応</span>
        <h1 className={styles.heroTitle}>
          英語で世界が広がる
        </h1>
        <p className={styles.heroSubtitle}>
          ネイティブ講師との会話を通じて、<br />
          実践的な英語力を身につけませんか？
        </p>
        <div className={styles.heroBtns}>
          <button className={styles.heroBtnPrimary}>無料体験レッスンを予約する</button>
          <button className={styles.heroBtnSecondary}>コース一覧を見る</button>
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
        <div className={styles.sectionLabel}>METHOD</div>
        <h2 className={styles.sectionTitle}>選ばれる4つの理由</h2>
        <p className={styles.sectionSubtitle}>
          実績と経験に基づいた独自メソッドで、確実な英語力向上をサポートします
        </p>
      </div>
      <div className={styles.featuresGrid}>
        <FeatureCard
          icon="🗣"
          title="会話中心のレッスン"
          description="教科書を読むだけの授業ではありません。実際の会話シーンを想定した実践的なレッスンで、話す力を鍛えます。"
        />
        <FeatureCard
          icon="👤"
          title="ネイティブ講師"
          description="全講師がTESOL資格保有のネイティブスピーカー。正しい発音とナチュラルな表現を直接学べます。"
        />
        <FeatureCard
          icon="📋"
          title="個別カリキュラム"
          description="一人ひとりの目標とレベルに合わせた完全オーダーメイドのカリキュラムをご用意します。"
        />
        <FeatureCard
          icon="📱"
          title="柔軟な受講スタイル"
          description="教室でもオンラインでも受講可能。忙しい方でも無理なく続けられる柔軟なスケジュール対応。"
        />
      </div>
    </section>
  );
}

function CourseCard({
  name,
  price,
  unit,
  features,
  popular,
}: {
  name: string;
  price: string;
  unit: string;
  features: string[];
  popular?: boolean;
}) {
  return (
    <div className={popular ? styles.courseCardPopular : styles.courseCard}>
      {popular && <div className={styles.coursePopularBadge}>一番人気</div>}
      <div className={styles.courseHeader}>
        <h3 className={styles.courseName}>{name}</h3>
        <p className={styles.coursePrice}>
          {price}<span className={styles.coursePriceUnit}>{unit}</span>
        </p>
      </div>
      <div className={styles.courseFeatures}>
        {features.map((f, i) => (
          <div key={i} className={styles.courseFeatureItem}>
            <span className={styles.courseFeatureCheck}>✓</span>
            {f}
          </div>
        ))}
      </div>
      <button className={`${styles.courseBtn} ${popular ? styles.courseBtnPrimary : styles.courseBtnOutline}`}>
        詳しく見る
      </button>
    </div>
  );
}

function CoursesSection() {
  return (
    <section className={styles.courses}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionLabel}>COURSES</div>
        <h2 className={styles.sectionTitle}>コース・料金</h2>
        <p className={styles.sectionSubtitle}>
          あなたの目標に合わせて最適なプランをお選びください
        </p>
      </div>
      <div className={styles.courseGrid}>
        <CourseCard
          name="ライトプラン"
          price="¥9,800"
          unit="/月"
          features={[
            '月4回のグループレッスン',
            '1レッスン50分',
            'オンライン教材使い放題',
            '日本人スタッフのサポート',
          ]}
        />
        <CourseCard
          name="スタンダードプラン"
          price="¥19,800"
          unit="/月"
          popular
          features={[
            '月8回のレッスン（グループ+個別）',
            '1レッスン50分',
            'オンライン教材使い放題',
            '月1回のレベルチェック',
            '日本人カウンセラー相談',
          ]}
        />
        <CourseCard
          name="プレミアムプラン"
          price="¥34,800"
          unit="/月"
          features={[
            '月12回のマンツーマンレッスン',
            '1レッスン50分',
            'オンライン教材使い放題',
            '毎週のレベルチェック',
            '専属カウンセラー付き',
            'ビジネス英語対応',
          ]}
        />
      </div>
    </section>
  );
}

function InstructorCard({ name, role, bio }: { name: string; role: string; bio: string }) {
  return (
    <div className={styles.instructorCard}>
      <div className={styles.instructorAvatar} />
      <h3 className={styles.instructorName}>{name}</h3>
      <p className={styles.instructorRole}>{role}</p>
      <p className={styles.instructorBio}>{bio}</p>
    </div>
  );
}

function InstructorsSection() {
  return (
    <section className={styles.instructors}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionLabel}>INSTRUCTORS</div>
        <h2 className={styles.sectionTitle}>講師紹介</h2>
        <p className={styles.sectionSubtitle}>
          経験豊富なネイティブ講師が、あなたの学習を全力でサポートします
        </p>
      </div>
      <div className={styles.instructorGrid}>
        <InstructorCard
          name="Sarah Johnson"
          role="シニア講師 / TESOL認定"
          bio="イギリス出身。日本での英語指導歴10年以上。初心者から上級者まで幅広く対応。趣味は日本の温泉巡り。"
        />
        <InstructorCard
          name="Michael Chen"
          role="ビジネス英語担当"
          bio="アメリカ出身。元外資系企業マネージャーの経験を活かし、実践的なビジネス英語を指導。TOEIC対策も得意。"
        />
        <InstructorCard
          name="Emma Williams"
          role="キッズ・初心者担当"
          bio="オーストラリア出身。子ども英語教育のスペシャリスト。楽しいレッスンで英語への苦手意識をなくします。"
        />
      </div>
    </section>
  );
}

function TestimonialCard({
  text,
  name,
  info,
}: {
  text: string;
  name: string;
  info: string;
}) {
  return (
    <div className={styles.testimonialCard}>
      <div className={styles.testimonialStars}>★★★★★</div>
      <p className={styles.testimonialText}>{text}</p>
      <div className={styles.testimonialAuthor}>
        <div className={styles.testimonialAuthorAvatar} />
        <div>
          <p className={styles.testimonialAuthorName}>{name}</p>
          <p className={styles.testimonialAuthorInfo}>{info}</p>
        </div>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  return (
    <section className={styles.testimonials}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionLabel}>VOICE</div>
        <h2 className={styles.sectionTitle}>受講者の声</h2>
      </div>
      <div className={styles.testimonialGrid}>
        <TestimonialCard
          text="半年通っただけで、海外旅行で困らないレベルになりました。先生方が本当に親切で、毎回のレッスンが楽しみです。"
          name="田中 美咲さん"
          info="会社員 / 受講歴1年"
        />
        <TestimonialCard
          text="ビジネスの場で英語のプレゼンができるようになりました。実践的な指導のおかげで自信がつきました。"
          name="佐藤 健太さん"
          info="IT企業勤務 / 受講歴2年"
        />
        <TestimonialCard
          text="子どもが英語を大好きになりました。Emma先生のレッスンは遊びながら学べるので、毎週楽しみにしています。"
          name="山田 由美子さん"
          info="主婦 / お子様受講歴8ヶ月"
        />
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.cta}>
      <h2 className={styles.ctaTitle}>まずは無料体験レッスンから</h2>
      <p className={styles.ctaSubtitle}>
        あなたに合ったレッスンを体験してみませんか？<br />
        カウンセリング付きの無料体験レッスンを実施中です。
      </p>
      <button className={styles.ctaBtn}>無料体験レッスンを予約する</button>
      <p className={styles.ctaNote}>※ 無理な勧誘は一切ございません</p>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    { q: '英語が全く話せませんが大丈夫ですか？', a: 'はい、大丈夫です。完全初心者向けのカリキュラムをご用意しており、日本人スタッフのサポートもあるので安心してご受講いただけます。' },
    { q: 'レッスンのキャンセルや振替はできますか？', a: 'レッスン前日の18時まで無料でキャンセル・振替が可能です。急な予定変更にも柔軟に対応いたします。' },
    { q: 'オンラインと教室の併用は可能ですか？', a: 'はい、可能です。その日のご都合に合わせて、教室受講とオンライン受講を自由に切り替えていただけます。' },
    { q: '入会金はかかりますか？', a: '現在キャンペーン中につき、入会金は無料です。テキスト代もコース料金に含まれています。' },
    { q: 'どのくらいで効果を実感できますか？', a: '個人差はありますが、多くの受講者の方が3ヶ月程度で上達を実感されています。週2回以上の受講をおすすめしています。' },
  ];

  return (
    <section className={styles.faq}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionLabel}>FAQ</div>
        <h2 className={styles.sectionTitle}>よくある質問</h2>
      </div>
      <div className={styles.faqList}>
        {faqs.map((faq, i) => (
          <div key={i} className={styles.faqItem}>
            <div className={styles.faqQuestion}>
              <span className={styles.faqQ}>Q.</span>
              {faq.q}
            </div>
            <p className={styles.faqAnswer}>{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerTop}>
          <div>
            <div className={styles.footerBrand}>GlobalTalk 英会話</div>
            <p className={styles.footerDesc}>
              ネイティブ講師による実践的な英会話スクール。<br />
              あなたの英語力向上を全力でサポートします。
            </p>
          </div>
          <div className={styles.footerColumns}>
            <div className={styles.footerColumn}>
              <div className={styles.footerColumnTitle}>コース</div>
              <a href="#" className={styles.footerLink}>ライトプラン</a>
              <a href="#" className={styles.footerLink}>スタンダードプラン</a>
              <a href="#" className={styles.footerLink}>プレミアムプラン</a>
            </div>
            <div className={styles.footerColumn}>
              <div className={styles.footerColumnTitle}>サポート</div>
              <a href="#" className={styles.footerLink}>よくある質問</a>
              <a href="#" className={styles.footerLink}>お問い合わせ</a>
              <a href="#" className={styles.footerLink}>プライバシーポリシー</a>
            </div>
          </div>
        </div>
        <div className={styles.footerDivider} />
        <div className={styles.footerBottom}>
          <p className={styles.footerCopy}>© 2026 GlobalTalk 英会話 All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export function JapaneseEnglishSchoolLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <FeaturesSection />
      <CoursesSection />
      <InstructorsSection />
      <TestimonialsSection />
      <CTASection />
      <FAQSection />
      <FooterSection />
    </div>
  );
}
