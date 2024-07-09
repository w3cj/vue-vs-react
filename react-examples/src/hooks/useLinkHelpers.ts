import { useLocation } from 'react-router-dom';

export default function useLinkHelpers() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const getClassName = (path: string) => {
    return isActive(path) ? 'secondary' : '';
  };

  return { isActive, getClassName };
}
