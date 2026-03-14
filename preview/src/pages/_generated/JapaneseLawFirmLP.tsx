import styles from './JapaneseLawFirmLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>弁護士法人 青山総合法律事務所</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>取扱分野</a>
          <a href="#" className={styles.navLink}>弁護士紹介</a>
          <a href="#" className={styles.navLink}>解決実績</a>
          <a href="#" className={styles.navLink}>ご相談の流れ</a>
        </div>
        <button className={styles.navCta}>無料相談予約</button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        <span className={styles.heroLabel}>AOYAMA LAW OFFICE</span>
        <h1 className={styles.heroTitle}>あなたの権利を守る</h1>
        <p className={styles.heroSubtitle}>
          経験豊富な弁護士チームが、複雑な法的問題を迅速かつ的確に解決。<br />
          初回相談無料。まずはお気軽にご相談ください。
        </p>
        <div className={styles.heroBtnGroup}>
          <button className={styles.heroBtnPrimary}>無料相談を予約する</button>
          <button className={styles.heroBtnSecondary}>取扱分野を見る</button>
        </div>
      </div>
    </section>
  );
}

function PracticeCard({ title, description }: { title: string; description: string }) {
  return (
    <div className={styles.practiceCard}>
      <div className={styles.practiceIconWrapper}>
        <div className={styles.practiceIcon} />
      </div>
      <h3 className={styles.practiceTitle}>{title}</h3>
      <p className={styles.practiceDesc}>{description}</p>
    </div>
  );
}

function PracticeSection() {
  return (
    <section className={styles.practice}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>PRACTICE AREAS</span>
        <h2 className={styles.sectionTitle}>取扱分野</h2>
        <p className={styles.sectionDesc}>幅広い法律問題に対応し、最適な解決策をご提案します。</p>
      </div>
      <div className={styles.practiceGrid}>
        <PracticeCard
          title="企業法務"
          description="契約書作成・レビュー、M&A、コンプライアンス対応など、企業活動を法的側面から全面的にサポート。"
        />
        <PracticeCard
          title="労働問題"
          description="不当解雇、残業代請求、ハラスメント問題など、労働者の権利を守るために徹底的に対応いたします。"
        />
        <PracticeCard
          title="離婚・家事事件"
          description="離婚協議、親権問題、養育費・財産分与など、家族に関する法的問題を丁寧に解決します。"
        />
        <PracticeCard
          title="交通事故"
          description="保険会社との交渉代行、適正な慰謝料・賠償金の獲得。被害者の立場に立った解決を目指します。"
        />
        <PracticeCard
          title="相続・遺言"
          description="遺産分割協議、遺言書作成、相続税対策まで。円満な相続の実現をトータルでサポートします。"
        />
        <PracticeCard
          title="債務整理"
          description="任意整理、自己破産、個人再生など、借金問題からの再出発を全力でお手伝いします。"
        />
      </div>
    </section>
  );
}

function LawyerCard({ name, title, bio }: { name: string; title: string; bio: string }) {
  return (
    <div className={styles.lawyerCard}>
      <div className={styles.lawyerPhoto} />
      <h3 className={styles.lawyerName}>{name}</h3>
      <p className={styles.lawyerTitle}>{title}</p>
      <div className={styles.lawyerDivider} />
      <p className={styles.lawyerBio}>{bio}</p>
    </div>
  );
}

function LawyerSection() {
  return (
    <section className={styles.lawyers}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>LAWYERS</span>
        <h2 className={styles.sectionTitle}>弁護士紹介</h2>
      </div>
      <div className={styles.lawyerGrid}>
        <LawyerCard
          name="青山 太郎"
          title="代表弁護士・パートナー"
          bio="東京大学法学部卒。弁護士歴25年。企業法務・M&Aを専門とし、上場企業を含む200社以上の顧問を歴任。日本弁護士連合会理事。"
        />
        <LawyerCard
          name="白石 美和"
          title="パートナー弁護士"
          bio="京都大学法科大学院修了。離婚・家事事件の専門家として、年間150件以上の案件を解決。女性の権利保護に尽力。"
        />
        <LawyerCard
          name="田村 誠一"
          title="シニアアソシエイト"
          bio="慶應義塾大学法学部卒。労働問題・交通事故を専門とし、多数の勝訴判決を獲得。依頼者に寄り添う姿勢に定評あり。"
        />
      </div>
    </section>
  );
}

function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <div className={styles.statItem}>
      <span className={styles.statNumber}>{number}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

function StatsSection() {
  return (
    <section className={styles.stats}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabelLight}>TRACK RECORD</span>
        <h2 className={styles.sectionTitleLight}>解決実績</h2>
      </div>
      <div className={styles.statsGrid}>
        <StatItem number="5,000+" label="相談実績件数" />
        <StatItem number="98.2%" label="依頼者満足度" />
        <StatItem number="25年" label="事務所設立" />
        <StatItem number="15名" label="所属弁護士数" />
      </div>
    </section>
  );
}

function ContactCtaSection() {
  return (
    <section className={styles.contactCta}>
      <div className={styles.contactCtaContent}>
        <h2 className={styles.contactCtaTitle}>まずは無料相談から</h2>
        <p className={styles.contactCtaSubtitle}>
          初回相談は60分無料。秘密厳守でご相談をお受けします。<br />
          お電話またはオンラインでの相談も可能です。
        </p>
        <div className={styles.contactBtnGroup}>
          <button className={styles.contactBtnPrimary}>無料相談を予約する</button>
          <button className={styles.contactBtnSecondary}>03-1234-5678</button>
        </div>
        <p className={styles.contactNote}>※ 受付時間：平日 9:00〜21:00 / 土曜 10:00〜18:00</p>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span className={styles.footerBrand}>青山総合法律事務所</span>
        <div className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}>取扱分野</a>
          <a href="#" className={styles.footerLink}>弁護士紹介</a>
          <a href="#" className={styles.footerLink}>解決実績</a>
          <a href="#" className={styles.footerLink}>アクセス</a>
          <a href="#" className={styles.footerLink}>プライバシーポリシー</a>
        </div>
        <div className={styles.footerDivider} />
        <p className={styles.footerCopy}>&copy; 2026 弁護士法人 青山総合法律事務所 All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseLawFirmLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <PracticeSection />
      <LawyerSection />
      <StatsSection />
      <ContactCtaSection />
      <FooterSection />
    </div>
  );
}
