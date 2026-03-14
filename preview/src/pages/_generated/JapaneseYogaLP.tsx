import styles from './JapaneseYogaLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>SHANTI YOGA</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>コンセプト</a>
          <a href="#" className={styles.navLink}>クラス一覧</a>
          <a href="#" className={styles.navLink}>インストラクター</a>
          <a href="#" className={styles.navLink}>スタジオ紹介</a>
          <a href="#" className={styles.navLink}>アクセス</a>
        </div>
        <button className={styles.navCta}>体験予約</button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        <span className={styles.heroLabel}>YOGA &amp; MEDITATION</span>
        <h1 className={styles.heroTitle}>心と体を整える</h1>
        <p className={styles.heroSubtitle}>
          深い呼吸とともに、自分自身と向き合う時間。<br />
          初心者から経験者まで、一人ひとりに寄り添うヨガスタジオ。
        </p>
        <div className={styles.heroBtnGroup}>
          <button className={styles.heroBtnPrimary}>無料体験レッスン</button>
          <button className={styles.heroBtnSecondary}>クラスを見る</button>
        </div>
      </div>
    </section>
  );
}

function ClassCard({ time, name, level, duration }: { time: string; name: string; level: string; duration: string }) {
  return (
    <div className={styles.classCard}>
      <span className={styles.classTime}>{time}</span>
      <div className={styles.classInfo}>
        <h3 className={styles.className}>{name}</h3>
        <div className={styles.classMeta}>
          <span className={styles.classLevel}>{level}</span>
          <span className={styles.classDuration}>{duration}</span>
        </div>
      </div>
    </div>
  );
}

function ScheduleSection() {
  return (
    <section className={styles.schedule}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>CLASS SCHEDULE</span>
        <h2 className={styles.sectionTitle}>クラススケジュール</h2>
        <p className={styles.sectionDesc}>あなたのライフスタイルに合わせて、多彩なクラスをご用意しています。</p>
      </div>
      <div className={styles.scheduleGrid}>
        <div className={styles.scheduleDay}>
          <h3 className={styles.dayTitle}>月曜日</h3>
          <ClassCard time="07:00" name="朝のハタヨガ" level="初級" duration="60分" />
          <ClassCard time="10:30" name="リストラティブヨガ" level="全レベル" duration="75分" />
          <ClassCard time="19:00" name="ヴィンヤサフロー" level="中級" duration="60分" />
        </div>
        <div className={styles.scheduleDay}>
          <h3 className={styles.dayTitle}>火曜日</h3>
          <ClassCard time="09:00" name="マタニティヨガ" level="全レベル" duration="60分" />
          <ClassCard time="12:00" name="パワーヨガ" level="中級〜上級" duration="75分" />
          <ClassCard time="20:00" name="陰ヨガ＆瞑想" level="全レベル" duration="90分" />
        </div>
        <div className={styles.scheduleDay}>
          <h3 className={styles.dayTitle}>水曜日</h3>
          <ClassCard time="07:00" name="朝のハタヨガ" level="初級" duration="60分" />
          <ClassCard time="11:00" name="アシュタンガヨガ" level="上級" duration="90分" />
          <ClassCard time="18:30" name="リラックスヨガ" level="初級" duration="60分" />
        </div>
      </div>
    </section>
  );
}

function InstructorCard({ name, specialty, bio }: { name: string; specialty: string; bio: string }) {
  return (
    <div className={styles.instructorCard}>
      <div className={styles.instructorPhoto} />
      <h3 className={styles.instructorName}>{name}</h3>
      <p className={styles.instructorSpecialty}>{specialty}</p>
      <p className={styles.instructorBio}>{bio}</p>
    </div>
  );
}

function InstructorSection() {
  return (
    <section className={styles.instructor}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>INSTRUCTOR</span>
        <h2 className={styles.sectionTitle}>インストラクター紹介</h2>
      </div>
      <div className={styles.instructorGrid}>
        <InstructorCard
          name="山田 沙織"
          specialty="ハタヨガ・瞑想"
          bio="インド・リシケシュにて500時間のヨガティーチャートレーニング修了。10年以上の指導経験を持ち、心と体の調和を大切にした丁寧なレッスンが人気。"
        />
        <InstructorCard
          name="鈴木 健太"
          specialty="アシュタンガ・パワーヨガ"
          bio="元アスリート。怪我のリハビリをきっかけにヨガと出会う。解剖学に基づいた安全で効果的なアライメント指導に定評あり。"
        />
        <InstructorCard
          name="中村 美月"
          specialty="リストラティブ・陰ヨガ"
          bio="心理カウンセラー資格保有。ストレスマネジメントとヨガを融合させたプログラムで、心身のリラクゼーションを追求。"
        />
      </div>
    </section>
  );
}

function StudioSection() {
  return (
    <section className={styles.studio}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>STUDIO</span>
        <h2 className={styles.sectionTitle}>スタジオ紹介</h2>
      </div>
      <div className={styles.studioGrid}>
        <div className={styles.studioPhotoLarge} />
        <div className={styles.studioPhotoSmallGroup}>
          <div className={styles.studioPhotoSmall} />
          <div className={styles.studioPhotoSmall} />
        </div>
      </div>
      <div className={styles.studioFeatures}>
        <div className={styles.studioFeature}>
          <span className={styles.studioFeatureTitle}>天然無垢材の床</span>
          <p className={styles.studioFeatureDesc}>温もりのある天然木で、裸足で心地よく練習できます。</p>
        </div>
        <div className={styles.studioFeature}>
          <span className={styles.studioFeatureTitle}>自然光あふれる空間</span>
          <p className={styles.studioFeatureDesc}>大きな窓から柔らかな光が差し込む開放的なスタジオ。</p>
        </div>
        <div className={styles.studioFeature}>
          <span className={styles.studioFeatureTitle}>充実のアメニティ</span>
          <p className={styles.studioFeatureDesc}>オーガニックタオル、ハーブティー、更衣室完備。</p>
        </div>
      </div>
    </section>
  );
}

function TrialCtaSection() {
  return (
    <section className={styles.trialCta}>
      <div className={styles.trialCtaContent}>
        <h2 className={styles.trialCtaTitle}>まずは体験レッスンから</h2>
        <p className={styles.trialCtaSubtitle}>
          初めての方限定、体験レッスンが無料。<br />
          マット・タオルも無料レンタル。手ぶらでお越しください。
        </p>
        <button className={styles.trialCtaBtn}>無料体験を予約する</button>
        <p className={styles.trialCtaNote}>※ 当日入会で入会金が無料になります</p>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span className={styles.footerBrand}>SHANTI YOGA</span>
        <div className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}>コンセプト</a>
          <a href="#" className={styles.footerLink}>クラス一覧</a>
          <a href="#" className={styles.footerLink}>インストラクター</a>
          <a href="#" className={styles.footerLink}>料金案内</a>
          <a href="#" className={styles.footerLink}>プライバシーポリシー</a>
        </div>
        <div className={styles.footerDivider} />
        <p className={styles.footerCopy}>&copy; 2026 SHANTI YOGA All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseYogaLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <ScheduleSection />
      <InstructorSection />
      <StudioSection />
      <TrialCtaSection />
      <FooterSection />
    </div>
  );
}
