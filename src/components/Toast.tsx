import React from 'react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast || !toast.visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 transform translate-y-0 opacity-100 transition-all duration-300 pointer-events-none bg-white border border-primary text-on-surface p-4 rounded-xl shadow-xl flex items-center gap-3 max-w-md">
      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
        <span className="material-symbols-outlined text-[20px]">check</span>
      </div>
      <div className="flex flex-col">
        <span className="font-title-md text-sm font-bold text-primary">{toast.title}</span>
        <span className="font-body-sm text-xs text-on-surface-variant">{toast.subtitle}</span>
      </div>
    </div>
  );
};
