import React from 'react';

class Entity extends React.Component {
    render() {
        return (
            <a href={"#class?q=" + this.props.entity.entityID}>{this.props.entity.entityRender}</a>
        )
    }
}

export default Entity;