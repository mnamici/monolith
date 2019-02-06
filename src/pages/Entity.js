import React from 'react';
import { NavLink } from 'react-router-dom'

import { renderEntity } from '../utils/utils'
class Entity extends React.Component {
    render() {

        return (
            <NavLink
                to={"/open/ontology/wiki/" + this.props.predicateType + "/" + this.props.entity.entityID}>
                {renderEntity(this.props.entity)}
            </NavLink>
        )
    }
}

export default Entity;