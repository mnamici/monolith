import React from 'react'
import { Card } from 'antd';
import MapItem from './MapItem';

class QueryInfo extends React.Component {
    render() {
        return (
            <Card title="Info">
                <MapItem mapKey='Ontology rewritings' mapValue={this.props.status.numOntologyRewritings} />
                <MapItem mapKey='High level unfolded queries' mapValue={this.props.status.numHighLevelQueries} />
                <MapItem mapKey='Optimized queries' mapValue={this.props.status.numOptimizedQueries} />
                <MapItem mapKey='Low level unfolded queries' mapValue={this.props.status.numLowLevelQueries} />
                <MapItem mapKey='Total execution time (ms)' mapValue={this.props.status.executionTime} />
            </Card>
        );
    }
}

export default QueryInfo;