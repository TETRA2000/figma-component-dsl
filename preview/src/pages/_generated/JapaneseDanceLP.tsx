import styles from './JapaneseDanceLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>STUDIO GROOVE</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>ダンススタイル</a>
          <a href="#" className={styles.navLink}>インストラクター</a>
          <a href="#" className={styles.navLink}>スケジュール</a>
          <a href="#" className={styles.navLink}>生徒の声</a>
          <a href="#" className={styles.navLink}>体験レッスン</a>
        </div>
        <button className={styles.navCta}>体験予約</button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroGlow} />
      <div className={styles.heroContent}>
        <span className={styles.heroLabel}>STUDIO GROOVE スタジオグルーヴ</span>
        <h1 className={styles.heroTitle}>踊る楽しさを、すべての人に</h1>
        <p className={styles.heroSubtitle}>
          初心者からプロ志望まで、年齢・経験を問わず楽しめるダンススタジオ。<br />
          HIP-HOP、JAZZ、バレエ、K-POPなど多彩なジャンルで、あなたの表現を見つけよう。
        </p>
        <div className={styles.heroBtnGroup}>
          <button className={styles.heroBtnPrimary}>無料体験レッスンに申し込む</button>
          <button className={styles.heroBtnSecondary}>レッスン一覧を見る</button>
        </div>
      </div>
    </section>
  );
}

function StyleCard({ nameJa, nameEn, description }: { nameJa: string; nameEn: string; description: string }) {
  return (
    <div className={styles.styleCard}>
      <div className={styles.styleIcon} />
      <h3 className={styles.styleName}>{nameJa}</h3>
      <p className={styles.styleNameEn}>{nameEn}</p>
      <div className={styles.styleDivider} />
      <p className={styles.styleDesc}>{description}</p>
    </div>
  );
}

function StylesSection() {
  return (
    <section className={styles.stylesSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>DANCE STYLES</span>
        <h2 className={styles.sectionTitle}>ダンススタイル</h2>
      </div>
      <div className={styles.stylesGrid}>
        <StyleCard
          nameJa="ヒップホップ"
          nameEn="HIP-HOP"
          description="ストリートカルチャーから生まれた自由なスタイル。リズム感とボディコントロールを磨きます。"
        />
        <StyleCard
          nameJa="ジャズ"
          nameEn="JAZZ"
          description="しなやかな動きと力強さを兼ね備えたスタイル。表現力豊かなダンスを楽しめます。"
        />
        <StyleCard
          nameJa="バレエ"
          nameEn="BALLET"
          description="すべてのダンスの基礎となるクラシックバレエ。美しい姿勢と体幹を養います。"
        />
        <StyleCard
          nameJa="K-POP"
          nameEn="K-POP"
          description="最新のK-POP振付を完コピ。推しの曲で楽しく踊りながら、ダンススキルを向上。"
        />
      </div>
    </section>
  );
}

function InstructorCard({ name, role, bio }: { name: string; role: string; bio: string }) {
  return (
    <div className={styles.instructorCard}>
      <div className={styles.instructorPhoto} />
      <div className={styles.instructorInfo}>
        <p className={styles.instructorRole}>{role}</p>
        <h3 className={styles.instructorName}>{name}</h3>
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
        <h2 className={styles.sectionTitle}>インストラクター紹介</h2>
      </div>
      <div className={styles.instructorsGrid}>
        <InstructorCard
          name="YUKI"
          role="HIP-HOP / FREESTYLE"
          bio="数々のダンスバトルで優勝経験を持つHIP-HOPダンサー。初心者にもわかりやすい指導で人気。"
        />
        <InstructorCard
          name="MIKA"
          role="JAZZ / CONTEMPORARY"
          bio="劇団四季出身のプロダンサー。しなやかで美しい動きの表現を丁寧に指導します。"
        />
        <InstructorCard
          name="HARUTO"
          role="K-POP / BALLET"
          bio="K-POPアーティストの振付経験を持つ若手ダンサー。バレエの基礎から最新K-POP振付まで幅広く対応。"
        />
      </div>
    </section>
  );
}

function ScheduleSection() {
  const scheduleData = [
    { time: '11:00', mon: 'バレエ入門', tue: 'JAZZ基礎', wed: 'バレエ入門', thu: 'JAZZ基礎', fri: 'バレエ入門', sat: '全ジャンル' },
    { time: '14:00', mon: 'K-POP', tue: 'HIP-HOP', wed: 'K-POP', thu: 'HIP-HOP', fri: 'K-POP', sat: '全ジャンル' },
    { time: '17:00', mon: 'キッズHH', tue: 'キッズバレエ', wed: 'キッズHH', thu: 'キッズK-POP', fri: 'キッズHH', sat: '-' },
    { time: '19:00', mon: 'HIP-HOP', tue: 'JAZZ応用', wed: 'HIP-HOP', thu: 'K-POP', fri: 'FREESTYLE', sat: '-' },
  ];

  return (
    <section className={styles.schedule}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>SCHEDULE</span>
        <h2 className={styles.sectionTitle}>レッスンスケジュール</h2>
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

function ShowcaseCard({ quote, attribution }: { quote: string; attribution: string }) {
  return (
    <div className={styles.showcaseCard}>
      <p className={styles.showcaseQuote}>{quote}</p>
      <p className={styles.showcaseAttribution}>{attribution}</p>
    </div>
  );
}

function ShowcaseSection() {
  return (
    <section className={styles.showcase}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>SHOWCASE</span>
        <h2 className={styles.sectionTitle}>生徒の声</h2>
      </div>
      <div className={styles.showcaseGrid}>
        <ShowcaseCard
          quote="ダンス未経験でしたが、YUKIさんの丁寧な指導のおかげで、今ではHIP-HOPが大好きに。発表会のステージに立てた時は感動しました！"
          attribution="Aさん（20代・女性）"
        />
        <ShowcaseCard
          quote="子どもの頃からの夢だったバレエを40代で始めました。同世代の仲間もいて、毎週のレッスンが一番の楽しみです。"
          attribution="Bさん（40代・女性）"
        />
        <ShowcaseCard
          quote="K-POPクラスで推しの振付をマスターできて最高！インスタにダンス動画を上げるようになりました。"
          attribution="Cさん（10代・男性）"
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
        <h2 className={styles.ctaTitle}>まずは体験レッスンから</h2>
        <p className={styles.ctaSubtitle}>
          初回体験レッスン無料！ウェアとシューズのレンタルも完備。<br />
          手ぶらでお気軽にお越しください。
        </p>
        <button className={styles.ctaBtn}>無料体験レッスンを予約する</button>
        <p className={styles.ctaNote}>※ 当日入会で入会金50%OFF</p>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span className={styles.footerBrand}>STUDIO GROOVE スタジオグルーヴ</span>
        <div className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}>ダンススタイル</a>
          <a href="#" className={styles.footerLink}>インストラクター</a>
          <a href="#" className={styles.footerLink}>スケジュール</a>
          <a href="#" className={styles.footerLink}>生徒の声</a>
          <a href="#" className={styles.footerLink}>よくある質問</a>
          <a href="#" className={styles.footerLink}>プライバシーポリシー</a>
        </div>
        <div className={styles.footerDivider} />
        <p className={styles.footerCopy}>© 2026 STUDIO GROOVE All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseDanceLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <StylesSection />
      <InstructorsSection />
      <ScheduleSection />
      <ShowcaseSection />
      <CtaSection />
      <FooterSection />
    </div>
  );
}
