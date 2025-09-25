'use client';

import React from 'react';

const RouteLoader = () => {
  return (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70 backdrop-blur-md">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-transparent border-black" />
    </div>
  );
};

export default RouteLoader;
