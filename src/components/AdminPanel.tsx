import { saveAdminConfig, type AdminConfig } from "../lib/adminConfig";

export type FlowStepForAdmin =
  | "idle"
  | "loading"
  | "captcha"
  | "blackjack"
  | "cookies"
  | "cookiesClicker"
  | "success";

type AdminPanelProps = {
  config: AdminConfig;
  onConfigChange: (config: AdminConfig) => void;
  onGoToStep: (step: FlowStepForAdmin) => void;
};

export function AdminPanel({
  config,
  onConfigChange,
  onGoToStep,
}: AdminPanelProps) {
  const set = (key: keyof AdminConfig, value: boolean) => {
    const next = { ...config, [key]: value };
    onConfigChange(next);
    saveAdminConfig(next);
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel-title">Admin</div>
      <div className="admin-panel-toggles">
        <label>
          <input
            type="checkbox"
            checked={config.showIntro}
            onChange={(e) => set("showIntro", e.target.checked)}
          />
          Intro
        </label>
        <label>
          <input
            type="checkbox"
            checked={config.showCaptcha}
            onChange={(e) => set("showCaptcha", e.target.checked)}
          />
          Captcha
        </label>
        <label>
          <input
            type="checkbox"
            checked={config.showBlackjack}
            onChange={(e) => set("showBlackjack", e.target.checked)}
          />
          Blackjack
        </label>
        <label>
          <input
            type="checkbox"
            checked={config.showCookies}
            onChange={(e) => set("showCookies", e.target.checked)}
          />
          Küpsised
        </label>
        <label>
          <input
            type="checkbox"
            checked={config.showCookieClicker}
            onChange={(e) => set("showCookieClicker", e.target.checked)}
          />
          Cookie Clicker
        </label>
      </div>
      <div className="admin-panel-goto">
        <span>Mine otse:</span>
        <button type="button" onClick={() => onGoToStep("idle")}>
          Ratas
        </button>
        <button type="button" onClick={() => onGoToStep("loading")}>
          Laadimine
        </button>
        <button type="button" onClick={() => onGoToStep("captcha")}>
          Captcha
        </button>
        <button type="button" onClick={() => onGoToStep("blackjack")}>
          Blackjack
        </button>
        <button type="button" onClick={() => onGoToStep("cookies")}>
          Küpsised
        </button>
        <button type="button" onClick={() => onGoToStep("cookiesClicker")}>
          Cookie Clicker
        </button>
        <button type="button" onClick={() => onGoToStep("success")}>
          Lõpp
        </button>
      </div>
    </div>
  );
}
