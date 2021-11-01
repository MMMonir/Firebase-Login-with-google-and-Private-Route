import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    // const {signInUsingGoogle, signInUsingGithub} = useAuth();
    const {signInUsingGoogle} = useAuth();
    const location = useLocation();
    const history = useHistory();
    const redirect_uri = location.state?.from || '/home';

    const handleGoogleLogin = () => {
        signInUsingGoogle()
        .then(result => {
            history.push(redirect_uri);
        })
    }
    return (
        <div>
            <h2>Please Login</h2>
            <button onClick={handleGoogleLogin}>Google Sign In</button>
            <br/>
            {/* <button onClick={signInUsingGithub}>Github Sign In</button>
            <br/> */}
            <Link to="/register">New User?</Link>
        </div>
    );
};

export default Login;