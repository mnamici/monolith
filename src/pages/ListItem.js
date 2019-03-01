import React from 'react';
import { Table } from 'antd';
import Entity from './Entity';

class ListItem extends React.Component {
    render() {
        if (this.props.data === undefined || this.props.data === null) return null
        let dataIndex = 'key'
        var data = []
        if (this.props.entity) {
            dataIndex = 'value'
            for (let i = 0; i < this.props.data.length; i++) {
                data.push({
                    key: this.props.data[i].entityID,
                    value: <Entity predicateType={this.props.predicateType} entity={this.props.data[i]} />
                })
            }

        }
        else if (this.props.partecipation) {
            dataIndex = 'value'
            for (let i = 0; i < this.props.data.length; i++) {
                data.push({
                    key: this.props.data[i].property.entityID,
                    value: <Entity predicateType={this.props.predicateType} entity={this.props.data[i].property} />
                })
            }
        }
        // string
        else {
            for (let i = 0; i < this.props.data.length; i++) {
                data.push({
                    key: this.props.data[i],
                })
            }

        }
        return (

            <Table
                columns={[{ dataIndex: dataIndex }]}
                showHeader={false}
                pagination={false}
                dataSource={data}
            />
        );
    }
}

export default ListItem;