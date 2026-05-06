import LoginForm from "@/components/loginForm";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.loginContainer}>
        <div className={styles.logoSection}>
          <h1>MiniPops</h1>
          <p>Bem-vindo de volta!</p>
        </div>
        <LoginForm />
        <div className={styles.footer}>
          <p>© 2024 MiniPops. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}
