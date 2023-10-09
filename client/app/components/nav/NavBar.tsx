import Link from 'next/link';
import styles from './NavBar.module.scss';
import { useGlobalContext } from '@/app/store/store';

const Navbar: React.FC = () => {
    const { isAuthenticated } = useGlobalContext();

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
