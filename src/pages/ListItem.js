import React from 'react';
import { Table } from 'antd';
import Entity from './Entity';

export default class ListItem extends React.Component {
    render() {
        const propsData = this.props.data || []
        
        let dataIndex = 'value'
        var data = []
        if (this.props.entity) {
            for (let i = 0; i < propsData.length; i++) {
                data.push({
                    key: propsData[i].entityID,
                    value: <Entity predicateType={this.props.predicateType} entity={propsData[i]} />
                })
            }

        }
        else if (this.props.partecipation) {
            for (let i = 0; i < propsData.length; i++) {
                data.push({
                    key: propsData[i].property.entityID,
                    value: <Entity predicateType={this.props.predicateType} entity={propsData[i].property} />
                })
            }
        }
        else if (this.props.union) {
            for (let i = 0; i < propsData.length; i++) {
                data.push({
                    key: propsData[i][0].entityID + '_' + propsData[i][1].entityID,
                    value: <div>
                        <Entity predicateType={this.props.predicateType} entity={propsData[i][0]} />
                        <br />
                        <Entity predicateType={this.props.predicateType} entity={propsData[i][1]} />
                    </div>
                })
            }
        }
        else if (this.props.label) {
            for (let i = 0; i < propsData.length; i++) {
                data.push({
                    key: i,
                    value: propsData[i].content,
                })
            }

        }
        // string
        else {
            for (let i = 0; i < propsData.length; i++) {
                data.push({
                    key: i,
                    value: propsData[i],
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
