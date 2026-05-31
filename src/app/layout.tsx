import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amit Saini | Full Stack Developer, AI Engineer & Web Solutions Expert",
  description: "Hire Amit Saini — Full stack web & app developer specializing in custom websites, AI integration, WhatsApp Business API, Meta/Facebook/Instagram API, SaaS platforms, admin panels, and end-to-end deployment. Based in India, available worldwide.",
  keywords: [
    "Amit Saini",
    "Amit Saini developer",
    "hire web developer India",
    "full stack developer",
    "freelance web developer",
    "custom website development",
    "web application developer",
    "AI integration developer",
    "AI chatbot developer",
    "WhatsApp API developer",
    "WhatsApp Business API integration",
    "Meta API integration",
    "Facebook API developer",
    "Instagram API integration",
    "Next.js developer",
    "React developer",
    "Node.js developer",
    "Python developer",
    "TypeScript developer",
    "SaaS development",
    "custom admin panel",
    "CRM development",
    "e-commerce development",
    "Shopify developer",
    "mobile app development",
    "React Native developer",
    "Flutter developer",
    "cloud deployment AWS",
    "Vercel deployment",
    "Supabase developer",
    "PostgreSQL developer",
    "MongoDB developer",
    "API development",
    "REST API developer",
    "GraphQL developer",
    "payment gateway integration",
    "Razorpay integration",
    "Stripe integration",
    "website design India",
    "hire developer for startup",
    "MVP development",
    "automation developer",
    "N8N automation",
    "workflow automation",
    "DevOps engineer",
    "Docker Kubernetes",
    "CI/CD pipeline",
    "enterprise web solutions",
    "digital transformation",
    "software engineer India",
    "portfolio Amit Saini",
  ],
  authors: [{ name: "Amit Saini", url: "https://sainiamit.com" }],
  creator: "Amit Saini",
  publisher: "Amit Saini",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sainiamit.com",
    siteName: "Amit Saini — Developer Portfolio",
    title: "Amit Saini | Full Stack Developer, AI Engineer & Web Solutions Expert",
    description: "Custom web & app development, AI chatbots, WhatsApp/Meta API integration, SaaS platforms, admin panels. Hire me for end-to-end solutions.",
    images: [
      {
        url: "https://sainiamit.com/logo.png",
        width: 512,
        height: 512,
        alt: "Amit Saini - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amit Saini | Full Stack Developer & AI Engineer",
    description: "Custom web development, AI integration, WhatsApp API, Meta API. Hire me for your next project.",
    images: ["https://sainiamit.com/logo.png"],
    creator: "@AmitSaini9086",
  },
  alternates: {
    canonical: "https://sainiamit.com",
  },
  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Amit Saini",
    url: "https://sainiamit.com",
    image: "https://sainiamit.com/logo.png",
    jobTitle: "Full Stack Developer & AI Engineer",
    description: "Full stack web & app developer specializing in custom websites, AI integration, WhatsApp Business API, Meta API, SaaS platforms, and end-to-end deployment.",
    email: "amitsainiwork9@gmail.com",
    telephone: "+919521153320",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    sameAs: [
      "https://github.com/amitsaini-9",
      "https://www.linkedin.com/in/as-amit/",
      "https://www.instagram.com/__amit_saini_/",
      "https://x.com/AmitSaini9086",
    ],
    knowsAbout: [
      "Web Development",
      "Mobile App Development",
      "AI Integration",
      "ChatGPT Integration",
      "WhatsApp Business API",
      "Meta API",
      "Facebook API",
      "Instagram API",
      "Next.js",
      "React",
      "Node.js",
      "Python",
      "TypeScript",
      "PostgreSQL",
      "MongoDB",
      "AWS",
      "Docker",
      "Supabase",
      "SaaS Development",
      "Admin Panel Development",
      "Payment Gateway Integration",
    ],
    offers: {
      "@type": "Offer",
      name: "Web & App Development Services",
      description: "Custom web development, AI chatbots, API integrations, SaaS platforms, mobile apps, cloud deployment",
      availability: "https://schema.org/InStock",
    },
  };

  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Services by Amit Saini",
    itemListElement: [
      { "@type": "Service", position: 1, name: "Custom Website Development", description: "Full-stack web applications using Next.js, React, Node.js, Python" },
      { "@type": "Service", position: 2, name: "AI Integration & Chatbots", description: "ChatGPT, Claude, Gemini AI integration, conversational AI, automation" },
      { "@type": "Service", position: 3, name: "WhatsApp Business API", description: "WhatsApp chatbots, CRM, marketing automation, business messaging" },
      { "@type": "Service", position: 4, name: "Meta & Social API Integration", description: "Facebook, Instagram, Meta Business Suite API development" },
      { "@type": "Service", position: 5, name: "Mobile App Development", description: "React Native, Flutter apps for iOS and Android" },
      { "@type": "Service", position: 6, name: "SaaS Platform Development", description: "Multi-tenant applications, subscription billing, admin dashboards" },
      { "@type": "Service", position: 7, name: "E-commerce Solutions", description: "Custom stores, Shopify, payment integration with Razorpay/Stripe" },
      { "@type": "Service", position: 8, name: "Cloud Deployment & DevOps", description: "AWS, Vercel, Docker, CI/CD pipelines, server management" },
      { "@type": "Service", position: 9, name: "Admin Panel & Dashboard", description: "Custom admin panels, analytics dashboards, CRM/ERP systems" },
      { "@type": "Service", position: 10, name: "API Development", description: "REST APIs, GraphQL, webhook integrations, third-party API connections" },
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="canonical" href="https://sainiamit.com" />
        <link rel="preconnect" href="https://stream.mux.com" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="preload" href="/assets/hero-poster.jpg" as="image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
