import './App.css';
import { BrowserRouter } from 'react-router-dom';

import Header from './Component/Header/Header'
import Main from './Component/Main/Main'
import Sidebar from './Component/Sidebar/Sidebar'
import Footer from './Component/Footer/Footer'

import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000/' 
axios.defaults.headers.get['Accept'] = 'application/json' 
axios.defaults.headers.post['Accept'] = 'application/json'


function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Main></Main>
      <Sidebar></Sidebar>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
