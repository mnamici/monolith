import React from 'react';
import { Layout, Spin } from 'antd';
import AddCloseTabs from './AddCloseTabs';
import QueryCatalog from './QueryCatalog';
import { getQueryCatalog, getMappings } from '../api/MastroApi'

const {
    Sider, Content,
} = Layout;

export default class SPARQLEndpoint extends React.Component {
    _isMounted = false;
    state = {
        catalog: undefined,
        mappings: undefined,
        open: null,
        loadingCatalog: false,
        loadingMappings: false

    }

    componentDidMount() {
        this._isMounted = true;
        this.setState({ loadingCatalog: true, loadingMappings: true })
        this.requestCatalog()
        this.requestMappings()
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState !== this.state) {
            return true
        }
        else {
            return false
        }
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
        this._isMounted && this.setState({
            catalog: data,
            loadingCatalog: false
        });
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
        this._isMounted && this.setState({
            mappings: data.mappingList,
            loadedMappings: false
        });
    }

    open = (open) => {
        this._isMounted && this.setState({
            open: open,
        });
    }

    render() {
        return (
            this.state.loadingCatalog || this.state.loadedMappings ?
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 36 }}> <Spin size='large' /></div> :

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

