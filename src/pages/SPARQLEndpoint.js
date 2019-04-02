import React from 'react';
import { Layout } from 'antd';
import AddCloseTabs from './AddCloseTabs';
import QueryCatalog from './QueryCatalog';
import { getQueryCatalog, getMappings } from '../api/MastroApi'

const {
    Sider, Content,
} = Layout;

export default class SPARQLEndpoint extends React.Component {
    state = {
        catalog: undefined,
        mappings: undefined,
        open: null,
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

    open = (open) => {
        this.setState({
            open: open,
        });
    }

    render() {
        return (
            <Layout style={{ minHeight: 'calc(100vh - 25px)', marginLeft: '-1vw' }}>
                <Sider
                    style={{ background: '#000c17' }}
                >
                    <QueryCatalog
                        ontology={this.props.ontology}
                        mappings={this.state.mappings}
                        catalog={this.state.catalog}
                        open={this.open}
                        refreshCatalog={this.requestCatalog.bind(this)}
                    />
                    {/* <MappingSelector ontology={this.props.ontology} mappings={this.state.mappings}/> */}
                </Sider>
                <Layout>
                    <Content >
                        <div className='SPARQLTab' style={{ minHeight: '100%' }}>
                            <AddCloseTabs
                                ontology={this.props.ontology}
                                mappings={this.state.mappings}
                                catalog={this.state.catalog}
                                open={this.state.open}
                                openF={this.open}
                                refreshCatalog={this.requestCatalog.bind(this)}
                            />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

