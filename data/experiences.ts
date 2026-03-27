export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  featured?: boolean;
}

export const experiences: Experience[] = [
  {
    id: "citecat",
    company: "Citecat",
    role: "Full Stack Developer Intern",
    period: "Aug 2025 - Dec 2025",
    location: "Bangalore, India (Remote)",
    bullets: [
      "Architected and developed a full-stack Chat with PDF feature, with text embeddings driving huge platform adoption.",
      "Developed optimized latex compiler which is faster than Overleaf by 15% in compile speed, and library support with modern ui.",
      "Built and optimized APIs with Python + FastAPI, reducing latency and supporting scale.",
    ],
    featured: true,
  },
  {
    id: "alphatribe",
    company: "Alphatribe",
    role: "Full Stack Developer Intern",
    period: "Feb 2025 - Aug 2025",
    location: "Bangalore, India (Remote)",
    bullets: [
      "Created optimized interface that led to a 15% increase in user retention in platform and reducing load time by 20%.",
      "Architected automations for getting live data from various stock websites, added automations and CI/CD Piplelines to increase post generation rate by 40% and reducing the manual effort by 50%.",
      "Developed entire admin dashboard from scratch for managing the posts, users, AI Agents and more.",
    ],
    featured: true,
  },
  {
    id: "yogasana",
    company: "Yogasana Bharat",
    role: "SDE-1 (Full Stack) Intern",
    period: "Nov 2024 - Feb 2025",
    location: "Banglore, India (Remote)",
    bullets: [
      "Software is adopted as the permanent solution for international-level Asian Yogasana championship.",
      "Built and integrated a real-time internal tool using WebSockets, reducing judge scoring update latency by 50% during live events.",
      "Managed CI/CD pipelines, decreasing manual intervention by 40% and increasing release frequency.",
      "Ensured data consistency across modules by handling 2000+ participant entries during the Asian Championship.",
    ],
    featured: true,
  },
];
