import React from 'react'
import { Card } from 'antd';
import ListMapItem from './ListMapItem';

class QueryInfo extends React.Component {
    render() {

        const data = [
            {
                mapKey: 'Ontology rewritings',
                mapValue: this.props.status.numOntologyRewritings
            },
            {
                mapKey: 'High level unfolded queries',
                mapValue: this.props.status.numHighLevelQueries
            },
            {
                mapKey: 'Optimized queries',
                mapValue: this.props.status.numOptimizedQueries
            },
            {
                mapKey: 'Low level unfolded queries',
                mapValue: this.props.status.numLowLevelQueries
            },
            {
                mapKey: 'Total execution time (ms)',
                mapValue: this.props.status.executionTime
            },
        ]

        return (
            <Card title="Info">
                <ListMapItem data={data} />
            </Card>
        );
    }
}

export default QueryInfo;