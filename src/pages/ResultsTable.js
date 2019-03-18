import React from 'react'
import { Table } from 'antd';
import { getQueryResults } from '../api/MastroApi';
// const https = require('https');

// const fakeDataUrl = "https://swapi.co/api/people/"

class Results extends React.Component {
    state = {
        headTerms: [],
        data: [],
        pagination: { current: 1, defaultPageSize: 10 },
        loading: false,
        interval: 0,
    };

    componentDidMount() {
        this.startPolling()
    }

    componentWillUnmount() {
        this.stopPolling()
    }

    startPolling() {
        this.setState({ interval: setInterval(this.polling, 1000), loading: true })
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
        this.polling();
    }

    polling = () => {
        if (this.props.running)
            getQueryResults(
                this.props.ontology.name,
                this.props.ontology.version,
                this.props.mapping,
                this.props.executionID,
                this.state.pagination.current,
                this.state.pagination.defaultPageSize,
                this.convertData.bind(this))
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
                <p className='results'>{this.props.numberOfResults} results</p>
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

export default Results;