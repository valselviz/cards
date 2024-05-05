import MacroGameContext, { GameContext } from "MacroGameContext";
import { loginOnBackend } from "api-client/api-client";
import { MacroGame } from "macrogame/MacroGame";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// This hook returns a state with the macrogame
// If possible it retrieves it from the context
// Otherwise it fetches the macrogame by calling the login endpoint
export function useMacrogame(): [MacroGame | null, GameContext] {
  const context: GameContext = useContext(MacroGameContext);
  const [macrogame, setMacrogame] = useState(context.macrogame);
  // Navigate back to the landing page if the user does not have a session
  const navigate = useNavigate();
  useEffect(() => {
    if (!macrogame) {
      const fetchLogin = async () => {
        let username = localStorage.getItem("username");
        if (!username) {
          username = "";
        }
        let loginResponse = null;
        try {
          loginResponse = await loginOnBackend(username, "");
        } catch (error) {
          console.error(error);
        }
        if (!loginResponse) {
          navigate("/");
        } else {
          Object.setPrototypeOf(loginResponse, MacroGame.prototype);
          context.macrogame = loginResponse as MacroGame;
          context.username = username;
          setMacrogame(loginResponse as MacroGame);
        }
      };
      fetchLogin();
    }
  }, [macrogame, context, navigate]);
  return [macrogame, context];
}
