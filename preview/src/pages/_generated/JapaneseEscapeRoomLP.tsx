import styles from './JapaneseEscapeRoomLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>NAZOTOKI MEIKYUU</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>ルーム紹介</a>
          <a href="#" className={styles.navLink}>遊び方</a>
          <a href="#" className={styles.navLink}>料金</a>
          <a href="#" className={styles.navLink}>ランキング</a>
          <a href="#" className={styles.navLink}>アクセス</a>
        </div>
        <button className={styles.navCta}>予約する</button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroGlowLine} />
      <div className={styles.heroContent}>
        <span className={styles.heroLabel}>謎解き迷宮</span>
        <h1 className={styles.heroTitle}>脱出せよ。制限時間60分。</h1>
        <p className={styles.heroSubtitle}>
          仲間と協力し、暗号を解き明かせ。<br />
          東京最大級のリアル脱出ゲーム施設がここに。
        </p>
        <div className={styles.heroBtnGroup}>
          <button className={styles.heroBtnPrimary}>今すぐ予約</button>
          <button className={styles.heroBtnSecondary}>ルームを見る</button>
        </div>
      </div>
      <div className={styles.heroGlowLineMagenta} />
    </section>
  );
}

function RoomCard({ name, theme, difficulty, stars, desc }: { name: string; theme: string; difficulty: string; stars: string; desc: string }) {
  return (
    <div className={styles.roomCard}>
      <div className={styles.roomImage} />
      <h3 className={styles.roomName}>{name}</h3>
      <span className={styles.roomTheme}>{theme}</span>
      <div className={styles.roomDifficulty}>
        <span className={styles.roomDiffLabel}>{difficulty}</span>
        <span className={styles.roomStars}>{stars}</span>
      </div>
      <p className={styles.roomDesc}>{desc}</p>
    </div>
  );
}

function RoomSection() {
  return (
    <section className={styles.rooms}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabelGreen}>ROOMS</span>
        <h2 className={styles.sectionTitle}>脱出ルーム一覧</h2>
        <p className={styles.sectionDesc}>4つの異なるテーマから、あなたの挑戦を選べ。</p>
      </div>
      <div className={styles.roomGrid}>
        <RoomCard name="廃病院の呪い" theme="ホラー" difficulty="難易度" stars="★★★★☆" desc="廃墟と化した病院に閉じ込められた。不気味な音が響く中、脱出の鍵を探せ。" />
        <RoomCard name="時空の研究所" theme="SF" difficulty="難易度" stars="★★★☆☆" desc="タイムマシンが暴走した研究所。時間が止まる前にパラドックスを解け。" />
        <RoomCard name="忍者屋敷" theme="和風アクション" difficulty="難易度" stars="★★★★★" desc="最高難度。からくり仕掛けの忍者屋敷から脱出せよ。制限時間は45分。" />
        <RoomCard name="宝石泥棒" theme="スパイ" difficulty="難易度" stars="★★☆☆☆" desc="初心者向け。美術館に仕掛けられたセキュリティを突破し、宝石を奪還せよ。" />
      </div>
    </section>
  );
}

function StepCard({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className={styles.stepCard}>
      <div className={styles.stepNumber}>{num}</div>
      <h3 className={styles.stepTitle}>{title}</h3>
      <p className={styles.stepDesc}>{desc}</p>
    </div>
  );
}

function HowToPlaySection() {
  return (
    <section className={styles.howToPlay}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabelMagenta}>HOW TO PLAY</span>
        <h2 className={styles.sectionTitle}>遊び方</h2>
      </div>
      <div className={styles.stepsGrid}>
        <StepCard num="1" title="予約する" desc="Webまたは電話で日時とルームを予約。当日受付も空きがあればOK。" />
        <StepCard num="2" title="ブリーフィング" desc="スタッフがルールと世界観を説明。チームで作戦を立てよう。" />
        <StepCard num="3" title="脱出に挑戦" desc="制限時間内に謎を解き、暗号を解読し、脱出口を見つけよ。" />
        <StepCard num="4" title="結果発表" desc="クリアタイムと正解率を発表。ランキングに挑戦しよう。" />
      </div>
    </section>
  );
}

function PackageCard({ name, people, price, features, highlight }: { name: string; people: string; price: string; features: string[]; highlight?: boolean }) {
  return (
    <div className={`${styles.packageCard} ${highlight ? styles.packageHighlight : ''}`}>
      {highlight && <span className={styles.packagePopular}>POPULAR</span>}
      <h3 className={styles.packageName}>{name}</h3>
      <span className={styles.packagePeople}>{people}</span>
      <span className={styles.packagePrice}>{price}</span>
      <div className={styles.packageDivider} />
      {features.map((f, i) => (
        <p key={i} className={styles.packageFeature}>{f}</p>
      ))}
      <button className={highlight ? styles.packageBtnHighlight : styles.packageBtn}>予約する</button>
    </div>
  );
}

function PackageSection() {
  return (
    <section className={styles.packages}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabelGreen}>GROUP PACKAGES</span>
        <h2 className={styles.sectionTitle}>グループ料金</h2>
      </div>
      <div className={styles.packageGrid}>
        <PackageCard name="スモール" people="2~3名" price="¥3,500/人" features={['1ルーム選択', '60分プレイ', '記念写真付き']} />
        <PackageCard name="スタンダード" people="4~6名" price="¥2,800/人" features={['全ルーム選択可', '60分プレイ', '記念写真付き', 'ドリンク1杯無料']} highlight />
        <PackageCard name="パーティー" people="7~12名" price="¥2,200/人" features={['全ルーム選択可', '90分プレイ', '記念写真付き', 'ドリンク飲み放題', '貸切対応可']} />
      </div>
    </section>
  );
}

function RankingSection() {
  return (
    <section className={styles.ranking}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabelMagenta}>RANKING &amp; REVIEWS</span>
        <h2 className={styles.sectionTitle}>ランキング&amp;レビュー</h2>
      </div>
      <div className={styles.rankingGrid}>
        <div className={styles.rankingPanel}>
          <h3 className={styles.rankingPanelTitle}>脱出タイムTOP3</h3>
          <div className={styles.rankEntry}>
            <span className={styles.rank1st}>1st</span>
            <span className={styles.rankText}>チーム忍者 - 23:45</span>
          </div>
          <div className={styles.rankEntry}>
            <span className={styles.rank2nd}>2nd</span>
            <span className={styles.rankTextDim}>脱出マスターズ - 28:12</span>
          </div>
          <div className={styles.rankEntry}>
            <span className={styles.rank3rd}>3rd</span>
            <span className={styles.rankTextDim}>謎解きファイターズ - 31:08</span>
          </div>
        </div>
        <div className={styles.reviewPanel}>
          <h3 className={styles.reviewPanelTitle}>参加者の声</h3>
          <p className={styles.reviewText}>&ldquo;忍者屋敷は本当に難しかった！でもクリアした時の達成感は最高。友達と来てよかった。&rdquo;</p>
          <span className={styles.reviewAuthor}>- 田中さん (20代)</span>
          <div className={styles.reviewDivider} />
          <p className={styles.reviewText}>&ldquo;初心者でも宝石泥棒は楽しめました。スタッフの対応も丁寧で安心。次は時空の研究所に挑戦！&rdquo;</p>
          <span className={styles.reviewAuthor}>- 佐藤さん (30代)</span>
        </div>
      </div>
    </section>
  );
}

function BookingCtaSection() {
  return (
    <section className={styles.bookingCta}>
      <div className={styles.bookingCtaContent}>
        <h2 className={styles.bookingCtaTitle}>次の脱出者は、あなただ。</h2>
        <p className={styles.bookingCtaSubtitle}>
          仲間を集めて、挑戦を始めよう。<br />
          オンライン予約で10%OFF。
        </p>
        <button className={styles.bookingCtaBtn}>オンラインで予約する</button>
        <p className={styles.bookingCtaNote}>※ 当日予約も空きがあれば可能です</p>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span className={styles.footerBrand}>NAZOTOKI MEIKYUU</span>
        <div className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}>ルーム紹介</a>
          <a href="#" className={styles.footerLink}>遊び方</a>
          <a href="#" className={styles.footerLink}>料金</a>
          <a href="#" className={styles.footerLink}>よくある質問</a>
          <a href="#" className={styles.footerLink}>プライバシーポリシー</a>
        </div>
        <div className={styles.footerDivider} />
        <p className={styles.footerCopy}>&copy; 2026 NAZOTOKI MEIKYUU All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseEscapeRoomLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <RoomSection />
      <HowToPlaySection />
      <PackageSection />
      <RankingSection />
      <BookingCtaSection />
      <FooterSection />
    </div>
  );
}
