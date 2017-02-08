import React from 'react';
import Facebook from 'react-icons/io/social-facebook';
import Google from 'react-icons/fa/google-plus';

export default function(props) {
    return (
        <div className="form-wrap">
            {<form>
                <h1 className="title">Tuckshop</h1>
                <h2 className="subtitle">Hungry? login now</h2>
                <label>
                    <span className="hidden-label">Email</span>
                    <input value={props.email} onChange={props.handleEmailChange} className="input email-input" placeholder="Email"/>
                </label>
                <label>
                    <span className="hidden-label">Password</span>
                    <input value={props.password} onChange={props.handlePasswordChange} type="password" className="input password-input" placeholder="Password"/>
                </label>
                <div className="button-wrap">
                    <button type="button" onClick={props.emailPasswordLogin} className="primary-button">Sign Up / Login</button>
                    <div className="divider"><span className="or">OR</span></div>
                    <button className="social-button primary-button" onClick={props.facebookLogin}>
                        <Facebook className="icon"></Facebook>
                        Sign in with Facebook
                    </button>
                    <button className="social-button primary-button" onClick={props.googleLogin}>
                        <Google className="icon"></Google>
                        Sign in with Google
                    </button>
                </div>
                {props.usualProvider && <h3>Hmm.. looks like you usually log in with your {props.usualProvider} account. Why not use that instead?</h3>}
            </form>}
        </div>
    );
}
