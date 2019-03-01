import React from 'react';
import { Card } from 'antd'
import MappingBody from './MappingBody';
import Entity from './Entity'
import ListMapItem from './ListMapItem';

class Assertion extends React.Component {
    render() {
        const data = [
            {
                mapKey: "Description",
                mapValue: this.props.assertion.mappingDescription
            },
            {
                mapKey: "Head",
                mapValue: <code>{this.props.assertion.mappingHead.firstArg}</code>
            },
            {
                mapKey: "Body",
                mapValue: <MappingBody body={this.props.assertion.mappingBody} />
            },
        ]
        return (
            <Card title={this.props.entity === true &&
                <Entity entity={this.props.assertion.currentEntity} />
            } >
                <ListMapItem data={data} />
            </Card>
        );
    }
}

export default Assertion;