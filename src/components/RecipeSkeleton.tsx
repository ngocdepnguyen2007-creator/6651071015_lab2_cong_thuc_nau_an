export function RecipeSkeleton() {
  return (
    <div aria-hidden="true" className="recipe-grid">
      {Array.from({ length: 8 }, (_, index) => (
        <div className="skeleton-card" key={index}>
          <div className="skeleton-shimmer skeleton-image" />
          <div className="skeleton-card-body">
            <div className="skeleton-shimmer skeleton-kicker" />
            <div className="skeleton-shimmer skeleton-title" />
            <div className="skeleton-shimmer skeleton-copy" />
            <div className="skeleton-shimmer skeleton-copy skeleton-copy-short" />
            <div className="skeleton-footer"><div className="skeleton-shimmer skeleton-meta" /><div className="skeleton-shimmer skeleton-button" /></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function DetailSkeleton() {
  return (
    <div aria-hidden="true" className="detail-skeleton">
      <div className="skeleton-shimmer detail-skeleton-image" />
      <div className="detail-skeleton-copy">
        <div className="skeleton-shimmer skeleton-kicker" />
        <div className="skeleton-shimmer skeleton-title detail-skeleton-title" />
        <div className="skeleton-shimmer skeleton-copy" />
        <div className="skeleton-shimmer skeleton-copy" />
        <div className="skeleton-shimmer skeleton-button detail-skeleton-button" />
      </div>
    </div>
  )
}
