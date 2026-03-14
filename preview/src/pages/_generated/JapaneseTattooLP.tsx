import styles from './JapaneseTattooLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>彫師 龍 HORISHI RYU</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>スタイル</a>
          <a href="#" className={styles.navLink}>アーティスト</a>
          <a href="#" className={styles.navLink}>よくある質問</a>
          <a href="#" className={styles.navLinkAccent}>ご予約</a>
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
        <span className={styles.heroLabel}>TATTOO STUDIO</span>
        <h1 className={styles.heroTitle}>
          一生ものの、<br />アートを肌に
        </h1>
        <p className={styles.heroSubtitle}>
          伝統と現代が融合した唯一無二のタトゥーを<br />
          あなたの肌にお届けします
        </p>
        <button className={styles.heroBtn}>無料カウンセリング予約</button>
      </div>
    </section>
  );
}

function StyleCard({ title, titleEn, description }: { title: string; titleEn: string; description: string }) {
  return (
    <div className={styles.styleCard}>
      <div className={styles.styleImage}>
        <span className={styles.styleImageLabel}>{titleEn}</span>
      </div>
      <div className={styles.styleInfo}>
        <h3 className={styles.styleTitle}>{title}</h3>
        <div className={styles.styleDivider} />
        <p className={styles.styleDesc}>{description}</p>
      </div>
    </div>
  );
}

function StyleSection() {
  return (
    <section className={styles.styleSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>STYLE</span>
        <h2 className={styles.sectionTitle}>スタイルギャラリー</h2>
      </div>
      <div className={styles.styleGrid}>
        <StyleCard
          title="和彫り"
          titleEn="JAPANESE"
          description="龍、鯉、般若など日本の伝統的なモチーフを現代の技術で表現。色彩豊かな大作から小さなワンポイントまで。"
        />
        <StyleCard
          title="トライバル"
          titleEn="TRIBAL"
          description="力強い黒のラインで描くプリミティブな美。ポリネシアン、マオリなど各地域のスタイルに対応。"
        />
        <StyleCard
          title="ポートレート"
          titleEn="PORTRAIT"
          description="写真のようなリアリスティックな表現。大切な人やペットの姿を肌に永遠に刻みます。"
        />
        <StyleCard
          title="レタリング"
          titleEn="LETTERING"
          description="文字やフォントを使ったデザイン。漢字、英字、梵字など多彩な書体でお名前や座右の銘を。"
        />
      </div>
    </section>
  );
}

function ArtistCard({ name, nameEn, specialty, experience, description }: {
  name: string; nameEn: string; specialty: string; experience: string; description: string;
}) {
  return (
    <div className={styles.artistCard}>
      <div className={styles.artistPhoto}>
        <span className={styles.artistPhotoLabel}>PHOTO</span>
      </div>
      <div className={styles.artistInfo}>
        <span className={styles.artistNameEn}>{nameEn}</span>
        <h3 className={styles.artistName}>{name}</h3>
        <div className={styles.artistDivider} />
        <div className={styles.artistMeta}>
          <span className={styles.artistSpecialty}>専門: {specialty}</span>
          <span className={styles.artistExperience}>経験: {experience}</span>
        </div>
        <p className={styles.artistDesc}>{description}</p>
      </div>
    </div>
  );
}

function ArtistSection() {
  return (
    <section className={styles.artistSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>ARTIST</span>
        <h2 className={styles.sectionTitle}>アーティスト紹介</h2>
      </div>
      <div className={styles.artistList}>
        <ArtistCard
          name="龍一"
          nameEn="RYUICHI"
          specialty="和彫り / トライバル"
          experience="20年"
          description="日本の伝統的な和彫りを軸に、トライバルとの融合スタイルを得意とする。国内外のコンベンションで多数の受賞歴を持つ。繊細なグラデーションと大胆な構図が持ち味。"
        />
        <ArtistCard
          name="美咲"
          nameEn="MISAKI"
          specialty="ポートレート / レタリング"
          experience="12年"
          description="リアリスティックなポートレートと美しいレタリングを専門とする。細密描写に定評があり、写真と見紛うほどの作品を生み出す。女性ならではの繊細なタッチも人気。"
        />
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className={styles.faqItem}>
      <h3 className={styles.faqQuestion}>Q. {question}</h3>
      <div className={styles.faqDivider} />
      <p className={styles.faqAnswer}>A. {answer}</p>
    </div>
  );
}

function FAQSection() {
  return (
    <section className={styles.faqSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>FAQ</span>
        <h2 className={styles.sectionTitle}>よくある質問</h2>
      </div>
      <div className={styles.faqList}>
        <FAQItem
          question="痛みはどのくらいですか？"
          answer="個人差がありますが、部位によって痛みの強さは異なります。初回カウンセリングで詳しくご説明いたします。痛みに不安のある方もお気軽にご相談ください。"
        />
        <FAQItem
          question="完成までどのくらい時間がかかりますか？"
          answer="デザインの大きさや複雑さによって異なります。ワンポイントで1〜2時間、大きな作品は複数回のセッションに分けて行います。"
        />
        <FAQItem
          question="料金はどのくらいですか？"
          answer="ワンポイント ¥15,000〜、時間制 ¥15,000/h〜となります。デザインの内容により変動しますので、まずは無料カウンセリングにてお見積りいたします。"
        />
        <FAQItem
          question="未成年でも施術を受けられますか？"
          answer="18歳未満の方への施術はお断りしております。18歳以上20歳未満の方は保護者の同意書が必要です。"
        />
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaContent}>
        <span className={styles.ctaLabel}>CONSULTATION</span>
        <h2 className={styles.ctaTitle}>無料カウンセリング受付中</h2>
        <p className={styles.ctaSubtitle}>
          デザインのご相談から施術の流れまで<br />
          丁寧にご説明いたします
        </p>
        <button className={styles.ctaBtn}>今すぐ予約する</button>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span className={styles.footerBrand}>彫師 龍 HORISHI RYU</span>
        <p className={styles.footerCopy}>&copy; 2026 HORISHI RYU All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseTattooLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <StyleSection />
      <ArtistSection />
      <FAQSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}
