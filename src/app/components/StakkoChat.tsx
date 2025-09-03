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
          stackId: "f13ee076-2644-4480-8b4f-4270d19d1b85",
          deploymentUrl: "https://stakko-f13ee076-2644-4480-8b4f-4270d19d1b85-4lumrgx16.vercel.app",
          primaryColor: "#346051",
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