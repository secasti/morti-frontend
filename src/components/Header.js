
//import axios from "axios";
import {useNavigate} from "react-router-dom";


function Header(props) {
    const navigate = useNavigate();

    function logMeOut() { 
        navigate('/login');
     }
        const logged = localStorage.getItem('email');

        return(
            <header className="App-header">
                <button onClick={logMeOut}> 
                    Logout
                </button>
            </header>
        )
    }

export default Header;