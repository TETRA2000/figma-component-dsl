import { useState } from 'react';
import {
  Smartphone,
  Shield,
  Zap,
  Cloud,
  Camera,
  Bell,
  MapPin,
  Heart,
  Twitter,
  Github,
  Linkedin,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar/Navbar';
import { Hero } from '@/components/Hero/Hero';
import { FeatureGrid } from '@/components/FeatureGrid/FeatureGrid';
import { Stats } from '@/components/Stats/Stats';
import { Testimonials } from '@/components/Testimonials/Testimonials';
import { PricingTable } from '@/components/PricingTable/PricingTable';
import { FAQ } from '@/components/FAQ/FAQ';
import { Footer } from '@/components/Footer/Footer';
import { GlassCard } from '@/components/GlassCard/GlassCard';
import { ToggleSwitch } from '@/components/ToggleSwitch/ToggleSwitch';
import { SegmentedControl } from '@/components/SegmentedControl/SegmentedControl';
import type {
  NavLink,
  Feature,
  Testimonial,
  PricingPlan,
  FAQItem,
  FooterColumn,
  StatItem,
} from '@/components/types';

const navLinks: NavLink[] = [
  { label: 'Features', href: '#features' },
  { label: 'Experience', href: '#experience' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

const features: Feature[] = [
  {
    icon: <Camera size={24} />,
    title: 'ProRAW Camera',
    description:
      'Capture stunning 48MP photos with computational photography and advanced noise reduction.',
  },
  {
    icon: <Shield size={24} />,
    title: 'On-Device Privacy',
    description:
      'Your data never leaves your device. Face ID, end-to-end encryption, and App Tracking Transparency.',
  },
  {
    icon: <Zap size={24} />,
    title: 'A18 Bionic Chip',
    description:
      'The fastest chip ever in a smartphone. Blazing neural engine for real-time ML tasks.',
  },
  {
    icon: <Cloud size={24} />,
    title: 'Seamless Sync',
    description:
      'iCloud keeps your photos, files, and passwords in sync across every Apple device you own.',
  },
  {
    icon: <MapPin size={24} />,
    title: 'Find My Network',
    description:
      'Locate your devices, friends, and AirTags with precision — even when they\'re offline.',
  },
  {
    icon: <Bell size={24} />,
    title: 'Focus Modes',
    description:
      'Intelligent notifications that adapt to your context. Work, sleep, or personal — stay in the zone.',
  },
];

const stats: StatItem[] = [
  { value: '2B+', label: 'Active devices worldwide' },
  { value: '99.99%', label: 'Uptime reliability' },
  { value: '1M+', label: 'Apps on the App Store' },
  { value: '<10ms', label: 'Touch response latency' },
];

const testimonials: Testimonial[] = [
  {
    quote:
      'The seamless integration between my iPhone, Mac, and iPad has completely transformed how I work. AirDrop alone saves me hours every week.',
    author: 'Sarah Chen',
    title: 'Creative Director, Pixelworks',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah',
    rating: 5,
  },
  {
    quote:
      'I switched from Android last year and haven\'t looked back. The privacy features and ecosystem lock-in — in the best way — are unmatched.',
    author: 'Marcus Rivera',
    title: 'Software Engineer, Shopify',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Marcus',
    rating: 5,
  },
  {
    quote:
      'Focus Modes changed my relationship with notifications. I actually enjoy picking up my phone again instead of dreading it.',
    author: 'Aiko Tanaka',
    title: 'Product Manager, Linear',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Aiko',
    rating: 5,
  },
];

const plans: PricingPlan[] = [
  {
    name: 'iCloud+',
    price: '$0.99',
    period: '/mo',
    description: '50 GB of storage with iCloud Private Relay.',
    features: [
      '50 GB iCloud storage',
      'iCloud Private Relay',
      'Hide My Email',
      'HomeKit Secure Video (1 camera)',
    ],
    cta: 'Try Free for 1 Month',
  },
  {
    name: 'iCloud+ 200 GB',
    price: '$2.99',
    period: '/mo',
    description: 'Perfect for families who share photos and files.',
    features: [
      '200 GB iCloud storage',
      'iCloud Private Relay',
      'Hide My Email',
      'HomeKit Secure Video (5 cameras)',
      'Family Sharing for up to 5',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'iCloud+ 2 TB',
    price: '$9.99',
    period: '/mo',
    description: 'Maximum storage for power users and professionals.',
    features: [
      '2 TB iCloud storage',
      'iCloud Private Relay',
      'Hide My Email',
      'HomeKit Secure Video (unlimited)',
      'Family Sharing for up to 5',
      'Custom email domain',
    ],
    cta: 'Start Free Trial',
  },
];

const faqItems: FAQItem[] = [
  {
    question: 'How does trade-in work?',
    answer:
      'Simply tell us about your current device and we\'ll give you an instant estimate. Ship it to us for free, and we\'ll apply the credit to your new purchase or send you an Apple Gift Card.',
  },
  {
    question: 'Can I switch from Android?',
    answer:
      'Yes! The Move to iOS app makes it easy. It securely transfers your contacts, message history, photos, videos, mail accounts, and calendars. Most free apps are also available on the App Store.',
  },
  {
    question: 'What\'s included with every iPhone?',
    answer:
      'Every iPhone comes with a USB-C cable, documentation, and free access to Apple services including iMessage, FaceTime, Find My, and iCloud with 5 GB of free storage.',
  },
  {
    question: 'How long will my iPhone receive software updates?',
    answer:
      'Apple provides at least 5 years of iOS updates for every iPhone, including new features, security patches, and performance improvements — far longer than any other smartphone maker.',
  },
  {
    question: 'Is AppleCare+ worth it?',
    answer:
      'AppleCare+ extends your coverage to unlimited incidents of accidental damage, battery service, and 24/7 priority access to Apple experts. For most users, the peace of mind is well worth it.',
  },
];

const footerColumns: FooterColumn[] = [
  {
    title: 'Products',
    links: [
      { label: 'iPhone', href: '#' },
      { label: 'iPad', href: '#' },
      { label: 'Mac', href: '#' },
      { label: 'Apple Watch', href: '#' },
      { label: 'AirPods', href: '#' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'iCloud+', href: '#' },
      { label: 'Apple Music', href: '#' },
      { label: 'Apple TV+', href: '#' },
      { label: 'Apple Arcade', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Get Help', href: '#' },
      { label: 'AppleCare+', href: '#' },
      { label: 'Community', href: '#' },
      { label: 'Contact Us', href: '#' },
    ],
  },
];

const socialLinks = [
  { icon: <Twitter size={18} />, href: '#', label: 'Twitter' },
  { icon: <Github size={18} />, href: '#', label: 'GitHub' },
  { icon: <Linkedin size={18} />, href: '#', label: 'LinkedIn' },
];

function AppExperienceSection() {
  const [platform, setPlatform] = useState('iPhone');
  const [notifications, setNotifications] = useState(true);
  const [focusMode, setFocusMode] = useState(false);
  const [alwaysOn, setAlwaysOn] = useState(true);

  return (
    <div id="experience" style={{ padding: '80px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span
            style={{
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: 9999,
              background: 'var(--bg-tertiary)',
              color: 'var(--text-accent)',
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
              fontFamily: 'var(--font-sans)',
              marginBottom: 16,
            }}
          >
            Experience
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-4xl)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: 'var(--tracking-tight)',
              lineHeight: 'var(--leading-tight)',
              margin: '0 0 12px',
            }}
          >
            Feel the difference
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-lg)',
              color: 'var(--text-secondary)',
              maxWidth: 560,
              margin: '0 auto',
              lineHeight: 'var(--leading-relaxed)',
            }}
          >
            Interactive settings that showcase how thoughtful design meets powerful hardware.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
          <SegmentedControl
            items={['iPhone', 'iPad', 'Mac']}
            value={platform}
            size="lg"
            onValueChange={setPlatform}
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24,
            maxWidth: 1000,
            margin: '0 auto',
          }}
        >
          <GlassCard variant="elevated" size="lg">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--gradient-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                }}
              >
                <Smartphone size={20} />
              </div>
              <div>
                <h3
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-lg)',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                  }}
                >
                  {platform} Settings
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  Personalize your experience
                </p>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                borderTop: '1px solid var(--border-default)',
                paddingTop: 20,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-base)',
                    color: 'var(--text-primary)',
                  }}
                >
                  Notifications
                </span>
                <ToggleSwitch
                  size="md"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.currentTarget.checked)}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-base)',
                    color: 'var(--text-primary)',
                  }}
                >
                  Focus Mode
                </span>
                <ToggleSwitch
                  size="md"
                  checked={focusMode}
                  onChange={(e) => setFocusMode(e.currentTarget.checked)}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-base)',
                    color: 'var(--text-primary)',
                  }}
                >
                  Always-On Display
                </span>
                <ToggleSwitch
                  size="md"
                  checked={alwaysOn}
                  onChange={(e) => setAlwaysOn(e.currentTarget.checked)}
                />
              </div>
            </div>
          </GlassCard>

          <GlassCard variant="elevated" size="lg">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 'var(--radius-md)',
                  background: 'linear-gradient(135deg, #ec4899, #f97316)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                }}
              >
                <Heart size={20} />
              </div>
              <div>
                <h3
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-lg)',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                  }}
                >
                  Health &amp; Wellness
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  Powered by Apple Watch integration
                </p>
              </div>
            </div>
            <div
              style={{
                borderTop: '1px solid var(--border-default)',
                paddingTop: 20,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              {[
                { label: 'Heart Rate', value: '72 BPM', color: '#ef4444' },
                { label: 'Steps Today', value: '8,432', color: '#22c55e' },
                { label: 'Sleep Score', value: '94/100', color: '#8b5cf6' },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 'var(--radius-full)',
                        background: item.color,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--text-base)',
                        color: 'var(--text-primary)',
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

export function MacOSLanding() {
  return (
    <>
      <Navbar
        logo="Apple"
        links={navLinks}
        ctaLabel="Buy iPhone"
        ctaHref="#pricing"
      />
      <Hero
        badge="Introducing iPhone 18"
        title="The most powerful"
        gradientText="iPhone ever."
        subtitle="A18 Bionic. 48MP camera system. All-day battery life. Titanium design. This changes everything. Again."
        primaryCta="Pre-order Now"
        primaryHref="#pricing"
        secondaryCta="Watch the Film"
        secondaryHref="#"
        alignment="center"
      />
      <div id="features">
        <FeatureGrid
          badge="Features"
          title="Why iPhone"
          subtitle="Every detail. Considered. Every experience. Elevated."
          features={features}
          columns={3}
        />
      </div>
      <Stats stats={stats} variant="cards" />
      <AppExperienceSection />
      <Testimonials
        badge="Testimonials"
        title="Loved by millions"
        subtitle="Don't just take our word for it — hear from the community."
        testimonials={testimonials}
      />
      <div id="pricing">
        <PricingTable
          badge="iCloud+"
          title="Choose your plan"
          subtitle="Every iPhone comes with 5 GB free. Upgrade for more storage and premium features."
          plans={plans}
        />
      </div>
      <div id="faq">
        <FAQ
          badge="FAQ"
          title="Frequently asked questions"
          subtitle="Everything you need to know about iPhone."
          items={faqItems}
        />
      </div>
      <Footer
        logo="Apple"
        description="Designed in California. Built for everyone."
        columns={footerColumns}
        socialLinks={socialLinks}
        copyright="© 2026 Apple Inc. All rights reserved."
      />
    </>
  );
}
