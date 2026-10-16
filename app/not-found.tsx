import { Brand } from "./components/Brand";

export default function NotFound() {
  return (
    <div className="editorial-page">
      <header className="editorial-header">
        <a href="/" aria-label="La Chingada home">
          <Brand />
        </a>
        <a className="button" href="/menu">
          Find the menu ↗
        </a>
      </header>
      <main className="editorial-body error-page">
        <p className="eyebrow">404 / Wrong turn. Good tacos.</p>
        <h1>
          This one&apos;s
          <br />
          off the menu.
        </h1>
        <p>
          The page you came for has moved or doesn&apos;t exist. The food, drinks and
          good company are still here.
        </p>
        <div className="editorial-actions">
          <a className="button" href="/">
            Back to La Chingada ↗
          </a>
          <a href="/menu">Food & drinks ↗</a>
          <a href="/#visit">Hours & directions ↗</a>
        </div>
      </main>
    </div>
  );
}
