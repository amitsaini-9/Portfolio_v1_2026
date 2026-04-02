// ============================================
// PORTFOLIO DATA - Single source of truth
// Update this file to change content across the site
// ============================================

// Personal Information
export const personalInfo = {
  name: "Amit Saini",
  title: "Software Engineer",
  subtitle: "Web Developer",
  email: "your.email@example.com",
  location: "Your City, Country",
  bio: "A passionate software engineer focused on building exceptional web experiences.",
  resumeUrl: "/resume.pdf",
};

// Navigation Items
export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

// Skills
export const skills = [
  {
    category: "Frontend",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Three.js",
      "Bootstrap"
    ],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "Python", "Java", "REST APIs"],
  },
  {
    category: "Database & Cloud",
    items: [
      "MongoDB",
      "PostgreSQL",
      "Prisma",
      "Supabase",
      "Firebase",
      "Neon",
      "Convex",
      "AWS",
      "Google Cloud"
    ],
  },
  {
    category: "AI & Automation",
    items: ["Machine Learning", "N8N AI Automation", "AI Agentic Coding"],
  },
  {
    category: "Tools & Integrations",
    items: [
      "Git",
      "GitHub",
      "Clerk",
      "Shopify Extensions",
      "Whatsapp Business API"
    ],
  },
];

// Projects
export const projects = [
  {
    id: 1,
    title: "Project One",
    description: "A brief description of your first project and its key features.",
    image: "/projects/project1.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    liveUrl: "https://project1.com",
    githubUrl: "https://github.com/yourusername/project1",
    featured: true,
  },
  {
    id: 2,
    title: "Project Two",
    description: "A brief description of your second project and its key features.",
    image: "/projects/project2.jpg",
    tags: ["React", "Node.js", "MongoDB"],
    liveUrl: "https://project2.com",
    githubUrl: "https://github.com/yourusername/project2",
    featured: true,
  },
  {
    id: 3,
    title: "Project Three",
    description: "A brief description of your third project and its key features.",
    image: "/projects/project3.jpg",
    tags: ["Three.js", "GSAP", "WebGL"],
    liveUrl: "https://project3.com",
    githubUrl: "https://github.com/yourusername/project3",
    featured: false,
  },
];

// Career Start Date (June 6th, 2024)
export const CAREER_START_DATE = new Date("2024-06-06");

// Personal Stats
export const personalStats = [
  { label: "Experience", value: "Dynamic" }, // Calculated dynamically in component
  { label: "Projects", value: "10+" },
  { label: "Clients", value: "5+" },
];

export const education = [
  {
    id: 1,
    institution: "Your University Name",
    degree: "B.Tech in Computer Science",
    duration: "2020 - 2024",
    description: "Specialized in Full Stack Development",
  },
];

// Work Experience
export const experiences = [
  {
    id: 1,
    company: "Intap Studios Pvt Ltd",
    role: "Software Developer",
    startDate: "2025-07-14", // ISO format for easy parsing
    duration: "Present", // Fallback or suffix
    description: "Working on Photozoot AI, building advanced AI-powered image processing tools.",
    technologies: ["React", "Next.js", "AI Integration"],
  },
];

// Testimonials (optional)
export const testimonials = [
  {
    id: 1,
    name: "Client Name",
    role: "CEO at Company",
    content: "Testimonial content goes here.",
    avatar: "/testimonials/avatar1.jpg",
  },
];

// SEO Metadata
export const seoConfig = {
  title: "Your Name | Software Engineer",
  description: "Portfolio website of Your Name - A software engineer specializing in web development.",
  keywords: ["software engineer", "web developer", "portfolio", "react", "next.js"],
  ogImage: "/og-image.jpg",
  siteUrl: "https://yourportfolio.com",
};
