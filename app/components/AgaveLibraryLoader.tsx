"use client";

import { Component, useRef, type ReactNode } from "react";
import { useAgaveDialogFocus } from "./useAgaveDialogFocus";

type LibraryShellProps = { isOpen: boolean; onClose: () => void };

export function AgaveLibraryFallback({
  isOpen,
  onClose,
  failed = false,
}: LibraryShellProps & { failed?: boolean }) {
  const dialog = useRef<HTMLElement | null>(null);
  useAgaveDialogFocus(dialog, isOpen, onClose);
  if (!isOpen) return null;

  return (
    <section
      className="library-overlay"
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-labelledby="library-loading-title"
      tabIndex={-1}
      aria-busy={!failed}
    >
      <header className="library-top">
        <div>
          <p className="eyebrow">La Chingada · Collection archive</p>
          <h2 id="library-loading-title">THE AGAVE LIBRARY</h2>
        </div>
        <button
          className="library-close"
          onClick={onClose}
          aria-label="Close the Agave Library"
        >
          Close ×
        </button>
      </header>
      <div className="library-intro">
        {failed ? (
          <div role="alert">
            <p>
              The collection could not load. Check your connection and reload
              the page to try again.
            </p>
            <button
              className="button red"
              onClick={() => window.location.reload()}
            >
              Reload the page
            </button>
          </div>
        ) : (
          <p role="status" aria-live="polite">
            Loading the bottles and house infusions…
          </p>
        )}
      </div>
    </section>
  );
}

/** A failed optional catalogue download must not break the restaurant homepage. */
export class AgaveLibraryBoundary extends Component<
  LibraryShellProps & { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? (
      <AgaveLibraryFallback
        isOpen={this.props.isOpen}
        onClose={this.props.onClose}
        failed
      />
    ) : (
      this.props.children
    );
  }
}
