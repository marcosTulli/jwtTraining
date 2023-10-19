// TODO: Use eslint vscode extension
import React, { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import { useMediaQuery } from '@mui/material';
import NavBar from '@/app/components/nav/NavBar';
import { useGlobalContext } from '@/app/store/store';
import { authToken } from '@/app/utils';

export interface HomeProps {
    authCode?: string;
}

export default function Home({ authCode }: HomeProps): JSX.Element {
    const { setAuthCode, isAuthenticated, setIsAuthenticated, user, setUser } = useGlobalContext();
    const isMobile = useMediaQuery('(max-width: 500px)');
    const userName = user.firstName?.charAt(0).toUpperCase().concat(user.firstName?.substring(1));

    useEffect(() => {
        if (authCode) {
            setAuthCode(authCode);
        }

    }, [authCode]);

    useEffect(() => {
        if (window.localStorage.getItem('user')) {
            setUser({ ...user, firstName: String(window.localStorage.getItem('user')) });
        }
    }, []);


    useEffect(() => {
        if (!isAuthenticated) {
            setIsAuthenticated(authToken(window).isAuthenticated());
        }
    }, [isAuthenticated]);



    return (
        <>
            <NavBar authCode={authCode} />
            <div className={styles.homeContainer}>
                {
                    isAuthenticated
                        ?
                        <h1>
                            Welcome home {userName}
                        </h1>
                        :
                        <div>
                            <h1>
                                Please, log in or register
                            </h1>
                            <div>{authCode}</div>
                        </div>

                }
            </div>
        </>
    );
}
