import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import styles from "./User.module.css";

function User() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Additional check to handle case where user is null
  if (!isAuthenticated || !user) {
    return null; // or render a loading state or redirect to login
  }

  function handleClick(e) {
    e.preventDefault();
    logout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      {/* Additional check for user.avatar to prevent the error */}
      {user.avatar && <img src={user.avatar} alt={user.name} />}
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
