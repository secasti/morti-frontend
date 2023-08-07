
import { useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import { set } from 'lodash';


function App() {

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Function to handle successful authentication
  const handleAuthentication = () => {
    // Set isAuthenticated to true after successful authentication
    setIsAuthenticated(true);
  };

  //handle logout
  const handleLogout = () => {
    set(false);
  };
 

  // If authenticated, show the main content based on the active component
  return (
    <Router>
      <Switch>

        {/* login page route */}
        <Route exact path="/Login">
          {/* pass handleauth function to login component  */}
          <Login onLogin={handleAuthentication} />
        </Route>

        {/* if authentication passes, there is a protected route that allows dashboard to be acessed */}
        <ProtectedRoute exact path="/dashboard" component={Dashboard} isAuthenticated={isAuthenticated} />
        
       {/* redirect to dashboard or login depending on auth */}
        <Route path="*">
          {isAuthenticated ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
        </Route>

      </Switch>
    </Router>
  );
};

export default App;
