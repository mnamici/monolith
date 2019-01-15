import React from 'react';
import { Route, NavLink } from 'react-router-dom'
import { Layout } from 'antd';
import logo from '../logo.svg';
import MainMenu from './MainMenu'
import Home from './Home'
import LoadOntologies from './LoadOntologies'
import CurrentOntology from './CurrentOntology';
const { Content, Footer, Sider } = Layout;

class MainLayout extends React.Component {
  state = {
    collapsed: true,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" >
            <NavLink to="/home">
              <img src={logo} alt="logo" />
            </NavLink>
          </div>
          <MainMenu open={this.props.open} />
        </Sider>
        <Layout>
          {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
          <Content style={{ margin: '16px 16px' }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb> */}
            <div style={{ padding: 24, background: '#fff' }}>
              <Route path="/home" component={Home} />
              
              <Route path="/ontology" component={LoadOntologies} />
              <Route path="/open/ontology" component={CurrentOntology} />


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