// TODO: Use eslint vscode extension
import React from 'react';
import styles from './Home.module.scss';
import { useMediaQuery } from '@mui/material';
import NavBar from '../nav/NavBar';

export default function Home() {
    const isMobile = useMediaQuery('(max-width: 500px)');
    return (
        <>
            <NavBar />
            <div className={styles.homeContainer}>
                <h1>
                    Home
                </h1>
            </div>
        </>
    );
}
