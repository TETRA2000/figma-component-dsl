import styles from './JapaneseKindergartenLP.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.brand}>ひまわり幼稚園</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>教育方針</a>
          <a href="#" className={styles.navLink}>一日の流れ</a>
          <a href="#" className={styles.navLink}>施設紹介</a>
          <a href="#" className={styles.navLink}>年間行事</a>
          <a href="#" className={styles.navLink}>入園案内</a>
        </div>
        <button className={styles.navCta}>見学予約</button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroDecor1} />
      <div className={styles.heroDecor2} />
      <div className={styles.heroContent}>
        <span className={styles.heroLabel}>HIMAWARI KINDERGARTEN</span>
        <h1 className={styles.heroTitle}>のびのび育つ<br />笑顔の毎日</h1>
        <p className={styles.heroSubtitle}>
          自然の中で遊び、学び、成長する。<br />
          一人ひとりの個性を大切にした、あたたかい保育を実践しています。
        </p>
        <div className={styles.heroBtnGroup}>
          <button className={styles.heroBtnPrimary}>園見学を予約する</button>
          <button className={styles.heroBtnSecondary}>資料請求</button>
        </div>
      </div>
    </section>
  );
}

function PhilosophyCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className={styles.philosophyCard}>
      <span className={styles.philosophyNumber}>{number}</span>
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
        <h2 className={styles.sectionTitle}>教育方針</h2>
        <p className={styles.sectionSubtitle}>子どもたちの「やりたい！」を大切にする3つの柱</p>
      </div>
      <div className={styles.philosophyGrid}>
        <PhilosophyCard number="01" title="自然体験を通じた学び" description="広い園庭と近隣の自然環境を活かし、四季を感じながら五感を育てます。田植えや収穫体験、昆虫観察など、自然の中でしか得られない学びがあります。" />
        <PhilosophyCard number="02" title="主体性を育むあそび" description="子どもたちが自ら考え、選び、行動する力を育てます。自由あそびの時間を十分に確保し、想像力と創造力を伸ばす環境づくりを大切にしています。" />
        <PhilosophyCard number="03" title="思いやりの心を育てる" description="異年齢交流や共同制作を通じて、友達を思いやる心を育みます。お兄さん・お姉さんから学び、年下の子の面倒を見る経験が、社会性を育てます。" />
      </div>
    </section>
  );
}

function ScheduleItem({ time, activity, description }: { time: string; activity: string; description: string }) {
  return (
    <div className={styles.scheduleItem}>
      <span className={styles.scheduleTime}>{time}</span>
      <div className={styles.scheduleDot} />
      <div className={styles.scheduleContent}>
        <h3 className={styles.scheduleActivity}>{activity}</h3>
        <p className={styles.scheduleDesc}>{description}</p>
      </div>
    </div>
  );
}

function ScheduleSection() {
  return (
    <section className={styles.schedule}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>DAILY SCHEDULE</span>
        <h2 className={styles.sectionTitle}>一日の流れ</h2>
      </div>
      <div className={styles.scheduleList}>
        <ScheduleItem time="8:30" activity="登園・自由あそび" description="元気にご挨拶。お友達と好きなあそびを楽しみます。" />
        <ScheduleItem time="10:00" activity="朝の会・クラス活動" description="歌やお話、制作活動など年齢に合わせた活動を行います。" />
        <ScheduleItem time="11:30" activity="お昼ごはん" description="自園調理の温かい給食。食育にも力を入れています。" />
        <ScheduleItem time="13:00" activity="午後の活動・外あそび" description="園庭でのびのびと体を動かしたり、専門講師による体操・英語の時間も。" />
        <ScheduleItem time="14:30" activity="帰りの会・降園" description="一日の振り返りをして、お迎えの時間です。" />
        <ScheduleItem time="15:00" activity="預かり保育" description="18時まで預かり保育をご利用いただけます（別途申込）。" />
      </div>
    </section>
  );
}

function FacilityCard({ name, description }: { name: string; description: string }) {
  return (
    <div className={styles.facilityCard}>
      <div className={styles.facilityImage} />
      <div className={styles.facilityInfo}>
        <h3 className={styles.facilityName}>{name}</h3>
        <p className={styles.facilityDesc}>{description}</p>
      </div>
    </div>
  );
}

function FacilitiesSection() {
  return (
    <section className={styles.facilities}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>FACILITIES</span>
        <h2 className={styles.sectionTitle}>施設紹介</h2>
      </div>
      <div className={styles.facilitiesGrid}>
        <FacilityCard name="広々とした園庭" description="芝生の広場、砂場、遊具エリアなど、子どもたちが思いきり遊べる広い園庭です。" />
        <FacilityCard name="明るい保育室" description="天井が高く、自然光がたっぷり入る開放的な保育室。床暖房完備で冬も快適です。" />
        <FacilityCard name="自園調理の給食室" description="専任の栄養士と調理師が、毎日手作りの給食を提供。アレルギー対応も万全です。" />
        <FacilityCard name="絵本コーナー" description="1,500冊以上の絵本を揃えた図書スペース。読み聞かせの時間が子どもたちに大人気。" />
      </div>
    </section>
  );
}

function EventCard({ month, title, description }: { month: string; title: string; description: string }) {
  return (
    <div className={styles.eventCard}>
      <span className={styles.eventMonth}>{month}</span>
      <h3 className={styles.eventTitle}>{title}</h3>
      <p className={styles.eventDesc}>{description}</p>
    </div>
  );
}

function EventsSection() {
  return (
    <section className={styles.events}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>EVENTS</span>
        <h2 className={styles.sectionTitle}>年間行事</h2>
      </div>
      <div className={styles.eventsGrid}>
        <EventCard month="4月" title="入園式・お花見" description="新しいお友達を迎え、桜の下でお祝いします。" />
        <EventCard month="7月" title="夏祭り・プール開き" description="盆踊りやゲームで楽しむ夏のお祭り。" />
        <EventCard month="10月" title="運動会" description="かけっこやダンスを家族みんなで楽しむ一日。" />
        <EventCard month="12月" title="クリスマス発表会" description="歌や劇など、日頃の成果を発表します。" />
        <EventCard month="2月" title="節分・作品展" description="豆まきと一年間の制作作品をお披露目。" />
        <EventCard month="3月" title="卒園式" description="成長を振り返り、新しいスタートをお祝いします。" />
      </div>
    </section>
  );
}

function EnrollmentCtaSection() {
  return (
    <section className={styles.enrollmentCta}>
      <div className={styles.enrollmentCtaDecor} />
      <div className={styles.enrollmentCtaContent}>
        <h2 className={styles.enrollmentCtaTitle}>園見学受付中</h2>
        <p className={styles.enrollmentCtaSubtitle}>
          実際の保育の様子をご覧いただけます。<br />
          お子さまと一緒に、お気軽にお越しください。
        </p>
        <button className={styles.enrollmentCtaBtn}>見学を予約する</button>
        <p className={styles.enrollmentCtaNote}>※ 平日10:00〜11:00で随時受付中</p>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span className={styles.footerBrand}>ひまわり幼稚園</span>
        <div className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}>教育方針</a>
          <a href="#" className={styles.footerLink}>一日の流れ</a>
          <a href="#" className={styles.footerLink}>施設紹介</a>
          <a href="#" className={styles.footerLink}>年間行事</a>
          <a href="#" className={styles.footerLink}>入園案内</a>
          <a href="#" className={styles.footerLink}>プライバシーポリシー</a>
        </div>
        <div className={styles.footerDivider} />
        <p className={styles.footerCopy}>© 2026 ひまわり幼稚園 All rights reserved.</p>
      </div>
    </footer>
  );
}

export function JapaneseKindergartenLP() {
  return (
    <div className={styles.page}>
      <NavBar />
      <HeroSection />
      <PhilosophySection />
      <ScheduleSection />
      <FacilitiesSection />
      <EventsSection />
      <EnrollmentCtaSection />
      <FooterSection />
    </div>
  );
}
