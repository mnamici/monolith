import React from 'react'
import { Table, Button } from 'antd';
import { getQueryResults, downloadQueryResults } from '../api/MastroApi';
import { saveFileInfo } from '../utils/utils'

// const https = require('https');

// const fakeDataUrl = "https://swapi.co/api/people/"

const POLLING_TIME = 1000;

export default class MastroResultsTable extends React.Component {
    state = {
        headTerms: [],
        data: [],
        pagination: {
            current: 1,
            defaultPageSize: 10,
        },
        loading: false,
        interval: 0,
    };

    componentDidMount() {
        this.startPolling()
    }

    componentWillReceiveProps(props) {
        this.polling()
        const pagination = { ...this.state.pagination };
        pagination.total = props.numberOfResults;
        this.setState({ pagination: pagination })
    }

    componentWillUnmount() {
        this.stopPolling()
    }

    downloadResults = () => {
        downloadQueryResults(
            this.props.ontology.name,
            this.props.ontology.version,
            this.props.mappingID,
            this.props.executionID,
            saveFileInfo)
    }

    startPolling() {
        this.setState({ interval: setInterval(this.polling, POLLING_TIME), loading: true })
    }

    stopPolling() {
        clearInterval(this.state.interval)
        this.setState({ loading: false })
    }

    convertData(results) {
        var data = [];
        for (let i = 0; i < results.results.length; i++) {
            var object = {};
            for (let j = 0; j < results.results[i].length; j++) {
                object[results.headTerms[j]] = results.results[i][j].value
            }
            object['url'] = i;
            data.push(object);
        }
        this.setState({ headTerms: results.headTerms, data: data, loading: this.state.loading && results.results.length < this.state.pagination.defaultPageSize });
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        getQueryResults(
            this.props.ontology.name,
            this.props.ontology.version,
            this.props.mappingID,
            this.props.executionID,
            pager.current,
            this.state.pagination.defaultPageSize,
            this.convertData.bind(this),
            this.stopPolling.bind(this))
    }

    polling = () => {
        if (this.props.running)
            getQueryResults(
                this.props.ontology.name,
                this.props.ontology.version,
                this.props.mappingID,
                this.props.executionID,
                this.state.pagination.current,
                this.state.pagination.defaultPageSize,
                this.convertData.bind(this),
                this.stopPolling.bind(this))
        else {
            this.stopPolling()
        }
    }

    render() {
        const columns = this.state.headTerms.map(item => ({ title: item, dataIndex: item }));
        return (
            <div>
                <Table
                    className='results'
                    style={{ minHeight: 200 }}
                    columns={columns}
                    rowKey={record => record.url}
                    dataSource={this.state.data}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                />
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 8, marginTop: -48 }}>
                    <Button type='primary' icon='download' onClick={this.downloadResults}>
                        Download Query Results
                    </Button>
                    <span style={{ paddingLeft: 8 }} className='results'>{this.props.numberOfResults} results</span>
                </div>
            </div>
        );
    }
}
