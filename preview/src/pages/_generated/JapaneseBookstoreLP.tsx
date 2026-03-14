import styles from './JapaneseBookstoreLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>本の森 HONNOMORI</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>新刊案内</a>
          <a href="#" className={styles.navLink}>読書空間</a>
          <a href="#" className={styles.navLink}>イベント</a>
          <a href="#" className={styles.navLink}>会員制度</a>
        </div>
        <button className={styles.navCta}>会員登録</button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <span className={styles.heroBadge}>HONNOMORI BOOKSTORE</span>
        <h1 className={styles.heroTitle}>本との出会いを</h1>
        <p className={styles.heroSubtitle}>
          一冊の本が、あなたの世界を広げる。<br />
          厳選された書籍と静かな空間で、特別な読書体験を。
        </p>
        <button className={styles.heroBtn}>新刊をチェック</button>
      </div>
    </section>
  );
}

function BookCard({ title, author, genre, description }: { title: string; author: string; genre: string; description: string }) {
  return (
    <div className={styles.bookCard}>
      <div className={styles.bookCover} />
      <span className={styles.bookGenre}>{genre}</span>
      <h3 className={styles.bookTitle}>{title}</h3>
      <p className={styles.bookAuthor}>{author}</p>
      <p className={styles.bookDesc}>{description}</p>
    </div>
  );
}

function NewArrivalsSection() {
  return (
    <section className={styles.newArrivals}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>NEW ARRIVALS</span>
        <h2 className={styles.sectionTitle}>新刊案内</h2>
      </div>
      <div className={styles.bookGrid}>
        <BookCard title="静かな森の声" author="山田 太郎" genre="文学・小説" description="自然との対話を通じて描かれる心の旅路" />
        <BookCard title="数学の美しさ" author="佐藤 花子" genre="サイエンス" description="日常に潜む数学の不思議を解き明かす" />
        <BookCard title="古都の記憶" author="田中 一郎" genre="エッセイ" description="京都の路地裏を歩きながら綴る随想" />
        <BookCard title="未来のかたち" author="鈴木 明" genre="社会・思想" description="テクノロジーと共生する社会の姿を探る" />
      </div>
    </section>
  );
}

function ReadingSpaceSection() {
  return (
    <section className={styles.readingSpace}>
      <div className={styles.readingSpaceInner}>
        <div className={styles.readingSpaceImage} />
        <div className={styles.readingSpaceText}>
          <span className={styles.sectionLabel}>READING SPACE</span>
          <h2 className={styles.sectionTitle}>読書空間のご案内</h2>
          <p className={styles.readingSpaceDesc}>
            木の温もりに包まれた店内には、ゆったりとした読書スペースをご用意しています。
            お気に入りの一冊を見つけたら、併設カフェのドリンクと共にその場でお楽しみいただけます。
          </p>
          <ul className={styles.spaceFeatures}>
            <li>座席数：48席（ソファ席・テーブル席・カウンター席）</li>
            <li>併設カフェ：コーヒー・紅茶・軽食をご提供</li>
            <li>Wi-Fi・電源完備</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function EventCard({ title, date, description }: { title: string; date: string; description: string }) {
  return (
    <div className={styles.eventCard}>
      <span className={styles.eventDate}>{date}</span>
      <h3 className={styles.eventTitle}>{title}</h3>
      <p className={styles.eventDesc}>{description}</p>
      <button className={styles.eventBtn}>詳細を見る</button>
    </div>
  );
}

function EventsSection() {
  return (
    <section className={styles.events}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>EVENTS</span>
        <h2 className={styles.sectionTitle}>イベント・ワークショップ</h2>
      </div>
      <div className={styles.eventGrid}>
        <EventCard title="著者トークイベント：山田太郎氏" date="2026年4月12日（土）14:00〜" description="新刊「静かな森の声」の執筆秘話を著者ご本人が語ります。サイン会も開催。" />
        <EventCard title="絵本読み聞かせの会" date="毎週日曜 11:00〜" description="お子様向けの絵本読み聞かせ会。季節に合わせた絵本を選んでお届けします。" />
        <EventCard title="ブックバインディング講座" date="2026年4月19日（土）13:00〜" description="手製本の基礎を学ぶワークショップ。世界に一つだけのノートを作りましょう。" />
      </div>
    </section>
  );
}

function MembershipSection() {
  return (
    <section className={styles.membership}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>MEMBERSHIP</span>
        <h2 className={styles.sectionTitle}>会員制度</h2>
      </div>
      <div className={styles.benefitsList}>
        <div className={styles.benefitItem}>
          <span className={styles.benefitNum}>01</span>
          <div className={styles.benefitText}>
            <h4 className={styles.benefitTitle}>全品10%OFF</h4>
            <p className={styles.benefitDesc}>書籍・雑貨すべてのお買い物が会員価格に</p>
          </div>
        </div>
        <div className={styles.benefitItem}>
          <span className={styles.benefitNum}>02</span>
          <div className={styles.benefitText}>
            <h4 className={styles.benefitTitle}>読書スペース優先利用</h4>
            <p className={styles.benefitDesc}>混雑時でも会員様専用席をご利用いただけます</p>
          </div>
        </div>
        <div className={styles.benefitItem}>
          <span className={styles.benefitNum}>03</span>
          <div className={styles.benefitText}>
            <h4 className={styles.benefitTitle}>イベント先行予約</h4>
            <p className={styles.benefitDesc}>人気イベントに優先的にお申し込みいただけます</p>
          </div>
        </div>
      </div>
      <button className={styles.membershipCta}>年会費 ¥3,300（税込）で入会する</button>
    </section>
  );
}

function StoreInfoSection() {
  return (
    <section className={styles.storeInfo}>
      <div className={styles.storeInfoInner}>
        <div className={styles.storeText}>
          <span className={styles.sectionLabel}>STORE INFO</span>
          <h2 className={styles.sectionTitle}>店舗情報</h2>
          <p className={styles.storeAddr}>〒113-0033<br />東京都文京区本郷3-4-5 森ビル1F</p>
          <p className={styles.storeRoute}>東京メトロ丸ノ内線「本郷三丁目」駅<br />2番出口より徒歩3分</p>
          <p className={styles.storeHours}>営業時間：10:00〜21:00<br />カフェラストオーダー 20:30<br />定休日：毎週水曜日</p>
        </div>
        <div className={styles.storeMap} />
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span className={styles.footerBrand}>本の森  HONNOMORI</span>
        <div className={styles.footerInfo}>
          <p>〒113-0033 東京都文京区本郷3-4-5 森ビル1F</p>
          <p>営業時間：10:00〜21:00 / 定休日：毎週水曜日</p>
        </div>
        <p className={styles.footerCopy}>© 2026 HONNOMORI. All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseBookstoreLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <NewArrivalsSection />
      <ReadingSpaceSection />
      <EventsSection />
      <MembershipSection />
      <StoreInfoSection />
      <FooterSection />
    </div>
  );
}
