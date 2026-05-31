// ============================================
// PORTFOLIO DATA - Single source of truth
// Update this file to change content across the site
// ============================================

// Personal Information
export const personalInfo = {
  name: "Amit Saini",
  title: "Full Stack Developer & AI Engineer",
  subtitle: "Web & AI Solutions",
  email: "hello@sainiamit.com",
  location: "India",
  bio: "Building custom web solutions, AI integrations, and automation systems. From concept to deployment.",
  resumeUrl: "/resume.pdf",
};

// Navigation Items
export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Hire", href: "#hire" },
  { label: "Support", href: "#support" },
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
    title: "ApplyX",
    description: "AI-powered job hunting platform that auto-applies to hundreds of jobs across LinkedIn, Indeed, Naukri & more.",
    image: "/projects/applyx.png",
    fullImage: "/projects/applyx-full.png",
    tags: ["Next.js", "AI", "Automation", "SaaS"],
    liveUrl: "https://apply-x-auto-job-hunter.vercel.app/",
    githubUrl: "",
    featured: true,
    techStack: ["Next.js 16", "TypeScript", "Tailwind CSS", "OpenAI API", "Supabase", "Vercel"],
    details: "Built from scratch as a personal project. Features ATS-optimized resume generation, multi-platform job scraping, and intelligent matching algorithms.",
    type: "Personal Project",
  },
  {
    id: 2,
    title: "AI Interviewer",
    description: "Practice real-world interviews with AI characters that simulate HR managers, tech leads, and senior developers.",
    image: "/projects/ai-interviewer.png",
    fullImage: "/projects/ai-interviewer-full.png",
    tags: ["React", "AI", "Speech API", "TypeScript"],
    liveUrl: "https://ai-interviewer-indol-three.vercel.app/",
    githubUrl: "",
    featured: true,
    techStack: ["React", "TypeScript", "Web Speech API", "Google Gemini", "Tailwind CSS", "Vercel"],
    details: "Personal project featuring real-time speech recognition, AI-powered interview simulation, and detailed performance feedback with scoring.",
    type: "Personal Project",
  },
  {
    id: 3,
    title: "Talker",
    description: "Anonymous chat platform with AI roleplay characters and real people. Completely private and encrypted.",
    image: "/projects/project-v2.png",
    fullImage: "/projects/project-v2-full.png",
    tags: ["Next.js", "WebSocket", "AI", "Real-time"],
    liveUrl: "https://project-v2-one.vercel.app/",
    githubUrl: "",
    featured: true,
    techStack: ["Next.js 15", "WebSocket", "AI Characters", "Supabase", "Real-time Chat", "Vercel"],
    details: "Personal project supporting text, images, audio, video sharing with AI roleplay characters. End-to-end encrypted with anonymous identity.",
    type: "Personal Project",
  },
  {
    id: 4,
    title: "Buildera",
    description: "A web development agency landing page with cinematic video backgrounds, liquid glass effects, and smooth scroll animations.",
    image: "/projects/buildera.png",
    fullImage: "/projects/buildera-full.png",
    tags: ["Next.js", "Framer Motion", "Tailwind", "Frontend"],
    liveUrl: "https://buildera.sainiamit.com/",
    githubUrl: "",
    featured: true,
    techStack: ["Next.js 16", "TypeScript", "Tailwind CSS", "Framer Motion", "HLS.js", "Vercel"],
    details: "Frontend-only landing page with immersive video backgrounds, liquid glass UI effects, scroll-driven animations, and a contact form with email integration.",
    type: "Personal Project",
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
    company: "Intap Studio Pvt Ltd",
    role: "Software Development Engineer",
    startDate: "May 2026",
    duration: "Present",
    description: "Promoted to full-time SDE. Building and scaling Photozoot AI — an AI-powered image processing platform. Leading frontend architecture, AI pipeline integration, and production deployments.",
    technologies: ["Next.js 16", "TypeScript", "AI/ML", "Python", "AWS"],
  },
  {
    id: 2,
    company: "Intap Studio Pvt Ltd",
    role: "Software Developer Intern",
    startDate: "July 2025",
    duration: "10 months",
    description: "Built core features for Photozoot AI from ground up. Developed the full-stack web application, integrated AI models for image enhancement, implemented real-time processing pipelines, and deployed to production.",
    technologies: ["React", "Next.js", "Node.js", "Supabase", "AI Integration", "Vercel"],
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
  title: "Amit Saini | Full Stack Developer & AI Engineer",
  description: "Hire Amit Saini — Full stack web & app developer specializing in custom websites, AI integration, WhatsApp Business API, Meta API, SaaS platforms, and deployment.",
  keywords: ["Amit Saini", "full stack developer", "AI engineer", "web developer India", "WhatsApp API", "Meta API", "hire developer"],
  ogImage: "/logo.png",
  siteUrl: "https://sainiamit.com",
};
