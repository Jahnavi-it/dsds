import { useId } from 'react';

// The NEXORA symbol. Used on the home page, the app header and the login/register pages.
export default function Logo({ size = 40 }) {
  const id = 'nx' + useId().replace(/[^a-zA-Z0-9]/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" style={{ flex: 'none' }}>
      <defs>
        <linearGradient id={id} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#2563eb" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <path d="M5 43 5 5 17 5 33 28 33 5 44 5 44 43 32 43 16 20 16 43Z" fill={`url(#${id})`} />
    </svg>
  );
}
