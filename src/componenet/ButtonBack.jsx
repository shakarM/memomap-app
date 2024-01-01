import { useNavigate } from "react-router-dom";
import styles from "./ButtonBack.module.css";
import Button from "./Button";

export default function ButtonBack() {
  const navigate = useNavigate();
  return (
    // <Link to="/app/cities">
    //   {" "}
    //   <button className={styles.btn}>Go back</button>
    // </Link>
    <Button
      className={styles.btn}
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      Back
    </Button>
  );
}
