'use client'; // Add this line if using Next.js App Router

import { useEffect } from 'react';

declare global {
  interface Window {
    StakkoWidget?: (action: string, options: Record<string, unknown>) => void;
  }
}


export default function StakkoWidget() {
  useEffect(() => {
    // Load Stakko widget script
    const script = document.createElement('script');
    script.src = 'https://www.stakko.ai/api/widget/stakko-widget.js';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // Initialize widget once script loads
      if (window.StakkoWidget) {
        window.StakkoWidget('init', {
          stackId: "ab1f678c-96dc-4ef6-8120-fbf934c7e185",
          deploymentUrl: "https://stakko-ab1f678c-96dc-4ef6-8120-fbf934c7e185-7t0ve8gcx.vercel.app",
          primaryColor: "rgba(58, 85, 84, 1)",
          backgroundColor: "white",
          textColor: "#374151",
          brandName: "AI Assistant",
          welcomeMessage: "Hi! How can I help you today?",
          placeholder: "Type your message...",
          position: "bottom-right",
          autoOpen: false,
          showBranding: true,
          logoUrl: null
        });
      }
    };

    return () => {
      // Cleanup on unmount
      document.head.removeChild(script);
    };
  }, []);

  return null; // This component doesn't render anything visible
}
