'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '@/app/components/nav/NavBar';
import styles from './Seminars.module.scss';
import axios from 'axios';
import { Seminar } from '@/app/models/models';

const Seminars: React.FC = () => {
    const url = 'http://localhost:3001/seminars'; // TODO: Create .env file
    const [seminars, setSeminars] = useState<Seminar[] | []>([]);
    const getSeminars = useCallback(async () => {
        try {
            const response = await axios.get(url);
            setSeminars(response.data);
        }
        catch (error) {
            console.log(error);
            setSeminars([]);
        }
    }, []);

    useEffect(() => {
        getSeminars();
    }, [getSeminars]);

    return (
        <div >
            <NavBar />
            <div className={styles.container}>
                <h1>SEMINARS</h1>
                <div>
                    {
                        seminars.map(i => (
                            <div key={i._id} className={styles.seminars}>
                                {i.title}
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    );
};

export default Seminars;
