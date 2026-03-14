import styles from './JapaneseChocolateLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <div className={styles.brandGroup}>
          <span className={styles.brand}>ショコラトリー 月の雫</span>
          <span className={styles.brandEn}>TSUKI NO SHIZUKU</span>
        </div>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>コレクション</a>
          <a href="#" className={styles.navLink}>ショコラティエ</a>
          <a href="#" className={styles.navLink}>ギフト</a>
          <a href="#" className={styles.navLink}>オンラインショップ</a>
        </div>
        <button className={styles.navCta}>ご注文はこちら</button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        <span className={styles.heroLabel}>ARTISAN CHOCOLATERIE</span>
        <h1 className={styles.heroTitle}>口どけの芸術</h1>
        <p className={styles.heroSubtitle}>
          カカオの産地から厳選した素材を使い、<br />
          一粒一粒に想いを込めて仕上げる至高のショコラ。<br />
          月の雫が奏でる、口福のひととき。
        </p>
        <div className={styles.heroActions}>
          <button className={styles.heroBtnPrimary}>コレクションを見る</button>
          <button className={styles.heroBtnSecondary}>ギフトを贈る</button>
        </div>
      </div>
    </section>
  );
}

function CollectionCard({ name, description, icon }: { name: string; description: string; icon: string }) {
  return (
    <div className={styles.collectionCard}>
      <div className={styles.collectionIcon}>{icon}</div>
      <h3 className={styles.collectionName}>{name}</h3>
      <p className={styles.collectionDesc}>{description}</p>
      <span className={styles.collectionLink}>詳しく見る &rarr;</span>
    </div>
  );
}

function CollectionsSection() {
  return (
    <section className={styles.collections}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>COLLECTIONS</span>
        <h2 className={styles.sectionTitle}>コレクション</h2>
        <p className={styles.sectionDesc}>素材と技法にこだわり抜いた、四季折々のショコラをご堪能ください。</p>
      </div>
      <div className={styles.collectionGrid}>
        <CollectionCard
          name="トリュフ"
          description="ガナッシュを贅沢に包み込んだ、なめらかな口どけのトリュフコレクション。ベネズエラ産カカオの深い味わい。"
          icon="🍫"
        />
        <CollectionCard
          name="ボンボンショコラ"
          description="宝石のように美しい一粒。フルーツ、ナッツ、スパイスを組み合わせた芸術的なボンボン。"
          icon="💎"
        />
        <CollectionCard
          name="タブレット"
          description="カカオの個性を最大限に引き出したシングルオリジンのタブレット。産地別の味わいの違いをお楽しみください。"
          icon="🏷️"
        />
        <CollectionCard
          name="季節限定"
          description="旬の素材を活かした、その季節だけの特別なショコラ。桜、抹茶、柚子など和の素材との融合。"
          icon="🌸"
        />
      </div>
    </section>
  );
}

function ChocolatierSection() {
  return (
    <section className={styles.chocolatier}>
      <div className={styles.chocolatierInner}>
        <div className={styles.chocolatierPhoto} />
        <div className={styles.chocolatierContent}>
          <span className={styles.sectionLabel}>CHOCOLATIER</span>
          <h2 className={styles.chocolatierTitle}>ショコラティエ 藤原 月子</h2>
          <p className={styles.chocolatierText}>
            パリの名門ショコラトリーで10年間修行を重ね、
            帰国後「月の雫」を創業。フランスの伝統技法と
            日本の繊細な感性を融合させた独自のスタイルで、
            数々の国際コンクールで受賞。
          </p>
          <p className={styles.chocolatierText}>
            「カカオは大地からの贈り物。その声に耳を傾け、
            最高の一粒をお届けしたい。」
          </p>
          <div className={styles.awards}>
            <span className={styles.award}>C.C.C. 金賞 2024</span>
            <span className={styles.award}>ICA 銀賞 2023</span>
            <span className={styles.award}>サロン・デュ・ショコラ出展</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function GiftCard({ name, price, description }: { name: string; price: string; description: string }) {
  return (
    <div className={styles.giftCard}>
      <div className={styles.giftPhoto} />
      <div className={styles.giftInfo}>
        <h3 className={styles.giftName}>{name}</h3>
        <p className={styles.giftDesc}>{description}</p>
        <div className={styles.giftBottom}>
          <span className={styles.giftPrice}>{price}</span>
          <button className={styles.giftBtn}>カートに入れる</button>
        </div>
      </div>
    </div>
  );
}

function GiftSection() {
  return (
    <section className={styles.gifts}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>GIFT</span>
        <h2 className={styles.sectionTitle}>ギフトコレクション</h2>
        <p className={styles.sectionDesc}>大切な方への贈り物に、特別なショコラを。</p>
      </div>
      <div className={styles.giftGrid}>
        <GiftCard
          name="月光 -GEKKOU-"
          price="¥5,400"
          description="看板トリュフ6種を美しい木箱に詰めた、当店一番人気のギフトセット。"
        />
        <GiftCard
          name="花鳥風月 -KACHOU FUUGETSU-"
          price="¥8,640"
          description="四季をテーマにしたボンボンショコラ12粒入り。和素材との繊細なマリアージュ。"
        />
        <GiftCard
          name="至福の時 -SHIFUKU NO TOKI-"
          price="¥12,960"
          description="タブレット3種とトリュフ9粒の豪華アソート。特別な日の贈り物に。"
        />
      </div>
    </section>
  );
}

function OnlineOrderCTA() {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>オンラインショップ</h2>
        <p className={styles.ctaSubtitle}>
          全国どこからでもご注文いただけます。<br />
          ¥10,000以上のご注文で送料無料。
        </p>
        <button className={styles.ctaBtn}>オンラインショップへ</button>
        <p className={styles.ctaNote}>クール便でお届け / 最短翌日配送</p>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrandGroup}>
            <span className={styles.footerBrand}>ショコラトリー 月の雫</span>
            <span className={styles.footerBrandEn}>TSUKI NO SHIZUKU</span>
          </div>
          <div className={styles.footerColumns}>
            <div className={styles.footerCol}>
              <span className={styles.footerColTitle}>ショップ</span>
              <a href="#" className={styles.footerLink}>コレクション</a>
              <a href="#" className={styles.footerLink}>ギフト</a>
              <a href="#" className={styles.footerLink}>オンラインショップ</a>
            </div>
            <div className={styles.footerCol}>
              <span className={styles.footerColTitle}>ブランド</span>
              <a href="#" className={styles.footerLink}>ショコラティエ紹介</a>
              <a href="#" className={styles.footerLink}>素材へのこだわり</a>
              <a href="#" className={styles.footerLink}>店舗情報</a>
            </div>
            <div className={styles.footerCol}>
              <span className={styles.footerColTitle}>サポート</span>
              <a href="#" className={styles.footerLink}>よくあるご質問</a>
              <a href="#" className={styles.footerLink}>配送について</a>
              <a href="#" className={styles.footerLink}>プライバシーポリシー</a>
            </div>
          </div>
        </div>
        <div className={styles.footerDivider} />
        <p className={styles.footerCopy}>&copy; 2026 ショコラトリー 月の雫 All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseChocolateLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <CollectionsSection />
      <ChocolatierSection />
      <GiftSection />
      <OnlineOrderCTA />
      <FooterSection />
    </div>
  );
}
