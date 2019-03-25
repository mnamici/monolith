import React from 'react';
import { Table } from 'antd';
import Entity from './Entity';

export default class ListItem extends React.Component {
    render() {
        if (this.props.data === undefined || this.props.data === null) return null
        let dataIndex = 'value'
        var data = []
        if (this.props.entity) {
            for (let i = 0; i < this.props.data.length; i++) {
                data.push({
                    key: this.props.data[i].entityID,
                    value: <Entity predicateType={this.props.predicateType} entity={this.props.data[i]} />
                })
            }

        }
        else if (this.props.partecipation) {
            for (let i = 0; i < this.props.data.length; i++) {
                data.push({
                    key: this.props.data[i].property.entityID,
                    value: <Entity predicateType={this.props.predicateType} entity={this.props.data[i].property} />
                })
            }
        }
        else if (this.props.union) {
            for (let i = 0; i < this.props.data.length; i++) {
                data.push({
                    key: this.props.data[i][0].entityID + '_' + this.props.data[i][1].entityID,
                    value: <div>
                        <Entity predicateType={this.props.predicateType} entity={this.props.data[i][0]} />
                        <br />
                        <Entity predicateType={this.props.predicateType} entity={this.props.data[i][1]} />
                    </div>
                })
            }
        }
        else if (this.props.label) {
            for (let i = 0; i < this.props.data.length; i++) {
                data.push({
                    key: i,
                    value: this.props.data[i].content,
                })
            }

        }
        // string
        else {
            for (let i = 0; i < this.props.data.length; i++) {
                data.push({
                    key: i,
                    value: this.props.data[i],
                })
            }

        }

        // console.log(data)

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
