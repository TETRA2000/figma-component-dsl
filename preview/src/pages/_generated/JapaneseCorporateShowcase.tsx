import { CorporateHero } from '@/components/_generated/CorporateHero/CorporateHero';
import { ServiceCard } from '@/components/_generated/ServiceCard/ServiceCard';
import { NewsItem } from '@/components/_generated/NewsItem/NewsItem';
import { CompanyProfile } from '@/components/_generated/CompanyProfile/CompanyProfile';

// ─── Page 1: Main Corporate Hero ───────────────────────────────────
function Page01_MainHero() {
  return (
    <CorporateHero
      companyName="YAMATO HOLDINGS"
      tagline="Innovation for a Sustainable Future"
      subtitle="Pioneering technology solutions that drive Japan's digital transformation since 1985."
      imageUrl="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1440&h=400&fit=crop"
    />
  );
}

// ─── Page 2: Services Grid ─────────────────────────────────────────
function Page02_Services() {
  return (
    <section style={{ padding: '80px 24px', background: '#fff', maxWidth: 1200, margin: '0 auto' }}>
      <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-2xl)', fontWeight: 700, color: '#111827', textAlign: 'center', marginBottom: 12 }}>
        Our Services
      </h2>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)', color: '#6b7280', textAlign: 'center', marginBottom: 48, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
        Comprehensive solutions tailored for enterprise clients across Japan and Asia-Pacific.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        <ServiceCard
          icon={<span style={{ fontSize: 24 }}>🏢</span>}
          title="Enterprise Consulting"
          description="Strategic consulting for digital transformation initiatives, helping Fortune 500 companies navigate Japan's business landscape."
          imageUrl="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=180&fit=crop"
        />
        <ServiceCard
          icon={<span style={{ fontSize: 24 }}>🔧</span>}
          title="System Integration"
          description="End-to-end system integration services, connecting legacy infrastructure with modern cloud-native architectures."
          imageUrl="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=180&fit=crop"
        />
        <ServiceCard
          icon={<span style={{ fontSize: 24 }}>🛡️</span>}
          title="Cybersecurity"
          description="Advanced threat detection and compliance frameworks meeting Japan's stringent data protection regulations."
          imageUrl="https://images.unsplash.com/photo-1563986768609-322da13575f2?w=400&h=180&fit=crop"
        />
      </div>
    </section>
  );
}

// ─── Page 3: Company Profile ───────────────────────────────────────
function Page03_CompanyProfile() {
  return (
    <CompanyProfile
      heading="Company Overview"
      description="Established in 1985, Yamato Holdings has grown to become one of Japan's leading technology companies. With offices across Tokyo, Osaka, and Singapore, we serve over 2,000 enterprise clients with cutting-edge digital solutions."
      stats={[
        { value: '3,500+', label: 'Employees Worldwide' },
        { value: '¥120B', label: 'Annual Revenue' },
        { value: '2,000+', label: 'Enterprise Clients' },
        { value: '38', label: 'Years of Excellence' },
      ]}
      imageUrl="https://images.unsplash.com/photo-1480796927426-f609979314bd?w=600&h=400&fit=crop"
    />
  );
}

// ─── Page 4: News & Updates ────────────────────────────────────────
function Page04_News() {
  return (
    <section style={{ padding: '80px 24px', background: '#fff', maxWidth: 1200, margin: '0 auto' }}>
      <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-2xl)', fontWeight: 700, color: '#111827', marginBottom: 32 }}>
        News & Updates
      </h2>
      <div>
        <NewsItem
          date="2026-03-12"
          category="press"
          title="Yamato Holdings announces strategic partnership with NTT Data for next-generation cloud services"
          imageUrl="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=100&h=68&fit=crop"
        />
        <NewsItem
          date="2026-03-08"
          category="ir"
          title="Q3 FY2025 Financial Results: Revenue up 12% YoY driven by strong enterprise demand"
          imageUrl="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=100&h=68&fit=crop"
        />
        <NewsItem
          date="2026-02-28"
          category="product"
          title="Launch of YamatoAI Platform: AI-powered business intelligence for Japanese enterprises"
          imageUrl="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=68&fit=crop"
        />
        <NewsItem
          date="2026-02-15"
          category="event"
          title="Yamato Holdings to exhibit at CEATEC Japan 2026 — Booth A-201, Makuhari Messe"
          imageUrl="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=100&h=68&fit=crop"
        />
      </div>
    </section>
  );
}

// ─── Page 5: Second Hero (Technology) ──────────────────────────────
function Page05_TechHero() {
  return (
    <CorporateHero
      companyName="TECHNOLOGY"
      tagline="Next-Generation Digital Infrastructure"
      subtitle="Building the backbone of Japan's digital economy with AI, cloud, and IoT solutions."
      imageUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1440&h=400&fit=crop"
    />
  );
}

// ─── Page 6: Solutions Grid ────────────────────────────────────────
function Page06_Solutions() {
  return (
    <section style={{ padding: '80px 24px', background: '#f9fafb', maxWidth: 1200, margin: '0 auto' }}>
      <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-2xl)', fontWeight: 700, color: '#111827', textAlign: 'center', marginBottom: 48 }}>
        Industry Solutions
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        <ServiceCard icon={<span style={{ fontSize: 24 }}>🏦</span>} title="Finance & Banking" description="Regulatory-compliant fintech solutions for Japan's banking sector." imageUrl="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=180&fit=crop" />
        <ServiceCard icon={<span style={{ fontSize: 24 }}>🏭</span>} title="Manufacturing" description="Smart factory and supply chain optimization powered by IoT." imageUrl="https://images.unsplash.com/photo-1565043666747-69f6646db940?w=400&h=180&fit=crop" />
        <ServiceCard icon={<span style={{ fontSize: 24 }}>🏥</span>} title="Healthcare" description="Electronic medical records and telemedicine platforms." imageUrl="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=180&fit=crop" />
        <ServiceCard icon={<span style={{ fontSize: 24 }}>🚆</span>} title="Transportation" description="Intelligent transportation and logistics management systems." imageUrl="https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400&h=180&fit=crop" />
      </div>
    </section>
  );
}

// ─── Page 7: Corporate Message ─────────────────────────────────────
function Page07_Message() {
  return (
    <section style={{ padding: '80px 24px', background: '#fff' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: '#1a237e', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
          Message from the President
        </p>
        <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-3xl)', fontWeight: 700, color: '#111827', marginBottom: 24, lineHeight: 1.3 }}>
          &ldquo;Technology should serve society, not the other way around.&rdquo;
        </h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)', color: '#6b7280', lineHeight: 1.65, marginBottom: 32 }}>
          At Yamato Holdings, we believe that true innovation must be rooted in understanding people and their needs. Our mission is to create technology that empowers businesses and communities across Japan, bridging tradition with the future.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face"
            alt="CEO"
            style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover' }}
          />
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)', fontWeight: 600, color: '#111827', margin: 0 }}>
              Takeshi Yamamoto
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: '#6b7280', margin: 0 }}>
              President & CEO
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page 8: Sustainability Hero ───────────────────────────────────
function Page08_SustainabilityHero() {
  return (
    <CorporateHero
      companyName="SUSTAINABILITY"
      tagline="Creating Value for Future Generations"
      subtitle="Our ESG commitment: carbon neutral by 2035, 50% renewable energy by 2028."
      imageUrl="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1440&h=400&fit=crop"
    />
  );
}

// ─── Page 9: ESG Initiatives ───────────────────────────────────────
function Page09_ESG() {
  return (
    <section style={{ padding: '80px 24px', background: '#fff', maxWidth: 1200, margin: '0 auto' }}>
      <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-2xl)', fontWeight: 700, color: '#111827', textAlign: 'center', marginBottom: 48 }}>
        ESG Initiatives
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        <ServiceCard icon={<span style={{ fontSize: 24 }}>🌱</span>} title="Environment" description="Reducing carbon emissions 40% by 2028. Transitioning all data centers to renewable energy sources." imageUrl="https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=400&h=180&fit=crop" />
        <ServiceCard icon={<span style={{ fontSize: 24 }}>🤝</span>} title="Social" description="Community development programs and STEM education initiatives reaching 50,000 students annually." imageUrl="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=400&h=180&fit=crop" />
        <ServiceCard icon={<span style={{ fontSize: 24 }}>📋</span>} title="Governance" description="Transparent corporate governance with independent board oversight and comprehensive compliance framework." imageUrl="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=180&fit=crop" />
      </div>
    </section>
  );
}

// ─── Page 10: Global Offices ───────────────────────────────────────
function Page10_GlobalOffices() {
  return (
    <CompanyProfile
      heading="Global Presence"
      description="With headquarters in Marunouchi, Tokyo and regional offices across Asia-Pacific, Yamato Holdings delivers localized expertise with global capabilities. Our multicultural team of 3,500+ professionals serves clients in 12 countries."
      stats={[
        { value: '12', label: 'Countries' },
        { value: '18', label: 'Office Locations' },
        { value: '24/7', label: 'Support Coverage' },
        { value: '15+', label: 'Languages Supported' },
      ]}
      imageUrl="https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=600&h=400&fit=crop"
    />
  );
}

// ─── Page 11: IR Hero ──────────────────────────────────────────────
function Page11_IRHero() {
  return (
    <CorporateHero
      companyName="INVESTOR RELATIONS"
      tagline="Transparent Growth, Steady Returns"
      subtitle="TSE Prime Market Listed | Ticker: 9999 | Credit Rating: AA (R&I)"
      imageUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1440&h=400&fit=crop"
    />
  );
}

// ─── Page 12: Financial Highlights ─────────────────────────────────
function Page12_Financials() {
  return (
    <section style={{ padding: '80px 24px', background: '#f9fafb' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-2xl)', fontWeight: 700, color: '#111827', textAlign: 'center', marginBottom: 48 }}>
          Financial Highlights — FY2025
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {[
            { value: '¥120.5B', label: 'Revenue', change: '+12.3%' },
            { value: '¥18.2B', label: 'Operating Profit', change: '+8.7%' },
            { value: '¥12.8B', label: 'Net Income', change: '+15.1%' },
            { value: '¥85', label: 'EPS', change: '+14.9%' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '32px 24px', textAlign: 'center', border: '1px solid #e5e7eb' }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 32, fontWeight: 700, color: '#1a237e', margin: '0 0 4px' }}>{item.value}</p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: '#6b7280', margin: '0 0 8px' }}>{item.label}</p>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#16a34a', fontWeight: 600 }}>{item.change}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page 13: IR News ──────────────────────────────────────────────
function Page13_IRNews() {
  return (
    <section style={{ padding: '80px 24px', background: '#fff', maxWidth: 1200, margin: '0 auto' }}>
      <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-2xl)', fontWeight: 700, color: '#111827', marginBottom: 32 }}>
        IR Calendar & Announcements
      </h2>
      <div>
        <NewsItem date="2026-05-15" category="ir" title="FY2025 Annual General Meeting of Shareholders — Grand Hyatt Tokyo" />
        <NewsItem date="2026-04-28" category="ir" title="FY2025 Full Year Financial Results Announcement" />
        <NewsItem date="2026-03-01" category="press" title="Yamato Holdings selected for MSCI Japan ESG Select Leaders Index" />
      </div>
    </section>
  );
}

// ─── Page 14: Careers Hero ─────────────────────────────────────────
function Page14_CareersHero() {
  return (
    <CorporateHero
      companyName="CAREERS"
      tagline="Build Your Future With Us"
      subtitle="Join 3,500+ professionals shaping Japan's digital future. New graduate and mid-career positions available."
      imageUrl="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1440&h=400&fit=crop"
    />
  );
}

// ─── Page 15: Career Benefits ──────────────────────────────────────
function Page15_Benefits() {
  return (
    <section style={{ padding: '80px 24px', background: '#fff', maxWidth: 1200, margin: '0 auto' }}>
      <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-2xl)', fontWeight: 700, color: '#111827', textAlign: 'center', marginBottom: 48 }}>
        Why Work at Yamato
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        <ServiceCard icon={<span style={{ fontSize: 24 }}>📚</span>} title="Learning & Development" description="Annual ¥500K education budget, internal tech conferences, and global exchange programs." imageUrl="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=180&fit=crop" />
        <ServiceCard icon={<span style={{ fontSize: 24 }}>🏠</span>} title="Work-Life Balance" description="Flexible hours, remote work options, 20+ days PTO, and comprehensive parental leave." imageUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=180&fit=crop" />
        <ServiceCard icon={<span style={{ fontSize: 24 }}>💰</span>} title="Competitive Package" description="Industry-leading compensation, stock options, pension plan, and annual performance bonuses." imageUrl="https://images.unsplash.com/photo-1553729459-afe8f2e2ed65?w=400&h=180&fit=crop" />
      </div>
    </section>
  );
}

// ─── Page 16: R&D Section ──────────────────────────────────────────
function Page16_RnD() {
  return (
    <CompanyProfile
      heading="Research & Development"
      description="Our R&D division, Yamato Labs, operates three research centers focusing on AI/ML, quantum computing, and edge computing. We invest 15% of revenue in R&D, filing 200+ patents annually."
      stats={[
        { value: '¥18B', label: 'Annual R&D Investment' },
        { value: '200+', label: 'Patents Filed Annually' },
        { value: '450', label: 'Researchers' },
        { value: '3', label: 'Research Centers' },
      ]}
      imageUrl="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop"
    />
  );
}

// ─── Page 17: Partnership Hero ─────────────────────────────────────
function Page17_PartnerHero() {
  return (
    <CorporateHero
      companyName="PARTNERSHIPS"
      tagline="Stronger Together"
      subtitle="Strategic alliances with global technology leaders and local innovators."
      imageUrl="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1440&h=400&fit=crop"
    />
  );
}

// ─── Page 18: Partner Logos & Awards ───────────────────────────────
function Page18_Partners() {
  return (
    <section style={{ padding: '80px 24px', background: '#f9fafb' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-2xl)', fontWeight: 700, color: '#111827', marginBottom: 16 }}>
          Trusted Partners & Certifications
        </h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)', color: '#6b7280', marginBottom: 48, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
          Certified partner of leading global technology providers.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 32, alignItems: 'center', justifyItems: 'center' }}>
          {['Microsoft Gold Partner', 'AWS Premier', 'Google Cloud', 'SAP Platinum', 'Salesforce'].map((name, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '24px 16px', width: '100%', textAlign: 'center' }}>
              <div style={{ width: 48, height: 48, background: '#e3f2fd', borderRadius: 8, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a237e', fontWeight: 700, fontSize: 18 }}>
                {name[0]}
              </div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#374151', fontWeight: 500, margin: 0 }}>{name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page 19: Contact Section ──────────────────────────────────────
function Page19_Contact() {
  return (
    <section style={{ padding: '80px 24px', background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 64 }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-2xl)', fontWeight: 700, color: '#111827', marginBottom: 24 }}>
            Contact Us
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { label: 'Head Office', value: 'Marunouchi Park Building, 2-6-1 Marunouchi, Chiyoda-ku, Tokyo 100-6921' },
              { label: 'Phone', value: '+81-3-XXXX-XXXX' },
              { label: 'Email', value: 'info@yamato-holdings.example.co.jp' },
              { label: 'Business Hours', value: 'Mon-Fri 9:00-18:00 JST' },
            ].map((item, i) => (
              <div key={i}>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#1a237e', fontWeight: 600, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: '#374151', margin: 0, lineHeight: 1.5 }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <img
            src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop"
            alt="Tokyo office"
            style={{ width: '100%', height: 320, objectFit: 'cover', borderRadius: 16 }}
          />
        </div>
      </div>
    </section>
  );
}

// ─── Page 20: Footer ───────────────────────────────────────────────
function Page20_Footer() {
  return (
    <footer style={{ background: '#1a237e', padding: '48px 24px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, marginBottom: 40 }}>
          {[
            { title: 'Company', links: ['About Us', 'Leadership', 'History', 'CSR'] },
            { title: 'Services', links: ['Consulting', 'System Integration', 'Cloud Services', 'Cybersecurity'] },
            { title: 'Investor Relations', links: ['Financial Data', 'Stock Information', 'IR Calendar', 'Corporate Governance'] },
            { title: 'Careers', links: ['Job Openings', 'New Graduates', 'Culture', 'Benefits'] },
          ].map((col, i) => (
            <div key={i}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{col.title}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a href="#" style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
            © 2026 Yamato Holdings, Inc. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Use', 'Sitemap'].map((link, i) => (
              <a key={i} href="#" style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Showcase: All 20 Pages ────────────────────────────────────────
export function JapaneseCorporateShowcase() {
  return (
    <div style={{ maxWidth: 1440, margin: '0 auto', background: '#fff' }}>
      <Page01_MainHero />
      <Page02_Services />
      <Page03_CompanyProfile />
      <Page04_News />
      <Page05_TechHero />
      <Page06_Solutions />
      <Page07_Message />
      <Page08_SustainabilityHero />
      <Page09_ESG />
      <Page10_GlobalOffices />
      <Page11_IRHero />
      <Page12_Financials />
      <Page13_IRNews />
      <Page14_CareersHero />
      <Page15_Benefits />
      <Page16_RnD />
      <Page17_PartnerHero />
      <Page18_Partners />
      <Page19_Contact />
      <Page20_Footer />
    </div>
  );
}
