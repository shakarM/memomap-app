import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to="/">
      <div className={styles.logoo}>
        <img
          src="https://png.monster/wp-content/uploads/2022/11/png.monster-355-370x370.png"
          alt="WorldWise logo"
          className={styles.logo}
        />{" "}
        <h5>MEMOMap</h5>
      </div>
    </Link>
  );
}

export default Logo;
