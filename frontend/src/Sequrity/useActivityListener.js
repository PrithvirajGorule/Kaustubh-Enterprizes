import { useEffect } from 'react';

const useActivityListener = () => {
  useEffect(() => {
    const updateLastActivity = () => {
      if (localStorage.getItem('userId')) {
        localStorage.setItem('lastActivity', new Date().getTime());
      }
    };

    window.addEventListener('mousemove', updateLastActivity);
    window.addEventListener('keydown', updateLastActivity);

    return () => {
      window.removeEventListener('mousemove', updateLastActivity);
      window.removeEventListener('keydown', updateLastActivity);
    };
  }, []);
};

export default useActivityListener;
