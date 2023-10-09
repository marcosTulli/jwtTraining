import Link from 'next/link';
import styles from './NavBar.module.scss';
import { useGlobalContext } from '@/app/store/store';
import { authToken } from '@/app/utils';
import { useEffect } from 'react';
import axios from 'axios';

const Navbar: React.FC = () => {
    const url = 'http://localhost:3001'; // TODO: Create .env file
    const { isAuthenticated } = useGlobalContext();

    const handleClearStore = () => window.localStorage.clear();

    const dropDb = () => {
        axios.delete(url)
            .then(() => console.log("Deleted DB"))
            .catch((e) => console.log(e));
    };

    return (
        <nav>
            <div className={styles.navContainer}>
                <button onClick={handleClearStore} className={styles.navItem} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                    Clear Store
                </button>
                <button onClick={dropDb} className={styles.navItem} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                    Drop DB
                </button>
                <Link className={styles.navItem} href="/">
                    Home
                </Link>
                {
                    !isAuthenticated &&
                    <Link className={styles.navItem} href="/register">
                        Register
                    </Link>
                }
            </div>
        </nav>
    );
};

export default Navbar;
