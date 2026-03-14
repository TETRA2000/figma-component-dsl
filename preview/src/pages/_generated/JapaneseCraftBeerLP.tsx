import styles from './JapaneseCraftBeerLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>HOP STAND ホップスタンド</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>タップリスト</a>
          <a href="#" className={styles.navLink}>フードメニュー</a>
          <a href="#" className={styles.navLink}>ブルワリー</a>
          <a href="#" className={styles.navLink}>イベント</a>
          <a href="#" className={styles.navLink}>アクセス</a>
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
        <span className={styles.heroLabel}>CRAFT BEER BAR</span>
        <h1 className={styles.heroTitle}>こだわりの一杯を</h1>
        <p className={styles.heroSubtitle}>
          厳選された国内外のクラフトビールを常時12タップでご提供。<br />
          一杯一杯に込められたブルワーの想いをお届けします。
        </p>
        <button className={styles.heroCta}>今日のタップリストを見る</button>
      </div>
    </section>
  );
}

function BeerCard({
  name,
  brewery,
  style,
  abv,
  ibu,
  description,
}: {
  name: string;
  brewery: string;
  style: string;
  abv: string;
  ibu: string;
  description: string;
}) {
  return (
    <div className={styles.beerCard}>
      <div className={styles.beerGlass} />
      <div className={styles.beerInfo}>
        <h3 className={styles.beerName}>{name}</h3>
        <p className={styles.beerBrewery}>{brewery}</p>
        <p className={styles.beerStyle}>{style}</p>
        <div className={styles.beerStats}>
          <span className={styles.beerStat}>ABV {abv}</span>
          <span className={styles.beerStat}>IBU {ibu}</span>
        </div>
        <p className={styles.beerDesc}>{description}</p>
      </div>
    </div>
  );
}

function TapListSection() {
  return (
    <section className={styles.tapList}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>TODAY&apos;S TAP LIST</span>
        <h2 className={styles.sectionTitle}>本日のタップリスト</h2>
      </div>
      <div className={styles.tapGrid}>
        <BeerCard
          name="Hop Galaxy IPA"
          brewery="far yeast brewing"
          style="IPA"
          abv="6.5%"
          ibu="55"
          description="シトラスとトロピカルフルーツが香る華やかなIPA。苦味と甘みのバランスが絶妙。"
        />
        <BeerCard
          name="Tokyo White"
          brewery="T.Y. HARBOR"
          style="ウィートエール"
          abv="5.0%"
          ibu="15"
          description="小麦の柔らかな口当たりとオレンジピールの爽やかな香り。ビール初心者にもおすすめ。"
        />
        <BeerCard
          name="Kuroyama Stout"
          brewery="COEDO"
          style="スタウト"
          abv="5.5%"
          ibu="40"
          description="ローストモルトの深いコクとチョコレートのような甘み。寒い季節にぴったりの一杯。"
        />
        <BeerCard
          name="Hanami Saison"
          brewery="志賀高原ビール"
          style="セゾン"
          abv="5.8%"
          ibu="28"
          description="フルーティーでスパイシーなベルギースタイル。食事との相性が抜群です。"
        />
        <BeerCard
          name="Yuzu Pale Ale"
          brewery="箕面ビール"
          style="ペールエール"
          abv="5.0%"
          ibu="30"
          description="国産柚子を贅沢に使用。和柑橘の爽やかな香りとモルトの甘みが調和した一杯。"
        />
        <BeerCard
          name="Double IPA"
          brewery="伊勢角屋麦酒"
          style="ダブルIPA"
          abv="8.5%"
          ibu="75"
          description="大量のホップが生み出す圧倒的な香りと苦味。ホップヘッズ必飲の一杯。"
        />
      </div>
    </section>
  );
}

function FoodItem({ name, price, description }: { name: string; price: string; description: string }) {
  return (
    <div className={styles.foodItem}>
      <div className={styles.foodImg} />
      <h3 className={styles.foodName}>{name}</h3>
      <p className={styles.foodDesc}>{description}</p>
      <p className={styles.foodPrice}>{price}</p>
    </div>
  );
}

function FoodSection() {
  return (
    <section className={styles.food}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabelLight}>FOOD MENU</span>
        <h2 className={styles.sectionTitleDark}>フードメニュー</h2>
      </div>
      <div className={styles.foodGrid}>
        <FoodItem
          name="自家製ソーセージ盛り合わせ"
          price="¥1,280"
          description="3種のハーブソーセージをグリルで。マスタード添え。"
        />
        <FoodItem
          name="ビアチーズフォンデュ"
          price="¥1,480"
          description="スタウトビールで仕上げた濃厚チーズ。バゲット付き。"
        />
        <FoodItem
          name="スモークナッツ＆ドライフルーツ"
          price="¥780"
          description="自家燻製のミックスナッツとドライフルーツの盛り合わせ。"
        />
        <FoodItem
          name="フィッシュ＆チップス"
          price="¥1,180"
          description="IPA衣でカラッと揚げた白身魚。自家製タルタルソースで。"
        />
      </div>
    </section>
  );
}

function BrewerySection() {
  return (
    <section className={styles.brewery}>
      <div className={styles.breweryContent}>
        <div className={styles.breweryImg} />
        <div className={styles.breweryText}>
          <span className={styles.sectionLabel}>OUR STORY</span>
          <h2 className={styles.sectionTitle}>ブルワリーストーリー</h2>
          <p className={styles.breweryDesc}>
            2018年、東京・下北沢の小さなガレージから始まったHOP STAND。
            「本当に美味しいビールを、もっと身近に」という想いから、
            国内外の個性豊かなクラフトビールを厳選してお届けしています。
          </p>
          <p className={styles.breweryDesc}>
            常時12タップのラインナップは毎週更新。季節の素材を使った
            限定醸造ビールや、海外の希少なブルワリーとのコラボレーションなど、
            ここでしか味わえない一杯をご用意しています。
          </p>
          <p className={styles.breweryDesc}>
            ビールの奥深い世界を、気軽に楽しんでいただける空間づくりを
            大切にしています。初心者の方もお気軽にお立ち寄りください。
          </p>
        </div>
      </div>
    </section>
  );
}

function EventCard({ date, title, description }: { date: string; title: string; description: string }) {
  return (
    <div className={styles.eventCard}>
      <div className={styles.eventDate}>{date}</div>
      <div className={styles.eventInfo}>
        <h3 className={styles.eventTitle}>{title}</h3>
        <p className={styles.eventDesc}>{description}</p>
      </div>
    </div>
  );
}

function EventsSection() {
  return (
    <section className={styles.events}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabelLight}>EVENTS</span>
        <h2 className={styles.sectionTitleDark}>イベントカレンダー</h2>
      </div>
      <div className={styles.eventsGrid}>
        <EventCard
          date="3/21 (金)"
          title="Spring Hop Fest 2026"
          description="春限定ビール6種類を一斉解禁。ブルワーによるトークセッション付き。参加費¥3,000（ビール3杯付き）"
        />
        <EventCard
          date="3/28 (金)"
          title="ビギナーズ・テイスティングナイト"
          description="クラフトビール初心者向けのテイスティングイベント。スタイル別の飲み比べセットをご用意。参加費¥2,000"
        />
        <EventCard
          date="4/5 (土)"
          title="ペアリングディナー"
          description="シェフ特製コース料理とクラフトビールのペアリングを楽しむ特別な夜。限定20名。¥8,000"
        />
      </div>
    </section>
  );
}

function AccessSection() {
  return (
    <section className={styles.access}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>ACCESS / HOURS</span>
        <h2 className={styles.sectionTitle}>アクセス・営業時間</h2>
      </div>
      <div className={styles.accessContent}>
        <div className={styles.mapPlaceholder}>MAP</div>
        <div className={styles.accessInfo}>
          <div className={styles.accessRow}>
            <span className={styles.accessLabel}>住所</span>
            <span className={styles.accessValue}>東京都世田谷区北沢2-12-8 B1F</span>
          </div>
          <div className={styles.accessRow}>
            <span className={styles.accessLabel}>電話</span>
            <span className={styles.accessValue}>03-9876-5432</span>
          </div>
          <div className={styles.accessRow}>
            <span className={styles.accessLabel}>営業時間</span>
            <span className={styles.accessValue}>平日 17:00〜24:00 / 土日祝 14:00〜24:00</span>
          </div>
          <div className={styles.accessRow}>
            <span className={styles.accessLabel}>定休日</span>
            <span className={styles.accessValue}>火曜日</span>
          </div>
          <div className={styles.accessRow}>
            <span className={styles.accessLabel}>席数</span>
            <span className={styles.accessValue}>カウンター8席 / テーブル24席 / テラス12席</span>
          </div>
          <div className={styles.accessRow}>
            <span className={styles.accessLabel}>最寄駅</span>
            <span className={styles.accessValue}>小田急線・京王井の頭線 下北沢駅 徒歩3分</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span className={styles.footerBrand}>HOP STAND ホップスタンド</span>
        <div className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}>タップリスト</a>
          <a href="#" className={styles.footerLink}>フードメニュー</a>
          <a href="#" className={styles.footerLink}>ブルワリー</a>
          <a href="#" className={styles.footerLink}>イベント</a>
          <a href="#" className={styles.footerLink}>アクセス</a>
          <a href="#" className={styles.footerLink}>Instagram</a>
        </div>
        <div className={styles.footerDivider} />
        <p className={styles.footerCopy}>© 2026 HOP STAND All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseCraftBeerLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <TapListSection />
      <FoodSection />
      <BrewerySection />
      <EventsSection />
      <AccessSection />
      <FooterSection />
    </div>
  );
}
