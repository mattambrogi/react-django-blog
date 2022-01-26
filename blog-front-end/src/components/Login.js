import React, { useState, useEffect } from 'react'
import APIService from '../APIService';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useCookies(['mytoken'])
    const [usr, setUsr] = useCookies(['currusr'])
    const [usrName, setUsrName] = useCookies(['currUserName'])
    const [isLogin, setLogin] = useState(true)
    let navigate = useNavigate()


    useEffect(() => {
        if (token['mytoken'] && token['mytoken'] !== "undefined") {
            navigate('/posts')
        }
    }, [token])

    const loginUser = () => {
        APIService.LoginUser({ username, password })
            .then(function (resp) {
                setToken('mytoken', resp.key)
                setUsr('currusr', resp.user)
                setUsrName('currUserName', resp.username)


            })
    }

    const registerUser = () => {
        const password1 = password
        const password2 = password
        APIService.RegisterUser({ username, password1, password2 })
            .then(resp => loginUser())
            .catch(error => console.log(error))
    }

    return (
        <div className="App">
            <br />
            <br />
            {isLogin ? <h1>Please Login</h1> : <h1>Please Register</h1>}

            <br />

            <div className="mb-3">
                <label htmlFor="username" className="form=label">Username</label>
                <br />
                <input type="text" className="form-control" id="username"
                    placeholder="Please enter your username"
                    value={username} onChange={e => setUsername(e.target.value)}></input>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form=label">Password</label>
                <br />
                <input type="password" className="form-control" id="password"
                    placeholder="Please enter your password"
                    value={password} onChange={e => setPassword(e.target.value)}></input>
            </div>
            {isLogin ? <button onClick={loginUser} className="btn btn-primary">Login</button>
                : <button onClick={registerUser} className="btn btn-primary">Register</button>}


            <div className="mb-3">
                <br />
                {isLogin ? <h5>If you don't have an account, please
                    <button className="btn btn-primary" onClick={() => setLogin(false)}>Register</button></h5>
                    : <h5>If you have an account, please <button className="btn btn-primary" onClick={() => setLogin(true)}>Login</button></h5>
                }
            </div>
        </div>
    )
}

export default Login
