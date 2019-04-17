import React from 'react';
import { List, Divider, Select, Button, Icon, Drawer } from 'antd';
import DatasourceCard from './DatasourceCard';
import DatasourceForm from './DatasourceForm';

const Option = Select.Option

export default class Datasources extends React.Component {
    state = {
        data: [
            {
                "id": "S1",
                "description": "test data source",
                "dataSourceUsername": "utente-mastro",
                "jdbcUrl": "jdbc:mysql://localhost/books",
                "jdbcDriver": "com.mysql.jdbc.Driver",
                "jdbcUsername": "root",
                "jdbcPassword": "the-password"
            },
            {
                "id": "S2",
                "description": "test data source",
                "dataSourceUsername": "utente-mastro",
                "jdbcUrl": "jdbc:mysql://localhost/books",
                "jdbcDriver": "com.mysql.jdbc.Driver",
                "jdbcUsername": "root",
                "jdbcPassword": "the-password"
            },
            {
                "id": "S3",
                "description": "test data source",
                "dataSourceUsername": "utente-mastro",
                "jdbcUrl": "jdbc:mysql://localhost/books",
                "jdbcDriver": "com.mysql.jdbc.Driver",
                "jdbcUsername": "root",
                "jdbcPassword": "the-password"
            }
        ],
        visible: false,
        drawer: null
    }

    componentDidMount() {

    }

    delete(datasourceID) {

    }

    showDrawer = () => {
        this.setState({
            drawer: <DatasourceForm />,
            visible: true
        })
    }

    changeSort = (value) => {
        if (value === 'name')
            this.setState({
                data: [...this.props.data].sort(function (a, b) {
                    var x = a.id.toLowerCase();
                    var y = b.id.toLowerCase();
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

    open = (open) => {
        this.setState({
            drawer: <DatasourceForm dataSource={this.state.data.filter(d => d.id === open)[0]} />,
            visible: true
        })
    }

    render() {
        return (
            <div>
                <Divider>datasources</Divider>
                <Select defaultValue='date' onChange={this.changeSort} style={{ padding: 6 }}>
                    <Option value='date' >
                        Sort by date
                    </Option>
                    <Option value='name' >
                        Sort by name
                    </Option>
                </Select>
                <List
                    className='bigCards'
                    rowKey="ontologiesView"
                    grid={{ gutter: 12, lg: 3, md: 2, sm: 1, xs: 1 }}
                    dataSource={['', ...this.state.data]}
                    renderItem={item =>
                        item ? (
                            <List.Item key={item.id} style={{ paddingBottom: 6 }} >
                                <DatasourceCard datasource={item} open={this.open} />
                            </List.Item>
                        ) : (
                                <List.Item>
                                    <Button type='primary' style={{ height: 274, width: '100%' }} onClick={this.showDrawer}>
                                        <Icon type="plus" /> Add Datasource
                                    </Button>
                                    <Drawer
                                        width='40vw'
                                        onClose={() => this.setState({ visible: false, drawer: null })}
                                        visible={this.state.visible}
                                        style={{
                                            overflow: 'auto',
                                            height: 'calc(100% - 108px)',
                                            paddingBottom: '108px',
                                        }}
                                    >
                                        {this.state.drawer}
                                    </Drawer>
                                </List.Item>
                            )
                    }
                />
            </div>
        );
    }
}
