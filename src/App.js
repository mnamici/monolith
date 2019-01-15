import React, { Component } from 'react';
import {HashRouter} from 'react-router-dom'
import RenderAuthorized from 'ant-design-pro/lib/Authorized'
//import { Alert } from 'antd';
//import logo from './logo.svg';
import './App.css';

import LoginPage from './pages/LoginPage'
import MainLayout from './pages/MainLayout';
import Home from './pages/Home'
import LoadOntologies from './pages/LoadOntologies'
import CurrentOntology from './pages/CurrentOntology'
import OntologyInfo from './pages/OntologyInfo'
import OntologyWiki from './pages/OntologyWiki'
import LoadMappings from './pages/LoadMappings';
import CurrentMapping from './pages/CurrentMapping';
import MappingInfo from './pages/MappingInfo';
import AssertionsPane from './pages/AssertionsPane'
import SQLViewsPane from './pages/SQLViewsPane';
import SPARQLEndpoint from './pages/SPARQLEndpoint';

class App extends Component {
  render() {
    const Authorized = RenderAuthorized('admin');
    const noMatch = <LoginPage />;

    const open = {
      ontologies: ["ACI-1.1.4", "ISTAT-3.2.1"],
      kgs: ["KG1"],
      dss: ["DS1", "DS2"]
    }

    const mappings = [
      <MappingInfo />,
      <AssertionsPane />,
      <SQLViewsPane />,
    ]

    const ontos = [
      <OntologyInfo />,
      <OntologyWiki />,
      <LoadMappings />,
      <CurrentMapping>
        {mappings[2]}
      </CurrentMapping>,
      <SPARQLEndpoint />
    ]
    const contents = [
      <Home />,
      <LoadOntologies />,
      <CurrentOntology>
        {ontos[4]}
      </CurrentOntology>
    ]


    return (
      <HashRouter>
        <div>
          <Authorized authority="admin" noMatch={noMatch}>
            <MainLayout open={open} >{contents[0]}</MainLayout>
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
