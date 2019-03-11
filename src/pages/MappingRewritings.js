import React from 'react'
import { Table } from 'antd';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/styles/hljs';
import sqlFormatter from 'sql-formatter'
const https = require('https');

const fakeDataUrl = "https://swapi.co/api/people/"

const data = [
    "select x from view_01",
    "select y from view_01",
    "select z from view_01",
]

class MappingRewritings extends React.Component {
    state = {
        data: [],
        pagination: { current: 1, onChange: (page) => this.handleChange(page) },
        loading: false,
    };

    componentDidMount() {
        //fetch from server
        // this.fetch(1);

        //test mastro results
        this.setState({ data: data });
    }

    handleChange = (page) => {
        const pager = { ...this.state.pagination };
        pager.current = page;
        this.setState({
            pagination: pager,
        });
        this.fetch(pager.current);
    }

    fetch = (page) => {
        this.setState({ loading: true });
        https.get(fakeDataUrl + '?page=' + page, (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                const res = JSON.parse(data);
                const pagination = { ...this.state.pagination };
                pagination.total = res.count;
                this.setState({
                    loading: false,
                    data: res.results.map(item => item.name),
                    pagination: pagination
                });
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });

    }
    render() {
        let data = []
        for (let i = 0; i < this.state.data.length; i++) {
            data.push({
                key: i,
                value: <SyntaxHighlighter language='sql' style={darcula}>
                    {sqlFormatter.format(this.state.data[i])}
                </SyntaxHighlighter>,
            })
        }
        return (
            <Table
                columns={[{ dataIndex: 'value' }]}
                showHeader={false}
                pagination={this.state.pagination}
                dataSource={data}
                loading={this.state.loading}
            />
        )
    }
}

export default MappingRewritings;