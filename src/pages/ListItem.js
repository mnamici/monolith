import React from 'react';
import { Table, Popover } from 'antd';
import Entity from './Entity';
import { renderEntity, predicateTypes } from '../utils/utils';

export default class ListItem extends React.Component {
    render() {
        const propsData = this.props.data || []

        let dataIndex = 'value'
        var data = []
        if (this.props.entity) {
            for (let i = 0; i < propsData.length; i++) {
                const entity = <Entity predicateType={this.props.predicateType} entity={propsData[i]} />
                data.push({
                    key: propsData[i].entityID,
                    value: this.props.axiom ?
                        <Popover content={
                            <code>
                                {this.props.axiom.first && `${this.props.axiom.owl}(${renderEntity(this.props.axiom.first)} ${renderEntity(propsData[i])})`}
                                {this.props.axiom.second && `${this.props.axiom.owl}(${renderEntity(propsData[i])} ${renderEntity(this.props.axiom.second)})`}
                            </code>
                        }>
                            {<div>{entity}</div>}
                        </Popover> :
                        entity
                })
            }

        }
        else if (this.props.partecipation) {
            for (let i = 0; i < propsData.length; i++) {
                data.push({
                    key: propsData[i].property.entityID,
                    value: <Popover content={
                        <code>
                            {this.props.predicateType === predicateTypes.op &&
                                `${this.props.axiom.owl}(${renderEntity(this.props.axiom.first)} ObjectSomeValuesFrom(${renderEntity(propsData[i].property)} ${renderEntity(propsData[i].filler)}))`}
                            {this.props.predicateType === predicateTypes.dp &&
                                `${this.props.axiom.owl}(${renderEntity(this.props.axiom.first)} DataSomeValuesFrom(${renderEntity(propsData[i].property)} ${renderEntity(propsData[i].filler)}))`}
                        </code>
                    }>
                        <div><Entity predicateType={this.props.predicateType} entity={propsData[i].property} /></div>
                    </Popover>
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
                    value: <div>
                        {this.props.axiom ?
                            <Popover content={
                                <code>{`${propsData[i]}${this.props.axiom.type}(${renderEntity(this.props.axiom.entity)})`}</code>
                            }>
                                {propsData[i]}
                            </Popover> :
                            propsData[i]
                        }
                    </div>,
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
