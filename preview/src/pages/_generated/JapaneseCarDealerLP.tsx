import styles from './JapaneseCarDealerLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>AutoPrime / オートプライム</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>車両一覧</a>
          <a href="#" className={styles.navLink}>選ばれる理由</a>
          <a href="#" className={styles.navLink}>ショールーム</a>
          <a href="#" className={styles.navLink}>試乗予約</a>
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
        <span className={styles.heroLabel}>AUTOPRIME JAPAN</span>
        <h1 className={styles.heroTitle}>
          最高の一台を<br />見つけよう
        </h1>
        <p className={styles.heroSubtitle}>
          厳選された上質な車両と確かな品質保証で<br />
          あなたの理想のカーライフを実現します
        </p>
        <button className={styles.heroBtn}>試乗予約はこちら</button>
      </div>
    </section>
  );
}

function CarCard({ name, year, mileage, price, tag }: { name: string; year: string; mileage: string; price: string; tag?: string }) {
  return (
    <div className={styles.carCard}>
      <div className={styles.carImgArea}>
        {tag && <span className={styles.carTag}>{tag}</span>}
      </div>
      <div className={styles.carInfo}>
        <h3 className={styles.carName}>{name}</h3>
        <div className={styles.carSpecs}>
          <span className={styles.carSpec}>年式: {year}</span>
          <span className={styles.carSpec}>走行: {mileage}</span>
        </div>
        <span className={styles.carPrice}>{price}</span>
      </div>
    </div>
  );
}

function FeaturedCarsSection() {
  return (
    <section className={styles.featured}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>FEATURED</span>
        <h2 className={styles.sectionTitle}>注目の車両</h2>
      </div>
      <div className={styles.carGrid}>
        <CarCard
          name="レクサス RX 450h"
          year="2024年"
          mileage="1.2万km"
          price="¥6,980,000"
          tag="新着"
        />
        <CarCard
          name="トヨタ クラウン クロスオーバー"
          year="2023年"
          mileage="2.5万km"
          price="¥5,280,000"
        />
        <CarCard
          name="日産 GT-R NISMO"
          year="2024年"
          mileage="0.3万km"
          price="¥24,800,000"
          tag="希少"
        />
      </div>
    </section>
  );
}

function FeatureItem({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className={styles.featureItem}>
      <div className={styles.featureIcon}>{icon}</div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDesc}>{description}</p>
    </div>
  );
}

function WhyChooseUsSection() {
  return (
    <section className={styles.whyUs}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabelLight}>WHY CHOOSE US</span>
        <h2 className={styles.sectionTitleLight}>選ばれる理由</h2>
      </div>
      <div className={styles.featureGrid}>
        <FeatureItem
          icon="01"
          title="全車保証付き"
          description="すべての車両に最長3年の保証を付帯。安心のカーライフをサポートします。"
        />
        <FeatureItem
          icon="02"
          title="厳格な品質基準"
          description="200項目以上の点検をクリアした車両のみを厳選して取り揃えております。"
        />
        <FeatureItem
          icon="03"
          title="適正価格"
          description="市場データに基づく透明な価格設定。駆け引きなしの安心価格でご提供。"
        />
        <FeatureItem
          icon="04"
          title="アフターサポート"
          description="ご購入後も専任スタッフが車検・整備・保険まで一貫してサポート。"
        />
      </div>
    </section>
  );
}

function ShowroomSection() {
  return (
    <section className={styles.showroom}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>SHOWROOM</span>
        <h2 className={styles.sectionTitle}>ショールーム情報</h2>
      </div>
      <div className={styles.showroomContent}>
        <div className={styles.showroomMap}>
          <div className={styles.mapPlaceholder}>MAP</div>
        </div>
        <div className={styles.showroomInfo}>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>住所</span>
            <span className={styles.infoValue}>東京都港区南青山3-4-5 オートプライムビル1F</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>電話</span>
            <span className={styles.infoValue}>03-9876-5432</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>営業時間</span>
            <span className={styles.infoValue}>10:00〜19:00</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>定休日</span>
            <span className={styles.infoValue}>毎週水曜日</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>展示台数</span>
            <span className={styles.infoValue}>常時50台以上</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>試乗予約</h2>
        <p className={styles.ctaDesc}>
          お気軽にご来店・ご試乗ください。<br />
          専任スタッフが最適な一台をご提案いたします。
        </p>
        <button className={styles.ctaBtn}>無料試乗を予約する</button>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span className={styles.footerBrand}>AutoPrime / オートプライム</span>
        <p className={styles.footerCopy}>&copy; 2026 AutoPrime All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseCarDealerLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <FeaturedCarsSection />
      <WhyChooseUsSection />
      <ShowroomSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}
