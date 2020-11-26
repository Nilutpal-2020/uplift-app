import React, {useState, useContext} from 'react';
import axios from 'axios';
import ErrorNotice from '../misc/ErrorNotice';
import UserContext from '../Context/UserContext';
import {Link} from 'react-router-dom';

function Login(){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();


    const {setUserData} = useContext(UserContext);

    const submit = async (e) => {
        e.preventDefault();
        try {
            const loginUser = {email, password};
            const loginRes = await axios.post(
                "http://localhost:5000/users/login",
                loginUser
            );

            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user
            });

            localStorage.setItem("auth-token", loginRes.data.token);

            window.location = "/notes";
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
        
    }
    return (
        <div className="container">
            <div className="card m-3 text-center">
                <h3 className="card-header display-4">Log In!</h3>
                {error && <ErrorNotice message={error} noticeColor="alert-danger" clearError={() => setError(undefined)} />}
                <div className="card-body p-5">
                    <form onSubmit={submit}>
                        <div className="form-group">
                            <label htmlFor="login-email">Email:</label>
                            <input 
                                id="login-email"
                                type="email"
                                className="form-control" 
                                placeholder="Enter Email"
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-password">Password:</label>
                            <input 
                                id="login-password"
                                type="password" 
                                className="form-control" 
                                placeholder="Enter Password"
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-info">Log In</button>
                    </form>
                    <div className="w-100 text-center mt-2">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                </div>
                <div role="button" className="badge badge-light font-weight-normal" onClick={() => {window.location = "/register"}}>
                    Don't have an account? <strong style={{color: '#24a0ed'}}>Sign up</strong></div>
            </div>
        </div>
    );
}

export default Login;