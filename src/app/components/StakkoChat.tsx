'use client'; // Add this line if using Next.js App Router

import { useEffect } from 'react';

declare global {
  interface Window {
    StakkoWidget?: (action: string, options: Record<string, unknown>) => void;
  }
}

// export default function StakkoWidget() {
//   useEffect(() => {
//     // Load Stakko widget script
//     const script = document.createElement('script');
//     script.src = 'https://www.stakko.ai/widget/stakko-widget.js';
//     script.async = true;
//     document.head.appendChild(script);

//     script.onload = () => {
//       // Initialize widget once script loads
//       if (window.StakkoWidget) {
//         window.StakkoWidget('init', {
//           stackId: "c99ae3fe-f7b7-469c-a71f-235bc0a064b2",
//           deploymentUrl: "https://stakko-c99ae3fe-f7b7-469c-a71f-235bc0a064b2-6a13a4x54.vercel.app",
//           primaryColor: "#ef4444",
//           backgroundColor: "white",
//           textColor: "#374151",
//           brandName: "Inference Stack AI Assistant",
//           welcomeMessage: "Hi! How can I help you today?",
//           placeholder: "Type your message...",
//           position: "bottom-right",
//           autoOpen: true,
//           showBranding: true,
//           logoUrl: null
//         });
//       }
//     };

//     return () => {
//       // Cleanup on unmount
//       document.head.removeChild(script);
//     };
//   }, []);

//   return null; // This component doesn't render anything visible
// }
// export default function StakkoWidget() {
//   useEffect(() => {
//     // Load Stakko widget script
//     const script = document.createElement('script');
//     script.src = 'https://www.stakko.ai/api/widget/stakko-widget.js';
//     script.async = true;
//     document.head.appendChild(script);

//     script.onload = () => {
//       // Initialize widget once script loads
//       if (window.StakkoWidget) {
//         window.StakkoWidget('init', {
//           stackId: "c99ae3fe-f7b7-469c-a71f-235bc0a064b2",
//           deploymentUrl: "https://stakko-c99ae3fe-f7b7-469c-a71f-235bc0a064b2-6a13a4x54.vercel.app",
//           primaryColor: "#ef4444",
//           backgroundColor: "white",
//           textColor: "#374151",
//           brandName: "Inference Stack AI Assistant",
//           welcomeMessage: "Hi! How can I help you today?",
//           placeholder: "Type your message...",
//           position: "bottom-right",
//           autoOpen: true,
//           showBranding: true,
//           logoUrl: null
//         });
//       }
//     };

//     return () => {
//       // Cleanup on unmount
//       document.head.removeChild(script);
//     };
//   }, []);

//   return null; // This component doesn't render anything visible
// }

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
          stackId: "c99ae3fe-f7b7-469c-a71f-235bc0a064b2",
          deploymentUrl: "https://stakko-c99ae3fe-f7b7-469c-a71f-235bc0a064b2-6a13a4x54.vercel.app",
          primaryColor: "#ef4444",
          backgroundColor: "white",
          textColor: "#374151",
          brandName: "Inference Stack AI Assistant",
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