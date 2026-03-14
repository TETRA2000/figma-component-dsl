import styles from './JapaneseKimonoLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <div className={styles.brandGroup}>
          <span className={styles.brand}>着物レンタル 彩</span>
          <span className={styles.brandEn}>IRODORI</span>
        </div>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>プラン</a>
          <a href="#" className={styles.navLink}>ギャラリー</a>
          <a href="#" className={styles.navLink}>着付けサービス</a>
          <a href="#" className={styles.navLink}>料金</a>
        </div>
        <button className={styles.navCta}>予約する</button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <span className={styles.heroBadge}>伝統と美の融合</span>
        <h1 className={styles.heroTitle}>
          特別な日を、<br />
          <span className={styles.heroAccent}>美しい着物で</span>
        </h1>
        <p className={styles.heroSubtitle}>
          結婚式・成人式・七五三など、人生の大切な節目を<br />
          最高の一着で彩ります
        </p>
        <div className={styles.heroActions}>
          <button className={styles.primaryBtn}>プランを見る</button>
          <button className={styles.secondaryBtn}>来店予約</button>
        </div>
      </div>
      <div className={styles.heroImage}>
        <div className={styles.kimonoPlaceholder}>
          <div className={styles.kimonoShape} />
          <div className={styles.obiSash} />
        </div>
      </div>
    </section>
  );
}

function PlanCard({ title, subtitle, description, price }: { title: string; subtitle: string; description: string; price: string }) {
  return (
    <div className={styles.planCard}>
      <div className={styles.planIcon}>{subtitle}</div>
      <h3 className={styles.planTitle}>{title}</h3>
      <p className={styles.planDesc}>{description}</p>
      <p className={styles.planPrice}>{price}</p>
      <button className={styles.planBtn}>詳しく見る</button>
    </div>
  );
}

function PlansSection() {
  return (
    <section className={styles.plans}>
      <h2 className={styles.sectionTitle}>レンタルプラン</h2>
      <p className={styles.sectionSubtitle}>シーンに合わせた最適なプランをご用意</p>
      <div className={styles.planGrid}>
        <PlanCard
          title="婚礼プラン"
          subtitle="婚"
          description="白無垢・色打掛・引き振袖など、花嫁衣裳を豊富にご用意。ヘアメイク・着付け込みのトータルプラン"
          price="¥88,000〜"
        />
        <PlanCard
          title="成人式プラン"
          subtitle="成"
          description="振袖レンタル・前撮り・当日着付けまで。一生に一度の晴れの日を最高の装いで"
          price="¥55,000〜"
        />
        <PlanCard
          title="カジュアルプラン"
          subtitle="遊"
          description="街歩き・観光・食事会に。小紋や紬など、気軽に楽しめるカジュアル着物をレンタル"
          price="¥9,800〜"
        />
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section className={styles.gallery}>
      <h2 className={styles.sectionTitle}>着物ギャラリー</h2>
      <p className={styles.sectionSubtitle}>四季折々の美しい着物コレクション</p>
      <div className={styles.galleryGrid}>
        <div className={styles.galleryCol}>
          <div className={`${styles.galleryItem} ${styles.galleryTall}`}>
            <span className={styles.galleryLabel}>振袖 - 桜柄</span>
          </div>
          <div className={styles.galleryItem}>
            <span className={styles.galleryLabel}>色打掛 - 鶴</span>
          </div>
        </div>
        <div className={styles.galleryCol}>
          <div className={styles.galleryItem}>
            <span className={styles.galleryLabel}>訪問着 - 菊</span>
          </div>
          <div className={`${styles.galleryItem} ${styles.galleryTall}`}>
            <span className={styles.galleryLabel}>小紋 - 市松</span>
          </div>
        </div>
        <div className={styles.galleryCol}>
          <div className={`${styles.galleryItem} ${styles.galleryTall}`}>
            <span className={styles.galleryLabel}>白無垢</span>
          </div>
          <div className={styles.galleryItem}>
            <span className={styles.galleryLabel}>袴 - 卒業式</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceStep({ num, title, description }: { num: string; title: string; description: string }) {
  return (
    <div className={styles.serviceStep}>
      <div className={styles.stepNum}>{num}</div>
      <div className={styles.stepContent}>
        <h3 className={styles.stepTitle}>{title}</h3>
        <p className={styles.stepDesc}>{description}</p>
      </div>
    </div>
  );
}

function DressingSection() {
  return (
    <section className={styles.dressing}>
      <h2 className={styles.sectionTitle}>着付けサービス</h2>
      <p className={styles.sectionSubtitle}>プロの着付け師が美しい着姿をお手伝い</p>
      <div className={styles.stepsList}>
        <ServiceStep num="1" title="ご来店・カウンセリング" description="ご希望のシーンやイメージをヒアリング。体型に合った着物をご提案します" />
        <ServiceStep num="2" title="着物選び・試着" description="豊富なコレクションからお気に入りの一着をお選びいただけます" />
        <ServiceStep num="3" title="ヘアメイク・着付け" description="経験豊富な着付け師とヘアメイクアーティストが担当します" />
        <ServiceStep num="4" title="お出かけ・撮影" description="着崩れ対応もご安心ください。出張着付けも承ります" />
      </div>
    </section>
  );
}

function PriceRow({ item, price, note }: { item: string; price: string; note?: string }) {
  return (
    <div className={styles.priceRow}>
      <div className={styles.priceItemGroup}>
        <span className={styles.priceItem}>{item}</span>
        {note && <span className={styles.priceNote}>{note}</span>}
      </div>
      <span className={styles.priceValue}>{price}</span>
    </div>
  );
}

function PriceSection() {
  return (
    <section className={styles.priceSection}>
      <h2 className={styles.sectionTitle}>料金表</h2>
      <p className={styles.sectionSubtitle}>すべて税込価格です</p>
      <div className={styles.priceList}>
        <PriceRow item="振袖レンタル（成人式）" price="¥55,000〜" note="前撮り・着付け・ヘアメイク込み" />
        <PriceRow item="婚礼衣裳レンタル" price="¥88,000〜" note="白無垢・色打掛・引き振袖" />
        <PriceRow item="訪問着レンタル" price="¥25,000〜" note="結婚式参列・入卒式に" />
        <PriceRow item="カジュアル着物レンタル" price="¥9,800〜" note="街歩き・観光プラン" />
        <PriceRow item="袴レンタル（卒業式）" price="¥35,000〜" note="着付け・ヘアセット込み" />
        <PriceRow item="着付けのみ" price="¥5,500〜" note="持ち込み着物の着付け" />
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>ご予約・ご相談</h2>
        <p className={styles.ctaSubtitle}>お気軽にお問い合わせください。経験豊富なスタッフがご対応いたします</p>
        <div className={styles.ctaButtons}>
          <button className={styles.ctaButton}>来店予約</button>
          <button className={styles.ctaPhone}>03-XXXX-XXXX</button>
        </div>
        <p className={styles.ctaNote}>営業時間: 10:00〜19:00（水曜定休）</p>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <span className={styles.footerLogo}>着物レンタル 彩 IRODORI</span>
          <p className={styles.footerTagline}>伝統の美を、あなたに</p>
        </div>
        <div className={styles.footerLinks}>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>プラン</h4>
            <a href="#" className={styles.footerLink}>婚礼プラン</a>
            <a href="#" className={styles.footerLink}>成人式プラン</a>
            <a href="#" className={styles.footerLink}>カジュアルプラン</a>
          </div>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>サービス</h4>
            <a href="#" className={styles.footerLink}>着付け</a>
            <a href="#" className={styles.footerLink}>ヘアメイク</a>
            <a href="#" className={styles.footerLink}>前撮り撮影</a>
          </div>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>ご案内</h4>
            <a href="#" className={styles.footerLink}>アクセス</a>
            <a href="#" className={styles.footerLink}>よくある質問</a>
            <a href="#" className={styles.footerLink}>プライバシーポリシー</a>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>© 2026 着物レンタル 彩 IRODORI. All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseKimonoLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <PlansSection />
      <GallerySection />
      <DressingSection />
      <PriceSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}
