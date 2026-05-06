import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const isLikelyIos = (ua: string) => /iPhone|iPad|iPod/i.test(ua);
const isLikelyInAppBrowser = (ua: string) =>
  /FBAN|FBAV|Instagram|Line|WhatsApp|wv|WebView/i.test(ua);

export const InAppBrowserNotice = () => {
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const shouldShow = useMemo(() => {
    if (!mounted || dismissed) return false;
    const ua = navigator.userAgent || "";
    return isLikelyIos(ua) && isLikelyInAppBrowser(ua);
  }, [dismissed, mounted]);

  if (!shouldShow) return null;

  return (
    <div className="fixed left-3 right-3 top-[calc(env(safe-area-inset-top)+0.75rem)] z-[80] rounded-md border border-border bg-background/95 p-3 text-xs text-foreground shadow-xl backdrop-blur">
      <button
        type="button"
        aria-label="Dismiss notice"
        onClick={() => setDismissed(true)}
        className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
      >
        <X size={14} />
      </button>
      <p className="pr-6 leading-relaxed text-muted-foreground">
        Best view on iPhone: open this page in Safari. In-app browsers (like
        WhatsApp) can hide or distort animations.
      </p>
    </div>
  );
};
