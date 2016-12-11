import React from 'react';
import FaFacebookOfficial from 'react-icons/fa/facebook-official';
import FaGooglePlusSquare from 'react-icons/fa/google-plus-square';

export default function(props) {
    return (
        <div>
            {<form>
                <h2>Login or sign up</h2>
                <label>
                    <span className="label">Email</span>
                    <input className="input"/>
                </label>
                <label>
                    <span className="label">Password</span>
                    <input type="password" className="input"/>
                </label>
                <div className="button-wrap">
                    <button type="button" onClick={props.emailPasswordLogin} className="primary-button">Create Test User</button>
                    <button className="social-button" title="Login with Google" onClick={props.googleLogin}>
                        <FaGooglePlusSquare className="icon"></FaGooglePlusSquare>
                    </button>
                    <button className="social-button" title="Login with Facebook" onClick={props.facebookLogin}>
                        <FaFacebookOfficial className="icon"></FaFacebookOfficial>
                    </button>
                </div>
                {props.usualProvider && <h3>Hmm.. looks like you usually log in with {props.usualProvider}. Why not use that instead?</h3>}
            </form>}
        </div>
    );
}
