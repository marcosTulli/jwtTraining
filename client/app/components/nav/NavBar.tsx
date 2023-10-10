import Link from 'next/link';
import styles from './NavBar.module.scss';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '@/app/store/store';
import { authToken } from '@/app/utils';
import { useEffect } from 'react';
import axios from 'axios';

const Navbar: React.FC = () => {
    const router = useRouter();
    const url = 'http://localhost:3001'; // TODO: Create .env file
    const { isAuthenticated, user, setIsAuthenticated } = useGlobalContext();

    const handleLogOut = () => {
        authToken(window).removeToken();
        setIsAuthenticated(false);
        router.push('/');
    };

    const dropDb = () => {
        axios.delete(url)
            .then(() => console.log("Deleted DB"))
            .catch((e) => console.log(e));
    };
    const userName = user.firstName.charAt(0).toUpperCase().concat(user.firstName.substring(1));
    useEffect(() => { if (isAuthenticated) { console.log("Authenticated"); } }, [isAuthenticated]);
    return (
        <nav>
            <div className={styles.navContainer}>
                <button onClick={dropDb} className={styles.navItem} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                    Drop DB
                </button>
                <Link className={styles.navItem} href="/">
                    Home
                </Link>
                {
                    !isAuthenticated ?
                        <Link className={styles.navItem} href="/register">
                            Register
                        </Link>

                        :
                        <div >
                            {userName}
                            <button
                                onClick={() => handleLogOut()}
                                className={styles.navItem}
                                style={{
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    marginLeft: '1rem',
                                    marginRight: '1rem'
                                }}>
                                Log Out
                            </button>
                        </div>
                }
            </div>
        </nav>
    );
};

export default Navbar;
