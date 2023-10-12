'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '@/app/components/nav/NavBar';
import styles from './Seminars.module.scss';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { Seminar } from '@/app/models/models';
import { useGlobalContext } from '../store/store';
import { authToken } from "@/app/utils/authToken";

const Seminars: React.FC = () => {
    const url = 'http://localhost:3001/seminars'; // TODO: Create .env file
    const router = useRouter();
    const [seminars, setSeminars] = useState<Seminar[] | []>([]);
    const { isAuthenticated } = useGlobalContext();


    const authInterceptor = {
        request: (config: InternalAxiosRequestConfig) => {
            const token = authToken(window).getToken();
            console.log(token);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config; // Return the modified request configuration
        },
        response: (response: AxiosResponse) => {
            return response; // Return the response as-is
        }
    };



    const getSeminars = useCallback(async () => {
        axios.interceptors.request.use(authInterceptor.request);
        axios.interceptors.response.use(authInterceptor.response);

        try {
            const response = await axios.get(url);
            setSeminars(response.data);
        }
        catch (error: any) {
            setSeminars([]);
        }
    }, []);

    useEffect(() => {
        getSeminars();
    }, [getSeminars]);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated]);




    return (
        <div >
            {
                isAuthenticated &&
                <div>
                    <NavBar />
                    <div className={styles.container}>
                        <h1>SEMINARS</h1>
                        <div>
                            {
                                seminars.length ? seminars.map(i => (
                                    <div key={i._id} className={styles.seminars}>
                                        {i.title}
                                    </div>
                                ))
                                    : <div>
                                        Loading Seminars ...
                                    </div>
                            }

                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default Seminars;
