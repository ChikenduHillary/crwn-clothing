import React, {useState, useEffect} from 'react';
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

import "./sign-in-and-sign-up.styles.scss";

const SignInAndSignOut = () => {
    const [screenSize, setScreenSize] = useState(0);
    const [isSignUp, setIsSignUp] = useState(true);

    useEffect(()=> {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    console.log(isSignUp);

    return (
    <div className="sign-in-sign-up">
        {
            screenSize < 800 ? 
            (
            <div>
                {isSignUp ? <SignIn /> : <SignUp />}
                {isSignUp ? <span className='message'>Dont have an account? <i className='link' onClick={() => setIsSignUp(!isSignUp)}>Sign Up</i></span> :
                    <span className='message'>Already have an account? <i className='link' onClick={() => setIsSignUp(!isSignUp)}>Sign in</i></span>}
            </div>
            ) 
            : 
            (
            <div className='sign-in-sign-up'>
                <SignIn />
                <SignUp />
            </div>
            )
        }
    </div>
)}

export default SignInAndSignOut