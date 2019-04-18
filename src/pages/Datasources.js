import React from 'react';
import { List, Divider, Select, Button, Icon, Drawer } from 'antd';
import DatasourceCard from './DatasourceCard';
import DatasourceForm from './DatasourceForm';
import { getDatasources, deleteDatasources } from '../api/MastroApi';

const Option = Select.Option

export default class Datasources extends React.Component {
    state = {
        data: [],
        visible: false,
        drawer: null
    }

    componentDidMount() {
        this.load()
    }

    load = () => {
        getDatasources(this.loaded)
    }

    loaded = (data) => {
        this.setState({ data, visible: false })
    }

    delete = (datasourceID) => {
        deleteDatasources(datasourceID, this.load)
    }

    showDrawer = () => {
        this.setState({
            drawer: <DatasourceForm rerender={this.load} />,
            visible: true
        })
    }

    changeSort = (value) => {
        // if (value === 'name')

        // else if (value === 'date')

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
                                <DatasourceCard datasource={item} open={this.open} delete={this.delete} />
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
