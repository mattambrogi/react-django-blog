import React from 'react'
import { useCookies } from 'react-cookie';
import { Link } from "react-router-dom";




function Header() {
    const [token, setToken, removeToken] = useCookies(['mytoken'])

    const logoutUser = () => {
        removeToken(['mytoken'])
    }

    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <Link id="title" to={"/posts"}>
                        <h1>Django and React Blog</h1>
                    </Link>

                </div>
                <ul className="nav navbar-nav">
                    <li><button onClick={logoutUser} className="btn btn-primary">Logout</button></li>
                </ul>
            </div>
        </nav>
    )
}

export default Header
