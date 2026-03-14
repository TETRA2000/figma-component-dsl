import styles from './JapaneseSpaLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>湯処 やすらぎ</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>お風呂</a>
          <a href="#" className={styles.navLink}>施術メニュー</a>
          <a href="#" className={styles.navLink}>施設案内</a>
          <a href="#" className={styles.navLink}>アクセス</a>
        </div>
        <button className={styles.navCta}>ご予約</button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <span className={styles.heroBadge}>YUDOKORO YASURAGI</span>
        <h1 className={styles.heroTitle}>日々の疲れを、癒やしの湯に</h1>
        <p className={styles.heroSubtitle}>
          四季の移ろいを感じながら<br />
          心と身体を解きほぐすひとときを
        </p>
        <button className={styles.heroBtn}>日帰りプランを見る</button>
      </div>
    </section>
  );
}

function BathCard({ name, enName, description }: { name: string; enName: string; description: string }) {
  return (
    <div className={styles.bathCard}>
      <div className={styles.bathImage} />
      <span className={styles.bathEn}>{enName}</span>
      <h3 className={styles.bathName}>{name}</h3>
      <p className={styles.bathDesc}>{description}</p>
    </div>
  );
}

function BathSection() {
  return (
    <section className={styles.baths}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>ONSEN</span>
        <h2 className={styles.sectionTitle}>お風呂のご案内</h2>
      </div>
      <div className={styles.bathGrid}>
        <BathCard name="露天風呂" enName="OUTDOOR" description="自然の風を感じながら開放感あふれる湯浴みを" />
        <BathCard name="内湯" enName="INDOOR" description="檜の香り漂う落ち着いた空間で" />
        <BathCard name="サウナ" enName="SAUNA" description="ロウリュ対応の本格フィンランド式" />
        <BathCard name="岩風呂" enName="ROCK BATH" description="天然石に囲まれた趣ある佇まい" />
      </div>
    </section>
  );
}

function TreatmentItem({ name, duration, price, description }: { name: string; duration: string; price: string; description: string }) {
  return (
    <div className={styles.treatmentItem}>
      <div className={styles.treatmentInfo}>
        <h4 className={styles.treatmentName}>{name}</h4>
        <p className={styles.treatmentDesc}>{description}</p>
      </div>
      <div className={styles.treatmentMeta}>
        <span className={styles.treatmentPrice}>{price}</span>
        <span className={styles.treatmentDuration}>{duration}</span>
      </div>
    </div>
  );
}

function TreatmentSection() {
  return (
    <section className={styles.treatment}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>TREATMENT</span>
        <h2 className={styles.sectionTitle}>施術メニュー</h2>
      </div>
      <div className={styles.treatmentList}>
        <TreatmentItem name="全身もみほぐし" duration="60分" price="¥6,600" description="筋肉の疲れをじっくりとほぐします" />
        <TreatmentItem name="アロマオイルトリートメント" duration="90分" price="¥9,900" description="香りと共に深いリラクゼーションを" />
        <TreatmentItem name="足つぼリフレクソロジー" duration="40分" price="¥4,400" description="足裏から全身の巡りを整えます" />
        <TreatmentItem name="ヘッドスパ" duration="30分" price="¥3,300" description="頭皮のコリをほぐし眼精疲労にも" />
        <TreatmentItem name="美肌フェイシャル" duration="50分" price="¥7,700" description="温泉水を使用した贅沢なケア" />
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section className={styles.gallery}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>FACILITY</span>
        <h2 className={styles.sectionTitle}>施設のご紹介</h2>
      </div>
      <div className={styles.galleryGrid}>
        <div className={styles.galleryImg1} />
        <div className={styles.galleryImg2} />
        <div className={styles.galleryImg3} />
      </div>
      <div className={styles.facilityInfo}>
        <div className={styles.facilityItem}>
          <h4 className={styles.facilityName}>休憩処</h4>
          <p className={styles.facilityDesc}>畳敷きの広間でごゆっくりお休みいただけます</p>
        </div>
        <div className={styles.facilityItem}>
          <h4 className={styles.facilityName}>お食事処</h4>
          <p className={styles.facilityDesc}>地元食材を使った和食をお楽しみください</p>
        </div>
        <div className={styles.facilityItem}>
          <h4 className={styles.facilityName}>売店</h4>
          <p className={styles.facilityDesc}>温泉コスメやお土産を取り揃えております</p>
        </div>
      </div>
    </section>
  );
}

function AccessSection() {
  return (
    <section className={styles.access}>
      <div className={styles.accessInner}>
        <div className={styles.accessText}>
          <span className={styles.sectionLabel}>ACCESS</span>
          <h2 className={styles.sectionTitle}>アクセス</h2>
          <p className={styles.accessAddr}>〒250-0631<br />神奈川県箱根町湯本1-2-3</p>
          <p className={styles.accessRoute}>箱根登山鉄道「箱根湯本」駅より<br />送迎バスで10分（無料）</p>
          <p className={styles.accessHours}>営業時間：10:00〜22:00（最終受付 21:00）<br />定休日：第3火曜日</p>
        </div>
        <div className={styles.accessMap} />
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.cta}>
      <h2 className={styles.ctaTitle}>ご予約・お問い合わせ</h2>
      <p className={styles.ctaSubtitle}>日帰り温泉から宿泊プランまでお気軽にどうぞ</p>
      <div className={styles.ctaActions}>
        <button className={styles.ctaBtn}>オンライン予約</button>
        <button className={styles.ctaPhone}>TEL 0460-12-3456</button>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span className={styles.footerBrand}>湯処 やすらぎ  YUDOKORO YASURAGI</span>
        <div className={styles.footerInfo}>
          <p>〒250-0631 神奈川県箱根町湯本1-2-3</p>
          <p>営業時間：10:00〜22:00（最終受付 21:00）/ 定休日：第3火曜日</p>
        </div>
        <p className={styles.footerCopy}>© 2026 YUDOKORO YASURAGI. All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseSpaLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <BathSection />
      <TreatmentSection />
      <GallerySection />
      <AccessSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}
