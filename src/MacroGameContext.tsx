import { MacroGame } from "macrogame/MacroGame";
import { createContext } from "react";

const emptyMacrogameContext = { macrogame: null as MacroGame | null };

const MacroGameContext = createContext(emptyMacrogameContext);

export function MacroGameContextProvider({ children }: { children: any }) {
  return (
    <MacroGameContext.Provider value={emptyMacrogameContext}>
      {children}
    </MacroGameContext.Provider>
  );
}

export default MacroGameContext;
