import styles from './JapaneseSushiLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>鮨 匠</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>おまかせ</a>
          <a href="#" className={styles.navLink}>職人紹介</a>
          <a href="#" className={styles.navLink}>旬の逸品</a>
          <a href="#" className={styles.navLink}>ご予約</a>
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
        <span className={styles.heroLabel}>SUSHI TAKUMI</span>
        <h1 className={styles.heroTitle}>至高の一貫</h1>
        <div className={styles.heroDivider} />
        <p className={styles.heroSubtitle}>
          江戸前の伝統を守りながら<br />
          最高峰の素材で握る珠玉の鮨
        </p>
        <button className={styles.heroBtn}>ご予約はこちら</button>
      </div>
    </section>
  );
}

function CourseCard({ name, pieces, price, description }: { name: string; pieces: string; price: string; description: string }) {
  return (
    <div className={styles.courseCard}>
      <div className={styles.courseImgArea} />
      <div className={styles.courseInfo}>
        <h3 className={styles.courseName}>{name}</h3>
        <span className={styles.coursePieces}>{pieces}</span>
        <p className={styles.courseDesc}>{description}</p>
        <span className={styles.coursePrice}>{price}</span>
      </div>
    </div>
  );
}

function OmakaseSection() {
  return (
    <section className={styles.omakase}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>OMAKASE</span>
        <h2 className={styles.sectionTitle}>おまかせコース</h2>
      </div>
      <div className={styles.courseGrid}>
        <CourseCard
          name="匠コース"
          pieces="握り12貫 + 一品料理"
          price="¥22,000"
          description="旬の素材を贅沢に使った当店最高峰のおまかせコース。前菜から甘味まで職人が心を込めてお仕立てします。"
        />
        <CourseCard
          name="雅コース"
          pieces="握り10貫 + 一品料理"
          price="¥16,500"
          description="厳選された旬のネタを中心に、バランスよくお楽しみいただけるコース。初めての方にもおすすめです。"
        />
        <CourseCard
          name="華コース"
          pieces="握り8貫 + お椀"
          price="¥11,000"
          description="お気軽に江戸前鮨をお楽しみいただけるコース。ランチタイムにも人気の内容です。"
        />
      </div>
    </section>
  );
}

function ChefSection() {
  return (
    <section className={styles.chef}>
      <div className={styles.chefContent}>
        <div className={styles.chefImgArea} />
        <div className={styles.chefInfo}>
          <span className={styles.sectionLabelLight}>CHEF</span>
          <h2 className={styles.chefTitle}>職人紹介</h2>
          <div className={styles.chefDivider} />
          <h3 className={styles.chefName}>山本 匠一</h3>
          <span className={styles.chefRole}>大将 / 鮨職人歴35年</span>
          <p className={styles.chefDesc}>
            銀座の名店で20年の修行を積み、独立。伝統の江戸前技法を極めながらも、
            新しい表現を追求し続ける。素材との対話を大切にし、
            一貫一貫に想いを込めて握ります。
          </p>
        </div>
      </div>
    </section>
  );
}

function SeasonalSection() {
  return (
    <section className={styles.seasonal}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>SEASONAL</span>
        <h2 className={styles.sectionTitle}>旬の逸品</h2>
      </div>
      <div className={styles.seasonalGrid}>
        <div className={styles.seasonalItem}>
          <div className={styles.seasonalImgArea} />
          <h3 className={styles.seasonalName}>寒鰤</h3>
          <p className={styles.seasonalDesc}>冬の日本海が育んだ脂の乗った極上の鰤</p>
        </div>
        <div className={styles.seasonalItem}>
          <div className={styles.seasonalImgArea} />
          <h3 className={styles.seasonalName}>白魚</h3>
          <p className={styles.seasonalDesc}>春を告げる繊細な味わいの白魚の軍艦</p>
        </div>
        <div className={styles.seasonalItem}>
          <div className={styles.seasonalImgArea} />
          <h3 className={styles.seasonalName}>雲丹</h3>
          <p className={styles.seasonalDesc}>北海道産の濃厚な甘みが広がる極上雲丹</p>
        </div>
        <div className={styles.seasonalItem}>
          <div className={styles.seasonalImgArea} />
          <h3 className={styles.seasonalName}>大トロ</h3>
          <p className={styles.seasonalDesc}>本鮪の最上部位を丁寧に仕込んだ逸品</p>
        </div>
      </div>
    </section>
  );
}

function ReservationSection() {
  return (
    <section className={styles.reservation}>
      <div className={styles.reservationContent}>
        <span className={styles.reservationLabel}>RESERVATION</span>
        <h2 className={styles.reservationTitle}>ご予約</h2>
        <div className={styles.reservationDivider} />
        <p className={styles.reservationDesc}>
          完全予約制でお一人おひとりに<br />
          最高のおもてなしをお届けいたします
        </p>
        <div className={styles.reservationPhone}>03-5678-1234</div>
        <span className={styles.reservationNote}>受付時間: 10:00〜20:00（不定休）</span>
        <button className={styles.reservationBtn}>オンライン予約</button>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span className={styles.footerBrand}>鮨 匠 / SUSHI TAKUMI</span>
        <p className={styles.footerAddress}>東京都中央区銀座6-7-8 銀座匠ビル2F</p>
        <p className={styles.footerCopy}>&copy; 2026 鮨 匠 All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseSushiLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <OmakaseSection />
      <ChefSection />
      <SeasonalSection />
      <ReservationSection />
      <FooterSection />
    </div>
  );
}
