import './App.css';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignUp from './Main/Registration/SignUp';
import Login from './Main/Registration/Login';

import Example from './Example';

function App() {
  return (
    <div>
      <Router>  
        <div className="App">
          <Route path="/signup" component={SignUp}/>
          <Route path="/login" component={Login}/>
        </div>
      </Router>
    </div>
  );
}


export default App;

  // <