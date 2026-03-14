import styles from './JapaneseDentalLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>さくら歯科クリニック</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>診療内容</a>
          <a href="#" className={styles.navLink}>医師紹介</a>
          <a href="#" className={styles.navLink}>院内紹介</a>
          <a href="#" className={styles.navLink}>アクセス</a>
        </div>
        <button className={styles.navCta}>WEB予約</button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          笑顔あふれる<br />
          <span className={styles.heroAccent}>歯科治療を</span>
        </h1>
        <p className={styles.heroSubtitle}>
          痛みの少ない丁寧な治療で、<br />
          お子様からご年配の方まで安心して通える歯科医院です
        </p>
        <div className={styles.heroActions}>
          <button className={styles.primaryBtn}>初診予約</button>
          <button className={styles.secondaryBtn}>☎ 03-1234-5678</button>
        </div>
        <div className={styles.heroFeatures}>
          <span className={styles.heroFeature}>土日診療</span>
          <span className={styles.heroFeature}>駅徒歩3分</span>
          <span className={styles.heroFeature}>キッズスペース完備</span>
        </div>
      </div>
    </section>
  );
}

function TreatmentCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className={styles.treatmentCard}>
      <div className={styles.treatmentIcon}>{icon}</div>
      <h3 className={styles.treatmentTitle}>{title}</h3>
      <p className={styles.treatmentDesc}>{description}</p>
    </div>
  );
}

function TreatmentsSection() {
  return (
    <section className={styles.treatments}>
      <h2 className={styles.sectionTitle}>診療内容</h2>
      <p className={styles.sectionSubtitle}>幅広い診療メニューで、お口の健康をトータルサポート</p>
      <div className={styles.treatmentGrid}>
        <TreatmentCard icon="🦷" title="一般歯科" description="虫歯や歯周病の治療を、痛みを最小限に抑えて行います" />
        <TreatmentCard icon="✨" title="審美歯科" description="ホワイトニング、セラミック治療で美しい笑顔に" />
        <TreatmentCard icon="👶" title="小児歯科" description="お子様が楽しく通える環境づくりを心がけています" />
        <TreatmentCard icon="🔧" title="矯正歯科" description="目立たないマウスピース矯正で理想の歯並びへ" />
      </div>
    </section>
  );
}

function DoctorSection() {
  return (
    <section className={styles.doctor}>
      <h2 className={styles.sectionTitle}>医師紹介</h2>
      <div className={styles.doctorCard}>
        <div className={styles.doctorImage} />
        <div className={styles.doctorInfo}>
          <span className={styles.doctorRole}>院長</span>
          <h3 className={styles.doctorName}>山田 太郎</h3>
          <p className={styles.doctorBio}>
            東京歯科大学卒業後、大学病院にて10年間の臨床経験を経て開院。
            「患者様の不安を取り除くこと」を第一に、丁寧なカウンセリングと
            痛みの少ない治療を心がけています。
          </p>
          <div className={styles.doctorCerts}>
            <span className={styles.cert}>日本歯科医師会会員</span>
            <span className={styles.cert}>インプラント認定医</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function FacilitySection() {
  return (
    <section className={styles.facility}>
      <h2 className={styles.sectionTitle}>院内紹介</h2>
      <p className={styles.sectionSubtitle}>清潔で快適な空間をご用意しています</p>
      <div className={styles.facilityGrid}>
        <div className={styles.facilityItem}>
          <div className={styles.facilityImg} />
          <span className={styles.facilityLabel}>受付・待合室</span>
        </div>
        <div className={styles.facilityItem}>
          <div className={styles.facilityImg} />
          <span className={styles.facilityLabel}>診察室</span>
        </div>
        <div className={styles.facilityItem}>
          <div className={styles.facilityImg} />
          <span className={styles.facilityLabel}>キッズスペース</span>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.cta}>
      <h2 className={styles.ctaTitle}>まずはお気軽にご相談ください</h2>
      <p className={styles.ctaSubtitle}>初診の方は事前のWEB予約がスムーズです</p>
      <div className={styles.ctaActions}>
        <button className={styles.ctaBtn}>WEB予約はこちら</button>
        <div className={styles.ctaPhone}>
          <span className={styles.ctaPhoneLabel}>お電話でのご予約</span>
          <span className={styles.ctaPhoneNumber}>03-1234-5678</span>
        </div>
      </div>
      <div className={styles.hours}>
        <div className={styles.hoursRow}>
          <span>診療時間</span>
          <span>月〜金 9:00-19:00 / 土日 9:00-17:00</span>
        </div>
        <div className={styles.hoursRow}>
          <span>休診日</span>
          <span>祝日</span>
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span className={styles.footerBrand}>さくら歯科クリニック</span>
        <p className={styles.footerAddr}>〒150-0001 東京都渋谷区神宮前1-2-3 メディカルビル2F</p>
        <p className={styles.footerCopy}>© 2026 さくら歯科クリニック All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseDentalLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <TreatmentsSection />
      <DoctorSection />
      <FacilitySection />
      <CTASection />
      <FooterSection />
    </div>
  );
}
