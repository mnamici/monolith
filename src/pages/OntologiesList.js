import React from 'react';
import { List, Card, Select, Button } from 'antd';
import AddOntology from './AddOntology';
import { deleteOntology } from '../api/MastroApi';

const Option = Select.Option

export default class OntologiesList extends React.Component {
    state = {
        data: []
    }

    componentDidMount() {
        this.setState({
            data: this.props.data
        })
    }

    componentWillReceiveProps(props) {
        this.setState({
            data: props.data
        })
    }


    delete(ontologyID) {
        deleteOntology(ontologyID, this.props.rerender)
        this.props.close({
            name: ontologyID
        })
    }

    changeSort = (value) => {
        if (value === 'name')
            this.setState({
                data: [...this.props.data].sort(function (a, b) {
                    var x = a.ontologyID.toLowerCase();
                    var y = b.ontologyID.toLowerCase();
                    if (x < y) { return -1; }
                    if (x > y) { return 1; }
                    return 0;
                })
            })
        else if (value === 'date')
            this.setState({
                data: this.props.data
            })
    }

    render() {
        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 6 }}>
                    <Button style={{ visibility: 'hidden', width: 140 }} type='primary' icon='step-backward'>
                        Back
                    </Button>
                    <h1>Ontologies</h1>
                    <Select style={{ width: 140 }} defaultValue='date' onChange={this.changeSort} >
                        <Option value='date' >
                            Sort by date
                        </Option>
                        <Option value='name' >
                            Sort by name
                        </Option>
                    </Select>
                </div>
                <List
                    style={{ height: 'calc(100vh - 79px)', overflow: 'auto' }}
                    className='bigCards'
                    rowKey="ontologiesView"
                    grid={{ gutter: 12, lg: 3, md: 2, sm: 1, xs: 1 }}
                    dataSource={['', ...this.state.data]}
                    renderItem={item =>
                        item ? (
                            <List.Item key={item.ontologyID} style={{ paddingBottom: 6 }}>
                                <Card hoverable actions={[
                                    <span onClick={
                                        () => this.delete(item.ontologyID)
                                    }>
                                        delete
                                    </span>
                                ]}>
                                    <Card.Meta key={item.ontologyID}
                                        avatar={<img alt="" src={item.avatar} />}
                                        title={item.ontologyID}
                                        description={item.ontologyDescription}
                                        onClick={
                                            () => {
                                                this.props.next(item.ontologyID);
                                            }
                                        }
                                    />
                                </Card>
                            </List.Item>
                        ) : (
                                <List.Item>
                                    <AddOntology rerender={this.props.rerender} />
                                </List.Item>
                            )
                    }
                />
            </div>
        );
    }
}
