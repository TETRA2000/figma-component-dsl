import styles from './JapaneseTeaCeremonyLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>茶道教室 和</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>教室紹介</a>
          <a href="#" className={styles.navLink}>講座内容</a>
          <a href="#" className={styles.navLink}>茶室案内</a>
          <a href="#" className={styles.navLink}>年間行事</a>
          <a href="#" className={styles.navLink}>体験申込</a>
        </div>
        <button className={styles.navCta}>体験予約</button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroAccent} />
      <div className={styles.heroContent}>
        <span className={styles.heroLabel}>SADOU KYOUSHITSU WA</span>
        <h1 className={styles.heroTitle}>一服の安らぎ</h1>
        <p className={styles.heroSubtitle}>
          日本の美と心を一碗の茶に込めて。<br />
          裏千家の伝統を受け継ぐ、本格的な茶道教室です。
        </p>
        <div className={styles.heroBtnGroup}>
          <button className={styles.heroBtnPrimary}>体験茶会に申し込む</button>
          <button className={styles.heroBtnSecondary}>講座内容を見る</button>
        </div>
      </div>
    </section>
  );
}

function CourseCard({ level, title, description, price }: { level: string; title: string; description: string; price: string }) {
  return (
    <div className={styles.courseCard}>
      <span className={styles.courseBadge}>{level}</span>
      <h3 className={styles.courseTitle}>{title}</h3>
      <div className={styles.courseDivider} />
      <p className={styles.courseDesc}>{description}</p>
      <p className={styles.coursePrice}>
        {price}<span className={styles.coursePriceUnit}>/月</span>
      </p>
    </div>
  );
}

function CoursesSection() {
  return (
    <section className={styles.courses}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>COURSES</span>
        <h2 className={styles.sectionTitle}>講座紹介</h2>
      </div>
      <div className={styles.coursesGrid}>
        <CourseCard
          level="初心者向け"
          title="入門コース"
          description="お茶の点て方、基本的な所作、簡単なお菓子のいただき方を学びます。道具の扱い方から丁寧に指導いたします。"
          price="¥8,000"
        />
        <CourseCard
          level="経験者向け"
          title="中級コース"
          description="薄茶・濃茶の点前を本格的に学びます。季節の道具の取り合わせや、茶花・掛物についても深く学びます。"
          price="¥12,000"
        />
        <CourseCard
          level="上級者向け"
          title="上級コース"
          description="奥点前・台子点前など高度な技法を習得。茶事の亭主としての立ち居振る舞いや、茶会の企画運営も学びます。"
          price="¥18,000"
        />
      </div>
    </section>
  );
}

function PhilosophySection() {
  return (
    <section className={styles.philosophy}>
      <div className={styles.philosophyInner}>
        <div className={styles.philosophyText}>
          <span className={styles.philosophyLabel}>PHILOSOPHY</span>
          <h2 className={styles.philosophyTitle}>和敬清寂の心</h2>
          <div className={styles.philosophyDivider} />
          <p className={styles.philosophyBody}>
            茶道の根本精神である「和敬清寂」。和やかに敬い合い、清らかな心で静寂のなかに美を見出す。千利休が伝えたこの四つの心を、現代の暮らしの中で実践することを目指します。
          </p>
          <p className={styles.philosophyNote}>
            一期一会の精神で、毎回の稽古を大切にし、お茶を通じて日本文化の奥深さと美しさを体感していただきます。
          </p>
        </div>
        <div className={styles.philosophyImage} />
      </div>
    </section>
  );
}

function TearoomSection() {
  return (
    <section className={styles.tearoom}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>TEA ROOM</span>
        <h2 className={styles.sectionTitle}>茶室のご案内</h2>
      </div>
      <div className={styles.tearoomContent}>
        <div className={styles.tearoomPhoto1} />
        <div className={styles.tearoomPhoto2} />
        <div className={styles.tearoomDetails}>
          <h3 className={styles.tearoomTitle}>本格的な四畳半茶室</h3>
          <div className={styles.tearoomDivider} />
          <p className={styles.tearoomDesc}>
            にじり口・床の間・炉を備えた本格的な茶室で、伝統的な雰囲気の中でお稽古いただけます。季節ごとに掛け軸や茶花を入れ替え、四季の移ろいを感じられる空間です。
          </p>
          <p className={styles.tearoomNote}>広間（八畳）と小間（四畳半）の2室を完備</p>
        </div>
      </div>
    </section>
  );
}

function EventCard({ season, title, description }: { season: string; title: string; description: string }) {
  return (
    <div className={styles.eventCard}>
      <p className={styles.eventSeason}>{season}</p>
      <h3 className={styles.eventTitle}>{title}</h3>
      <div className={styles.eventDivider} />
      <p className={styles.eventDesc}>{description}</p>
    </div>
  );
}

function EventsSection() {
  return (
    <section className={styles.events}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>SEASONAL EVENTS</span>
        <h2 className={styles.sectionTitle}>年間行事</h2>
      </div>
      <div className={styles.eventsGrid}>
        <EventCard
          season="春 SPRING"
          title="初釜・花見茶会"
          description="新年を祝う初釜と、桜の季節に野点形式で行う花見茶会。春の訪れを茶の湯で楽しみます。"
        />
        <EventCard
          season="夏 SUMMER"
          title="朝茶事"
          description="涼しい朝に行う夏の茶事。ガラスの茶碗や涼しげな道具組で、暑さを忘れるひとときを。"
        />
        <EventCard
          season="秋 AUTUMN"
          title="名残の茶会"
          description="風炉の季節の最後を惜しむ名残の茶会。紅葉を愛でながら、秋の深まりを感じます。"
        />
        <EventCard
          season="冬 WINTER"
          title="炉開き・夜咄"
          description="11月の炉開きで冬の茶の湯が始まります。燭台の灯りで行う幻想的な夜咄の茶事も。"
        />
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaGlow} />
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>まずは体験茶会から</h2>
        <p className={styles.ctaSubtitle}>
          お着物でなくても大丈夫です。手ぶらでお越しください。<br />
          お点前体験とお菓子付きの体験茶会を毎月開催しています。
        </p>
        <button className={styles.ctaBtn}>体験茶会を予約する</button>
        <p className={styles.ctaNote}>※ 体験茶会は1回3,000円（お菓子・お抹茶付き）</p>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span className={styles.footerBrand}>茶道教室 和</span>
        <div className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}>教室紹介</a>
          <a href="#" className={styles.footerLink}>講座内容</a>
          <a href="#" className={styles.footerLink}>茶室案内</a>
          <a href="#" className={styles.footerLink}>年間行事</a>
          <a href="#" className={styles.footerLink}>体験申込</a>
          <a href="#" className={styles.footerLink}>プライバシーポリシー</a>
        </div>
        <div className={styles.footerDivider} />
        <p className={styles.footerCopy}>© 2026 茶道教室 和 All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseTeaCeremonyLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <CoursesSection />
      <PhilosophySection />
      <TearoomSection />
      <EventsSection />
      <CtaSection />
      <FooterSection />
    </div>
  );
}
