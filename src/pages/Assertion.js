import React from 'react';
import MapItem from './MapItem';
import MappingBody from './MappingBody';

class Assertion extends React.Component {
    render() {

        return (
            <div>
                {this.props.entity === true && <MapItem mapKey="Entity" mapValue={this.props.assertion.currentEntity.entityRender}/>}
                <MapItem mapKey="Description" mapValue={this.props.assertion.mappingDescription}/>
                <MapItem mapKey="Head" mapValue={this.props.assertion.mappingHead.firstArg}/>
                <MapItem mapKey="Body" mapValue={<MappingBody body={this.props.assertion.mappingBody}/>}/>
                
            </div>
        );
    }
}

export default Assertion;