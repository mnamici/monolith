import React from 'react';
import { Route, NavLink, Redirect } from 'react-router-dom'
import { Layout } from 'antd';
// import logo_scritta from '../scritta.svg';
// import logo from '../only_logo.svg';
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

  componentWillMount() {
    const mainState = JSON.parse(localStorage.getItem("mainState"))
    this.setState(mainState)

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
    for (let item of openOntologies)
      if (item.name === current.name && item.version === current.version) {
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
    let filtered
    if (toClose.version !== undefined)
      filtered = openOntologies.filter(item => (item.name !== toClose.name || item.version !== toClose.version))
    else
      filtered = openOntologies.filter(item => (item.name !== toClose.name))
    if (this.state.current !== undefined && toClose.name === this.state.current.name && toClose.version === this.state.current.version) {
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
    localStorage.setItem('mainState', JSON.stringify(this.state))
    return (
      <Layout style={{ height: '100vh' }} >
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}

        >
          <div style={{ position: 'fixed' }}>
            <div style={{ padding: 16 }} >
              <NavLink to="/">
                {/* <img src={this.state.collapsed ? logo : logo_scritta} alt="logo" style={this.state.collapsed ? { maxHeight: 60 } : {}} /> */}
                <div className={this.state.collapsed ? 'logo-closed' : 'logo-open'} />
              </NavLink>
            </div>
            <MainMenu
              collapsed={this.state.collapsed}
              open={this.state.open}
              current={this.state.current}
              setcurrent={this.setCurrent.bind(this)}
              close={this.close.bind(this)}
              logout={this.props.logout}
            />

          </div>
        </Sider>
        <Layout>
          {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
          <Content style={{ margin: '1vh 1vw 1vh 1vw' }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb> */}
            <div style={{ padding: '0px' }}>
              <Route exact path="/" render={(props) =>
                <Home {...props} openOntology={this.openCurrent.bind(this)} />} />

              <Route path="/ontology" render={(props) =>
                <LoadOntologies {...props} open={this.openCurrent.bind(this)} close={this.close.bind(this)} />} />
              <Route path="/open/ontology/:menu" render={(props) => (
                this.state.current === undefined ?
                  <Redirect to="/" /> :
                  <CurrentOntology {...props} ontology={this.state.current} />
              )
              } />


              <Route path="/kg" component={() => "KNOWLEDGE GRAPHS"} />
              <Route path="/dataset" component={() => "DATASETS"} />
            </div>
          </Content>
          <Footer style={{ padding: '2px', textAlign: 'center' }}>
            <a href="http://www.obdasystems.com" target="_blank" rel="noopener noreferrer">OBDA Systems ©2018</a>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default MainLayout;