import React from 'react';
import { NavLink } from 'react-router-dom'

class Entity extends React.Component {
    render() {
        return (
            <NavLink to={"/open/ontology/wiki/"+this.props.predicateType+"/" + this.props.entity.entityID}>Sider{this.props.entity.entityPrefixIRI}</NavLink>
        )
    }
}

export default Entity;