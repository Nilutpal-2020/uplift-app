import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import UserContext from '../Context/UserContext';
import ErrorNotice from '../misc/ErrorNotice';

import classes from './Auth.module.css';
import UpliftImg from '../../assets/images/uplift-logo.png';

function Register() {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [error, setError] = useState();
    const [visible, setVisibility] = useState('password');

    let history = useHistory();

    const {setUserData} = useContext(UserContext);

    const submit = async (e) => {
        e.preventDefault();

        const newUser = {username, email, password, passwordCheck};
        await axios.post(
            "/users/register",
            newUser
        ).catch(err => {
            err.response !== undefined ? setError(err.response.data.msg) : setError("Server Error!");
        });

        await axios.post("/users/login", {
            email,
            password
        })
        .then(res => {
            setUserData({
                token: res.data.token,
                user: res.data.user
            });
    
            localStorage.setItem("auth-token", res.data.token);

            history.push("/notes");
        })
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
                <h3 className={classes.Heading}>Sign Up</h3>
                {error && <ErrorNotice message={error} noticeColor="alert-danger" clearError={() => setError(undefined)} />}
                <form onSubmit={submit}>
                    <div className={classes.Content}>
                        <div className="form-group">
                            <label htmlFor="reg-username" className="sr-only">Username:</label>
                            <input
                                id="reg-username" 
                                type="text" 
                                className="form-control"
                                placeholder="Username"
                                required
                                onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="reg-email" className="sr-only">Email:</label>
                            <input 
                                id="reg-email"
                                type="email"
                                className="form-control" 
                                placeholder="Email"
                                required
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="reg-password" className="sr-only">Password:</label>
                            <input 
                                id="reg-password"
                                type={visible}
                                className="form-control" 
                                placeholder="Password"
                                minLength="5"
                                required
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="reg-repeatpassword" className="sr-only">Confirm Password:</label>
                            <input 
                                id="reg-repeatpassword"
                                type={visible} 
                                className="form-control" 
                                placeholder="Confirm Password"
                                minLength="5"
                                required
                                onChange={(e) => setPasswordCheck(e.target.value)} />
                        </div>
                        <div className="form-group custom-control custom-checkbox">
                            <input type="checkbox" 
                                id="customCheck"
                                onClick={toggleVisibility}
                                className="custom-control-input" />
                            <label className="custom-control-label" htmlFor="customCheck">Show Password</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-light btn-lg rounded-pill">Register</button>
                </form>
                <div role="button" className="badge badge-light font-weight-normal mt-5" onClick={() => history.push("/login")}>
                    Already a User? <strong style={{color: '#24a0ed'}}>Go Login</strong>
                </div>
            </div>
        </div>
    );
}

export default Register;