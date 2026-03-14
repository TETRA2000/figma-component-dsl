import styles from './JapaneseOrganicFarmLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>農園 大地</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>私たちの想い</a>
          <a href="#" className={styles.navLink}>旬の野菜</a>
          <a href="#" className={styles.navLink}>定期便</a>
          <a href="#" className={styles.navLink}>農園見学</a>
          <a href="#" className={styles.navLink}>ご注文</a>
        </div>
        <button className={styles.navCta}>ご注文はこちら</button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <span className={styles.heroLabel}>NOUEN DAICHI</span>
        <h1 className={styles.heroTitle}>畑から食卓へ</h1>
        <p className={styles.heroSubtitle}>
          大地の力を信じ、自然と共に育てた有機野菜をご家庭へ。<br />
          農薬・化学肥料を一切使わない、安心の野菜づくりを続けています。
        </p>
        <div className={styles.heroBtnGroup}>
          <button className={styles.heroBtnPrimary}>旬の野菜を注文する</button>
          <button className={styles.heroBtnSecondary}>農園について知る</button>
        </div>
      </div>
    </section>
  );
}

function PhilosophyCard({ title, description }: { title: string; description: string }) {
  return (
    <div className={styles.philosophyCard}>
      <div className={styles.philosophyIcon} />
      <h3 className={styles.philosophyTitle}>{title}</h3>
      <p className={styles.philosophyDesc}>{description}</p>
    </div>
  );
}

function PhilosophySection() {
  return (
    <section className={styles.philosophy}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>PHILOSOPHY</span>
        <h2 className={styles.sectionTitle}>私たちの想い</h2>
      </div>
      <div className={styles.philosophyGrid}>
        <PhilosophyCard
          title="土づくりから始める"
          description="健康な土壌が健康な野菜を育てる。堆肥と微生物の力を活かした土づくりに30年以上取り組んでいます。"
        />
        <PhilosophyCard
          title="農薬・化学肥料ゼロ"
          description="自然のサイクルを尊重し、農薬や化学肥料は一切使用しません。虫や草と共存する農業を実践しています。"
        />
        <PhilosophyCard
          title="旬を届ける"
          description="季節の恵みを最もおいしいタイミングで収穫。朝採れ野菜をその日のうちに出荷します。"
        />
      </div>
    </section>
  );
}

function VegetableCard({ name, season, description }: { name: string; season: string; description: string }) {
  return (
    <div className={styles.vegetableCard}>
      <div className={styles.vegetableImage} />
      <div className={styles.vegetableInfo}>
        <span className={styles.vegetableSeason}>{season}</span>
        <h3 className={styles.vegetableName}>{name}</h3>
        <p className={styles.vegetableDesc}>{description}</p>
      </div>
    </div>
  );
}

function VegetablesSection() {
  return (
    <section className={styles.vegetables}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>SEASONAL</span>
        <h2 className={styles.sectionTitle}>旬の野菜たち</h2>
      </div>
      <div className={styles.vegetablesGrid}>
        <VegetableCard
          name="有機トマト"
          season="夏野菜"
          description="太陽をたっぷり浴びた完熟トマト。糖度が高く、そのまま食べても絶品です。"
        />
        <VegetableCard
          name="無農薬ほうれん草"
          season="冬野菜"
          description="霜に当てて甘みを引き出した冬の逸品。えぐみが少なく、子どもにも人気。"
        />
        <VegetableCard
          name="新じゃがいも"
          season="春野菜"
          description="掘りたての新じゃが。ホクホクの食感と、皮ごと食べられる新鮮さが自慢です。"
        />
        <VegetableCard
          name="秋茄子"
          season="秋野菜"
          description="秋の涼しい気候で実が引き締まった茄子。焼き茄子や煮浸しに最適です。"
        />
      </div>
    </section>
  );
}

function PlanCard({ name, price, description, items, isPopular }: { name: string; price: string; description: string; items: string[]; isPopular: boolean }) {
  return (
    <div className={isPopular ? styles.planCardPopular : styles.planCard}>
      {isPopular && <span className={styles.planBadge}>一番人気</span>}
      <h3 className={styles.planName}>{name}</h3>
      <p className={styles.planPrice}>{price}</p>
      <p className={styles.planDesc}>{description}</p>
      <div className={styles.planDivider} />
      <ul className={styles.planItems}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <button className={isPopular ? styles.planBtnPopular : styles.planBtn}>このプランを選ぶ</button>
    </div>
  );
}

function SubscriptionSection() {
  return (
    <section className={styles.subscription}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>SUBSCRIPTION</span>
        <h2 className={styles.sectionTitle}>定期便プラン</h2>
      </div>
      <div className={styles.plansGrid}>
        <PlanCard
          name="お試しBOX"
          price="¥2,480/月"
          description="初めての方におすすめ。旬の野菜を少量ずつお届けします。"
          items={['旬の野菜 5品目', '送料無料', 'いつでも解約OK']}
          isPopular={false}
        />
        <PlanCard
          name="ファミリーBOX"
          price="¥4,980/月"
          description="家族の食卓に。たっぷりの有機野菜で毎日の食事を豊かに。"
          items={['旬の野菜 10品目', '送料無料', 'レシピカード付き', 'いつでも解約OK']}
          isPopular={true}
        />
        <PlanCard
          name="プレミアムBOX"
          price="¥7,980/月"
          description="食にこだわる方へ。希少品種や加工品もセットでお届け。"
          items={['旬の野菜 12品目', '希少品種 2品目', '自家製加工品 1品', '送料無料']}
          isPopular={false}
        />
      </div>
    </section>
  );
}

function FarmVisitSection() {
  return (
    <section className={styles.farmVisit}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>FARM VISIT</span>
        <h2 className={styles.sectionTitle}>農園見学のご案内</h2>
      </div>
      <div className={styles.farmVisitInner}>
        <div className={styles.farmVisitImage} />
        <div className={styles.farmVisitContent}>
          <p className={styles.farmVisitDesc}>
            実際の畑を見て、土に触れ、採れたての野菜を味わう。農園見学では、私たちの農業への想いを直接お伝えします。お子様の食育にもおすすめです。
          </p>
          <div className={styles.farmVisitDetails}>
            <p>開催日: 毎月第2・第4土曜日</p>
            <p>時間: 10:00 - 12:00</p>
            <p>参加費: 大人 1,500円 / 子ども 500円</p>
            <p>場所: 千葉県南房総市 農園大地</p>
          </div>
          <button className={styles.farmVisitBtn}>見学を予約する</button>
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className={styles.cta}>
      <h2 className={styles.ctaTitle}>大地の恵みを、あなたの食卓へ</h2>
      <p className={styles.ctaSubtitle}>
        初回限定・送料無料のお試しBOXで、<br />
        農園大地の有機野菜をお試しください。
      </p>
      <button className={styles.ctaBtn}>お試しBOXを注文する</button>
      <p className={styles.ctaNote}>※ 定期便ではありません。1回限りのお試しです</p>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span className={styles.footerBrand}>農園 大地 NOUEN DAICHI</span>
        <div className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}>私たちの想い</a>
          <a href="#" className={styles.footerLink}>旬の野菜</a>
          <a href="#" className={styles.footerLink}>定期便</a>
          <a href="#" className={styles.footerLink}>農園見学</a>
          <a href="#" className={styles.footerLink}>よくある質問</a>
          <a href="#" className={styles.footerLink}>プライバシーポリシー</a>
        </div>
        <div className={styles.footerDivider} />
        <p className={styles.footerCopy}>© 2026 農園 大地 All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseOrganicFarmLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <PhilosophySection />
      <VegetablesSection />
      <SubscriptionSection />
      <FarmVisitSection />
      <CtaSection />
      <FooterSection />
    </div>
  );
}
