import React from 'react';
import { Link } from 'react-router-dom';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './sign-up.styles.scss';
import { signUpStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';

class SignUp extends React.Component {
    constructor() {
        super();
              
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        
        const { displayName, email, password, confirmPassword } = this.state;
        const { signUpStart } = this.props;

        signUpStart(displayName, email, password, confirmPassword);

        this.setState({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    }

    handleChange = event => {
        const { name, value } = event.target;
        
        this.setState({ [name]: value });
    }
    
    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        onChange={this.handleChange}
                        label='Display Name'
                        required
                    />
                      <FormInput
                        type='email'
                        name='email'
                        value={email}
                        onChange={this.handleChange}
                        label='email'
                        required
                    />
                      <FormInput
                        type='password'
                        name='password'
                        value={password}
                        onChange={this.handleChange}
                        label='password'
                        required
                    />
                      <FormInput
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label='Confirm Password'
                        required
                    />
                    <CustomButton type='submit'>Sign Up</CustomButton>
                </form>
                <p>Already have an account? <Link to='/signin'><i className='link'>Sign In</i></Link></p>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    signUpStart: (displayName, email, password, confirmPassword) => dispatch(signUpStart({displayName, email, password, confirmPassword}))
})

export default connect(null, mapDispatchToProps)(SignUp);