import MacroGameContext from "MacroGameContext";
import { MacroGame } from "macrogame/MacroGame";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DeckPage() {
  const macrogame = useContext(MacroGameContext).macrogame as MacroGame;

  const navigate = useNavigate();
  useEffect(() => {
    if (!macrogame) {
      navigate("/");
    }
  }, [macrogame, navigate]);

  if (!macrogame) {
    return <></>;
  }
  
  return (
    <>
      <title>Your Deck</title>
    </>
  );
}