import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import PageNav from "./componenet/PageNav";
import { useAuth } from "./contexts/FakeAuthContext";

import Button from "./componenet/Button";
import { useNavigate } from "react-router-dom";
import FailMessage from "./AuthFail";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("shakar@example.com");
  const [password, setPassword] = useState("qwerty");
  const { login, isAuthenticated } = useAuth();
  const [isTrue, setIsTrue] = useState(isAuthenticated);

  const navigate = useNavigate();

  function submitHandler(e) {
    e.preventDefault();
    if (email && password) return login(email, password);
  }

  useEffect(
    function () {
      if (isAuthenticated === true) navigate("/app", { replace: true });
    },

    [isAuthenticated, navigate]
  );

  return (
    <main className={styles.login}>
      <PageNav />

      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        {isTrue && <FailMessage />}
        <div>
          <Button
            onClick={() => {
              isAuthenticated ? isTrue : setIsTrue(!isAuthenticated);
            }}
            type="primary"
          >
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
