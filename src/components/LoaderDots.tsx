import styles from "../styles/loader.module.css";

const LoadingDots = () => {
  return (
    <div className={styles.bouncer}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingDots;
