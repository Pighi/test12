import { useState, useEffect } from 'react';

export default function useAuth() {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('pods_user');
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  });

  useEffect(() => {
    const handler = () => {
      const raw = localStorage.getItem('pods_user');
      setUser(raw ? JSON.parse(raw) : null);
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  return { user, setUser };
}
