
/// <reference types="vite/client" />

interface Window {
  antiFreezeProtectionInstalled?: boolean;
  lastInteractionTime?: number;
  freezeCheckInterval?: NodeJS.Timeout;
}
