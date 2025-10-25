import React from "react";

export default function Loader() {
 
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blur + dim backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-hidden />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4 px-6 py-4">
        {/* Spinner */}
        <div className="flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-4 border-white/30 border-t-white animate-spin" />
        </div>

        {/* Optional text */}
<div className="text-white text-sm font-medium">Loading</div>

      </div>
    </div>
  );
}
