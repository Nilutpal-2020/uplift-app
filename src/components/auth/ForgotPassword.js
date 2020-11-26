import React, {useState} from 'react';
import axios from 'axios';
import ErrorNotice from '../misc/ErrorNotice';
import {Link} from 'react-router-dom';

function ForgotPassword(){
    const [email, setEmail] = useState();
    const [error, setError] = useState();
    const [resMsg, setMsg] = useState();

    const submit = async (e) => {
        e.preventDefault();

        try {
            const User = {email};
            const response = await axios.post(
                "http://localhost:5000/users/forgot-password",
                User
            );

            response.data.msg && setMsg(response.data.msg);
            // console.log(response.data.msg);
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
        
    }

    return (
        <div className="container">
            <div className="card m-3 text-center">
                <h3 className="card-header display-4">Password Reset</h3>
                {error && <ErrorNotice message={error} noticeColor="alert-danger" clearError={() => setError(undefined)} />}
                {resMsg && <ErrorNotice message={resMsg} noticeColor="alert-success" clearError={() => setMsg(undefined)} />}
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
                        <button type="submit" className="btn btn-info">Reset Password</button>
                    </form>
                    <hr className="my-4" />
                    <div className="w-100 text-center mt-2">
                        <Link to="/login">Go to Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;