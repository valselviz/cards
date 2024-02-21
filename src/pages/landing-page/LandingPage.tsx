import { useContext, useState } from "react";
import styles from "./LandingPage.module.css";
import { MacroGame } from "macrogame/MacroGame";
import MacroGameContext from "MacroGameContext";

export default function LandingPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const context = useContext(MacroGameContext);

  const backendUrl =
    "https://nfum7buqpoyqn3visxvthctfa40zyhee.lambda-url.us-east-1.on.aws";

  return (
    <div className={styles.landingPageDiv}>
      <h1>Collectable Cards Game</h1>
      <h3>By Valeria Selviz</h3>
      <button>Continue</button>
      <button>New Game</button>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await fetch(backendUrl + "/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
          });
          context.username = username;
          const responseJson = await response.json();
          if (responseJson === "") {
            // If the table record does not have a macrogame, create a new one
            context.macrogame = new MacroGame();
            await fetch(backendUrl + "/player", {
              method: "PUT",
              body: JSON.stringify({
                username: username,
                macrogame: context.macrogame,
              }),
            });
          } else {
            context.macrogame = responseJson;
          }
          window.location.href = "/#/deck";
        }}
      >
        <label>
          Username:{" "}
          <input
            type="text"
            name="name"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input type="submit" value="Login" />
        <button>Back</button>
      </form>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (password !== confirmPassword) {
            alert("Password confirmation does not match");
            return;
          }
          const postResponse = await fetch(backendUrl + "/player", {
            method: "POST",
            body: JSON.stringify({ username, password, email }),
          });
          if (postResponse.status !== 200) {
            alert("Unexpected error calling create player endpoint");
            return;
          }
          context.username = username;
          context.macrogame = new MacroGame();
          const updateResponse = await fetch(backendUrl + "/player", {
            method: "PUT",
            body: JSON.stringify({
              username: username,
              macrogame: context.macrogame,
            }),
          });
          if (updateResponse.status !== 200) {
            alert("Unexpected error calling update player endpoint");
            return;
          }
          window.location.href = "/#/deck";
        }}
      >
        <label>
          Username:{" "}
          <input
            type="text"
            name="name"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Email:{" "}
          <input
            type="text"
            name="name"
            placeholder="optional"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Confirm Password:{" "}
          <input
            type="password"
            name="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <input type="submit" value="Sign Up" />
        <button>Back</button>
      </form>
    </div>
  );
}
