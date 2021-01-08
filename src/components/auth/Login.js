import React, {useState, useContext} from 'react';
import axios from 'axios';
import ErrorNotice from '../misc/ErrorNotice';
import UserContext from '../Context/UserContext';
import {Link, useHistory} from 'react-router-dom';

import classes from './Auth.module.css';
import UpliftImg from '../../assets/images/uplift-logo.png';

function Login(){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const [visible, setVisibility] = useState('password');

    let history = useHistory();

    const {setUserData} = useContext(UserContext);

    const submit = async (e) => {
        e.preventDefault();

        const loginUser = {email, password};
        await axios.post(
            "/users/login",
            loginUser
        ).then(res => {
            setUserData({
                token: res.data.token,
                user: res.data.user
            });
            
            localStorage.setItem("auth-token", res.data.token);
            
            history.push("/notes");
        })
        .catch(err => {
            err.response !== undefined ? setError(err.response.data.msg) : setError("Server Error!");
        });
    }

    const toggleVisibility = () => {
        if (visible === 'password') {
            setVisibility('text');
        } else {
            setVisibility('password');
        }
    }

    return (
        <div className="container">
            <div className={classes.Login}>
                <div className={classes.LogoImg}>
                    <img src={UpliftImg} alt="UPLIFT Logo" className="rounded-circle" />
                </div>
                <h3 className={classes.Heading}>Log In</h3>
                {error && <ErrorNotice message={error} noticeColor="alert-danger" clearError={() => setError(undefined)} />}
                <form onSubmit={submit}>
                    <div className={classes.Content}>
                        <div className="form-group">
                            <label htmlFor="login-email" className="sr-only">Email:</label>
                            <input 
                                id="login-email"
                                type="email"
                                className="form-control" 
                                placeholder="Email"
                                required
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-password" className="sr-only">Password:</label>
                            <input 
                                id="login-password"
                                type={visible}
                                className="form-control" 
                                placeholder="Password"
                                minLength="5"
                                required
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="form-group custom-control custom-checkbox">
                            <input type="checkbox" 
                                id="customCheck"
                                onClick={toggleVisibility}
                                className="custom-control-input" />
                            <label className="custom-control-label" htmlFor="customCheck">Show Password</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-light btn-lg rounded-pill">Login</button>
                </form>
                <div className="w-100 text-center mt-5 mb-2">
                    <Link to="/forgotpassword"style={{
                            textDecoration: 'none'
                            }}>Forgot Password?</Link>
                </div>
                <div role="button" className="badge badge-light font-weight-normal" onClick={() => {history.push("/register")}}>
                    Don't have an account? <strong style={{color: '#24a0ed'}}>Sign up</strong></div>
            </div>
        </div>
    );
}

export default Login;