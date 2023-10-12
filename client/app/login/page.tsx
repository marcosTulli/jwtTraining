'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '@/app/components/nav/NavBar';
import styles from './LogIn.module.scss';
import axios from 'axios';
import { authToken } from "@/app/utils/index";
import { User } from '@/app/models/models';
import { useGlobalContext } from '../store/store';
const base64 = require('base-64');

const blankUser = {
    firstName: '', lastName: '', email: '', password: ''
};

const Register: React.FC = () => {
    const router = useRouter();
    const [formValues, setFormValues] = useState<User>(blankUser);
    const [passcheck, setPassCheck] = useState<string | null>(null);
    const [enableSubmit, setEnableSubmit] = useState<boolean>(true);
    const [fieldError, setFieldError] = useState<string[]>([]);
    const [signUpOk, setSignUpOk] = useState(false);
    const [rejectMessage, setRejectMessage] = useState<string>("Unable to add user");
    const [signUpNok, setSignUpNok] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { user, setUser, isAuthenticated } = useGlobalContext();
    const url = 'http://localhost:3001/register'; // TODO: Create .env file
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    const messages: Record<string, string> = {
        email: 'Email must contain @ symbol and a domain',
        password: 'Password must be at least 8 characters long'
    };



    const validateForm = () => {
        const errors: Record<string, string> = {};
        if (!emailRegex.test(user.email)) {
            errors.email = messages.email;
        }
        if (!user.password || user.password.length < 8) {
            errors.password = messages.password;
        }
        setFieldError(Object.keys(errors));
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (user.email.length > 3) {
            setEnableSubmit(false);
            setFieldError([]);
        } else {
            setEnableSubmit(true);
        }
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        setFormValues({ ...formValues, [name]: value });
    };


    const handleLogIn = async () => {
        if (validateForm()) {
            setIsLoading(true);
            user.password = base64.encode(user.password);
            // axios
            //     .post(url, user)
            //     .then((res) => {
            //         setSignUpOk(!signUpOk);
            //         setFormValues(blankUser);
            //         authToken(window).setToken(res.data.token);
            //         console.log("Registered succesfully");
            //         router.push('/');
            //     })
            //     .catch((e) => {
            //         setSignUpNok(!signUpNok);
            //         setUser(blankUser);
            //         if (e.response.status === 409) {
            //             setRejectMessage("User already exists");
            //             console.log("User Already exists");
            //         }
            //         else {
            //             console.log("Unable to add user");
            //         }
            //     }).finally(() => {
            //         setPassCheck("");
            //         setIsLoading(false);
            //     });

            console.log("Log IN");
        }
    };

    useEffect(() => {
        if (signUpOk) {
            setTimeout(() => { setSignUpOk(!signUpOk); }, 1500);
        }
        if (signUpNok) {
            setTimeout(() => { setSignUpNok(!signUpNok); }, 2500);
        }

    }, [signUpOk, signUpNok]);


    return (
        <div>
            <NavBar />
            <div className={styles.homeContainer}>
                <div>
                    <p>Log In</p>
                    <form className={styles.registerForm}>
                        <input
                            autoComplete='true'
                            type="text"
                            name="email"
                            placeholder="Email Address"
                            value={formValues.email}
                            onChange={handleInputChange}
                        />
                        <div className={styles.validationError}>
                            {fieldError.includes('email') ? <p>{messages.email}</p> : <p></p>}

                        </div>
                        <input
                            autoComplete="true"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formValues.password}
                            onChange={handleInputChange}
                        />
                        <div className={styles.validationError}>
                            {fieldError.includes('password') ? <p>{messages.password}</p> : <p></p>}
                        </div>
                        <button disabled={enableSubmit} onClick={handleLogIn} type="button" className={styles.submit}>
                            Log In
                        </button>
                        {/* TODO: Optimize rendering */}
                    </form>
                    {
                        isLoading ? <p className={styles.loading}> Loading ... </p>
                            :
                            signUpOk ?
                                <p className={styles.confirmation}>
                                    Logged In
                                </p>
                                : signUpNok ?
                                    <p className={styles.confirmationRejected}>
                                        {rejectMessage}
                                    </p>
                                    : <p style={{ height: '20px' }}></p>
                    }
                </div>
            </div>
        </div>
    );
};

export default Register;
