'use client';
import React, { useState, useEffect } from 'react';
import NavBar from '@/app/components/nav/NavBar';
import styles from './Register.module.scss';

interface UserCredentials {
    email: string;
    password: string;
}

const Register: React.FC = () => {
    const [userCredentials, setUserCredentials] = useState<UserCredentials>({ email: '', password: '' });
    const [passcheck, setPassCheck] = useState<string | null>(null);
    const [enableSubmit, setEnableSubmit] = useState<boolean>(true);
    const [fieldError, setFieldError] = useState<string[]>([]);

    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    const messages: Record<string, string> = {
        email: 'Email must contain @ symbol and a domain',
        password: 'Password must be at least 8 characters long',
        passwordMatch: 'Passwords do not match',
    };

    const validateForm = () => {
        const errors: Record<string, string> = {};

        if (!emailRegex.test(userCredentials.email)) {
            errors.email = messages.email;
        }

        if (!userCredentials.password || userCredentials.password.length < 8) {
            errors.password = messages.password;
        }

        if (userCredentials.password !== passcheck) {
            errors.passwordMatch = messages.passwordMatch;
        }

        setFieldError(Object.keys(errors));

        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        if (userCredentials.email.length > 0) {
            setEnableSubmit(false);
            setFieldError([]);
        } else {
            setEnableSubmit(true);
        }
    }, [userCredentials]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserCredentials({ ...userCredentials, [name]: value });
    };

    const handleSubmit = () => {
        if (validateForm()) {
            // Submit logic here
        }
    };

    return (
        <div>
            <NavBar />
            <div className={styles.homeContainer}>
                <div>
                    <p>Register</p>
                    <form className={styles.registerForm}>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email Address"
                            value={userCredentials.email}
                            onChange={handleInputChange}
                        />
                        <div className={styles.validationError}>
                            {fieldError.includes('email') ? <p>{messages.email}</p> : <p></p>}
                        </div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={userCredentials.password}
                            onChange={handleInputChange}
                        />
                        <div className={styles.validationError}>
                            {fieldError.includes('password') ? <p>{messages.password}</p> : <p></p>}
                        </div>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={passcheck || ''}
                            onChange={(e) => setPassCheck(e.target.value)}
                        />
                        <div className={styles.validationError}>
                            {fieldError.includes('passwordMatch') ? <p>{messages.passwordMatch}</p> : <p></p>}
                        </div>
                        <button disabled={enableSubmit} onClick={handleSubmit} type="button">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
