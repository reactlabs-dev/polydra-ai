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
          stackId: "d4ab7fea-e072-416a-9508-990c2898b5df",
          deploymentUrl: "https://stakko-d4ab7fea-e072-416a-9508-990c2898b5df-j8nuzbgv3.vercel.app",
          primaryColor: "#5b8683",
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

// Usage in your layout.tsx or page:
// import StakkoWidget from './path/to/StakkoWidget';
// Then add <StakkoWidget /> anywhere in your JSX