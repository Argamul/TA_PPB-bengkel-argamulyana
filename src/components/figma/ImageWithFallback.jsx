export function ImageWithFallback({ src, alt, className = '' }) {
  return (
    <img
      src={src || 'https://via.placeholder.com/400'}
      alt={alt}
      className={className}
      onError={(e) => {
        e.target.src = 'https://via.placeholder.com/400';
      }}
    />
  );
}
