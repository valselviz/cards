import { MacroGame } from "macrogame/MacroGame";
import { createContext } from "react";

export interface GameContext {
  macrogame: MacroGame | null;
  username: string | null;
}

const emptyMacrogameContext: GameContext = {
  macrogame: null,
  username: null,
};

const MacroGameContext = createContext(emptyMacrogameContext);

export function MacroGameContextProvider({ children }: { children: any }) {
  return (
    <MacroGameContext.Provider value={emptyMacrogameContext}>
      {children}
    </MacroGameContext.Provider>
  );
}

export default MacroGameContext;
