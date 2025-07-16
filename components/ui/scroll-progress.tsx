'use client';
import React, { useEffect, useState } from 'react';

const ScrollProgress: React.FC = () => {
  const [scrollYProgress, setScrollYProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / documentHeight;
      setScrollYProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-primary/20 z-50"
      style={{
        transform: `scaleX(${scrollYProgress})`,
        transformOrigin: '0%',
      }}
    >
      <div className="h-full bg-gradient-to-r from-primary to-accent" />
    </div>
  );
};

export default ScrollProgress;
