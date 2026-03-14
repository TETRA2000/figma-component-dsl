import styles from './JapaneseFuneralLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>セレモニーホール 静 SHIZUKA</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>プラン</a>
          <a href="#" className={styles.navLink}>施設案内</a>
          <a href="#" className={styles.navLink}>ご葬儀の流れ</a>
          <a href="#" className={styles.navLink}>お問い合わせ</a>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <span className={styles.heroLabel}>心を込めて、お見送りのお手伝い</span>
        <h1 className={styles.heroTitle}>
          大切な方との、<br />最後のお別れを
        </h1>
        <p className={styles.heroSubtitle}>
          24時間365日、いつでもご相談ください。<br />
          経験豊富なスタッフが丁寧にサポートいたします。
        </p>
        <button className={styles.heroCta}>無料相談はこちら</button>
      </div>
    </section>
  );
}

function PlanCard({ title, subtitle, price, description }: { title: string; subtitle: string; price: string; description: string }) {
  return (
    <div className={styles.planCard}>
      <span className={styles.planSubtitle}>{subtitle}</span>
      <h3 className={styles.planTitle}>{title}</h3>
      <div className={styles.planDivider} />
      <span className={styles.planPrice}>{price}</span>
      <p className={styles.planDesc}>{description}</p>
    </div>
  );
}

function PlanSection() {
  return (
    <section className={styles.plans}>
      <span className={styles.sectionLabel}>PLAN</span>
      <h2 className={styles.sectionTitle}>ご葬儀プラン</h2>
      <div className={styles.planGrid}>
        <PlanCard title="家族葬" subtitle="FAMILY" price="¥385,000〜" description="少人数でゆっくりとお別れいただける、温かみのあるご葬儀プランです。" />
        <PlanCard title="一般葬" subtitle="GENERAL" price="¥660,000〜" description="多くの方にお見送りいただける、伝統的なご葬儀プランです。" />
        <PlanCard title="直葬" subtitle="DIRECT" price="¥165,000〜" description="お通夜・告別式を行わず、シンプルにお見送りするプランです。" />
      </div>
    </section>
  );
}

function FacilitySection() {
  return (
    <section className={styles.facility}>
      <span className={styles.sectionLabel}>FACILITY</span>
      <h2 className={styles.sectionTitle}>施設のご案内</h2>
      <div className={styles.facilityGrid}>
        {[
          { title: '本館式場', desc: '最大200名収容の広々とした式場。落ち着いた雰囲気の中でお別れいただけます。' },
          { title: '控室・親族室', desc: 'ご遺族の皆様がゆっくりとお過ごしいただける快適な控室をご用意しています。' },
          { title: '宿泊施設', desc: 'お通夜の際にご利用いただける宿泊施設を完備しております。' },
          { title: '駐車場完備', desc: '大型駐車場を完備。最大50台まで駐車可能です。' },
        ].map((item) => (
          <div key={item.title} className={styles.facilityCard}>
            <h3 className={styles.facilityTitle}>{item.title}</h3>
            <p className={styles.facilityDesc}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FlowSection() {
  const steps = [
    { num: '01', title: 'ご連絡', desc: 'お電話にてご一報ください' },
    { num: '02', title: 'お迎え', desc: '専用車にてお迎えに伺います' },
    { num: '03', title: 'ご安置', desc: '安置室にて丁寧にお預かり' },
    { num: '04', title: 'お打合せ', desc: 'ご要望を伺いプランをご提案' },
    { num: '05', title: 'ご葬儀', desc: '心を込めたお式を執り行います' },
    { num: '06', title: 'アフターサポート', desc: '各種手続きをサポートいたします' },
  ];
  return (
    <section className={styles.flow}>
      <span className={styles.sectionLabelLight}>FLOW</span>
      <h2 className={styles.sectionTitleLight}>ご葬儀の流れ</h2>
      <div className={styles.flowGrid}>
        {steps.map((s) => (
          <div key={s.num} className={styles.flowStep}>
            <span className={styles.flowNum}>{s.num}</span>
            <h3 className={styles.flowTitle}>{s.title}</h3>
            <p className={styles.flowDesc}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HotlineCTA() {
  return (
    <section className={styles.hotline}>
      <span className={styles.hotlineLabel}>24時間365日対応</span>
      <span className={styles.hotlineNumber}>0120-000-000</span>
      <span className={styles.hotlineSub}>深夜・早朝でもお気軽にご連絡ください</span>
    </section>
  );
}

function ConsultationSection() {
  return (
    <section className={styles.consultation}>
      <span className={styles.sectionLabel}>CONTACT</span>
      <h2 className={styles.sectionTitle}>無料相談・お問い合わせ</h2>
      <div className={styles.formArea}>
        {[
          { label: 'お名前', placeholder: '例）山田 太郎' },
          { label: 'お電話番号', placeholder: '例）090-1234-5678' },
          { label: 'メールアドレス', placeholder: '例）example@mail.com' },
        ].map((field) => (
          <div key={field.label} className={styles.formField}>
            <label className={styles.formLabel}>{field.label}</label>
            <input className={styles.formInput} placeholder={field.placeholder} readOnly />
          </div>
        ))}
        <button className={styles.formSubmit}>相談する（無料）</button>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <span className={styles.footerBrand}>セレモニーホール 静 SHIZUKA</span>
      <p className={styles.footerCopy}>© 2026 セレモニーホール 静 All rights reserved.</p>
    </footer>
  );
}

export function JapaneseFuneralLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <PlanSection />
      <FacilitySection />
      <FlowSection />
      <HotlineCTA />
      <ConsultationSection />
      <FooterSection />
    </div>
  );
}
