import styles from './JapaneseWeddingLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>FELICITA WEDDING</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>会場紹介</a>
          <a href="#" className={styles.navLink}>プラン・料金</a>
          <a href="#" className={styles.navLink}>フォトギャラリー</a>
          <a href="#" className={styles.navLink}>お客様の声</a>
          <a href="#" className={styles.navLink}>ブライダルフェア</a>
        </div>
        <button className={styles.navCta}>フェア予約</button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        <p className={styles.heroSub}>— おふたりの特別な一日を —</p>
        <h1 className={styles.heroTitle}>
          最高の一日を、<br />ふたりで。
        </h1>
        <p className={styles.heroDesc}>
          洗練された空間と心を込めたおもてなしで、<br />
          おふたりだけの物語を紡ぎます。
        </p>
        <div className={styles.heroActions}>
          <button className={styles.primaryBtn}>ブライダルフェア予約</button>
          <button className={styles.secondaryBtn}>資料請求</button>
        </div>
      </div>
    </section>
  );
}

function VenueCard({ name, capacity, description }: { name: string; capacity: string; description: string }) {
  return (
    <div className={styles.venueCard}>
      <div className={styles.venueImg}>
        <div className={styles.venueImgPlaceholder} />
      </div>
      <div className={styles.venueInfo}>
        <h3 className={styles.venueName}>{name}</h3>
        <span className={styles.venueCapacity}>{capacity}</span>
        <p className={styles.venueDesc}>{description}</p>
        <a href="#" className={styles.venueLink}>詳しく見る →</a>
      </div>
    </div>
  );
}

function VenueSection() {
  return (
    <section className={styles.venues}>
      <span className={styles.sectionLabel}>VENUE</span>
      <h2 className={styles.sectionTitle}>会場紹介</h2>
      <p className={styles.sectionSubtitle}>
        おふたりの理想を叶える、3つの個性豊かな会場をご用意
      </p>
      <div className={styles.venueGrid}>
        <VenueCard
          name="チャペル・ド・ルミエール"
          capacity="着席 80名"
          description="天井高10mの荘厳なチャペル。自然光が降り注ぐステンドグラスが、神聖な挙式を演出します。"
        />
        <VenueCard
          name="ザ・ガーデンテラス"
          capacity="着席 120名"
          description="四季折々の庭園に囲まれたテラス会場。開放的な空間で、ゲストと一体になるパーティーを。"
        />
        <VenueCard
          name="グランドバンケット 雅"
          capacity="着席 200名"
          description="格式高いバンケットホール。シャンデリアが煌めく上質な空間で、華やかな披露宴を。"
        />
      </div>
    </section>
  );
}

function PlanCard({ tier, price, features, recommended }: { tier: string; price: string; features: string[]; recommended?: boolean }) {
  return (
    <div className={`${styles.planCard} ${recommended ? styles.planRecommended : ''}`}>
      {recommended && <span className={styles.planBadge}>おすすめ</span>}
      <h3 className={styles.planName}>{tier}</h3>
      <p className={styles.planPrice}>{price}<span className={styles.planUnit}>〜（税込）</span></p>
      <div className={styles.planDivider} />
      <ul className={styles.planFeatures}>
        {features.map((f, i) => (
          <li key={i} className={styles.planFeature}>✓ {f}</li>
        ))}
      </ul>
      <button className={recommended ? styles.primaryBtn : styles.outlineBtn}>
        詳細を見る
      </button>
    </div>
  );
}

function PlanSection() {
  return (
    <section className={styles.plans}>
      <span className={styles.sectionLabel}>PLAN</span>
      <h2 className={styles.sectionTitle}>プラン・料金</h2>
      <p className={styles.sectionSubtitle}>おふたりのご予算やご要望に合わせてお選びいただけます</p>
      <div className={styles.planGrid}>
        <PlanCard
          tier="シンプルプラン"
          price="¥1,980,000"
          features={[
            '挙式（チャペル or 人前式）',
            '衣装（新郎新婦各1着）',
            'ヘアメイク・着付け',
            'フラワーアレンジメント',
            '写真撮影（データ100カット）',
          ]}
        />
        <PlanCard
          tier="プレミアムプラン"
          price="¥2,980,000"
          recommended
          features={[
            'シンプルプランの全内容',
            '披露宴（60名分お料理）',
            '衣装（お色直し1回含む）',
            '映像演出・エンドロール',
            '写真撮影（データ300カット）',
            '前撮りロケーションフォト',
          ]}
        />
        <PlanCard
          tier="ラグジュアリープラン"
          price="¥4,500,000"
          features={[
            'プレミアムプランの全内容',
            '披露宴（100名分お料理）',
            '衣装（新婦3着・新郎2着）',
            'フルムービー撮影・編集',
            '海外リゾート前撮り',
            '専属プランナー',
          ]}
        />
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section className={styles.gallery}>
      <span className={styles.sectionLabel}>GALLERY</span>
      <h2 className={styles.sectionTitleLight}>フォトギャラリー</h2>
      <p className={styles.sectionSubtitleLight}>
        これまでのウェディングの一場面をご紹介
      </p>
      <div className={styles.galleryGrid}>
        {[
          'チャペル挙式',
          'ガーデン人前式',
          'ブーケトス',
          '披露宴',
          'ファーストバイト',
          'テーブル装花',
          'ウェディングケーキ',
          'お色直し入場',
        ].map((label, i) => (
          <div key={i} className={styles.galleryItem}>
            <div className={styles.galleryImgPlaceholder} />
            <span className={styles.galleryCaption}>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialCard({ couple, date, text: content }: { couple: string; date: string; text: string }) {
  return (
    <div className={styles.testimonialCard}>
      <div className={styles.testimonialQuote}>"</div>
      <p className={styles.testimonialText}>{content}</p>
      <div className={styles.testimonialMeta}>
        <div className={styles.testimonialAvatar} />
        <div>
          <p className={styles.testimonialCouple}>{couple}</p>
          <p className={styles.testimonialDate}>{date}</p>
        </div>
      </div>
    </div>
  );
}

function TestimonialSection() {
  return (
    <section className={styles.testimonials}>
      <span className={styles.sectionLabel}>VOICE</span>
      <h2 className={styles.sectionTitle}>お客様の声</h2>
      <p className={styles.sectionSubtitle}>実際に挙式されたおふたりからのメッセージ</p>
      <div className={styles.testimonialGrid}>
        <TestimonialCard
          couple="田中 健一・美咲 ご夫妻"
          date="2025年10月挙式"
          text="プランナーさんが私たちの想いを丁寧に汲み取ってくださり、理想以上の結婚式になりました。ゲストからも「今まで出た結婚式で一番感動した」と言っていただけました。"
        />
        <TestimonialCard
          couple="佐藤 大輔・花子 ご夫妻"
          date="2025年6月挙式"
          text="ガーデンテラスでの人前式は、青空の下で最高に気持ちよかったです。お料理も大変好評で、スタッフの皆さんの温かいサービスに感激しました。"
        />
        <TestimonialCard
          couple="鈴木 拓也・優子 ご夫妻"
          date="2025年3月挙式"
          text="遠方からのゲストが多かったのですが、きめ細やかな対応で安心してお任せできました。特にエンドロールの映像は一生の宝物です。"
        />
      </div>
    </section>
  );
}

function FairCard({ title, date, features }: { title: string; date: string; features: string[] }) {
  return (
    <div className={styles.fairCard}>
      <div className={styles.fairImgPlaceholder} />
      <div className={styles.fairInfo}>
        <h3 className={styles.fairTitle}>{title}</h3>
        <p className={styles.fairDate}>{date}</p>
        <div className={styles.fairFeatures}>
          {features.map((f, i) => (
            <span key={i} className={styles.fairTag}>{f}</span>
          ))}
        </div>
        <button className={styles.fairBtn}>このフェアを予約する</button>
      </div>
    </div>
  );
}

function FairSection() {
  return (
    <section className={styles.fairs}>
      <span className={styles.sectionLabel}>BRIDAL FAIR</span>
      <h2 className={styles.sectionTitle}>ブライダルフェア</h2>
      <p className={styles.sectionSubtitle}>
        まずはフェアで会場の雰囲気を体感してください
      </p>
      <div className={styles.fairGrid}>
        <FairCard
          title="【初めての方限定】全館見学×試食付きフェア"
          date="2026年4月12日（日）10:00〜 / 14:00〜"
          features={['会場見学', '無料試食', '相談会', '特典あり']}
        />
        <FairCard
          title="【週末限定】チャペル模擬挙式×コース試食フェア"
          date="2026年4月19日（土）10:00〜 / 13:00〜"
          features={['模擬挙式', 'フルコース試食', 'ドレス試着']}
        />
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaContent}>
        <span className={styles.ctaLabel}>RESERVATION</span>
        <h2 className={styles.ctaTitle}>ブライダルフェアのご予約</h2>
        <p className={styles.ctaSubtitle}>
          おふたりの理想のウェディングを一緒に叶えましょう。<br />
          まずはお気軽にフェアへお越しください。
        </p>
        <div className={styles.ctaActions}>
          <button className={styles.ctaPrimary}>フェアを予約する</button>
          <button className={styles.ctaSecondary}>お電話でのお問い合わせ</button>
        </div>
        <p className={styles.ctaPhone}>☎ 0120-xxx-xxx（受付 10:00〜19:00）</p>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <span className={styles.footerLogo}>FELICITA WEDDING</span>
          <p className={styles.footerTagline}>最高の一日を、ふたりで。</p>
        </div>
        <div className={styles.footerLinks}>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>ウェディング</h4>
            <a href="#" className={styles.footerLink}>会場紹介</a>
            <a href="#" className={styles.footerLink}>プラン・料金</a>
            <a href="#" className={styles.footerLink}>フォトギャラリー</a>
          </div>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>フェア・イベント</h4>
            <a href="#" className={styles.footerLink}>ブライダルフェア</a>
            <a href="#" className={styles.footerLink}>相談会</a>
            <a href="#" className={styles.footerLink}>ドレス試着会</a>
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
        <p>© 2026 FELICITA WEDDING. All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseWeddingLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <VenueSection />
      <PlanSection />
      <GallerySection />
      <TestimonialSection />
      <FairSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}
