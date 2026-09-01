"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function ErrorState({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="content" className="utility-404">
      <Container>
        <p className="section-kicker">Error</p>
        <h1 className="section-title">This page failed to load.</h1>
        <p className="lede" style={{ marginBottom: "1.5rem" }}>
          Return home or try again. Nothing on this preview stores your data.
        </p>
        <div className="hero-actions">
          <Button href="/" label="Return home" />
          <button className="btn btn--ghost btn--ghost-light" type="button" onClick={reset}>
            Try again
          </button>
        </div>
      </Container>
    </main>
  );
}
