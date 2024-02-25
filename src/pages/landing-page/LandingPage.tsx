import { useContext, useState } from "react";
import styles from "./LandingPage.module.css";
import { MacroGame } from "macrogame/MacroGame";
import MacroGameContext from "MacroGameContext";
import { login, signup, update } from "api-client/api-client";

export default function LandingPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const context = useContext(MacroGameContext);

  return (
    <div className={styles.landingPageDiv}>
      <h1>Collectable Cards Game</h1>
      <h3>By Valeria Selviz</h3>
      <button>Continue</button>
      <button>New Game</button>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const loginResponse = await login(username, password);
            context.username = username;
            if (loginResponse === "") {
              // If the table record does not have a macrogame, create a new one
              context.macrogame = new MacroGame();
              await update(username, context.macrogame);
            } else {
              context.macrogame = loginResponse;
            }
            window.location.href = "/#/deck";
          } catch (error) {
            if (error instanceof Error) {
              if (error.message === "404") {
                alert(`Player ${username} does not exist`);
                return;
              }
              if (error.message === "401") {
                alert(`Wrong Password`);
                return;
              }
              if (error.message !== "200") {
                alert(`Unexpected error`);
                return;
              }
            }
          }
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
          try {
            await signup(username, password, email);
            context.username = username;
            context.macrogame = new MacroGame();
            await update(username, context.macrogame);

            window.location.href = "/#/deck";
          } catch (error) {
            if (error instanceof Error) {
              if (error.message === "409") {
                alert(`Username already taken`);
                return;
              }
              if (error.message !== "200") {
                alert(`Unexpected error calling create player endpoint`);
                return;
              }
            }
          }
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
