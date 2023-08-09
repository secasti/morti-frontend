
//import axios from "axios";
import {useNavigate} from "react-router-dom";


function Header(props) {
    const navigate = useNavigate();

    function logMeOut() { 
        navigate('/login');
        props.removeToken();
        props.handleLogout();
     }
        // const logged = localStorage.getItem('email');

        return(
                <button onClick={logMeOut}> 
                    Logout
                </button>
        )
    }

export default Header;