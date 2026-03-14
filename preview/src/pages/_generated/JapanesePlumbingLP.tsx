import styles from './JapanesePlumbingLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <div className={styles.brandGroup}>
          <span className={styles.brand}>水道の達人</span>
          <span className={styles.brandEn}>SUIDOU NO TATSUJIN</span>
        </div>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>サービス</a>
          <a href="#" className={styles.navLink}>料金案内</a>
          <a href="#" className={styles.navLink}>対応エリア</a>
          <a href="#" className={styles.navLink}>お客様の声</a>
        </div>
        <div className={styles.navRight}>
          <span className={styles.navPhone}>0120-XXX-XXX</span>
          <button className={styles.navCta}>今すぐ相談</button>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroBadge}>24時間365日対応</div>
        <h1 className={styles.heroTitle}>
          水のトラブル、<br />
          <span className={styles.heroTitleAccent}>即日解決</span>
        </h1>
        <p className={styles.heroSubtitle}>
          水漏れ・つまり・修理・設置工事まで。<br />
          最短30分で駆けつけ、経験豊富なプロが迅速対応。<br />
          見積もり無料・出張費無料・深夜早朝割増なし。
        </p>
        <div className={styles.heroActions}>
          <button className={styles.heroBtnPrimary}>無料で相談する</button>
          <button className={styles.heroBtnSecondary}>料金を確認する</button>
        </div>
        <div className={styles.heroStats}>
          <div className={styles.heroStat}>
            <span className={styles.heroStatNum}>50,000+</span>
            <span className={styles.heroStatLabel}>施工実績</span>
          </div>
          <div className={styles.heroStat}>
            <span className={styles.heroStatNum}>98.5%</span>
            <span className={styles.heroStatLabel}>お客様満足度</span>
          </div>
          <div className={styles.heroStat}>
            <span className={styles.heroStatNum}>最短30分</span>
            <span className={styles.heroStatLabel}>到着時間</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ icon, name, description }: { icon: string; name: string; description: string }) {
  return (
    <div className={styles.serviceCard}>
      <div className={styles.serviceIcon}>{icon}</div>
      <h3 className={styles.serviceName}>{name}</h3>
      <p className={styles.serviceDesc}>{description}</p>
    </div>
  );
}

function ServicesSection() {
  return (
    <section className={styles.services}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>SERVICES</span>
        <h2 className={styles.sectionTitle}>サービス内容</h2>
        <p className={styles.sectionDesc}>あらゆる水まわりのトラブルに対応いたします。</p>
      </div>
      <div className={styles.serviceGrid}>
        <ServiceCard
          icon="💧"
          name="水漏れ修理"
          description="蛇口・配管・トイレの水漏れを迅速に修理。原因を特定し、再発防止まで徹底対応いたします。"
        />
        <ServiceCard
          icon="🚿"
          name="つまり解消"
          description="トイレ・排水口・排水管のつまりを高圧洗浄や専用機器で解消。頑固なつまりもお任せください。"
        />
        <ServiceCard
          icon="🔧"
          name="設置・交換工事"
          description="蛇口・トイレ・給湯器の交換や新規設置工事。お客様のご予算に合わせたご提案をいたします。"
        />
        <ServiceCard
          icon="🚨"
          name="緊急対応"
          description="深夜・早朝・休日の緊急トラブルも割増なしで対応。お電話一本で最短30分で駆けつけます。"
        />
      </div>
    </section>
  );
}

function PriceGuideSection() {
  return (
    <section className={styles.pricing}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>PRICE GUIDE</span>
        <h2 className={styles.sectionTitle}>料金案内</h2>
        <p className={styles.sectionDesc}>明朗会計で安心。作業前にお見積もりをご提示します。</p>
      </div>
      <div className={styles.priceTable}>
        <div className={styles.priceRow}>
          <span className={styles.priceService}>蛇口の水漏れ修理</span>
          <span className={styles.priceAmount}>¥4,000〜</span>
        </div>
        <div className={styles.priceRow}>
          <span className={styles.priceService}>トイレのつまり</span>
          <span className={styles.priceAmount}>¥5,000〜</span>
        </div>
        <div className={styles.priceRow}>
          <span className={styles.priceService}>排水管の高圧洗浄</span>
          <span className={styles.priceAmount}>¥15,000〜</span>
        </div>
        <div className={styles.priceRow}>
          <span className={styles.priceService}>蛇口の交換</span>
          <span className={styles.priceAmount}>¥12,000〜</span>
        </div>
        <div className={styles.priceRow}>
          <span className={styles.priceService}>トイレの交換</span>
          <span className={styles.priceAmount}>¥30,000〜</span>
        </div>
        <div className={styles.priceRow}>
          <span className={styles.priceService}>給湯器の交換</span>
          <span className={styles.priceAmount}>¥80,000〜</span>
        </div>
      </div>
      <p className={styles.priceNote}>※ 上記は基本料金です。部品代が別途かかる場合があります。出張費・見積もり無料。</p>
    </section>
  );
}

function ServiceAreaSection() {
  return (
    <section className={styles.area}>
      <div className={styles.areaInner}>
        <div className={styles.areaMap}>
          <div className={styles.areaMapPlaceholder}>
            <span className={styles.areaMapIcon}>📍</span>
            <span className={styles.areaMapText}>対応エリアマップ</span>
          </div>
        </div>
        <div className={styles.areaContent}>
          <span className={styles.sectionLabel}>SERVICE AREA</span>
          <h2 className={styles.areaTitle}>対応エリア</h2>
          <p className={styles.areaText}>
            東京23区を中心に、神奈川・千葉・埼玉まで広くカバー。
            最短30分で現場に駆けつけます。
          </p>
          <div className={styles.areaList}>
            <div className={styles.areaItem}>
              <span className={styles.areaRegion}>東京都</span>
              <span className={styles.areaCities}>23区全域・武蔵野市・三鷹市・調布市・府中市</span>
            </div>
            <div className={styles.areaItem}>
              <span className={styles.areaRegion}>神奈川県</span>
              <span className={styles.areaCities}>横浜市・川崎市・相模原市</span>
            </div>
            <div className={styles.areaItem}>
              <span className={styles.areaRegion}>千葉県</span>
              <span className={styles.areaCities}>千葉市・船橋市・市川市・松戸市</span>
            </div>
            <div className={styles.areaItem}>
              <span className={styles.areaRegion}>埼玉県</span>
              <span className={styles.areaCities}>さいたま市・川口市・所沢市・越谷市</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ name, area, text: reviewText }: { name: string; area: string; text: string }) {
  return (
    <div className={styles.reviewCard}>
      <div className={styles.reviewStars}>★★★★★</div>
      <p className={styles.reviewText}>{reviewText}</p>
      <div className={styles.reviewAuthor}>
        <div className={styles.reviewAvatar}>{name.charAt(0)}</div>
        <div className={styles.reviewInfo}>
          <span className={styles.reviewName}>{name}</span>
          <span className={styles.reviewArea}>{area}</span>
        </div>
      </div>
    </div>
  );
}

function ReviewsSection() {
  return (
    <section className={styles.reviews}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>REVIEWS</span>
        <h2 className={styles.sectionTitle}>お客様の声</h2>
        <p className={styles.sectionDesc}>実際にご利用いただいたお客様からの声をご紹介します。</p>
      </div>
      <div className={styles.reviewGrid}>
        <ReviewCard
          name="田中様"
          area="東京都世田谷区"
          text="深夜にトイレが水漏れして困っていましたが、電話してから40分で来てくれました。丁寧に原因を説明してくれて、あっという間に直してもらえました。料金も事前の見積もり通りで安心でした。"
        />
        <ReviewCard
          name="佐藤様"
          area="神奈川県横浜市"
          text="キッチンの排水がつまって自分では直せず依頼しました。高圧洗浄で一発解決。作業後に予防方法も教えてくれて、とても親切な対応でした。また何かあればお願いしたいです。"
        />
        <ReviewCard
          name="鈴木様"
          area="埼玉県さいたま市"
          text="古くなった蛇口の交換をお願いしました。複数のメーカーの選択肢を提示してくれて、予算に合ったものを選べました。工事も1時間ほどで完了。仕上がりもきれいで大満足です。"
        />
      </div>
    </section>
  );
}

function CallCTASection() {
  return (
    <section className={styles.callCta}>
      <div className={styles.callCtaContent}>
        <div className={styles.callBadge}>24時間365日受付</div>
        <h2 className={styles.callTitle}>水のトラブル、今すぐご相談ください</h2>
        <p className={styles.callSubtitle}>出張費無料・見積もり無料・深夜早朝割増なし</p>
        <div className={styles.callPhoneBox}>
          <span className={styles.callPhoneLabel}>フリーダイヤル</span>
          <span className={styles.callPhoneNumber}>0120-XXX-XXX</span>
        </div>
        <button className={styles.callBtn}>Webで無料相談する</button>
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
            <span className={styles.footerBrand}>水道の達人</span>
            <span className={styles.footerBrandEn}>SUIDOU NO TATSUJIN</span>
          </div>
          <div className={styles.footerColumns}>
            <div className={styles.footerCol}>
              <span className={styles.footerColTitle}>サービス</span>
              <a href="#" className={styles.footerLink}>水漏れ修理</a>
              <a href="#" className={styles.footerLink}>つまり解消</a>
              <a href="#" className={styles.footerLink}>設置・交換工事</a>
              <a href="#" className={styles.footerLink}>緊急対応</a>
            </div>
            <div className={styles.footerCol}>
              <span className={styles.footerColTitle}>ご案内</span>
              <a href="#" className={styles.footerLink}>料金案内</a>
              <a href="#" className={styles.footerLink}>対応エリア</a>
              <a href="#" className={styles.footerLink}>お客様の声</a>
            </div>
            <div className={styles.footerCol}>
              <span className={styles.footerColTitle}>会社情報</span>
              <a href="#" className={styles.footerLink}>会社概要</a>
              <a href="#" className={styles.footerLink}>採用情報</a>
              <a href="#" className={styles.footerLink}>プライバシーポリシー</a>
            </div>
          </div>
        </div>
        <div className={styles.footerDivider} />
        <p className={styles.footerCopy}>&copy; 2026 水道の達人 All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapanesePlumbingLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <ServicesSection />
      <PriceGuideSection />
      <ServiceAreaSection />
      <ReviewsSection />
      <CallCTASection />
      <FooterSection />
    </div>
  );
}
