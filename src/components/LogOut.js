
//import axios from "axios";
import {useNavigate} from "react-router-dom";
import './LogOut.css'


function LogOut(props) {
    const navigate = useNavigate();

    function logMeOut() { 
        navigate('/login');
        props.removeToken();
        props.handleLogout();
     }
        // const logged = localStorage.getItem('email');

        return(
                <button onClick={logMeOut} className="logOut"> 
                    Logout
                </button>
        )
    }

export default LogOut;