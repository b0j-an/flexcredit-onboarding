import React, { useState } from 'react';
import { SlideDeck } from './components/SlideDeck';

export const App: React.FC = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <div className="h-screen w-screen bg-[#001D2B] overflow-hidden flex flex-col selection:bg-brand-green selection:text-brand-petrol">
      <SlideDeck
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(prev => !prev)}
      />
    </div>
  );
};


