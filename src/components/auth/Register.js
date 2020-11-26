import React, {useState, useContext} from 'react';
import axios from 'axios';
import UserContext from '../Context/UserContext';
import ErrorNotice from '../misc/ErrorNotice';

function Register() {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [error, setError] = useState();

    const {setUserData} = useContext(UserContext);

    const submit = async (e) => {
        e.preventDefault();

        try {
            const newUser = {username, email, password, passwordCheck};
            await axios.post(
                "http://localhost:5000/users/register",
                newUser
            );
            const loginRes = await axios.post("http://localhost:5000/users/login", {
                email,
                password
            });

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
                <h3 className="card-header display-4">Sign up!</h3>
                <div className="card-body p-5">
                    {error && <ErrorNotice message={error} noticeColor="alert-danger" clearError={() => setError(undefined)} />}
                    <form onSubmit={submit}>
                        <div className="form-group">
                            <label htmlFor="reg-username">Username:</label>
                            <input
                                id="reg-username" 
                                type="text" 
                                className="form-control"
                                placeholder="Enter Username"
                                onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="reg-email">Email:</label>
                            <input 
                                id="reg-email"
                                type="email"
                                className="form-control" 
                                placeholder="Enter Email"
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="reg-password">Password:</label>
                            <input 
                                id="reg-password"
                                type="password" 
                                className="form-control" 
                                placeholder="Enter Password"
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="reg-repeatpassword">Confirm Password:</label>
                            <input 
                                id="reg-repeatpassword"
                                type="password" 
                                className="form-control" 
                                placeholder="Confirm Password"
                                onChange={(e) => setPasswordCheck(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-info">Get Started</button>
                    </form>
                </div>
                <div role="button" className="badge badge-light font-weight-normal mt-3" onClick={() => {window.location = "/login"}}>
                    Already a User? <strong style={{color: '#24a0ed'}}>Go Login</strong></div>
            </div>
        </div>
    );
}

export default Register;