import styles from './JapaneseCalligraphyLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <div className={styles.brandGroup}>
          <span className={styles.brandKanji}>墨香</span>
          <span className={styles.brandEn}>BOKKOU</span>
        </div>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>教室案内</a>
          <a href="#" className={styles.navLink}>コース</a>
          <a href="#" className={styles.navLink}>作品集</a>
          <a href="#" className={styles.navLink}>講師紹介</a>
          <a href="#" className={styles.navLink}>体験申込</a>
        </div>
        <button className={styles.navCta}>体験予約</button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroAccent} />
      <div className={styles.heroContent}>
        <span className={styles.heroLabel}>書道教室 墨香</span>
        <h1 className={styles.heroTitle}>筆を持ち、心を整える</h1>
        <p className={styles.heroSubtitle}>
          千年の伝統を受け継ぐ書の道。<br />
          一筆一筆に込める想いが、あなたの心と暮らしを豊かにします。
        </p>
        <div className={styles.heroBtnGroup}>
          <button className={styles.heroBtnPrimary}>無料体験に申し込む</button>
          <button className={styles.heroBtnSecondary}>教室を見学する</button>
        </div>
      </div>
    </section>
  );
}

function CourseCard({ level, title, description, schedule, price }: { level: string; title: string; description: string; schedule: string; price: string }) {
  return (
    <div className={styles.courseCard}>
      <span className={styles.courseLevel}>{level}</span>
      <h3 className={styles.courseTitle}>{title}</h3>
      <div className={styles.courseDivider} />
      <p className={styles.courseDesc}>{description}</p>
      <p className={styles.courseSchedule}>{schedule}</p>
      <p className={styles.coursePrice}>{price}</p>
    </div>
  );
}

function CoursesSection() {
  return (
    <section className={styles.courses}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>COURSES</span>
        <h2 className={styles.sectionTitle}>コース案内</h2>
      </div>
      <div className={styles.coursesGrid}>
        <CourseCard
          level="BEGINNER"
          title="入門コース"
          description="筆の持ち方、基本的な筆使いから始めます。ひらがな・カタカナ・簡単な漢字を美しく書けるようになります。書道未経験の方も安心。"
          schedule="月2回 / 90分"
          price="¥6,600/月"
        />
        <CourseCard
          level="INTERMEDIATE"
          title="中級コース"
          description="楷書・行書の基礎を学び、半紙作品の制作に取り組みます。古典臨書を通じて書の奥深さを探求します。"
          schedule="月3回 / 90分"
          price="¥9,900/月"
        />
        <CourseCard
          level="ADVANCED"
          title="上級コース"
          description="草書・篆書を含む多様な書体を習得。展覧会出品を目指し、個性的な表現と創作活動に取り組みます。"
          schedule="月4回 / 120分"
          price="¥14,300/月"
        />
      </div>
    </section>
  );
}

function GalleryItem({ title, style }: { title: string; style: string }) {
  return (
    <div className={styles.galleryItem}>
      <div className={styles.galleryImage} />
      <p className={styles.galleryTitle}>{title}</p>
      <p className={styles.galleryStyle}>{style}</p>
    </div>
  );
}

function GallerySection() {
  return (
    <section className={styles.gallery}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>GALLERY</span>
        <h2 className={styles.sectionTitle}>作品紹介</h2>
      </div>
      <div className={styles.galleryGrid}>
        <GalleryItem title="風" style="草書" />
        <GalleryItem title="永字八法" style="楷書" />
        <GalleryItem title="花鳥風月" style="行書" />
        <GalleryItem title="無心" style="篆書" />
      </div>
    </section>
  );
}

function InstructorSection() {
  return (
    <section className={styles.instructor}>
      <div className={styles.instructorPhoto} />
      <div className={styles.instructorInfo}>
        <span className={styles.sectionLabel}>INSTRUCTOR</span>
        <h2 className={styles.instructorTitle}>講師紹介</h2>
        <div className={styles.instructorDivider} />
        <h3 className={styles.instructorName}>山田 翠雲（やまだ すいうん）</h3>
        <p className={styles.instructorBio}>
          日展入選5回。毎日書道展審査員。書道歴40年。
          東京藝術大学書道科卒業後、中国留学を経て独自の書風を確立。
        </p>
        <p className={styles.instructorBio}>
          「書は人なり」を信条に、技術だけでなく心の在り方を大切にした指導を行っています。初心者から上級者まで、一人ひとりの個性を活かした丁寧な指導が評判です。
        </p>
      </div>
    </section>
  );
}

function ClassInfoSection() {
  return (
    <section className={styles.classInfo}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>INFORMATION</span>
        <h2 className={styles.sectionTitle}>教室案内</h2>
      </div>
      <div className={styles.infoGrid}>
        <div className={styles.infoCard}>
          <h3 className={styles.infoCardTitle}>開講スケジュール</h3>
          <div className={styles.infoCardDivider} />
          <p className={styles.infoItem}>火曜日 10:00 - 12:00 / 14:00 - 16:00</p>
          <p className={styles.infoItem}>木曜日 18:30 - 20:30（夜間クラス）</p>
          <p className={styles.infoItem}>土曜日 10:00 - 12:00 / 13:00 - 15:00</p>
          <p className={styles.infoItem}>日曜日 10:00 - 12:00（月2回）</p>
        </div>
        <div className={styles.infoCard}>
          <h3 className={styles.infoCardTitle}>料金のご案内</h3>
          <div className={styles.infoCardDivider} />
          <p className={styles.infoItem}>入会金: ¥5,500（体験当日入会で無料）</p>
          <p className={styles.infoItem}>入門コース: ¥6,600/月（月2回）</p>
          <p className={styles.infoItem}>中級コース: ¥9,900/月（月3回）</p>
          <p className={styles.infoItem}>上級コース: ¥14,300/月（月4回）</p>
          <p className={styles.infoNote}>※ 道具一式レンタル無料（筆・墨・硯・紙）</p>
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaGlow} />
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>まずは体験教室へ</h2>
        <p className={styles.ctaSubtitle}>
          手ぶらでOK。道具はすべてご用意しています。<br />
          60分の体験で、書道の奥深さと心地よさを感じてください。
        </p>
        <button className={styles.ctaBtn}>体験教室を予約する</button>
        <p className={styles.ctaNote}>※ 体験料 ¥1,100（税込）/ 当日入会で無料</p>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrandGroup}>
          <span className={styles.footerBrand}>書道教室 墨香</span>
          <span className={styles.footerBrandEn}>BOKKOU</span>
        </div>
        <div className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}>教室案内</a>
          <a href="#" className={styles.footerLink}>コース</a>
          <a href="#" className={styles.footerLink}>作品集</a>
          <a href="#" className={styles.footerLink}>講師紹介</a>
          <a href="#" className={styles.footerLink}>アクセス</a>
          <a href="#" className={styles.footerLink}>プライバシーポリシー</a>
        </div>
        <div className={styles.footerDivider} />
        <p className={styles.footerCopy}>© 2026 書道教室 墨香 BOKKOU All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseCalligraphyLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <CoursesSection />
      <GallerySection />
      <InstructorSection />
      <ClassInfoSection />
      <CtaSection />
      <FooterSection />
    </div>
  );
}
