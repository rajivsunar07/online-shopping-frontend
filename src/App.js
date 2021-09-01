import './App.css';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignUp from './Main/Registration/SignUp';
import Login from './Main/Registration/Login';
import Product from './Component/Product';


function App() {
  return (
    <div>
      <Router>  
        <div className="App">
          <Route path="/signup" component={SignUp}/>
          <Route path="/login" component={Login}/>
          <Route path="/product" component={Product}/>
        </div>
      </Router>
    </div>
  );
}


export default App;

  // <