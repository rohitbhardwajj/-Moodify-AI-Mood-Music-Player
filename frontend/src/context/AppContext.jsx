import { createContext, useState } from 'react';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [mood, setMood] = useState('');
  const [showMoodOverlay, setShowMoodOverlay] = useState(false);

  return (
    <AppContext.Provider value={{ mood, setMood, showMoodOverlay, setShowMoodOverlay }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
