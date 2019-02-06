import React from 'react'
import { Popover, List } from 'antd';
import CollapsibleList from './CollapsibleList';
import { getObjectPropertyPage } from '../api/MastroApi';

import { renderEntity, predicateTypes } from '../utils/utils'

class DataPropertyPage extends React.Component {
    _isMounted = false;
    state = {
        data: {}
    }

    componentDidMount() {
        this._isMounted = true;
        // console.log(this.props)
        if (this.props.match.params.entityID !== undefined)
            getObjectPropertyPage(
                this.props.ontology.name,
                this.props.ontology.version,
                this.props.match.params.entityID,
                this.loaded)
    }

    componentWillReceiveProps(props) {
        // console.log(props)
        if (props.match.params.entityID !== undefined)
            getObjectPropertyPage(
                props.ontology.name,
                props.ontology.version,
                props.match.params.entityID,
                this.loaded)
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    loaded = (data) => {
        this._isMounted && this.setState({ data: data })
    }

    render() {
        // console.log("OBJECT PROPERTY PAGE", this.props)
        if (this.state.data.currentEntity === undefined) return null

        let objectPropertyCharacteristics = []

        this.state.data.objectPropertyFunctional && objectPropertyCharacteristics.push("Functional")
        this.state.data.objectPropertyInverseFunctional && objectPropertyCharacteristics.push("Inverse Functional")
        this.state.data.objectPropertyIrreflexive && objectPropertyCharacteristics.push("Irreflexive")
        this.state.data.objectPropertyReflexive && objectPropertyCharacteristics.push("Reflexive")
        this.state.data.objectPropertySymmetric && objectPropertyCharacteristics.push("Symmetric")
        this.state.data.objectPropertyTransitive && objectPropertyCharacteristics.push("Transitive")
        this.state.data.objectPropertyAsymmetric && objectPropertyCharacteristics.push("Asymmetric")

        console.log(this.state.data)
        console.log(objectPropertyCharacteristics)

        const components = [

            <CollapsibleList title="Equivalent Object Properties" predicateType={predicateTypes.op} list={this.state.data.equivalentObjectProperties} />,
            <CollapsibleList title="Sub Object Properties" predicateType={predicateTypes.op} list={this.state.data.subObjectProperties} />,
            <CollapsibleList title="Super Object Properties" predicateType={predicateTypes.op} list={this.state.data.superObjectProperties} />,
            <CollapsibleList title="Disjoint Object Properties" predicateType={predicateTypes.op} list={this.state.data.disjointObjectProperties} />,
            <CollapsibleList title="Inverse Object Properties" predicateType={predicateTypes.op} list={this.state.data.inverseObjectProperties} />,
            <CollapsibleList title="Domain" predicateType={predicateTypes.c} list={this.state.data.objectPropertyDomain} />,
            <CollapsibleList title="Range" predicateType={predicateTypes.c} list={this.state.data.objectPropertyRange} />,
            <CollapsibleList title="Object Property Characteristics" list={objectPropertyCharacteristics} />,
            <CollapsibleList title="Object Property Individuals" predicateType={predicateTypes.op} list={this.state.data.objectPropertyIndividuals} />,
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
                    <CollapsibleList title="Descriptions" list={this.state.data.objectPropertyDescriptions} />
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

export default DataPropertyPage;
