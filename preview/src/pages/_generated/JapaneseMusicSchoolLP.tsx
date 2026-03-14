import styles from './JapaneseMusicSchoolLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>Melodia 音楽教室</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>コース紹介</a>
          <a href="#" className={styles.navLink}>講師紹介</a>
          <a href="#" className={styles.navLink}>発表会</a>
          <a href="#" className={styles.navLink}>よくある質問</a>
          <a href="#" className={styles.navLink}>アクセス</a>
        </div>
        <button className={styles.navCta}>無料体験レッスン</button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroDecor} />
      <div className={styles.heroContent}>
        <span className={styles.heroLabel}>MUSIC SCHOOL</span>
        <h1 className={styles.heroTitle}>音楽のある暮らしを</h1>
        <p className={styles.heroSubtitle}>
          初心者からプロ志望まで、一人ひとりに寄り添った個人レッスン。<br />
          音楽の楽しさを、あなたのペースで見つけましょう。
        </p>
        <div className={styles.heroBtnGroup}>
          <button className={styles.heroBtnPrimary}>無料体験に申し込む</button>
          <button className={styles.heroBtnSecondary}>コースを見る</button>
        </div>
      </div>
    </section>
  );
}

function CourseCard({ instrument, title, description, level }: { instrument: string; title: string; description: string; level: string }) {
  return (
    <div className={styles.courseCard}>
      <div className={styles.courseIconArea} />
      <h3 className={styles.courseTitle}>{title}</h3>
      <span className={styles.courseLevel}>{level}</span>
      <p className={styles.courseDesc}>{description}</p>
      <button className={styles.courseBtn}>詳しく見る</button>
    </div>
  );
}

function CoursesSection() {
  return (
    <section className={styles.courses}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>COURSES</span>
        <h2 className={styles.sectionTitle}>コース紹介</h2>
      </div>
      <div className={styles.coursesGrid}>
        <CourseCard instrument="piano" title="ピアノコース" level="初級〜上級" description="クラシックからポップスまで幅広いジャンルに対応。グランドピアノを使った本格レッスンで、確かな技術を身につけます。" />
        <CourseCard instrument="guitar" title="ギターコース" level="初級〜上級" description="アコースティック・エレキどちらも対応。弾き語りからソロギターまで、やりたい音楽を自由に楽しめるコースです。" />
        <CourseCard instrument="violin" title="ヴァイオリンコース" level="初級〜中級" description="美しい音色を奏でる喜びを。正しいフォームと表現力を丁寧に指導し、憧れの曲が弾けるようになります。" />
        <CourseCard instrument="vocal" title="ヴォーカルコース" level="初級〜上級" description="腹式呼吸から発声法まで基礎を徹底指導。カラオケ上達から本格的なステージまで、あなたの声を磨きます。" />
      </div>
    </section>
  );
}

function InstructorCard({ name, instrument, bio }: { name: string; instrument: string; bio: string }) {
  return (
    <div className={styles.instructorCard}>
      <div className={styles.instructorPhoto} />
      <h3 className={styles.instructorName}>{name}</h3>
      <p className={styles.instructorInstrument}>{instrument}</p>
      <p className={styles.instructorBio}>{bio}</p>
    </div>
  );
}

function InstructorsSection() {
  return (
    <section className={styles.instructors}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>INSTRUCTORS</span>
        <h2 className={styles.sectionTitle}>講師紹介</h2>
      </div>
      <div className={styles.instructorsGrid}>
        <InstructorCard name="高橋 美由紀" instrument="ピアノ講師" bio="東京藝術大学卒業。コンクール入賞歴多数。20年以上の指導経験で、初心者から上級者まで丁寧に指導します。" />
        <InstructorCard name="鈴木 健太" instrument="ギター講師" bio="プロミュージシャンとして活動後、指導の道へ。ロック・ジャズ・ボサノバなど幅広いジャンルに対応。" />
        <InstructorCard name="中村 さくら" instrument="ヴァイオリン講師" bio="ウィーン音楽院留学経験あり。オーケストラでの演奏経験を活かした、表現力豊かなレッスンが好評。" />
        <InstructorCard name="山口 翔" instrument="ヴォーカル講師" bio="メジャーアーティストのボイストレーナーとしても活動。科学的アプローチで確実に歌唱力を向上させます。" />
      </div>
    </section>
  );
}

function RecitalSection() {
  return (
    <section className={styles.recital}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>RECITAL</span>
        <h2 className={styles.sectionTitle}>発表会・イベント</h2>
        <p className={styles.sectionSubtitle}>年2回の発表会と季節のイベントで、日頃の成果を披露する機会を提供しています。</p>
      </div>
      <div className={styles.recitalGrid}>
        <div className={styles.recitalItem}>
          <div className={styles.recitalImage} />
        </div>
        <div className={styles.recitalItem}>
          <div className={styles.recitalImage} />
        </div>
        <div className={styles.recitalItem}>
          <div className={styles.recitalImage} />
        </div>
        <div className={styles.recitalItem}>
          <div className={styles.recitalImage} />
        </div>
        <div className={styles.recitalItem}>
          <div className={styles.recitalImage} />
        </div>
        <div className={styles.recitalItem}>
          <div className={styles.recitalImage} />
        </div>
      </div>
    </section>
  );
}

function TrialCtaSection() {
  return (
    <section className={styles.trialCta}>
      <div className={styles.trialCtaGlow} />
      <div className={styles.trialCtaContent}>
        <h2 className={styles.trialCtaTitle}>まずは無料体験レッスンから</h2>
        <p className={styles.trialCtaSubtitle}>
          30分の無料体験レッスンで、楽器に触れる楽しさを体感してください。<br />
          手ぶらでOK。楽器はすべて無料で貸し出しいたします。
        </p>
        <button className={styles.trialCtaBtn}>無料体験を予約する</button>
        <p className={styles.trialCtaNote}>※ 強引な勧誘は一切ございません</p>
      </div>
    </section>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className={styles.faqItem}>
      <h3 className={styles.faqQuestion}>{question}</h3>
      <p className={styles.faqAnswer}>{answer}</p>
    </div>
  );
}

function FaqSection() {
  return (
    <section className={styles.faq}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>FAQ</span>
        <h2 className={styles.sectionTitle}>よくある質問</h2>
      </div>
      <div className={styles.faqList}>
        <FaqItem question="楽器を持っていなくても始められますか？" answer="はい、レッスン用の楽器は無料で貸し出しております。まずは体験レッスンで楽器に触れてみてください。購入をご検討の際は、講師がアドバイスいたします。" />
        <FaqItem question="何歳から習えますか？" answer="ピアノは4歳から、ギターは小学1年生から、ヴァイオリンは3歳から受講可能です。ヴォーカルは小学3年生からとなります。シニアの方も大歓迎です。" />
        <FaqItem question="レッスンの振替はできますか？" answer="前日までにご連絡いただければ、月内で振替レッスンが可能です。急な体調不良の場合も柔軟に対応いたしますので、お気軽にご相談ください。" />
        <FaqItem question="月謝以外に費用はかかりますか？" answer="入会金と月謝以外の費用はございません。教材費は月謝に含まれています。発表会参加費のみ別途かかりますが、任意参加です。" />
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span className={styles.footerBrand}>Melodia 音楽教室</span>
        <div className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}>コース紹介</a>
          <a href="#" className={styles.footerLink}>講師紹介</a>
          <a href="#" className={styles.footerLink}>料金</a>
          <a href="#" className={styles.footerLink}>発表会</a>
          <a href="#" className={styles.footerLink}>よくある質問</a>
          <a href="#" className={styles.footerLink}>プライバシーポリシー</a>
        </div>
        <div className={styles.footerDivider} />
        <p className={styles.footerCopy}>© 2026 Melodia 音楽教室 All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseMusicSchoolLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <CoursesSection />
      <InstructorsSection />
      <RecitalSection />
      <TrialCtaSection />
      <FaqSection />
      <FooterSection />
    </div>
  );
}
