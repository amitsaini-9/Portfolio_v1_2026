// Google Analytics Event Tracking

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_TRACKING_ID = 'G-7HV4DPD268';

// Page view tracking
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Generic event tracking
export const event = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Specific event trackers
export const trackContactFormSubmit = (name: string, email: string) => {
  event('form_submit', 'Contact', `${name} - ${email}`);
};

export const trackContactFormError = (error: string) => {
  event('form_error', 'Contact', error);
};

export const trackSupportClick = (amount: number) => {
  event('click', 'Support', `Amount: ₹${amount}`, amount);
};

export const trackPaymentInitiated = (amount: number) => {
  event('begin_checkout', 'Payment', 'Razorpay', amount);
};

export const trackPaymentSuccess = (amount: number, orderId: string) => {
  event('purchase', 'Payment', orderId, amount);
};

export const trackPaymentFailed = (amount: number, error: string) => {
  event('payment_failed', 'Payment', error, amount);
};

export const trackSocialClick = (platform: string, url: string) => {
  event('click', 'Social', platform);
};

export const trackNavigationClick = (section: string) => {
  event('click', 'Navigation', section);
};

export const trackProjectClick = (projectName: string, projectUrl: string) => {
  event('click', 'Project', projectName);
};

export const trackProjectGithubClick = (projectName: string) => {
  event('click', 'GitHub', projectName);
};

export const trackWhatsAppClick = () => {
  event('click', 'WhatsApp', 'Contact');
};

export const trackCallClick = () => {
  event('click', 'Phone', 'Contact');
};

export const trackEmailCopy = () => {
  event('click', 'Email', 'Copy to Clipboard');
};

export const trackSectionView = (sectionName: string) => {
  event('view', 'Section', sectionName);
};

export const trackLoadingComplete = (duration: number) => {
  event('timing_complete', 'Loading', 'Page Load', duration);
};

export const trackScrollDepth = (percentage: number) => {
  event('scroll', 'Engagement', `${percentage}%`, percentage);
};
