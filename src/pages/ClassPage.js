import React from 'react'
import { Popover, List } from 'antd';
import CollapsibleList from './CollapsibleList';
import { getClassPage } from '../api/MastroApi';

import { renderEntity, predicateTypes } from '../utils/utils'

class ClassPage extends React.Component {
    _isMounted = false;
    state = {
        data: {}
    }

    componentDidMount() {
        this._isMounted = true;
        // console.log(this.props)
        if (this.props.match.params.entityID !== undefined)
            getClassPage(
                this.props.ontology.name,
                this.props.ontology.version,
                this.props.match.params.entityID,
                this.loaded)
    }

    componentWillReceiveProps(props) {
        // console.log(props)
        if (props.match.params.entityID !== undefined)
            getClassPage(
                props.ontology.name, 
                props.ontology.version, 
                props.match.params.entityID,
                this.loaded)
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    loaded = (data) => {
        // console.log(data)
        this._isMounted && this.setState({ data: data })
    }

    render() {
        // console.log("CLASS PAGE", this.props)

        if (this.state.data.currentEntity === undefined) return null

        const components = [

            <CollapsibleList title="Equivalent Classes" predicateType={predicateTypes.c} list={this.state.data.equivalentClasses} />,
            <CollapsibleList title="Sub Classes" predicateType={predicateTypes.c} list={this.state.data.subClasses} />,
            <CollapsibleList title="Super Classes" predicateType={predicateTypes.c} list={this.state.data.superClasses} />,
            <CollapsibleList title="Disjoint Classes" predicateType={predicateTypes.c} list={this.state.data.disjointClasses} />,
            <CollapsibleList title="Object Properties" predicateType={predicateTypes.op} list={this.state.data.objectPropertiesParticipations} />,
            <CollapsibleList title="Data Properties" predicateType={predicateTypes.dp} list={this.state.data.dataPropertiesParticipations} />,
            <CollapsibleList title="Disjoint Unions" predicateType={predicateTypes.c} list={this.state.data.disjointUnions} />,
            <CollapsibleList title="Individuals" predicateType={predicateTypes.i} list={this.state.data.classIndividuals} />,
        ]
        return (
            <div>
                <div style={{ textAlign: 'center' }}>
                    <h1 >{renderEntity(this.state.data.currentEntity)}</h1>
                    <Popover content={this.state.data.currentEntity.entityIRI}>
                        <span>{this.state.data.currentEntity.entityPrefixIRI}</span>
                    </Popover>
                </div>
                <div style={{ padding: '16px 0px 16px 0px' }}>
                    <CollapsibleList title="Descriptions" list={this.state.data.classDescriptions} />
                </div>
                <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={components}
                    renderItem={item => (
                        <List.Item>
                            {item}
                        </List.Item>
                    )}
                />
            </div>

        );
    }
}

export default ClassPage;
