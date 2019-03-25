import React from 'react'
import { Table, Button } from 'antd';
import { getQueryResults, downloadQueryResults } from '../api/MastroApi';
import { saveFileInfo } from '../utils/utils'

// const https = require('https');

// const fakeDataUrl = "https://swapi.co/api/people/"

const POLLING_TIME = 1000;

export default class Results extends React.Component {
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

    showTotal(total) {
        return <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
            <Button icon='download' onClick={this.downloadResults}>
                Download Results
            </Button>
            <p style={{ margin: '0px 8px' }} className='results'>{total} results</p>
        </div>
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
        // https.get(fakeDataUrl + '?page=' + page, (resp) => {
        //     let data = '';

        //     // A chunk of data has been recieved.
        //     resp.on('data', (chunk) => {
        //         data += chunk;
        //     });

        //     // The whole response has been received. Print out the result.
        //     resp.on('end', () => {
        //         const res = JSON.parse(data);
        //         const pagination = { ...this.state.pagination };
        //         pagination.total = res.count;
        //         this.setState({
        //             loading: false,
        //             data: res.results,
        //             pagination: pagination
        //         });
        //     });

        // }).on("error", (err) => {
        //     console.log("Error: " + err.message);
        // });

    }

    render() {
        const columns = this.state.headTerms.map(item => ({ title: item, dataIndex: item }));
        return (
            <div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 8}}>
                    <Button ghost icon='download' shape="circle" onClick={this.downloadResults}>
                        {/* Download Results */}
                    </Button>
                    <span style={{paddingLeft: 8}} className='results'>{this.props.numberOfResults} results</span>
                </div>
                <Table
                    style={{ minHeight: 200 }}
                    columns={columns}
                    rowKey={record => record.url}
                    dataSource={this.state.data}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}
