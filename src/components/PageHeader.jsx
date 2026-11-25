export default function PageHeader({ title, subtitle }) {
  return (
    <section className="page-header grid-bg">
      <div className="container">
        <h1 className="page-title">
          <span>{title}</span>
          <svg className="title-stroke" viewBox="0 0 300 18" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path d="M4 11 C60 3, 120 15, 180 7 S270 12, 296 6" fill="none" stroke="var(--hl-bar)" strokeWidth="12" strokeLinecap="round" />
          </svg>
        </h1>
        {subtitle && <p className="page-sub">{subtitle}</p>}
      </div>
    </section>
  )
}
