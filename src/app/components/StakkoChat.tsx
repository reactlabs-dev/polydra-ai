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
          stackId: "e48efa25-113f-45ae-a8a6-33103a539065",
          deploymentUrl: "https://stakko-e48efa25-113f-45ae-a8a6-33103a539065-ia92f8k9h.vercel.app",
          primaryColor: "#4b7265",
          backgroundColor: "white",
          textColor: "#374151",
          brandName: "AI Assistant",
          welcomeMessage: "Hi! How can I help you today?",
          placeholder: "Type your message...",
          position: "bottom-right",
          autoOpen: true,
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
