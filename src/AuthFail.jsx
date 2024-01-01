import styles from "./Login.module.css";

export default function FailMessage() {
  return (
    <div className={styles.pass}>
      <p>
        {" "}
        The password or email you have provided does not match the current ones
      </p>
    </div>
  );
}
