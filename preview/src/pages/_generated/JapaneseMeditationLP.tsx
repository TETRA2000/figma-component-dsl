import styles from './JapaneseMeditationLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>MEISOU NO NIWA</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>プログラム</a>
          <a href="#" className={styles.navLink}>効果</a>
          <a href="#" className={styles.navLink}>講師紹介</a>
          <a href="#" className={styles.navLink}>スケジュール</a>
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
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        <span className={styles.heroLabel}>MEDITATION &amp; MINDFULNESS</span>
        <span className={styles.heroBrandName}>瞑想の庭</span>
        <h1 className={styles.heroTitle}>心の静けさを、取り戻す</h1>
        <p className={styles.heroSubtitle}>
          忙しい毎日から離れ、自分の内側に目を向ける時間。<br />
          初心者からベテランまで、静寂の中で心を整える場所。
        </p>
        <div className={styles.heroBtnGroup}>
          <button className={styles.heroBtnPrimary}>無料体験に申し込む</button>
          <button className={styles.heroBtnSecondary}>プログラムを見る</button>
        </div>
      </div>
    </section>
  );
}

function ProgramCard({ name, subtitle, desc }: { name: string; subtitle: string; desc: string }) {
  return (
    <div className={styles.programCard}>
      <div className={styles.programIcon} />
      <h3 className={styles.programName}>{name}</h3>
      <span className={styles.programSubtitle}>{subtitle}</span>
      <p className={styles.programDesc}>{desc}</p>
    </div>
  );
}

function ProgramSection() {
  return (
    <section className={styles.programs}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabelPurple}>PROGRAMS</span>
        <h2 className={styles.sectionTitle}>瞑想プログラム</h2>
        <p className={styles.sectionDesc}>3つのアプローチで、あなたに合った瞑想を見つけましょう。</p>
      </div>
      <div className={styles.programGrid}>
        <ProgramCard name="マインドフルネス瞑想" subtitle="MINDFULNESS" desc="呼吸に意識を集中し、「今この瞬間」に気づく力を養います。ストレス軽減や集中力向上に効果的。初心者に最適です。" />
        <ProgramCard name="禅 瞑想" subtitle="ZEN MEDITATION" desc="坐禅の作法に基づいた伝統的な瞑想法。姿勢と呼吸を整え、無心の境地を目指します。心の深い静寂を体験できます。" />
        <ProgramCard name="ヨガ瞑想" subtitle="YOGA MEDITATION" desc="ヨガのポーズと呼吸法を組み合わせた動的瞑想。体を動かしながら心を落ち着かせ、心身の調和を実現します。" />
      </div>
    </section>
  );
}

function BenefitItem({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className={styles.benefitItem}>
      <div className={styles.benefitNum}>{num}</div>
      <div className={styles.benefitText}>
        <h3 className={styles.benefitTitle}>{title}</h3>
        <p className={styles.benefitDesc}>{desc}</p>
      </div>
    </div>
  );
}

function BenefitsSection() {
  return (
    <section className={styles.benefits}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabelSage}>BENEFITS</span>
        <h2 className={styles.sectionTitle}>瞑想がもたらす効果</h2>
      </div>
      <div className={styles.benefitsList}>
        <BenefitItem num="1" title="ストレスの軽減" desc="瞑想はコルチゾール(ストレスホルモン)の分泌を抑制し、心の緊張をほぐします。日常の不安やイライラから解放されます。" />
        <BenefitItem num="2" title="集中力の向上" desc="定期的な瞑想により、注意力と集中力が向上。仕事や学習のパフォーマンスが自然と高まります。" />
        <BenefitItem num="3" title="睡眠の質の改善" desc="就寝前の瞑想習慣で、深い眠りへの移行がスムーズに。朝の目覚めも爽やかになります。" />
        <BenefitItem num="4" title="自己理解の深化" desc="自分の思考パターンや感情に気づく力が育ち、より冷静で穏やかな心の状態を維持できるようになります。" />
      </div>
    </section>
  );
}

function InstructorSection() {
  return (
    <section className={styles.instructor}>
      <div className={styles.instructorInner}>
        <div className={styles.instructorPhoto} />
        <div className={styles.instructorInfo}>
          <span className={styles.sectionLabelPurple}>INSTRUCTOR</span>
          <h2 className={styles.instructorSectionTitle}>主宰 講師紹介</h2>
          <h3 className={styles.instructorName}>藤田 静香</h3>
          <span className={styles.instructorRole}>マインドフルネス指導者 / 禅僧侶</span>
          <p className={styles.instructorBio}>
            京都の禅寺にて10年間修行を積んだ後、マインドフルネスの科学的アプローチを学ぶためMITへ留学。<br /><br />
            東洋の伝統と西洋の科学を融合した独自の瞑想メソッドを開発。<br />
            企業研修やワークショップも数多く手がけ、これまでに5,000人以上を指導。
          </p>
        </div>
      </div>
    </section>
  );
}

function ScheduleSection() {
  return (
    <section className={styles.schedule}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabelPurple}>SCHEDULE &amp; FEES</span>
        <h2 className={styles.sectionTitle}>スケジュール &amp; 料金</h2>
      </div>
      <div className={styles.scheduleTable}>
        <div className={styles.scheduleHeaderRow}>
          <span>曜日</span>
          <span>時間</span>
          <span>プログラム</span>
          <span>料金</span>
        </div>
        <div className={styles.scheduleRow}>
          <span className={styles.scheduleDay}>月曜日</span>
          <span>07:00 - 08:00</span>
          <span className={styles.scheduleProg}>マインドフルネス瞑想</span>
          <span className={styles.scheduleFee}>¥3,000</span>
        </div>
        <div className={styles.scheduleRow}>
          <span className={styles.scheduleDay}>水曜日</span>
          <span>10:00 - 11:30</span>
          <span className={styles.scheduleProg}>禅 瞑想</span>
          <span className={styles.scheduleFee}>¥4,000</span>
        </div>
        <div className={styles.scheduleRow}>
          <span className={styles.scheduleDay}>金曜日</span>
          <span>19:00 - 20:30</span>
          <span className={styles.scheduleProg}>ヨガ瞑想</span>
          <span className={styles.scheduleFee}>¥3,500</span>
        </div>
        <div className={styles.scheduleRow}>
          <span className={styles.scheduleDay}>土曜日</span>
          <span>09:00 - 10:00</span>
          <span className={styles.scheduleProg}>マインドフルネス瞑想</span>
          <span className={styles.scheduleFee}>¥3,000</span>
        </div>
        <div className={styles.scheduleRow}>
          <span className={styles.scheduleDay}>日曜日</span>
          <span>08:00 - 10:00</span>
          <span className={styles.scheduleProg}>禅 瞑想 (上級)</span>
          <span className={styles.scheduleFee}>¥5,000</span>
        </div>
      </div>
      <div className={styles.feeNote}>
        <p className={styles.feeHighlight}>月額プラン: ¥12,000/月 (通い放題)</p>
        <p className={styles.feeSmall}>入会金: ¥5,000 (体験当日入会で無料)</p>
      </div>
    </section>
  );
}

function TrialCtaSection() {
  return (
    <section className={styles.trialCta}>
      <div className={styles.trialCtaContent}>
        <h2 className={styles.trialCtaTitle}>まずは、静かに座ることから。</h2>
        <p className={styles.trialCtaSubtitle}>
          初回体験セッション無料。<br />
          心の旅の第一歩を、ここから始めませんか。
        </p>
        <button className={styles.trialCtaBtn}>無料体験を申し込む</button>
        <p className={styles.trialCtaNote}>※ 持ち物不要。動きやすい服装でお越しください</p>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span className={styles.footerBrand}>MEISOU NO NIWA</span>
        <div className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}>プログラム</a>
          <a href="#" className={styles.footerLink}>講師紹介</a>
          <a href="#" className={styles.footerLink}>スケジュール</a>
          <a href="#" className={styles.footerLink}>よくある質問</a>
          <a href="#" className={styles.footerLink}>プライバシーポリシー</a>
        </div>
        <div className={styles.footerDivider} />
        <p className={styles.footerCopy}>&copy; 2026 MEISOU NO NIWA All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseMeditationLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <ProgramSection />
      <BenefitsSection />
      <InstructorSection />
      <ScheduleSection />
      <TrialCtaSection />
      <FooterSection />
    </div>
  );
}
