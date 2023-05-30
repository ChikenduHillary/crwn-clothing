import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { emailSignInStart, googleSignInStart } from '../../redux/user/user.actions';

import './sign-in.styles.scss';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email: "",
            password: ""
        }
    }

    handleSubmit = async event => {
        event.preventDfault();

        const { email, password } = this.state;
        const { emailSignInStart } = this.props;

        emailSignInStart(email, password);

    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({ [name]: value })
    }
    
    render() {
        const { googleSignInStart } = this.props;
        return (
            <div className="sign-in">
                <h1>I already have an account</h1>
                <span>Sign in with your email and password</span>
                
                <form onSubmit={this.handleSubmit}>
                    <FormInput type='email' name='email' label='email' value={this.state.email} handleChange={this.handleChange} required/>
                    <FormInput type='password' name='password' label='password' value={this.state.password} handleChange={this.handleChange} required />
                    <div className='buttons'>
                        <CustomButton type='submit'> Sign In </CustomButton>
                        <CustomButton type='button' onClick={googleSignInStart} isGoogleSignin> Sign In with Google</CustomButton>
                    </div>
                    <p>You dont have and account? <Link to='/signup'><i className='link'>Sign Up</i></Link></p>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn)