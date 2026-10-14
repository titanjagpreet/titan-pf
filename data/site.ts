export const siteConfig = {
  name: "Jagpreet Singh",
  /** Shown after "aka" in the hero */
  alias: "titan",
  tagline: "a developer who brings cool solutions to life",
  /** One-line specialty under the hero heading. */
  intro:
    "I build real-time data products: trading dashboards, WebSocket pipelines, and the backends that keep them fast and correct.",
  /** Availability pill in the hero. Set to null to hide it. */
  availability: "Open to opportunities" as string | null,
  /** Shown with a live clock in the hero, About, and footer. */
  location: "India",
  timeZone: "Asia/Kolkata",
  timeZoneLabel: "IST",
  /** Main About section body (two paragraphs). */
  aboutBioParagraphs: [
    "Hey there! I'm a Full Stack Developer focused on building modern, scalable web applications with a strong interest in backend systems and Web3. I enjoy creating solutions that are simple, reliable, and actually useful.",
    "Outside of coding, I'm usually playing cricket, exploring new things on the internet, or reading books.",
  ],
  /** Small fact rows under the About bio. */
  aboutFacts: [
    { label: "Focus", value: "Backend systems & Web3" },
    { label: "Stack", value: "TypeScript, Node.js, Next.js" },
    { label: "Off-screen", value: "Cricket & books" },
  ],
  title: "Full Stack Developer",
  /** Used in meta tags and SEO (longer than the hero tagline). */
  siteDescription:
    "Jagpreet Singh is a Full Stack Developer who builds scalable web applications with React, Node.js, TypeScript, and cloud infrastructure. Browse projects, read case studies, and get in touch.",
  email: "titanjagpreetsingh@gmail.com",
  /** Footer credit; the © year is added automatically. */
  footer: "Built with ❤️ by titan.",
  /** Public URL to PDF (file must live under public/, e.g. public/assets/resume.pdf) */
  resumeUrl: "/assets/Jagpreet_Singh_Resume.pdf",
  githubUsername: "titanjagpreet",
  /**
   * Cal.com embed path: the part after https://cal.com/ in your public booking link
   * (e.g. cal.com/john/30min → "john/30min"). Used by @calcom/embed-react data-cal-link.
   */
  calComBookingPath: "jagpreet/30min",
  profileImageUrl: "/assets/profile.jpg", // Add your profile image to public/assets/
  socialLinks: {
    twitter: "https://twitter.com/titan47",
    linkedin: "https://linkedin.com/in/jagpreet0248",
    github: "https://github.com/titanjagpreet",
    email: "mailto:titanjagpreetsingh@gmail.com",
  },
  achievements: [
    { imageUrl: "/assets/achievements/1.jpg", title: "Asian Yogasana Championship" },
    { imageUrl: "/assets/achievements/2.jpg", title: "Award Ceremony" },
    { imageUrl: "/assets/achievements/3.jpg", title: "Tech Event" },
  ],
} as const;
