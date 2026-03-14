import styles from './JapaneseNurseryLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <div className={styles.brandGroup}>
          <div className={styles.brandIcon}>N</div>
          <div className={styles.brandText}>
            <span className={styles.brandName}>にこにこ保育園</span>
            <span className={styles.brandSub}>NIKONIKO HOIKUEN</span>
          </div>
        </div>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>園の紹介</a>
          <a href="#" className={styles.navLink}>クラス案内</a>
          <a href="#" className={styles.navLink}>保護者の声</a>
          <a href="#" className={styles.navLink}>入園案内</a>
        </div>
        <button className={styles.navCta}>見学予約</button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <span className={styles.heroBadge}>2026年度 園児募集中</span>
        <h1 className={styles.heroTitle}>
          笑顔あふれる<br />
          <span className={styles.heroAccent}>毎日を</span>
        </h1>
        <p className={styles.heroSubtitle}>
          子どもたちの「やりたい！」を大切に。<br />
          一人ひとりの個性を伸ばす保育を実践しています。
        </p>
        <div className={styles.heroActions}>
          <button className={styles.primaryBtn}>見学を申し込む</button>
          <button className={styles.secondaryBtn}>資料ダウンロード</button>
        </div>
      </div>
      <div className={styles.heroImage}>
        <div className={styles.imagePlaceholder}>
          <div className={styles.playBlock} />
        </div>
      </div>
    </section>
  );
}

function AgeGroupCard({ ageRange, title, description, colorClass }: { ageRange: string; title: string; description: string; colorClass: string }) {
  return (
    <div className={styles.ageGroupCard}>
      <div className={`${styles.ageIcon} ${styles[colorClass]}`}>{ageRange}</div>
      <h3 className={styles.ageGroupTitle}>{title}</h3>
      <p className={styles.ageGroupDesc}>{description}</p>
    </div>
  );
}

function AgeGroupsSection() {
  return (
    <section className={styles.ageGroups}>
      <h2 className={styles.sectionTitle}>クラス案内</h2>
      <p className={styles.sectionSubtitle}>年齢に合わせた最適なプログラム</p>
      <div className={styles.ageGroupGrid}>
        <AgeGroupCard
          ageRange="0-2歳"
          title="ひよこ組"
          description="安心・安全な環境の中で、愛情たっぷりの保育。生活リズムを大切にしながら、五感を育む遊びを提供します。"
          colorClass="mintBg"
        />
        <AgeGroupCard
          ageRange="3-5歳"
          title="うさぎ組"
          description="好奇心を引き出すカリキュラム。英語・リトミック・絵画など、多彩な活動で豊かな感性と社会性を育みます。"
          colorClass="yellowBg"
        />
        <AgeGroupCard
          ageRange="放課後"
          title="そら組"
          description="小学生向けの学童保育。宿題サポートから自由遊びまで、放課後の時間を有意義に過ごせるプログラムです。"
          colorClass="purpleBg"
        />
      </div>
    </section>
  );
}

function RoutineItem({ time, activity, highlight }: { time: string; activity: string; highlight?: boolean }) {
  return (
    <div className={`${styles.routineItem} ${highlight ? styles.routineHighlight : ''}`}>
      <span className={styles.routineTime}>{time}</span>
      <span className={styles.routineDivider} />
      <span className={styles.routineActivity}>{activity}</span>
    </div>
  );
}

function DailyRoutineSection() {
  return (
    <section className={styles.dailyRoutine}>
      <h2 className={styles.sectionTitle}>1日の流れ</h2>
      <p className={styles.sectionSubtitle}>園での1日をご紹介します</p>
      <div className={styles.routineList}>
        <RoutineItem time="7:30" activity="登園・自由遊び" />
        <RoutineItem time="9:00" activity="朝の会・体操" highlight />
        <RoutineItem time="10:00" activity="カリキュラム活動" />
        <RoutineItem time="11:30" activity="給食" highlight />
        <RoutineItem time="13:00" activity="お昼寝" />
        <RoutineItem time="15:00" activity="おやつ・自由遊び" highlight />
        <RoutineItem time="17:00" activity="お迎え・降園" />
      </div>
    </section>
  );
}

function StaffCard({ name, role, message }: { name: string; role: string; message: string }) {
  return (
    <div className={styles.staffCard}>
      <div className={styles.staffAvatar} />
      <h3 className={styles.staffName}>{name}</h3>
      <span className={styles.staffRole}>{role}</span>
      <p className={styles.staffMessage}>{message}</p>
    </div>
  );
}

function StaffSection() {
  return (
    <section className={styles.staff}>
      <h2 className={styles.sectionTitle}>先生紹介</h2>
      <p className={styles.sectionSubtitle}>子どもたちの成長を見守るスタッフをご紹介</p>
      <div className={styles.staffGrid}>
        <StaffCard
          name="山田 さくら"
          role="園長"
          message="子どもたちの笑顔が私の元気の源です。一人ひとりに寄り添った保育を心がけています。"
        />
        <StaffCard
          name="佐藤 ゆい"
          role="主任保育士"
          message="遊びの中から学ぶことを大切に。毎日ワクワクする活動を考えています。"
        />
        <StaffCard
          name="田中 はるか"
          role="保育士"
          message="子どもたちと一緒に成長する毎日です。安心できる場所づくりを目指しています。"
        />
      </div>
    </section>
  );
}

function TestimonialCard({ name, relation, text }: { name: string; relation: string; text: string }) {
  return (
    <div className={styles.testimonialCard}>
      <p className={styles.testimonialText}>{text}</p>
      <div className={styles.testimonialAuthor}>
        <div className={styles.authorAvatar} />
        <div className={styles.authorInfo}>
          <span className={styles.authorName}>{name}</span>
          <span className={styles.authorRelation}>{relation}</span>
        </div>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  return (
    <section className={styles.testimonials}>
      <h2 className={styles.sectionTitle}>保護者の声</h2>
      <p className={styles.sectionSubtitle}>通園中の保護者様からいただいた感想</p>
      <div className={styles.testimonialGrid}>
        <TestimonialCard
          name="木村 あかり"
          relation="3歳児の母"
          text="毎朝「保育園に行きたい！」と言ってくれるようになりました。先生方の温かい対応に感謝しています。給食も栄養バランスが良く、家でも食べられるものが増えました。"
        />
        <TestimonialCard
          name="高橋 まさと"
          relation="5歳児の父"
          text="英語やリトミックなど、多彩なカリキュラムが魅力です。子どもの成長が目に見えて分かり、毎日の連絡帳も丁寧で安心して預けられます。"
        />
      </div>
    </section>
  );
}

function EnrollmentCTASection() {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>2026年度 入園児募集中</h2>
        <p className={styles.ctaSubtitle}>まずは見学にいらしてください。園の雰囲気を体感していただけます。</p>
        <div className={styles.ctaButtons}>
          <button className={styles.ctaButton}>見学予約はこちら</button>
          <button className={styles.ctaButtonSecondary}>お電話でのお問い合わせ</button>
        </div>
        <p className={styles.ctaNote}>TEL: 03-1234-5678（平日 9:00-17:00）</p>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <span className={styles.footerLogo}>にこにこ保育園</span>
          <span className={styles.footerLogoSub}>NIKONIKO HOIKUEN</span>
          <p className={styles.footerTagline}>笑顔あふれる毎日を</p>
        </div>
        <div className={styles.footerLinks}>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>園について</h4>
            <a href="#" className={styles.footerLink}>園の方針</a>
            <a href="#" className={styles.footerLink}>クラス案内</a>
            <a href="#" className={styles.footerLink}>年間行事</a>
          </div>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>入園案内</h4>
            <a href="#" className={styles.footerLink}>募集要項</a>
            <a href="#" className={styles.footerLink}>見学予約</a>
            <a href="#" className={styles.footerLink}>よくある質問</a>
          </div>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>お問い合わせ</h4>
            <a href="#" className={styles.footerLink}>アクセス</a>
            <a href="#" className={styles.footerLink}>電話番号</a>
            <a href="#" className={styles.footerLink}>メール</a>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>© 2026 にこにこ保育園 NIKONIKO HOIKUEN. All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseNurseryLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <AgeGroupsSection />
      <DailyRoutineSection />
      <StaffSection />
      <TestimonialsSection />
      <EnrollmentCTASection />
      <FooterSection />
    </div>
  );
}
