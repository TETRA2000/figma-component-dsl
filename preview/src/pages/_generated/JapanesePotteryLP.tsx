import styles from './JapanesePotteryLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>陶芸教室 土の詩 <span className={styles.brandEn}>TSUCHI NO UTA</span></span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>コース紹介</a>
          <a href="#" className={styles.navLink}>作品ギャラリー</a>
          <a href="#" className={styles.navLink}>講師紹介</a>
          <a href="#" className={styles.navLink}>体験レッスン</a>
          <a href="#" className={styles.navLink}>スケジュール</a>
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
        <span className={styles.heroLabel}>POTTERY CLASS</span>
        <h1 className={styles.heroTitle}>土と向き合う、<br />心のひととき</h1>
        <p className={styles.heroSubtitle}>
          手のひらに伝わる土の温もり。<br />
          ゆっくりと形を紡ぐ、贅沢な時間を過ごしませんか。
        </p>
        <button className={styles.heroCta}>体験レッスンを予約する</button>
      </div>
    </section>
  );
}

function CourseCard({
  level,
  title,
  description,
  features,
  price,
}: {
  level: string;
  title: string;
  description: string;
  features: string[];
  price: string;
}) {
  return (
    <div className={styles.courseCard}>
      <span className={styles.courseLevel}>{level}</span>
      <h3 className={styles.courseTitle}>{title}</h3>
      <p className={styles.courseDesc}>{description}</p>
      <ul className={styles.courseFeatures}>
        {features.map((f, i) => (
          <li key={i} className={styles.courseFeature}>{f}</li>
        ))}
      </ul>
      <p className={styles.coursePrice}>{price}</p>
    </div>
  );
}

function CoursesSection() {
  return (
    <section className={styles.courses}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>COURSES</span>
        <h2 className={styles.sectionTitle}>コース紹介</h2>
        <p className={styles.sectionSubtitle}>初心者から経験者まで、あなたに合ったコースをお選びいただけます</p>
      </div>
      <div className={styles.courseGrid}>
        <CourseCard
          level="BEGINNER"
          title="はじめての陶芸コース"
          description="陶芸が初めての方でも安心。土練りから成形、釉薬掛けまで基礎を丁寧にお教えします。"
          features={['手びねりの基本技法', '釉薬の選び方と掛け方', '全4回（月2回）', '道具・材料費込み']}
          price="月額 ¥8,800"
        />
        <CourseCard
          level="INTERMEDIATE"
          title="中級コース"
          description="基礎を習得した方向け。より自由な表現と高度な技法に挑戦していただけます。"
          features={['たたら成形・型起こし', 'オリジナル釉薬の調合', '全8回（月2回）', '自由制作の時間あり']}
          price="月額 ¥12,800"
        />
        <CourseCard
          level="WHEEL"
          title="ろくろコース"
          description="電動ろくろを使った本格的な作陶。器の美しいフォルムを追求します。"
          features={['電動ろくろの操作', '削り・仕上げ技法', '全8回（月2回）', '専用ろくろ完備']}
          price="月額 ¥15,800"
        />
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section className={styles.gallery}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabelDark}>GALLERY</span>
        <h2 className={styles.sectionTitleDark}>生徒作品ギャラリー</h2>
      </div>
      <div className={styles.galleryGrid}>
        {[
          { label: '飯碗', desc: '初級コース 3ヶ月目' },
          { label: '花器', desc: '中級コース 6ヶ月目' },
          { label: '急須セット', desc: 'ろくろコース 1年目' },
          { label: '大皿', desc: '中級コース 8ヶ月目' },
          { label: 'ぐい呑み', desc: 'ろくろコース 4ヶ月目' },
          { label: 'マグカップ', desc: '初級コース 2ヶ月目' },
        ].map((item, i) => (
          <div key={i} className={styles.galleryItem}>
            <div className={styles.galleryImg} />
            <p className={styles.galleryLabel}>{item.label}</p>
            <p className={styles.galleryDesc}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function InstructorSection() {
  return (
    <section className={styles.instructor}>
      <div className={styles.instructorContent}>
        <div className={styles.instructorImg} />
        <div className={styles.instructorText}>
          <span className={styles.sectionLabel}>INSTRUCTOR</span>
          <h2 className={styles.sectionTitle}>講師紹介</h2>
          <h3 className={styles.instructorName}>山本 美咲 <span className={styles.instructorTitle}>主宰・陶芸家</span></h3>
          <p className={styles.instructorDesc}>
            京都市立芸術大学陶磁器専攻卒業後、備前焼の窯元で5年間修行。
            2015年に「土の詩」を開窯。日本工芸会正会員。
          </p>
          <p className={styles.instructorDesc}>
            「土と対話しながら、自分だけの器を生み出す喜びを
            一人でも多くの方に感じていただきたい」という想いで、
            初心者から上級者まで丁寧に指導しています。
          </p>
          <div className={styles.instructorAwards}>
            <span className={styles.award}>日本陶芸展 入選 (2018)</span>
            <span className={styles.award}>信楽陶芸祭 奨励賞 (2020)</span>
            <span className={styles.award}>全国陶磁器フェア 金賞 (2023)</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrialSection() {
  return (
    <section className={styles.trial}>
      <div className={styles.trialContent}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabelDark}>TRIAL LESSON</span>
          <h2 className={styles.sectionTitleDark}>体験レッスン</h2>
          <p className={styles.sectionSubtitleDark}>
            まずは気軽に陶芸を体験してみませんか？<br />
            手ぶらでOK、お一人様から参加いただけます。
          </p>
        </div>
        <div className={styles.trialCards}>
          <div className={styles.trialCard}>
            <h3 className={styles.trialCardTitle}>手びねり体験</h3>
            <p className={styles.trialCardDesc}>粘土をこねて自由に形を作ります。お子様連れも歓迎。</p>
            <div className={styles.trialMeta}>
              <span>所要時間: 約90分</span>
              <span>¥3,500（材料費込み）</span>
            </div>
          </div>
          <div className={styles.trialCard}>
            <h3 className={styles.trialCardTitle}>ろくろ体験</h3>
            <p className={styles.trialCardDesc}>電動ろくろで茶碗やカップを制作。講師がマンツーマンで指導。</p>
            <div className={styles.trialMeta}>
              <span>所要時間: 約120分</span>
              <span>¥5,500（材料費込み）</span>
            </div>
          </div>
        </div>
        <button className={styles.trialCta}>体験レッスンに申し込む</button>
      </div>
    </section>
  );
}

function ScheduleSection() {
  return (
    <section className={styles.schedule}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>SCHEDULE</span>
        <h2 className={styles.sectionTitle}>教室スケジュール</h2>
      </div>
      <div className={styles.scheduleTable}>
        <div className={styles.scheduleHeader}>
          <span className={styles.scheduleDay}>月</span>
          <span className={styles.scheduleDay}>火</span>
          <span className={styles.scheduleDay}>水</span>
          <span className={styles.scheduleDay}>木</span>
          <span className={styles.scheduleDay}>金</span>
          <span className={styles.scheduleDay}>土</span>
          <span className={styles.scheduleDaySun}>日</span>
        </div>
        <div className={styles.scheduleRow}>
          <span className={styles.scheduleTime}>午前 10:00-12:30</span>
          <div className={styles.scheduleSlots}>
            <span className={styles.slotOpen}>初級</span>
            <span className={styles.slotClosed}>休</span>
            <span className={styles.slotOpen}>中級</span>
            <span className={styles.slotOpen}>ろくろ</span>
            <span className={styles.slotOpen}>初級</span>
            <span className={styles.slotOpen}>体験</span>
            <span className={styles.slotClosed}>休</span>
          </div>
        </div>
        <div className={styles.scheduleRow}>
          <span className={styles.scheduleTime}>午後 14:00-16:30</span>
          <div className={styles.scheduleSlots}>
            <span className={styles.slotOpen}>中級</span>
            <span className={styles.slotClosed}>休</span>
            <span className={styles.slotOpen}>ろくろ</span>
            <span className={styles.slotOpen}>初級</span>
            <span className={styles.slotOpen}>中級</span>
            <span className={styles.slotOpen}>ろくろ</span>
            <span className={styles.slotClosed}>休</span>
          </div>
        </div>
        <div className={styles.scheduleRow}>
          <span className={styles.scheduleTime}>夜間 18:30-21:00</span>
          <div className={styles.scheduleSlots}>
            <span className={styles.slotOpen}>初級</span>
            <span className={styles.slotClosed}>休</span>
            <span className={styles.slotOpen}>初級</span>
            <span className={styles.slotOpen}>中級</span>
            <span className={styles.slotOpen}>ろくろ</span>
            <span className={styles.slotNone}>-</span>
            <span className={styles.slotClosed}>休</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span className={styles.footerBrand}>陶芸教室 土の詩</span>
        <div className={styles.footerInfo}>
          <span>〒606-8406 京都市左京区浄土寺下南田町3-15</span>
          <span>TEL: 075-123-4567</span>
          <span>営業: 10:00-21:00（火・日定休）</span>
        </div>
        <div className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}>コース紹介</a>
          <a href="#" className={styles.footerLink}>作品ギャラリー</a>
          <a href="#" className={styles.footerLink}>講師紹介</a>
          <a href="#" className={styles.footerLink}>体験レッスン</a>
          <a href="#" className={styles.footerLink}>プライバシーポリシー</a>
        </div>
        <div className={styles.footerDivider} />
        <p className={styles.footerCopy}>&copy; 2026 陶芸教室 土の詩 TSUCHI NO UTA All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapanesePotteryLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <CoursesSection />
      <GallerySection />
      <InstructorSection />
      <TrialSection />
      <ScheduleSection />
      <FooterSection />
    </div>
  );
}
