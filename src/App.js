import './App.css';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignUp from './Main/Registration/SignUp';

function App() {
  return (
    <Router>  
      <div className="App">
        <Route path="/register" component={SignUp}/>
      </div>
    </Router>
  );
}

export default App;
