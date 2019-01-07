import React from 'react';
import MapItem from './MapItem';
import MappingBody from './MappingBody';

class Assertion extends React.Component {
    render() {

        return (
            <div>
                <MapItem mapKey="Template" mapValue={this.props.assertion.mappingTemplate}/>
                <MapItem mapKey="Body" mapValue={<MappingBody body={this.props.assertion.mappingBody}/>}/>
                
            </div>
        );
    }
}

export default Assertion;