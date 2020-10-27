import styles from "../styles/Header.module.css";

export default function Header({ title }) {
  return <h2 className={styles.heading}>{title}</h2>;
}
