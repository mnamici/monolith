import React from 'react';
import { Route, NavLink } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import MappingInfo from './MappingInfo';
import AssertionsPane from './AssertionsPane';
import SQLViewsPane from './SQLViewsPane';

const {
    Header, Content,
} = Layout;

class CurrentMapping extends React.Component {
    

    render() {

        const curr = [this.props.location.pathname.substr(this.props.location.pathname.lastIndexOf('/')+1)]
        return (
            <Layout>
                <Header style={{ background: '#fff' }}>
                    <Menu
                    defaultSelectedKeys={curr}
                        mode="horizontal"
                    >
                        <Menu.Item key="info">
                            <NavLink to="/open/ontology/mapping/info">
                                Mapping Info
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="assertions">
                            <NavLink to="/open/ontology/mapping/assertions">
                                Assertions
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="views">
                            <NavLink to="/open/ontology/mapping/sqlViews">
                                SQL Views
                            </NavLink>
                        </Menu.Item>
                        {/* <Menu.Item key="dependencies">
                            Dependencies
                        </Menu.Item> */}
                    </Menu>
                </Header>
                <Content style={{ background: '#fff' }}>
                    <Route path="/open/ontology/mapping/info" component={MappingInfo} />
                    <Route path="/open/ontology/mapping/assertions" component={AssertionsPane} />
                    <Route path="/open/ontology/mapping/sqlViews" component={SQLViewsPane} />
                </Content>
            </Layout>

        );
    }
}

export default CurrentMapping;