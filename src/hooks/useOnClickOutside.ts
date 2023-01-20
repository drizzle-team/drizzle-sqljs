import React, { useEffect } from 'react';

export type Event = React.SyntheticEvent;
export type Callback = () => void;
export type Ref = HTMLDivElement;

export default (callback: Callback) => {
  const containerRef = React.useRef<Ref>(null);

  useEffect(() => {
    const listener = (e: Event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as HTMLDivElement)
      ) {
        callback();
      }

      return null;
    };

    document.body.addEventListener('click', listener as any);

    return () => {
      document.body.removeEventListener('click', listener as any);
    };
  }, [callback]);

  return containerRef;
};
