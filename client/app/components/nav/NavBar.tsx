import Link from 'next/link';
import styles from './NavBar.module.scss';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '@/app/store/store';
import { authToken } from '@/app/utils';
import { useEffect } from 'react';
import axios from 'axios';

const Navbar = (): JSX.Element => {
    const router = useRouter();
    const url = 'http://localhost:3001'; // TODO: Create .env file
    const { isAuthenticated, setIsAuthenticated, user } = useGlobalContext();
    const userName = user.firstName?.charAt(0).toUpperCase().concat(user.firstName?.substring(1));

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
                        <div>
                            <Link className={styles.navItem} href="/register">
                                Register
                            </Link>
                            <Link className={styles.navItem} href="/login">
                                Log In
                            </Link>
                        </div>

                        :
                        <div >
                            <Link className={styles.navItem} href="/seminars">
                                Seminars
                            </Link>
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
