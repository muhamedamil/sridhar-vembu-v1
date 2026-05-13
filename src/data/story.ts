export const STORY_CHAPTERS = [
  { id: "hero", year: 2026, label: "The return" },
  { id: "origin", year: 1968, label: "The village" },
  { id: "pressure-room", year: 2001, label: "The refusal" },
  { id: "system", year: 2005, label: "The operating system" },
  { id: "number", year: 2026, label: "The number declined" },
  { id: "schools", year: 2005, label: "The mirror" },
  { id: "policy", year: 2010, label: "The hiring rewrite" },
  { id: "return", year: 2019, label: "The reverse migration" },
  { id: "beliefs", year: 2024, label: "The disagreements" },
  { id: "tension", year: 2026, label: "The complications" },
  { id: "finale", year: 2026, label: "The clay wall" },
] as const;

export const HERO_COPY = {
  eyebrow: "Brokai Labs Tribute",
  tamilPrompt: "எந்த திசையில் நடக்கிறாய்?",
  englishPrompt: "Which direction are you walking?",
  title: "This is not a biography.",
  subtitle: "It is a startup myth walked in reverse.",
  body:
    "Sridhar Vembu went from Tamil-medium schooling to IIT rank 27, Princeton, Qualcomm, Silicon Valley, AdventNet, the dot-com crash, Zoho, and then back toward Mathalamparai. The interface should feel that reversal in your hands.",
  thesis:
    "In 2001, the market vanished. He did not call a VC. Years later, he did not call bankers either.",
};

export const INVERTED_MAP = {
  usualDestinations: [
    { label: "Silicon Valley", note: "capital, prestige, scale narratives" },
    { label: "Bengaluru", note: "metro gravity, talent concentration" },
    { label: "Singapore", note: "regional HQ logic" },
    { label: "Gulf countries", note: "remittance migration and stability" },
    { label: "Global tech hubs", note: "the standard ambition map" },
  ],
  sridharPath: [
    { year: "1968", place: "Thanjavur district", note: "Tamil Nadu origin" },
    { year: "1980s", place: "IIT Madras", note: "All India Rank 27 after Tamil-medium schooling" },
    { year: "1990s", place: "Princeton", note: "PhD in electrical engineering" },
    { year: "1990s", place: "Qualcomm and Silicon Valley", note: "the expected direction" },
    { year: "2019", place: "Mathalamparai / Tenkasi", note: "returned to rural Tamil Nadu to keep building" },
  ],
};

export const PRESSURE_EMAILS = [
  {
    id: "runway",
    from: "westbridge@capital.com",
    subject: "Runway bridge available",
    body: "The telecom market is freezing. We can wire fast if you open the boardroom.",
  },
  {
    id: "restructure",
    from: "advisor@turnaround.net",
    subject: "Cut deeply. Raise immediately.",
    body: "Protect the company by shrinking the company. This is not the time for pride.",
  },
  {
    id: "exit",
    from: "banker@strategicpartners.co",
    subject: "Strategic acquisition interest",
    body: "A larger player may absorb the business before the numbers worsen further.",
  },
  {
    id: "growth",
    from: "vc@hypergrowth.io",
    subject: "Take capital. Rebound later.",
    body: "You can always worry about culture after the market returns.",
  },
  {
    id: "warning",
    from: "friend@thevalley.com",
    subject: "Everyone else is taking the money",
    body: "The rational move is obvious from here. Survive first. Principles later.",
  },
];

export const REBUILD_SEQUENCE = [
  { year: "2002", label: "ManageEngine", detail: "a practical enterprise wedge while the market recovered" },
  { year: "2005", label: "Zoho.com", detail: "cloud software begins compounding product by product" },
  { year: "2005-2026", label: "Bootstrapped suite", detail: "no VC, no IPO, no acquisition, still shipping" },
];

export const NUMBER_THAT_DOES_NOT_EXIST = {
  label: "Editorial device, not a confirmed valuation",
  preface: "If Zoho were valued like publicly traded SaaS companies, the headline number would dominate the story.",
  number: "$40,000,000,000+",
  decline: "Declined.",
  note: "This section is conceptual. Zoho is private, and no public market price exists for the company.",
};

export const SCHOOL_MIRROR = {
  prompt: "What year did you graduate?",
  helper: "Optional. If you skip it, the story stays grounded in Zoho Schools' first cohort year: 2005.",
  fallback:
    "Zoho Schools began in 2005. While much of India still treated degrees as the only safe credential, rural students were already being trained to ship production software inside a different system.",
};

export const BELIEF_ENGINE = [
  {
    statement: "A company should raise outside capital if the market offers it.",
    sridharView: "Outside capital changes the clock. If you can avoid that clock, you preserve room for craft and patience.",
    conventionalView: "Capital is leverage. Speed is survival.",
  },
  {
    statement: "Elite talent mostly belongs in major cities and global hubs.",
    sridharView: "Talent is distributed. Opportunity is not. Move the work, not just the worker.",
    conventionalView: "Density creates innovation. The best people cluster for a reason.",
  },
  {
    statement: "Degrees are the safest proxy for engineering ability.",
    sridharView: "Proof beats paper. Contextual knowledge comes from doing real work.",
    conventionalView: "Formal credentials are the most scalable filter.",
  },
  {
    statement: "The right endgame for a successful startup is IPO or acquisition.",
    sridharView: "Liquidity is not the only proof of success. Longevity and sovereignty matter too.",
    conventionalView: "A company is unfinished until the market prices it.",
  },
  {
    statement: "User data is a monetization asset first and a trust obligation second.",
    sridharView: "Users are customers, not inventory.",
    conventionalView: "Data-driven advertising is the inevitable economic engine of software.",
  },
  {
    statement: "Complex software can be taught quickly through pure theory.",
    sridharView: "Expertise is slow. Apprenticeship matters.",
    conventionalView: "Short training cycles can manufacture readiness at scale.",
  },
] as const;

export const CLAY_WALL_SEEDS = [
  "Build from where you are.",
  "Longer timelines create stranger possibilities.",
  "Rural does not mean peripheral.",
];

export const SOURCES = [
  "Zoho corporate and founder interviews",
  "Public reporting on Zoho Schools and rural offices",
  "Profiles covering Sridhar Vembu's return to Mathalamparai and Tenkasi",
  "Public reporting on political criticism and ongoing legal proceedings",
];
