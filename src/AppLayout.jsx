// import AppNav from "./componenet/AppNav";
import Sidebar from "./componenet/Sidebar";
import styles from "./AppLayout.module.css";
import Map from "./componenet/Map";
import User from "./componenet/User";

export default function PageLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}
