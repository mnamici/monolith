import React from 'react'
import { Table } from 'antd';
const https = require('https');

const fakeDataUrl = "https://swapi.co/api/people/"

const results = {
    construct: false,
    headTerms: ['name', 'gender', 'height',],
    results: [
        [
            {
                type: 'string',
                shortIRI: 'Luke',
                value: 'Luke'
            },
            {
                type: 'string',
                shortIRI: 'male',
                value: 'male'
            },
            {
                type: 'string',
                shortIRI: '183',
                value: '183'
            }
        ],
        [
            {
                type: 'string',
                shortIRI: 'Anakin',
                value: 'Anakin'
            },
            {
                type: 'string',
                shortIRI: 'male',
                value: 'male'
            },
            {
                type: 'string',
                shortIRI: '181',
                value: '181'
            }
        ]
    ]

}

class Results extends React.Component {
    state = {
        data: [],
        pagination: { current: 1 },
        loading: false,
    };

    componentDidMount() {
        //fetch from server
        //this.fetch(1);
        
        //test mastro results
        this.convertData();
    }

    convertData(){
        var data = [];
        for(let i=0;i<results.results.length;i++){
            var object = {};
            for(let j=0;j<results.results[i].length;j++){
                object[results.headTerms[j]] = results.results[i][j].value    
            }
            object['url'] = i;
            data.push(object);
        }
        this.setState({ data: data });
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
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
                    data: res.results,
                    pagination: pagination
                });
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });

    }

    render() {
        const columns = results.headTerms.map(item => ({ title: item, dataIndex: item }));
        return (
            <Table
                columns={columns}
                rowKey={record => record.url}
                dataSource={this.state.data}
                pagination={this.state.pagination}
                loading={this.state.loading}
                onChange={this.handleTableChange}
            />
        );
    }
}

export default Results;