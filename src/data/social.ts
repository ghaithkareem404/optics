export interface SocialLink {
  id: string;
  label: string;
  href: string;
  /** Inline SVG markup (24x24, currentColor). */
  icon: string;
}

// Update the hrefs with your real profile URLs.
export const socialLinks: SocialLink[] = [
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/zandooptics/",
    icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M13.5 21v-8h2.5l.5-3h-3V8.2c0-.9.3-1.5 1.6-1.5H17V4.1C16.6 4 15.6 4 14.5 4 12.1 4 10.5 5.4 10.5 8v2H8v3h2.5v8h3Z"/></svg>',
  },
  {
    id: "x",
    label: "X (Twitter)",
    href: "https://x.com/zandooptics",
    icon: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.5 3h3l-6.6 7.5L21.5 21H16l-4.3-5.6L6.8 21H3.7l7-8L3 3h5.6l3.9 5.1L17.5 3Zm-1 16h1.6L8.2 4.7H6.5L16.5 19Z"/></svg>',
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="3.8"/><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none"/></svg>',
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/",
    icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3Zm0 1.6a7.4 7.4 0 0 1 6.3 11.3l-.2.3.7 2.5-2.6-.7-.3.2A7.4 7.4 0 1 1 12 4.6Zm-2.3 3.3c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.3s1 2.7 1.2 2.9c.1.2 2 3.1 4.9 4.2 2.4.9 2.9.7 3.4.7.5 0 1.6-.7 1.9-1.3.2-.7.2-1.2.1-1.3-.1-.1-.3-.2-.6-.4-.3-.1-1.6-.8-1.9-.9-.3-.1-.4-.1-.6.1l-.8 1c-.2.2-.3.2-.5.1-.3-.1-1.1-.4-2.1-1.3-.8-.7-1.3-1.5-1.4-1.8-.2-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5 0-.2 0-.3-.1-.5l-.8-1.9c-.2-.4-.4-.4-.6-.4h-.4Z"/></svg>',
  },
];
