import { useContext, useState } from "react";
import styles from "./LandingPage.module.css";
import { MacroGame } from "macrogame/MacroGame";
import MacroGameContext from "MacroGameContext";
import {
  loginOnBackend,
  signupOnBackend,
  updateOnBackend,
} from "api-client/api-client";
import { useNavigate } from "react-router-dom";
import Dialog from "pages/common-components/Dialog/Dialog";

export default function LandingPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showLoginForm, setShowLoginForm] = useState(true);

  const context = useContext(MacroGameContext);

  const loginButtonStyles = `${styles.topButton} ${
    showLoginForm ? styles.activeTopButton : styles.inactiveTopButton
  }`;
  const signupButtonStyles = `${styles.topButton} ${
    showLoginForm ? styles.inactiveTopButton : styles.activeTopButton
  }`;

  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogButtonMessage, setDialogButtonMessage] = useState("");
  const [error, setError] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDialog = (
    message: string,
    buttonMessage: string,
    error: boolean
  ) => {
    setDialogMessage(message);
    setDialogButtonMessage(buttonMessage);
    setIsModalOpen(true);
    setError(error);
  };

  return (
    <div className={styles.landingPageDiv}>
      <h1>Valeria CCG</h1>
      <div className={styles.formContainerDiv}>
        <div className={styles.topButtonsDiv}>
          <button
            className={loginButtonStyles}
            onClick={() => {
              setShowLoginForm(true);
              setUsername("");
              setPassword("");
            }}
          >
            Continue
          </button>
          <button
            className={signupButtonStyles}
            onClick={() => {
              setShowLoginForm(false);
              setUsername("");
              setPassword("");
            }}
          >
            New Game
          </button>
        </div>
        {showLoginForm && (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (username === "") {
                openDialog(`Username can not be empty`, `Ok`, true);
                return;
              }
              if (password === "") {
                openDialog(`Password can not be empty`, `Ok`, true);
                return;
              }
              try {
                const loginResponse = await loginOnBackend(username, password);
                context.username = username;
                if (loginResponse === "") {
                  // If the table record does not have a macrogame, create a new one
                  context.macrogame = new MacroGame();
                  await updateOnBackend(username, context.macrogame);
                } else {
                  Object.setPrototypeOf(loginResponse, MacroGame.prototype);
                  context.macrogame = loginResponse as MacroGame;
                }
                navigate("/deck");
              } catch (error) {
                if (error instanceof Error) {
                  if (error.message === "404") {
                    openDialog(`Player ${username} does not exist`, `Ok`, true);
                    return;
                  }
                  if (error.message === "401") {
                    openDialog(`Wrong password`, `Ok`, true);
                    return;
                  }
                  if (error.message !== "200") {
                    openDialog(`Unexpected error`, `Ok`, true);
                    return;
                  }
                }
              }
            }}
          >
            <label>
              Username{" "}
              <input
                type="text"
                autoComplete="one-time-code"
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label>
              Password{" "}
              <input
                type="password"
                autoComplete="one-time-code"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <input type="submit" value="Login" />
          </form>
        )}
        {!showLoginForm && (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (username === "") {
                openDialog(`Username can not be empty`, `Ok`, true);
                return;
              }
              if (password === "") {
                openDialog(`Password can not be empty`, `Ok`, true);
                return;
              }
              if (password !== confirmPassword) {
                openDialog(`Password confirmation does not match`, `Ok`, true);
                return;
              }
              try {
                await signupOnBackend(username, password, email);
                context.username = username;
                context.macrogame = new MacroGame();
                await updateOnBackend(username, context.macrogame);

                navigate("/deck");
              } catch (error) {
                if (error instanceof Error) {
                  if (error.message === "409") {
                    openDialog(`Username already taken`, `Ok`, true);
                    return;
                  }
                  if (error.message !== "200") {
                    openDialog(
                      `Unexpected error calling create player endpoint`,
                      `Ok`,
                      true
                    );
                    return;
                  }
                }
              }
            }}
          >
            <label>
              Username{" "}
              <input
                type="text"
                autoComplete="one-time-code"
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label>
              Email{" "}
              <input
                type="text"
                autoComplete="one-time-code"
                placeholder="optional"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              Password{" "}
              <input
                type="password"
                autoComplete="one-time-code"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label>
              Confirm Password{" "}
              <input
                type="password"
                autoComplete="one-time-code"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
            <input type="submit" value="Sign Up" />
          </form>
        )}
      </div>
      <Dialog
        dialogMessage={dialogMessage}
        dialogButtonMessage={dialogButtonMessage}
        error={error}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}
