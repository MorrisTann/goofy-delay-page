import { useEffect, useRef, useState } from "react";

import captchaImg from "../assets/captcha.png";

type FakeCaptchaCardProps = {
  onVerified: () => void;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function FakeCaptchaCard({ onVerified }: FakeCaptchaCardProps) {
  const [status, setStatus] = useState<"unchecked" | "checking" | "failed">(
    "unchecked",
  );

  // Lazy init: random value computed inside effect when first needed (avoids impure call during render).
  const checkingMsRef = useRef<number | null>(null);
  const getCheckingMs = () => {
    if (checkingMsRef.current === null) {
      checkingMsRef.current = clamp(
        650 + Math.floor(Math.random() * 650),
        650,
        1300,
      );
    }
    return checkingMsRef.current;
  };

  useEffect(() => {
    if (status !== "checking") return;
    const ms = getCheckingMs();
    const t = window.setTimeout(() => {
      setStatus("failed");
      // Keep the "checked" state visible briefly before moving on.
      window.setTimeout(() => onVerified(), 1200);
    }, ms);
    return () => window.clearTimeout(t);
  }, [onVerified, status]);

  const disabled = status !== "unchecked";

  return (
    <div className="app">
      <h1>Üks samm veel…</h1>

      <div className="fake-captcha-card" role="group" aria-label="Kinnitamine">
        <button
          className={`fake-captcha-checkbox ${status === "failed" ? "fake-captcha-checkbox-failed" : ""}`}
          type="button"
          disabled={disabled}
          onClick={() => setStatus("checking")}
          aria-pressed={status !== "unchecked"}
          aria-label="Ma ei ole robot"
        >
          {status === "checking" ? (
            <span className="fake-captcha-spinner" aria-hidden="true" />
          ) : status === "failed" ? (
            <span className="fake-captcha-fail" aria-hidden="true">
              ✕
            </span>
          ) : null}
        </button>

        <div className="fake-captcha-text">
          <div className="fake-captcha-title">Ma ei ole robot</div>
          <div className="fake-captcha-subtitle">
            {status === "checking"
              ? "Kontrollin…"
              : status === "failed"
                ? "Kinnitamine ebaõnnestus"
                : "Klõpsa kinnitamiseks"}
          </div>
        </div>

        <div className="fake-captcha-brand" aria-hidden="true">
          <img
            src={captchaImg}
            alt=""
            className="fake-captcha-logo"
          />
        </div>
      </div>

      <p className="muted">
        Google reCAPTCHA (päriselt ka)
      </p>
    </div>
  );
}
