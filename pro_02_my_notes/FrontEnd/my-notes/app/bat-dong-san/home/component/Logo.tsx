import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Header.module.css";

const Logo = () => (
  <Link href="/bat-dong-san/home">
    <Image src="/bat-dong-san/logo.jpg" alt="Batdongsan Logo" width={120} height={32} className={styles.logo} />
  </Link>
);

export default Logo;
