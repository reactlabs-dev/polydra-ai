'use client'; // Add this line if using Next.js App Router

import { useEffect } from 'react';

declare global {
  interface Window {
    StakkoWidget?: (action: string, options: Record<string, unknown>) => void;
  }
}