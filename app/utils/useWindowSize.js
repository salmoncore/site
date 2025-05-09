// https://nulldog.com/detect-window-size-in-nextjs-ssr
// Based off of this SSR approach, thanks!

import { useState, useEffect } from 'react';

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Only execute on the client-side
    if (typeof window !== 'undefined') {
      // Handler to call on window resize
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      // Add event listener
      window.addEventListener('resize', handleResize);

      // Call handler initially to set size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []); // Empty dependency array ensures it runs only on mount and unmount

  return windowSize;
}

export default useWindowSize;