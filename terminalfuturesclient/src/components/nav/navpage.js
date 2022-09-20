import { Link, useNavigate } from "react-router-dom"
import "./navpage.css"

export const NavPage = () => {
    const navigate = useNavigate()
    return (
        <ul className="navbar">
            
            <li className="navbar__item">
                <button className="nav-link fakeLink"
                            onClick={() => {

                                navigate('/stories')
                            }}
                        >Back to Stories</button>
            </li>
            
            {
                (localStorage.getItem("lu_token") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("lu_token")
                                navigate('/login')
                            }}
                        >Logout</button>
                    </li> :
                    <></>
            }        
            </ul>
    )
}
{/* <li className="navbar__item">
                <Link className="navbar__link" to="/events">Events</Link>
            </li> */}