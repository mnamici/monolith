import React from 'react';
import MapItem from './MapItem';
import MappingBody from './MappingBody';
import Entity from './Entity'

class Assertion extends React.Component {
    render() {

        return (
            <div>
                {this.props.entity === true &&
                    <div style={{ textAlign: 'center', padding: 8 }}>
                        <Entity entity={this.props.assertion.currentEntity}/>
                    </div>
                }
                <MapItem mapKey="Description" mapValue={this.props.assertion.mappingDescription} />
                <MapItem mapKey="Head" mapValue={this.props.assertion.mappingHead.firstArg} />
                <MapItem mapKey="Body" mapValue={<MappingBody body={this.props.assertion.mappingBody} />} />

            </div>
        );
    }
}

export default Assertion;