/** Long-form programme descriptions used by the dedicated programme pages. */
export const PROGRAMMES = [
  {
    slug: "mam",
    number: "01",
    title: "Multi Account Management",
    eyebrow: "A considered approach to managed trading",
    lead: "Participate in the markets without managing every trade yourself.",
    description: [
      "Our Multi Account Management (MAM) service is designed for individuals who want to participate in the financial markets without actively managing trades themselves. Whether you're a busy professional, business owner or investor looking for a structured approach, our experienced trading team manages your account with a strong focus on disciplined execution, capital preservation and sustainable long-term growth rather than chasing unrealistic returns.",
      "At Wolfpack, transparency and trust are at the core of our MAM service. Your trading account always remains in your name, giving you complete ownership and full visibility over your investments. We are granted trading access only; we cannot deposit, withdraw or transfer your funds. Every trade is executed based on detailed market analysis, proven trading strategies and strict risk management principles to help minimise unnecessary exposure while aiming for consistent performance.",
      "As a Wolfpack MAM client, you'll receive regular performance reports, transparent communication, and continuous support from our experienced trading professionals. We believe successful investing is built on patience, discipline and responsible decision making, not speculation. Our objective is to help you navigate the markets with confidence while maintaining a long-term perspective on wealth creation.",
    ],
    points: ["Your account stays in your name", "Trading access only", "Regular reporting and communication"],
    cta: "Ask about MAM",
  },
  {
    slug: "trading-course",
    number: "02",
    title: "Trading Course",
    eyebrow: "From market foundations to confident execution",
    lead: "Build practical trading skills with structured learning and real market experience.",
    description: [
      "The Wolfpack Trading Course is designed to help aspiring traders build a strong foundation and confidently progress from beginner to professional through structured learning and real market experience. Whether you're completely new to trading or looking to refine your existing skills, our comprehensive curriculum is carefully designed to help you understand the markets, develop discipline and trade with confidence. We focus on building practical knowledge that prepares you for real trading environments rather than simply teaching theory.",
      "Throughout the course, you'll gain in-depth knowledge of Forex trading, price action, market structure, institutional trading concepts, technical analysis, risk management, trading psychology and professional trade execution. Learning goes beyond recorded lessons with live mentorship, interactive classroom sessions, practical chart analysis and real-time market discussions that help you understand how experienced traders analyse and approach the markets every day.",
      "At Wolfpack, our mission is not just to teach you how to place trades, we help you develop the mindset, discipline and consistency needed to become a successful trader. With continuous guidance from experienced mentors, hands-on learning and access to a supportive trading community, you'll gain the confidence to make informed trading decisions and work towards long-term success in the financial markets.",
    ],
    points: ["Forex, price action and market structure", "Live mentorship and chart analysis", "Risk management and trading psychology"],
    cta: "Talk to a course mentor",
  },
  {
    slug: "premium-community",
    number: "03",
    title: "Premium Wolfpack Community",
    eyebrow: "Learn together. Improve with accountability.",
    lead: "A collaborative network for traders committed to learning and consistency.",
    description: [
      "The Premium Wolfpack Community Membership connects you with a growing network of traders who are committed to learning, consistency and continuous improvement. More than just a community, it is a collaborative environment where members learn together, exchange ideas, share real trading experiences and stay motivated throughout their trading journey. Whether you're just starting or already have trading experience, the Wolfpack Community provides the support and accountability needed to keep progressing.",
      "As a Premium Member, you'll receive 2–5 high-quality trading signals daily, each backed by detailed market analysis to help you understand the logic behind every trade. In addition to daily signals, you'll gain access to live market discussions, exclusive educational content, market updates, trading psychology sessions and ongoing mentorship from experienced traders. Rather than simply following signals, you'll learn how to analyse the market and make more informed trading decisions independently.",
      "Being part of the Wolfpack Community means surrounding yourself with ambitious traders who share the same goal of achieving long-term success in the financial markets. Through continuous learning, expert guidance and meaningful collaboration, you'll build greater confidence, improve your trading discipline and stay aligned with the principles of the 5% Club.",
    ],
    points: ["Daily analysed trading signals", "Live market discussions", "Education, psychology sessions and mentorship"],
    cta: "Ask about community membership",
  },
  {
    slug: "ai-wolf-indicator",
    number: "04",
    title: "AI Wolf Indicator",
    eyebrow: "A tool built around the Wolfpack methodology",
    lead: "Read market conditions with greater clarity and a more structured process.",
    description: [
      "The AI Wolf Indicator is an exclusive proprietary trading tool developed by Wolfpack Wealth Academy to help traders analyse the Forex market with greater precision and confidence. Built around our trading methodology, the indicator is designed to simplify market analysis by identifying potential trading opportunities, highlighting possible entry and exit zones and helping traders make informed decisions based on market structure rather than emotions.",
      "Unlike conventional indicators that rely on a single technical factor, the AI Wolf Indicator combines multiple market conditions into one intelligent trading system. It works alongside your trading knowledge by supporting price action analysis, trend identification, and risk management, allowing traders to approach the market with greater clarity and discipline. Whether you're a beginner learning the markets or an experienced trader refining your strategy, the indicator is built to complement your decision making, not replace it.",
      "The AI Wolf Indicator is more than just a trading tool; it's an integral part of the Wolfpack ecosystem. Combined with our structured trading education, live mentorship and the support of the 5% Club community, it helps traders build consistency, reduce emotional decision making, and develop a professional approach to the financial markets.",
    ],
    points: ["Market structure and trend context", "Potential entry and exit zones", "Designed to support, not replace, trader judgement"],
    cta: "Explore AI Wolf",
  },
  {
    slug: "financial-advisor",
    number: "05",
    title: "Financial Advisor",
    eyebrow: "Personal guidance for financial decisions",
    lead: "Make decisions with a plan shaped around your goals and risk tolerance.",
    description: [
      "Our Financial Advisory service is designed to help individuals and investors make informed financial decisions with confidence. Whether you're planning to grow your wealth, diversify your investments or build a long-term financial strategy, our experienced advisors provide personalised guidance based on your financial goals, risk tolerance and future aspirations. We believe that successful investing begins with a clear plan, disciplined decision making and a long-term perspective.",
      "At Wolfpack, we take the time to understand your unique financial objectives before recommending suitable strategies. Our advisory approach focuses on helping you identify investment opportunities, manage risk effectively and make well-informed financial choices that align with your personal and financial goals. Every recommendation is built on careful market analysis, transparency and a commitment to helping you make smarter financial decisions.",
      "Our goal is not only to guide you towards better investment opportunities but also to help you develop the confidence and knowledge needed to make sound financial decisions over time. With expert support, practical insights and a personalised approach, we help you navigate your financial journey with clarity and confidence while working towards sustainable long-term wealth creation.",
    ],
    points: ["Personalised guidance", "Planning around goals and risk tolerance", "Long-term perspective"],
    cta: "Talk to an advisor",
  },
];

export const PROGRAMME_BY_SLUG = Object.fromEntries(
  PROGRAMMES.map((programme) => [programme.slug, programme]),
);
