import React from 'react';
import { Route } from 'react-router-dom'
import { Layout, Icon } from 'antd';
import UnderConstruction from './UnderConstruction';
import KnowledgeGraphMenu from './KnowledgeGraphMenu';
import KnowledgeGraphInfo from './KnowledgeGraphInfo';

const { Content, Sider } = Layout;
export default class CurrentKnowledgeGraph extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render() {
        return (
            <Layout style={{ height: 'calc(100vh - 25px)' }}>
                <Sider
                    // width={200} 
                    className='ontologyMenu'
                    collapsed={this.state.collapsed}
                >
                    <KnowledgeGraphMenu select={this.props.match.params.menu} />
                    <div>
                        <Icon
                            className="ontologyTrigger"
                            style={{ display: "inherit", cursor: "pointer", color: 'white', padding: 4 }}
                            type={this.state.collapsed ? 'right' : 'left'}
                            onClick={this.toggle}
                        />
                    </div>

                </Sider>
                <Layout>
                    <Content >
                        <div>
                            <Route path="/open/kg/info" render={(props) =>
                                <KnowledgeGraphInfo {...props} kg={this.props.kg}/>} />
                            <Route path="/open/kg/explore" render={(props) =>
                                <UnderConstruction />} />
                            <Route path="/open/kg/endpoint" render={(props) =>
                                <UnderConstruction />} />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
