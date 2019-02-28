import React from 'react';
import { Layout } from 'antd';
import AddCloseTabs from './AddCloseTabs';
import QueryCatalog from './QueryCatalog';
import MappingSelector from './MappingSelector';
import { getQueryCatalog, getMappings } from '../api/MastroApi'

const {
    Sider, Content,
} = Layout;

class SPARQLEndpoint extends React.Component {
    state = {
        catalog: [],
        mappings: [],
        current: null,
        panes : []
    }
    
       componentDidMount() {
        this.requestCatalog()   
        this.requestMappings()   
    }

    requestCatalog() {
        getQueryCatalog(
            this.props.ontology.name,
            this.props.ontology.version,            
            this.loadedCatalog)
    }

    loadedCatalog = (data) => {
        if (data === undefined)
            data = []
        this.setState((state) => ({
            catalog: data
        }));
    }

    requestMappings() {
        getMappings(
            this.props.ontology.name, 
            this.props.ontology.version, 
            this.loadedMappings)
    }

    loadedMappings = (data) => {
        if (data === undefined)
            data = []
        this.setState((state) => ({
            mappings: data.mappingList
        }));
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    render() {
        return (
            <Layout >
                <Sider
                    style={{ background: 'none' }}
                > 
                    <MappingSelector ontology={this.props.ontology} mappings={this.state.mappings}/>
                    <QueryCatalog ontology={this.props.ontology} catalog={this.state.catalog}/>
                </Sider>
                <Layout>
                    <Content >
                        <div style={{ marginLeft:0, background: 'none', minHeight: '100%' }}>
                            <AddCloseTabs panes={this.state.panes} catalog={this.state.catalog} open={this.props.match.params.queryID}/>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}


export default SPARQLEndpoint;