import React from 'react';
import { Layout } from 'antd';
import AddCloseTabs from './AddCloseTabs';
import QueryCatalog from './QueryCatalog';
import { getQueryCatalog, getMappings } from '../api/MastroApi'

const {
    Sider, Content,
} = Layout;

class SPARQLEndpoint extends React.Component {
    state = {
        catalog: [],
        mappings: [],
        current: null,
        panes: []
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

    setCurrent = (current) => {
        this.setState({
            current: current,
        });
    }

    render() {
        return (
            <Layout style={{height: 'calc(98vh - 21px)'}}>
                <Sider
                    style={{ background: '#000c17' }}
                >
                    <QueryCatalog
                        ontology={this.props.ontology}
                        mappings={this.state.mappings}
                        catalog={this.state.catalog} 
                        open={this.setCurrent}
                        />
                    {/* <MappingSelector ontology={this.props.ontology} mappings={this.state.mappings}/> */}
                </Sider>
                <Layout>
                    <Content >
                        <div className='SPARQLTab' style={{ minHeight: '100%' }}>
                            <AddCloseTabs
                                ontology={this.props.ontology}
                                mappings={this.state.mappings}
                                panes={this.state.panes}
                                catalog={this.state.catalog}
                                open={this.state.current} />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}


export default SPARQLEndpoint;