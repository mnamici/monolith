import React from 'react'
import { Table, Popover } from 'antd';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/styles/hljs';
import sqlFormatter from 'sql-formatter'
const https = require('https');

const fakeDataUrl = "https://swapi.co/api/people/"

const data = [
    {
        query: "select person_name from person_table",
        numResults: 12,
        time: 121234
    },
    {
        query: "select person_name from names_table",
        numResults: 212,
        time: 121232334
    },
    {
        query: "select person_name from other_table",
        numResults: 142,
        time: 55555
    }
]

class ViewRewritings extends React.Component {
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
            const item = this.state.data[i]
            data.push({
                key: i,
                value: <Popover content={
                    <div>
                        <p>{item.numResults + " results in " + item.time + " ms."}</p>
                    </div>
                }>
                    <SyntaxHighlighter language='sql' style={darcula}>
                        {sqlFormatter.format(item.query)}
                    </SyntaxHighlighter>
                </Popover>
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

export default ViewRewritings;