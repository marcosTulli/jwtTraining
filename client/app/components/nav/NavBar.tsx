import Link from 'next/link';
import styles from './NavBar.module.scss';

const Navbar: React.FC = () => {
    return (
        <nav>
            <div className={styles.navContainer}>
                <Link className={styles.navItem} href="/">
                    Home
                </Link>
                <Link className={styles.navItem} href="/register">
                    Register
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
