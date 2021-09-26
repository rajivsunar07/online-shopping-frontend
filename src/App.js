import './App.css';
import { BrowserRouter } from 'react-router-dom';

import Header from './Component/Header/Header'
import Main from './Component/Main/Main'

import ReactNotifications from 'react-notifications-component';

import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000/' 
axios.defaults.headers.get['Accept'] = 'application/json' 
axios.defaults.headers.post['Accept'] = 'application/json'


function App() {
  return (
    
    <BrowserRouter>
      <ReactNotifications />
      <Header></Header>
      <Main></Main>
    </BrowserRouter>
  );
}

export default App;
