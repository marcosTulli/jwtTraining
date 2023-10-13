// TODO: Use eslint vscode extension
import React, { useEffect } from 'react';
import styles from './Home.module.scss';
import { useMediaQuery } from '@mui/material';
import NavBar from '@/app/components/nav/NavBar';
import { useGlobalContext } from '@/app/store/store';
import { authToken } from '@/app/utils';

export default function Home() {
    const { isAuthenticated, setIsAuthenticated } = useGlobalContext();
    const isMobile = useMediaQuery('(max-width: 500px)');
    const user = window.localStorage.getItem('user');
    const userName = user?.charAt(0).toUpperCase().concat(user?.substring(1));

    useEffect(() => {
        if (!isAuthenticated) {
            setIsAuthenticated(authToken(window).isAuthenticated());
        }
    }, [isAuthenticated]);

    return (
        <>
            <NavBar />
            <div className={styles.homeContainer}>
                {
                    isAuthenticated
                        ?
                        <h1>
                            Welcome home {userName}
                        </h1>
                        :
                        <h1>
                            Please, log in or register
                        </h1>
                }
            </div>
        </>
    );
}
