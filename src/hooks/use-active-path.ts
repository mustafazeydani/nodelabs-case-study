import { usePathname } from 'next/navigation';

export function useActivePath() {
  const pathname = usePathname();

  const isActive = (url: string) => {
    // Remove trailing slashes for comparison
    const normalizedPathname = pathname.replace(/\/$/, '') || '/';
    const normalizedUrl = url.replace(/\/$/, '') || '/';

    return normalizedPathname === normalizedUrl;
  };

  return { isActive };
}
