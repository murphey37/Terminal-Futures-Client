import { Link, useNavigate } from "react-router-dom"
import "./navpage.css"

export const NavPage = () => {
    const navigate = useNavigate()
    return (
        <ul className="navpage">
            {(localStorage.getItem("lu_token") !== null) ?
            <ul className="navpage__item">
                <button className="nav-link fakeLink"
                            onClick={() => {

                                navigate('/stories')
                            }}
                        >Back to Stories</button>
            </ul>:
            <></>
}
            
            {
                (localStorage.getItem("lu_token") !== null) ?
                    <ul className="navpage-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("lu_token")
                                navigate('/')
                            }}
                        >Logout</button>
                    </ul> :
                    <></>
            }        
            </ul>
    )
}
