/**
 * Content model for Blogs — the academy's blog.
 *
 * `SEED_POSTS` does double duty: it is the bundled fallback served whenever
 * MongoDB is unreachable or empty, and it is the starter content the admin
 * "import starter notes" button pushes into the database.
 *
 * @typedef {object} Post
 * @property {string}   [id]         Mongo `_id` as a string; absent on seed records.
 * @property {string}   slug
 * @property {string}   category
 * @property {string}   title
 * @property {string}   excerpt
 * @property {string}   image        Cover image URL (/api/images/… or an absolute URL).
 * @property {string}   [avatar]     Author photo; falls back to generated initials.
 * @property {string}   author
 * @property {string}   [role]       Author's line under their name.
 * @property {string}   publishedAt  ISO `yyyy-mm-dd`.
 * @property {number}   readMinutes
 * @property {string[]} body         One entry per paragraph.
 */

/** Categories offered in the admin form's datalist. Free text is still allowed. */
export const CATEGORIES = [
  "Market Structure",
  "Risk Management",
  "Psychology",
  "Gold",
  "Wolfpack AI",
  "Beginners",
];

/** @type {Post[]} */
export const SEED_POSTS = [
  {
    slug: "reading-market-structure-before-you-trade",
    category: "Market Structure",
    title: "Reading market structure before you place a single trade",
    excerpt:
      "Most losing trades are decided before entry. Here is the sequence we teach for mapping structure, liquidity and intent on a clean chart.",
    image: "/founders/01.webp",
    author: "Adhil Rahman",
    role: "Lead mentor",
    publishedAt: "2026-08-28",
    readMinutes: 7,
    body: [
      "A chart is not a picture of price. It is a record of who was willing to transact, at what level, and how badly. Read it that way and market structure stops being a set of lines you draw and starts being a description of intent.",
      "We teach structure top-down, and the order matters. Start on the higher timeframe and mark only what is unambiguous: the last decisive high, the last decisive low, and the leg that connects them. If you find yourself squinting, the level is not there. Ambiguity is information — it usually means the market is mid-transition and there is nothing to do yet.",
      "Once the frame is set, the question changes from 'where is price going' to 'what would have to happen for me to be wrong'. That single reframing removes most of the emotional weight from an entry. You are no longer predicting; you are pricing a condition.",
      "Liquidity is the second layer. Equal highs, equal lows and long wicks mark where stops are resting, and resting stops are fuel. Price is drawn toward them not because of magic but because that is where the volume required to fill large orders actually lives.",
      "The third layer is displacement — the moment structure breaks with conviction. A break on thin, overlapping candles is noise. A break that leaves an inefficiency behind it is a statement. We wait for the statement.",
      "Only then does entry become a mechanical question: mark the zone that caused the displacement, define invalidation on the other side of it, and size the position so that being wrong costs a fixed, boring, survivable amount.",
      "None of this is exotic. It is the same sequence every session, applied with enough patience that the chart is allowed to disqualify itself. The traders who improve fastest in our programme are rarely the ones with the sharpest entries — they are the ones who became comfortable doing nothing on days that did not qualify.",
    ],
  },
  {
    slug: "position-sizing-is-the-whole-strategy",
    category: "Risk Management",
    title: "Position sizing is the strategy — the entry is a detail",
    excerpt:
      "Two traders can take identical trades and end the year in opposite places. The difference is almost never the entry; it is how much was risked and when.",
    image: "/founders/Mr-Adhil.webp",
    author: "Adhil Rahman",
    role: "Lead mentor",
    publishedAt: "2026-08-14",
    readMinutes: 6,
    body: [
      "Give the same set of signals to two traders and you will get two completely different equity curves. Same entries, same exits, same market. The variable that separated them was never the setup — it was how much of the account rode on each one.",
      "Fixed fractional risk is the floor, not the ceiling, of good practice. Risking a constant percentage of equity means losses shrink your position automatically as the account draws down, and grow it as the account recovers. The maths defends you when your judgement is tired.",
      "The number matters less than the consistency. A trader risking a steady one percent will out-survive a trader who alternates between a cautious quarter-percent and a revenge-driven five. Variance in risk size compounds against you far faster than variance in win rate.",
      "We ask every student to compute the same thing before entry, in this order: invalidation price first, position size second, target third. Reversing that order — picking a size and then hunting for a stop that justifies it — is the single most common habit we have to unteach.",
      "Consecutive losses are not a malfunction. At a forty percent win rate, a run of five losers is ordinary arithmetic, not a sign that the method broke. Sizing that assumes an unbroken run of wins is sizing that guarantees you will not be trading when the good sequence arrives.",
      "Protecting capital is not caution for its own sake. It is what buys you the number of attempts your edge needs to actually express itself.",
    ],
  },
  {
    slug: "the-trade-you-did-not-take",
    category: "Psychology",
    title: "The trade you did not take is still a decision",
    excerpt:
      "Journals record entries and exits. The costly gaps are the setups you passed on, the ones you chased, and the reason you gave yourself at the time.",
    image: "/founders/NINCY.webp",
    author: "Nincy Elizabeth",
    role: "Mentor, trading psychology",
    publishedAt: "2026-07-30",
    readMinutes: 5,
    body: [
      "Most trading journals are a record of what happened. The useful ones are a record of what you were thinking. Those are very different documents, and only the second one changes behaviour.",
      "When we review journals in mentorship sessions, the entries that teach the most are the omissions — the valid setup that was skipped after two losses, the trade taken twenty minutes early because waiting felt unbearable, the position closed at breakeven out of relief rather than plan.",
      "None of those appear in a profit and loss statement in a way you can learn from. They show up as a slightly worse number, with no explanation attached, and so they repeat.",
      "The fix is unglamorous. Alongside each trade, write the state you were in: rested or tired, ahead or behind, following the plan or improvising. After forty entries the patterns are undeniable and personal in a way no general advice can be.",
      "Discipline is not a personality trait that some traders were issued and others were not. It is the residue of having seen your own patterns written down often enough that ignoring them becomes uncomfortable.",
    ],
  },
  {
    slug: "why-gold-moves-differently",
    category: "Gold",
    title: "Why gold moves differently, and how to adjust for it",
    excerpt:
      "Gold rewards traders who respect its volatility and punishes those who size it like a currency pair. A practical guide to the adjustments that matter.",
    image: "/og.png",
    author: "Adhil Rahman",
    role: "Lead mentor",
    publishedAt: "2026-07-11",
    readMinutes: 6,
    body: [
      "Traders who arrive from major currency pairs often treat gold as just another symbol on the platform. The chart looks familiar, the tools are the same, and the first few trades seem to behave. Then a normal session produces a move that would be a week's range elsewhere.",
      "Gold's daily range, expressed in account terms, is routinely several times that of a major pair. Nothing about that is a problem — until position size is carried over unchanged from one instrument to the other. The setup was fine; the arithmetic was not.",
      "The first adjustment is mechanical: size by volatility, not by lot convention. A stop placed at a structurally correct level on gold will simply be further away in price terms, and the position must shrink to keep the risk constant.",
      "The second is about timing. Gold's character changes across sessions, and the transition into the London and New York overlap can turn an orderly range into something quite different within minutes. Setups that qualified in a quiet Asian session frequently do not survive the handover.",
      "The third is patience with spread and slippage. In fast conditions the fill you assumed is not the fill you get, and a plan whose profitability depends on precise execution at the worst moment of the day is not a plan.",
      "Handled with those three adjustments, gold is an excellent instrument to learn on — it moves enough to make structure legible and it is unforgiving enough to make sizing discipline stick.",
    ],
  },
  {
    slug: "what-wolfpack-ai-actually-does",
    category: "Wolfpack AI",
    title: "What Wolfpack AI actually does — and what it deliberately does not",
    excerpt:
      "Our software scans gold and forex markets for the patterns we teach. It is an attention tool, not an autopilot, and the distinction is the point.",
    image: "/logo-mark.png",
    author: "Wolfpack Desk",
    role: "Research",
    publishedAt: "2026-06-22",
    readMinutes: 5,
    body: [
      "Every few weeks someone asks whether Wolfpack AI will trade the account for them. The honest answer is no, and that is a design decision rather than a limitation we intend to remove.",
      "What the software does is narrow attention. It watches the instruments we teach, applies the same structural criteria our mentors apply, and surfaces the handful of situations that meet them. On a normal day that is a very short list.",
      "The value is in what it removes. A trader monitoring a dozen charts across a session makes most of their mistakes through fatigue, not ignorance. Cutting the surface area down to the situations that actually qualify is worth more than any single signal.",
      "It deliberately stops short of execution. Sizing, timing around news, and the decision to sit out entirely depend on context the software does not have — your account state, your recent run of results, and whether you are in a fit condition to trade at all.",
      "Used the way we intend, it is a second set of eyes that never gets bored. Used as an autopilot, it becomes a way to take marginal trades faster, which is not an improvement.",
    ],
  },
  {
    slug: "your-first-ninety-days",
    category: "Beginners",
    title: "Your first ninety days: a realistic map for new traders",
    excerpt:
      "What to expect month by month when you start properly — including the plateau in month two that makes most people quit right before it clicks.",
    image: "/founders/01.webp",
    author: "Nincy Elizabeth",
    role: "Mentor, trading psychology",
    publishedAt: "2026-06-03",
    readMinutes: 8,
    body: [
      "The most common reason beginners stop is not loss. It is the gap between how long they expected competence to take and how long it actually takes. Setting that expectation honestly at the start solves a surprising amount.",
      "Month one is vocabulary and mechanics. You learn to read structure, place orders correctly, and calculate risk without hesitating. Almost nothing about this month should involve live capital, and the students who accept that progress fastest.",
      "Month two is the plateau, and it is where most people quit. You understand the concepts, you can explain them to a friend, and you are still not executing them consistently under live conditions. This feels like failure. It is actually the ordinary lag between knowing and doing, and it ends.",
      "The way through is volume of reviewed repetitions, not volume of trades. Ten trades examined properly with a mentor will move you further than a hundred taken alone, because the feedback loop in trading is slow and noisy enough that you cannot reliably learn from outcomes by yourself.",
      "Month three is where discipline starts producing visible results — usually as a reduction in unforced errors rather than a jump in returns. Fewer trades outside plan. Smaller losses on the bad days. A more boring equity curve.",
      "Boring is the goal. A curve that does not lurch is a curve you can size up later with confidence, and consistency is the only foundation that survives contact with a bad month.",
      "Beyond ninety days the work does not stop, it just changes shape. The framework is in place; the remaining task is applying it across enough market conditions that none of them surprise you.",
    ],
  },
];

/** Turn a title into a URL-safe slug. */
export function slugify(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

/** "28 August 2026" — stable between server and client (no locale guessing). */
export function formatDate(iso) {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/** Rough read time from body paragraphs, at ~200 words per minute. */
export function estimateReadMinutes(body) {
  const words = body.join(" ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Newest first; ties broken by title so ordering is deterministic. */
export function byNewest(a, b) {
  if (a.publishedAt === b.publishedAt) return a.title.localeCompare(b.title);
  return a.publishedAt < b.publishedAt ? 1 : -1;
}
