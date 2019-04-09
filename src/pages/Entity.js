import React from 'react';
import { NavLink } from 'react-router-dom'
import { renderEntity } from '../utils/utils'

export default class Entity extends React.Component {
    render() {
        let predicateType = this.props.predicateType
        if (predicateType === undefined)
            predicateType = this.props.entity.entityType
        return (
            this.props.entity.entityType === 'EXPRESSION' ? <code>{this.props.entity.entityID}</code> :
                <NavLink
                    to={"/open/ontology/wiki/" + predicateType + "/" + this.props.entity.entityID}>
                    {renderEntity(this.props.entity)}
                </NavLink>
        )
    }
}
