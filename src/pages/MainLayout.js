import React from 'react';
import { Route, NavLink, Redirect } from 'react-router-dom'
import { Layout } from 'antd';
import logo from '../logo_NEW.svg';
import MainMenu from './MainMenu'
import Home from './Home'
import LoadOntologies from './LoadOntologies'
import CurrentOntology from './CurrentOntology';
const { Content, Footer, Sider } = Layout;

class MainLayout extends React.Component {
  state = {
    collapsed: true,
    current: {},
    open: {
      ontologies: [],
      kgs: [],
      dss: []
    }
  }

  onCollapse = (collapsed) => {
    this.setState((state) => ({
      collapsed: collapsed,
      current: state.current,
      open: state.open
    }));
  }

  openCurrent(ontologyID, versionID) {
    const current = {
      name: ontologyID,
      version: versionID
    }
    const openOntologies = Array.from(this.state.open.ontologies)
    let found = false
    for(let item of openOntologies)
      if(item.name === current.name && item.version === current.version){
        found = true;
        break;
      }

    !found && openOntologies.push(current)
    
    this.setState((state) => ({
      collapsed: state.collapsed,
      current: current,
      open: {
        ontologies: openOntologies,
        kgs: state.open.kgs,
        dss: state.open.dss
      }
    }))

  }

  close(toClose) {
    let current = this.state.current
    const openOntologies = Array.from(this.state.open.ontologies)
    const filtered = openOntologies.filter(item => (item.name !== toClose.name || item.version !== toClose.version))
    if (toClose.name === this.state.current.name && toClose.version === this.state.current.version) {
      current = filtered[0]
    }
    this.setState((state) => ({
      collapsed: state.collapsed,
      current: current,
      open: {
        ontologies: filtered,
        kgs: state.open.kgs,
        dss: state.open.dss
      }
    }))


  }

  setCurrent(current) {
    this.setState((state) => ({
      collapsed: state.collapsed,
      current: current,
      open: state.open
    }))
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }} >
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" style={{ padding: 8 }}>
            <NavLink to="/">
              <img src={logo} alt="logo" />
            </NavLink>
          </div>
          <MainMenu open={this.state.open} current={this.state.current} setcurrent={this.setCurrent.bind(this)} close={this.close.bind(this)} />
        </Sider>
        <Layout>
          {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
          <Content style={{ margin: '16px 16px' }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb> */}
            <div style={{ padding: 24, background: '#fff' }}>
              <Route exact path="/" component={Home} />

              <Route path="/ontology" render={(props) => <LoadOntologies {...props} open={this.openCurrent.bind(this)} />} />
              <Route path="/open/ontology" render={(props) => (
                this.state.current === undefined ?
                  <Redirect to="/" /> :
                  <CurrentOntology {...props} ontology={this.state.current} />
              )
              } />


              <Route path="/kg" component={() => "KNOWLEDGE GRAPHS"} />
              <Route path="/dataset" component={() => "DATASETS"} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            <a href="http://www.obdasystems.com" target="_blank" rel="noopener noreferrer">OBDA Systems ©2018</a>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default MainLayout;