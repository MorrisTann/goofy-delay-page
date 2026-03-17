const ADMIN_KEY = "naljakas-admin";

export type AdminConfig = {
  showIntro: boolean;
  showCaptcha: boolean;
  showBlackjack: boolean;
  showCookies: boolean;
  showCookieClicker: boolean;
};

export const defaultAdminConfig: AdminConfig = {
  showIntro: true,
  showCaptcha: true,
  showBlackjack: true,
  showCookies: true,
  showCookieClicker: true,
};

export function loadAdminConfig(): AdminConfig {
  try {
    const s = localStorage.getItem(ADMIN_KEY);
    if (s) {
      const o = JSON.parse(s) as Partial<AdminConfig>;
      return { ...defaultAdminConfig, ...o };
    }
  } catch {
    /* ignore */
  }
  return { ...defaultAdminConfig };
}

export function saveAdminConfig(config: AdminConfig): void {
  try {
    localStorage.setItem(ADMIN_KEY, JSON.stringify(config));
  } catch {
    /* ignore */
  }
}

export function isAdminMode(): boolean {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("admin") === "1";
}
