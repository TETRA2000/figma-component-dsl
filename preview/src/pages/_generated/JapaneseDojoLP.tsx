import styles from './JapaneseDojoLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>武道館 誠心</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>稽古内容</a>
          <a href="#" className={styles.navLink}>時間割</a>
          <a href="#" className={styles.navLink}>師範紹介</a>
          <a href="#" className={styles.navLink}>体験稽古</a>
          <a href="#" className={styles.navLink}>アクセス</a>
        </div>
        <button className={styles.navCta}>体験申込</button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroAccent} />
      <div className={styles.heroContent}>
        <span className={styles.heroLabel}>BUDOKAN SEISHIN</span>
        <h1 className={styles.heroTitle}>心技体を鍛える</h1>
        <p className={styles.heroSubtitle}>
          伝統武道の精神を現代に伝える。<br />
          初心者から有段者まで、本物の武道を学べる総合道場。
        </p>
        <div className={styles.heroBtnGroup}>
          <button className={styles.heroBtnPrimary}>無料体験稽古に申し込む</button>
          <button className={styles.heroBtnSecondary}>稽古内容を見る</button>
        </div>
      </div>
    </section>
  );
}

function DisciplineCard({ nameJa, nameEn, description }: { nameJa: string; nameEn: string; description: string }) {
  return (
    <div className={styles.disciplineCard}>
      <div className={styles.disciplineIcon} />
      <h3 className={styles.disciplineName}>{nameJa}</h3>
      <p className={styles.disciplineNameEn}>{nameEn}</p>
      <div className={styles.disciplineDivider} />
      <p className={styles.disciplineDesc}>{description}</p>
    </div>
  );
}

function DisciplinesSection() {
  return (
    <section className={styles.disciplines}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>DISCIPLINES</span>
        <h2 className={styles.sectionTitle}>稽古種目</h2>
      </div>
      <div className={styles.disciplinesGrid}>
        <DisciplineCard
          nameJa="空手道"
          nameEn="KARATE"
          description="突き・蹴り・型の基本から組手まで。心身の鍛錬を通じて強い精神力を養います。"
        />
        <DisciplineCard
          nameJa="柔道"
          nameEn="JUDO"
          description="投技・固技・当身技を体系的に学ぶ。礼に始まり礼に終わる日本柔道の真髄。"
        />
        <DisciplineCard
          nameJa="剣道"
          nameEn="KENDO"
          description="竹刀を通じて剣の理法を学ぶ。集中力と判断力を高め、人間形成を目指します。"
        />
        <DisciplineCard
          nameJa="合気道"
          nameEn="AIKIDO"
          description="相手の力を利用した合理的な技法。護身術としても実用的な和の武道。"
        />
      </div>
    </section>
  );
}

function ScheduleSection() {
  const scheduleData = [
    { time: '10:00', mon: '空手', tue: '柔道', wed: '剣道', thu: '合気道', fri: '空手', sat: '全種目' },
    { time: '14:00', mon: '柔道', tue: '剣道', wed: '合気道', thu: '空手', fri: '柔道', sat: '全種目' },
    { time: '17:00', mon: '少年部', tue: '少年部', wed: '少年部', thu: '少年部', fri: '少年部', sat: '-' },
    { time: '19:00', mon: '剣道', tue: '合気道', wed: '空手', thu: '柔道', fri: '剣道', sat: '-' },
    { time: '21:00', mon: '合気道', tue: '空手', wed: '柔道', thu: '剣道', fri: '合気道', sat: '-' },
  ];

  return (
    <section className={styles.schedule}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>SCHEDULE</span>
        <h2 className={styles.sectionTitle}>稽古時間割</h2>
      </div>
      <table className={styles.scheduleTable}>
        <thead>
          <tr>
            <th>時間</th>
            <th>月</th>
            <th>火</th>
            <th>水</th>
            <th>木</th>
            <th>金</th>
            <th>土</th>
          </tr>
        </thead>
        <tbody>
          {scheduleData.map((row) => (
            <tr key={row.time}>
              <td className={styles.scheduleTimeCell}>{row.time}</td>
              <td>{row.mon}</td>
              <td>{row.tue}</td>
              <td>{row.wed}</td>
              <td>{row.thu}</td>
              <td>{row.fri}</td>
              <td>{row.sat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function InstructorCard({ name, title, bio }: { name: string; title: string; bio: string }) {
  return (
    <div className={styles.instructorCard}>
      <div className={styles.instructorPhoto} />
      <div className={styles.instructorInfo}>
        <p className={styles.instructorTitle}>{title}</p>
        <h3 className={styles.instructorName}>{name}</h3>
        <div className={styles.instructorDivider} />
        <p className={styles.instructorBio}>{bio}</p>
      </div>
    </div>
  );
}

function InstructorsSection() {
  return (
    <section className={styles.instructors}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>INSTRUCTORS</span>
        <h2 className={styles.sectionTitle}>師範紹介</h2>
      </div>
      <div className={styles.instructorsGrid}>
        <InstructorCard
          name="高橋 剛"
          title="館長 / 空手道八段"
          bio="全日本空手道選手権優勝3回。40年以上の指導歴を持ち、門下生から多くの全国大会入賞者を輩出。「武道とは己に克つこと」を信条に、技術だけでなく人間力の育成を重視した指導を行う。"
        />
        <InstructorCard
          name="渡辺 誠一郎"
          title="副館長 / 柔道七段"
          bio="講道館柔道七段。元全日本実業団柔道選手。「柔よく剛を制す」の理念のもと、相手を尊重し共に成長する柔道を伝える。少年部から一般部まで幅広い世代の指導に定評がある。"
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
        <h2 className={styles.ctaTitle}>まずは体験稽古から</h2>
        <p className={styles.ctaSubtitle}>
          道着・防具は無料でお貸しします。<br />
          初心者の方も安心してご参加いただけます。見学だけでもお気軽にどうぞ。
        </p>
        <button className={styles.ctaBtn}>体験稽古を申し込む</button>
        <p className={styles.ctaNote}>※ 体験稽古は1回2,000円（当日入門で無料）</p>
      </div>
    </section>
  );
}

function AccessSection() {
  return (
    <section className={styles.access}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>ACCESS</span>
        <h2 className={styles.sectionTitle}>アクセス</h2>
      </div>
      <div className={styles.accessInner}>
        <div className={styles.mapPlaceholder} />
        <div className={styles.accessDetails}>
          <h3 className={styles.accessName}>武道館 誠心 BUDOKAN SEISHIN</h3>
          <div className={styles.accessDivider} />
          <p className={styles.accessAddress}>
            〒150-0001<br />
            東京都渋谷区神宮前3-15-8 誠心ビル B1F
          </p>
          <p className={styles.accessStation}>
            東京メトロ銀座線 外苑前駅 徒歩5分<br />
            JR山手線 原宿駅 徒歩12分
          </p>
          <p className={styles.accessContact}>
            TEL: 03-1234-5678<br />
            営業時間: 10:00 - 22:00（日祝休み）
          </p>
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span className={styles.footerBrand}>武道館 誠心</span>
        <div className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}>稽古内容</a>
          <a href="#" className={styles.footerLink}>時間割</a>
          <a href="#" className={styles.footerLink}>師範紹介</a>
          <a href="#" className={styles.footerLink}>体験稽古</a>
          <a href="#" className={styles.footerLink}>アクセス</a>
          <a href="#" className={styles.footerLink}>プライバシーポリシー</a>
        </div>
        <div className={styles.footerDivider} />
        <p className={styles.footerCopy}>© 2026 武道館 誠心 All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseDojoLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <DisciplinesSection />
      <ScheduleSection />
      <InstructorsSection />
      <CtaSection />
      <AccessSection />
      <FooterSection />
    </div>
  );
}
