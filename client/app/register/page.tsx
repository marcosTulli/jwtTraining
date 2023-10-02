import React from 'react';
import NavBar from '@/app/components/nav/NavBar';
import styles from './Register.module.scss';

const Register = () => {
    return (
        <div>
            <NavBar />
            <div className={styles.homeContainer}>

                <div>
                    <p>Register</p>
                    <form className={styles.registerForm}>
                        <input type="text" placeholder='Email Address' />
                        <input type="password" placeholder='Password' />
                        <input type="text" placeholder='Password' />
                        <button type='submit'>Submit</button>
                    </form>
                </div>
            </div>


        </div>
    );
};

export default Register;