import React from 'react';

import './custom-button.styles.scss'

const CustomButton = ({ children, inverted, isGoogleSignin, ...otherProps }) => (
    <button className={
        `${isGoogleSignin ? 'google-sign-in' : ''} 
         ${inverted ? 'inverted' : ''}
            custom-button`} {...otherProps}>
        {children}
    </button>
);

export default CustomButton;