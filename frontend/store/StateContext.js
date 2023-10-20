import { createContext, useState } from 'react';

export const StateContext = createContext();

const StateContextProvider = ({ children }) => {
  const [showCursor, setShowCursor] = useState(true);

  return (
    <StateContext.Provider
      value={{
        showCursor,
        setShowCursor,
      }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
