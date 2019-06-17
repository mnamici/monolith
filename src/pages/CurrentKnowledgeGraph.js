import React from 'react';
import { Route } from 'react-router-dom'
import { Layout, Icon } from 'antd';
import KnowledgeGraphMenu from './KnowledgeGraphMenu';
import KnowledgeGraphInfo from './KnowledgeGraphInfo';
import KnowledgeGraphSPARQLEndpoint from './KnowledgeGraphSPARQLEndpoint';
import ImportKnowledgeGraph from './ImportKnowledgeGraph';
import InstanceNavigation from './InstanceNavigationGroup';
import KnowledgeGraphExplore from './KnowledgeGraphExplore';

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
                                <KnowledgeGraphInfo {...props} kg={this.props.kg} />} />
                            <Route path="/open/kg/import" render={(props) =>
                                <ImportKnowledgeGraph {...props} kg={this.props.kg} />} />
                            <Route path="/open/kg/explore/:tab" render={(props) =>
                                <KnowledgeGraphExplore {...props} kg={this.props.kg} />} />
                            <Route path="/open/kg/endpoint" render={(props) =>
                                <KnowledgeGraphSPARQLEndpoint {...props} kg={this.props.kg} />} />
                            <Route path="/open/kg/navigation" render={(props) =>
                                <InstanceNavigation {...props} kg={this.props.kg} />} />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
