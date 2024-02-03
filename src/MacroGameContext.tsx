import { createContext } from "react";

import { MacroGame } from "macrogame/MacroGame";

const macroGame = new MacroGame();
const MacroGameContext = createContext(macroGame);

export function MacroGameContextProvider({ children }: { children: any }) {
  return (
    <MacroGameContext.Provider value={macroGame}>
      {children}
    </MacroGameContext.Provider>
  );
}

export default MacroGameContext;
