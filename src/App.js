import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom'
import RenderAuthorized from 'ant-design-pro/lib/Authorized'
//import { Alert } from 'antd';
//import logo from './logo.svg';
import './App.css';

import LoginPage from './pages/LoginPage'
import MainLayout from './pages/MainLayout'

class App extends Component {
  render() {
    const Authorized = RenderAuthorized('admin');
    const noMatch = <LoginPage />;

    const open = {
      ontologies: ["ACI-1.1.4", "ISTAT-3.2.1"],
      kgs: ["KG1"],
      dss: ["DS1", "DS2"]
    }

    return (
      <HashRouter>
        <div>
          <Authorized authority="admin" noMatch={noMatch}>
            <MainLayout open={open} />
          </Authorized>
        </div>
      </HashRouter>






      // <div className="App">
      //   <header className="App-header">
      //     {/* <img src={logo} className="App-logo" alt="logo" /> */}
      //     <a
      //       className="App-link"
      //       href="http://localhost:3000"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     > HOME
      //     </a>
      //     <button onClick={(e) => { 
      //       window.history.pushState({msg:"CIAOOO"},"","PIPPO")

      //     }}>PIPPO</button>
      //     <button onClick={(e) => { 
      //      window.history.go(-1)
      //     }}>BACK</button>
      //      <button onClick={(e) => { 
      //       window.history.go(1)
      //     }}>AHEAD</button>
      //   </header>
      // </div>
    );
  }
}

export default App;
