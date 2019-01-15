import React from 'react'
import { List, Card } from 'antd';

const https = require('https');

const fakeDataUrl = "https://swapi.co/api/people/"

const data = [
    "select ?x ?y ?z where {?x ?y ?z}",
    "select ?x ?y ?z where {?x owl:topObjectProperty ?z}",
    "select ?x ?y ?z where {?x owl:topDataProperty ?z}"
]

class OntologyRewritings extends React.Component {
    state = {
        data: [],
        pagination: { current: 1, onChange: (page) => this.handleChange(page) },
        loading: false,
    };

    componentDidMount() {
        //fetch from server
        // this.fetch(1);

        //test mastro results
        this.setState({data:data});
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
        return (
            <Card title="Ontology Rewritings">
                <List
                    itemLayout="vertical"
                    size='large'
                    pagination={this.state.pagination}
                    dataSource={this.state.data}
                    loading={this.state.loading}
                    renderItem={item => (
                        <List.Item>
                            {item}
                        </List.Item>
                    )}
                />
            </Card>
        )
    }
}

export default OntologyRewritings;