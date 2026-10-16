"use client";

import { useEffect, type RefObject } from "react";

/** The active library surface traps focus; the parent restores its homepage opener. */
export function useAgaveDialogFocus(
  dialogRef: RefObject<HTMLElement | null>,
  enabled: boolean,
  onEscape: () => void,
  preferredFocus?: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!enabled) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const getFocusable = () =>
      Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter(
        (element) =>
          !element.hasAttribute("disabled") &&
          !element.closest("[inert]") &&
          element.getClientRects().length > 0,
      );

    const frame = window.requestAnimationFrame(() => {
      const preferred = preferredFocus?.current;
      const target =
        preferred?.isConnected && dialog.contains(preferred)
          ? preferred
          : getFocusable()[0] || dialog;
      target.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      if (event.key === "Escape") {
        event.preventDefault();
        onEscape();
        return;
      }
      if (event.key !== "Tab") return;
      const items = getFocusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first) {
        event.preventDefault();
        dialog.focus();
      } else if (
        event.shiftKey &&
        (document.activeElement === first ||
          !dialog.contains(document.activeElement))
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === last ||
          !dialog.contains(document.activeElement))
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [dialogRef, enabled, onEscape, preferredFocus]);
}
