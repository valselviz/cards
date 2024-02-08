import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.landingPageDiv}>
      <h1>Collectable Cards Game</h1>
      <h3>By Valeria Selviz</h3>
      <button>Continue</button>
      <button>New Game</button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // TODO call the POST /login endpoint
        }}
      >
        <label>
          Username: <input type="text" name="name" />
        </label>
        <label>
          Password: <input type="password" name="password" />
        </label>
        <input type="submit" value="Login" />
        <button>Back</button>
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // TODO call the POST /player endpoint
        }}
      >
        <label>
          Username: <input type="text" name="name" />
        </label>
        <label>
          Email: <input type="text" name="name" placeholder="optional" />
        </label>
        <label>
          Password: <input type="password" name="password" />
        </label>
        <label>
          Confirm Password: <input type="password" name="password" />
        </label>
        <input type="submit" value="Sign Up" />
        <button>Back</button>
      </form>
    </div>
  );
}
