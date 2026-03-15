/**
 * jp-privacy.dsl.ts — プライバシーポリシー (Privacy Policy)
 * Japanese corporate privacy policy page with structured policy sections.
 */
import {
  frame, text, rectangle, image,
  solid, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

// ── Helpers ──

function navLink(label: string) {
  return text(label, { fontSize: 14, fontWeight: 500, color: '#ffffff' });
}

function navBar() {
  return frame('NavBar', {
    size: { x: 1440, y: 72 },
    autoLayout: horizontal({
      padX: 80, padY: 0,
      align: 'SPACE_BETWEEN',
      counterAlign: 'CENTER',
    }),
    fills: [solid('#1a365d')],
    children: [
      frame('NavLeft', {
        autoLayout: horizontal({ spacing: 40, counterAlign: 'CENTER' }),
        children: [
          image('Logo', { src: './workspace/assets/company-logo.png', size: { x: 180, y: 50 } }),
          navLink('製品情報'),
          navLink('技術情報'),
          navLink('企業情報'),
          navLink('採用情報'),
        ],
      }),
      frame('NavRight', {
        autoLayout: horizontal({ spacing: 24, counterAlign: 'CENTER' }),
        children: [
          navLink('お問い合わせ'),
          frame('NavCTA', {
            autoLayout: horizontal({ padX: 24, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid('#2563eb')],
            cornerRadius: 4,
            children: [
              text('資料請求', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
            ],
          }),
        ],
      }),
    ],
  });
}

function policySection(number: string, title: string, body: string) {
  return frame(`Policy-${number}`, {
    autoLayout: vertical({ spacing: 16 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('PolicyHeader', {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
        children: [
          frame('PolicyNumber', {
            size: { x: 36, y: 36 },
            autoLayout: vertical({ align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid('#1a365d')],
            cornerRadius: 18,
            children: [
              text(number, { fontSize: 16, fontWeight: 700, color: '#ffffff' }),
            ],
          }),
          text(title, { fontSize: 20, fontWeight: 700, color: '#1a365d' }),
        ],
      }),
      text(body, {
        fontSize: 14, fontWeight: 400, color: '#4b5563',
        size: { x: 1000 }, textAutoResize: 'HEIGHT',
        lineHeight: { value: 200, unit: 'PERCENT' },
      }),
    ],
  });
}

function footer() {
  return frame('Footer', {
    size: { x: 1440, y: undefined },
    autoLayout: vertical({ spacing: 32, padX: 80, padY: 60 }),
    fills: [solid('#1a365d')],
    children: [
      frame('FooterTop', {
        autoLayout: horizontal({ spacing: 80, align: 'MIN' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('FooterCol1', {
            autoLayout: vertical({ spacing: 16 }),
            children: [
              image('FooterLogo', { src: './workspace/assets/company-logo.png', size: { x: 150, y: 42 } }),
              text('〒100-0001\n東京都千代田区千代田1-1-1', {
                fontSize: 13, color: '#94a3b8',
                lineHeight: { value: 170, unit: 'PERCENT' },
                size: { x: 250 }, textAutoResize: 'HEIGHT',
              }),
            ],
          }),
          frame('FooterCol2', {
            autoLayout: vertical({ spacing: 12 }),
            children: [
              text('製品・サービス', { fontSize: 14, fontWeight: 700, color: '#ffffff' }),
              text('製品一覧', { fontSize: 13, color: '#94a3b8' }),
              text('ソリューション', { fontSize: 13, color: '#94a3b8' }),
              text('導入事例', { fontSize: 13, color: '#94a3b8' }),
            ],
          }),
          frame('FooterCol3', {
            autoLayout: vertical({ spacing: 12 }),
            children: [
              text('企業情報', { fontSize: 14, fontWeight: 700, color: '#ffffff' }),
              text('会社概要', { fontSize: 13, color: '#94a3b8' }),
              text('沿革', { fontSize: 13, color: '#94a3b8' }),
              text('採用情報', { fontSize: 13, color: '#94a3b8' }),
            ],
          }),
          frame('FooterCol4', {
            autoLayout: vertical({ spacing: 12 }),
            children: [
              text('サポート', { fontSize: 14, fontWeight: 700, color: '#ffffff' }),
              text('お問い合わせ', { fontSize: 13, color: '#94a3b8' }),
              text('よくあるご質問', { fontSize: 13, color: '#94a3b8' }),
              text('プライバシーポリシー', { fontSize: 13, color: '#94a3b8' }),
            ],
          }),
        ],
      }),
      rectangle('FooterDivider', { size: { x: 1280, y: 1 }, fills: [solid('#334155')] }),
      text('© 2024 株式会社テクノコーポレーション All Rights Reserved.', { fontSize: 12, color: '#64748b' }),
    ],
  });
}

// ── Main Page ──

export default frame('PrivacyPolicyPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f5f5f5')],
  children: [
    // Navigation
    navBar(),

    // Page Header
    frame('PageHeader', {
      size: { x: 1440, y: undefined },
      autoLayout: vertical({ spacing: 12, padX: 80, padY: 64, counterAlign: 'CENTER' }),
      fills: [solid('#1a365d')],
      children: [
        text('プライバシーポリシー', { fontSize: 36, fontWeight: 800, color: '#ffffff' }),
        text('個人情報の取り扱いに関する方針をご確認ください。', {
          fontSize: 16, fontWeight: 400, color: '#cbd5e1',
          textAlignHorizontal: 'CENTER',
          size: { x: 600 }, textAutoResize: 'HEIGHT',
          lineHeight: { value: 170, unit: 'PERCENT' },
        }),
      ],
    }),

    // Policy Introduction
    frame('PolicyIntro', {
      size: { x: 1440, y: undefined },
      autoLayout: vertical({ spacing: 16, padX: 120, padY: 48 }),
      fills: [solid('#ffffff')],
      children: [
        text('株式会社テクノコーポレーション（以下「当社」）は、お客様の個人情報の保護を重要な社会的責務と認識し、以下のとおりプライバシーポリシーを定め、個人情報の適正な取り扱いと保護に努めてまいります。', {
          fontSize: 15, fontWeight: 400, color: '#374151',
          size: { x: 1200 }, textAutoResize: 'HEIGHT',
          lineHeight: { value: 200, unit: 'PERCENT' },
        }),
        frame('LastUpdated', {
          autoLayout: horizontal({ spacing: 8, padX: 16, padY: 8 }),
          fills: [solid('#f8fafc')],
          cornerRadius: 4,
          strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' as const }],
          children: [
            text('最終更新日：', { fontSize: 13, fontWeight: 600, color: '#1a365d' }),
            text('2024年4月1日', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
          ],
        }),
      ],
    }),

    // Policy Sections
    frame('PolicyContent', {
      size: { x: 1440, y: undefined },
      autoLayout: vertical({ spacing: 40, padX: 120, padY: 48 }),
      fills: [solid('#ffffff')],
      children: [
        policySection(
          '1',
          '個人情報の定義',
          '本プライバシーポリシーにおいて「個人情報」とは、個人情報の保護に関する法律（以下「個人情報保護法」）に定義される個人情報を指し、生存する個人に関する情報であって、氏名、生年月日、住所、電話番号、メールアドレスその他の記述等により特定の個人を識別できるもの、および個人識別符号が含まれるものをいいます。',
        ),

        rectangle('Divider1', { size: { x: 1, y: 1 }, fills: [solid('#e5e7eb')], layoutSizingHorizontal: 'FILL' }),

        policySection(
          '2',
          '個人情報の取得',
          '当社は、適法かつ公正な手段により個人情報を取得いたします。取得にあたっては、利用目的を明示し、お客様の同意を得た上で必要最小限の範囲で個人情報を収集いたします。\n\n取得する個人情報の例：\n・氏名、住所、電話番号、メールアドレス\n・会社名、部署名、役職\n・お問い合わせ内容、サービス利用履歴\n・ウェブサイトのアクセスログ、Cookie情報',
        ),

        rectangle('Divider2', { size: { x: 1, y: 1 }, fills: [solid('#e5e7eb')], layoutSizingHorizontal: 'FILL' }),

        policySection(
          '3',
          '利用目的',
          '当社は、取得した個人情報を以下の目的で利用いたします。\n\n・製品・サービスの提供、改善、および開発\n・お問い合わせへの対応、アフターサービスの実施\n・契約の履行、請求・支払い処理\n・新製品・サービスに関するご案内、マーケティング活動\n・セミナー・イベント等のご案内\n・統計データの作成（個人を特定できない形式に加工）\n・法令に基づく対応、当社の権利・財産の保護',
        ),

        rectangle('Divider3', { size: { x: 1, y: 1 }, fills: [solid('#e5e7eb')], layoutSizingHorizontal: 'FILL' }),

        policySection(
          '4',
          '第三者提供',
          '当社は、以下の場合を除き、お客様の同意なく個人情報を第三者に提供することはありません。\n\n・法令に基づく場合\n・人の生命、身体または財産の保護のために必要な場合\n・公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合\n・国の機関もしくは地方公共団体等が法令の定める事務を遂行することに対して協力する必要がある場合\n・業務委託先に対して、利用目的の達成に必要な範囲で個人情報の取り扱いを委託する場合',
        ),

        rectangle('Divider4', { size: { x: 1, y: 1 }, fills: [solid('#e5e7eb')], layoutSizingHorizontal: 'FILL' }),

        policySection(
          '5',
          '安全管理措置',
          '当社は、個人情報の漏洩、滅失、毀損等を防止するため、組織的・人的・物理的・技術的な安全管理措置を講じております。具体的には、アクセス制御、暗号化、社内規程の整備、従業員教育などを実施し、個人情報の適切な管理に努めています。',
        ),

        rectangle('Divider5', { size: { x: 1, y: 1 }, fills: [solid('#e5e7eb')], layoutSizingHorizontal: 'FILL' }),

        policySection(
          '6',
          '個人情報の開示・訂正・削除',
          'お客様は、当社が保有する自己の個人情報について、開示・訂正・追加・削除・利用停止・消去を請求することができます。請求を受けた場合、ご本人確認の上、合理的な期間内に対応いたします。なお、法令に基づき保有が義務付けられている情報については、削除に応じかねる場合がございます。',
        ),

        rectangle('Divider6', { size: { x: 1, y: 1 }, fills: [solid('#e5e7eb')], layoutSizingHorizontal: 'FILL' }),

        policySection(
          '7',
          'Cookieの使用について',
          '当社ウェブサイトでは、利便性の向上、利用状況の分析、広告配信のためにCookie（クッキー）を使用しております。Cookieの使用を望まない場合は、ブラウザの設定によりCookieを無効にすることができますが、一部のサービスが正常に機能しなくなる場合がございます。',
        ),

        rectangle('Divider7', { size: { x: 1, y: 1 }, fills: [solid('#e5e7eb')], layoutSizingHorizontal: 'FILL' }),

        policySection(
          '8',
          'プライバシーポリシーの変更',
          '当社は、法令の改正や事業内容の変更等に伴い、本プライバシーポリシーを予告なく変更することがあります。変更後のプライバシーポリシーは、当社ウェブサイトに掲載した時点で効力を生じるものとします。',
        ),
      ],
    }),

    // Contact Information
    frame('ContactInfo', {
      size: { x: 1440, y: undefined },
      autoLayout: vertical({ spacing: 24, padX: 120, padY: 56, counterAlign: 'CENTER' }),
      fills: [solid('#f8fafc')],
      strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' as const }],
      children: [
        frame('ContactHeader', {
          autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
          children: [
            text('個人情報に関するお問い合わせ窓口', { fontSize: 22, fontWeight: 700, color: '#1a365d', textAlignHorizontal: 'CENTER' }),
            rectangle('ContactAccent', { size: { x: 60, y: 3 }, fills: [solid('#2563eb')] }),
          ],
        }),
        frame('ContactDetails', {
          autoLayout: vertical({ spacing: 12, padX: 40, padY: 32, counterAlign: 'CENTER' }),
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' as const }],
          children: [
            text('株式会社テクノコーポレーション', { fontSize: 16, fontWeight: 700, color: '#1a365d', textAlignHorizontal: 'CENTER' }),
            text('個人情報保護管理責任者：総務部長', { fontSize: 14, fontWeight: 400, color: '#4b5563', textAlignHorizontal: 'CENTER' }),
            rectangle('ContactDivider', { size: { x: 400, y: 1 }, fills: [solid('#e5e7eb')] }),
            frame('ContactRow1', {
              autoLayout: horizontal({ spacing: 16 }),
              children: [
                text('住所：', { fontSize: 14, fontWeight: 600, color: '#1a365d' }),
                text('〒100-0001 東京都千代田区千代田1-1-1', { fontSize: 14, fontWeight: 400, color: '#4b5563' }),
              ],
            }),
            frame('ContactRow2', {
              autoLayout: horizontal({ spacing: 16 }),
              children: [
                text('電話：', { fontSize: 14, fontWeight: 600, color: '#1a365d' }),
                text('03-1234-5678（平日 9:00〜17:30）', { fontSize: 14, fontWeight: 400, color: '#4b5563' }),
              ],
            }),
            frame('ContactRow3', {
              autoLayout: horizontal({ spacing: 16 }),
              children: [
                text('メール：', { fontSize: 14, fontWeight: 600, color: '#1a365d' }),
                text('privacy@techno-corp.co.jp', { fontSize: 14, fontWeight: 400, color: '#2563eb' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Footer
    footer(),
  ],
});
