export function HeroPathways() {
  return (
    <div className="pathways" aria-hidden="true">
      <svg viewBox="0 0 520 420" role="presentation">
        <path className="path-line" d="M86 210 L188 148 L278 226 L392 92" />
        <path className="path-line" d="M188 148 L148 338" />
        <path className="path-line" d="M278 226 L148 338" />
        <path className="path-line" d="M278 226 L418 274" />
        <path className="path-line" d="M392 92 L448 186" />
        <circle className="node-core" cx="86" cy="210" r="5" />
        <circle className="node-core" cx="188" cy="148" r="5" />
        <circle className="node-core" cx="418" cy="274" r="5" />
        <circle className="node-core" cx="448" cy="186" r="5" />
        <circle className="node-ring" cx="392" cy="92" r="11" />
        <circle className="node-core" cx="392" cy="92" r="4.5" />
        <circle className="node-ring" cx="278" cy="226" r="11" />
        <circle className="node-core" cx="278" cy="226" r="4.5" />
        <circle className="node-ring" cx="148" cy="338" r="11" />
        <circle className="node-core" cx="148" cy="338" r="4.5" />
        <text className="path-label" x="412" y="80">
          BUILD
        </text>
        <text className="path-label" x="298" y="232">
          ANALYZE
        </text>
        <text className="path-label" x="168" y="348">
          CONNECT
        </text>
      </svg>
    </div>
  );
}
