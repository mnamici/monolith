import React from 'react';
import { Route } from 'react-router-dom'
import { Layout, Icon } from 'antd';
import OntologyMenu from './OntologyMenu'
import OntologyInfo from './OntologyInfo';
import OntologyWiki from './OntologyWiki';
import LoadMappings from './LoadMappings';
import SPARQLEndpoint from './SPARQLEndpoint';
import CurrentMapping from './CurrentMapping';

const { Content, Sider } = Layout;

class CurrentOntology extends React.Component {
    state = {
        collapsed: true,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render() {
        return (
            <Layout style={{ margin: '0px -24px -10px -24px', minHeight: '100%' }}>
                <Sider
                    // width={200} 
                    style={{ background: '#fff' }}
                    collapsed={this.state.collapsed}
                >
                    <OntologyMenu />
                    <div>
                        <Icon
                            style={{ display: "inherit", cursor: "pointer", transition: "color .3s" }}
                            theme="filled"
                            type={this.state.collapsed ? 'caret-right' : 'caret-left'}
                            onClick={this.toggle}
                        />
                    </div>

                </Sider>
                <Layout>
                    <Content >
                        <div style={{ padding: '0px 12px 0px 12px', background: '#fff', minHeight: '100%' }}>

                            <Route path="/open/ontology/info" component={OntologyInfo} />
                            <Route path="/open/ontology/wiki" component={OntologyWiki} />
                            <Route path="/open/ontology/mappings" component={LoadMappings} />
                            <Route path="/open/ontology/mapping" component={CurrentMapping} />
                            <Route path="/open/ontology/endpoint" component={SPARQLEndpoint} />
                            
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default CurrentOntology;