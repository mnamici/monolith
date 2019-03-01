import React from 'react'
import { Card, Popover, List } from 'antd';
import { getObjectPropertyPage } from '../api/MastroApi';

import { renderEntity, predicateTypes } from '../utils/utils'
import ListItem from './ListItem';

class ObjectPropertyPage extends React.Component {
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

        const components = [

            <Card title="Equivalent Object Properties" >
                <ListItem entity predicateType={predicateTypes.op} data={this.state.data.equivalentObjectProperties} />
            </Card>,
            <Card title="Sub Object Properties" >
                <ListItem entity predicateType={predicateTypes.op} data={this.state.data.subObjectProperties} />
            </Card>,
            <Card title="Super Object Properties" >
                <ListItem entity predicateType={predicateTypes.op} data={this.state.data.superObjectProperties} />
            </Card>,
            <Card title="Disjoint Object Properties" >
                <ListItem entity predicateType={predicateTypes.op} data={this.state.data.disjointObjectProperties} />
            </Card>,
            <Card title="Inverse Object Properties" >
                <ListItem entity predicateType={predicateTypes.op} data={this.state.data.inverseObjectProperties} />
            </Card>,
            <Card title="Domain" >
                <ListItem entity predicateType={predicateTypes.c} data={this.state.data.objectPropertyDomain} />
            </Card>,
            <Card title="Range" >
                <ListItem entity predicateType={predicateTypes.c} data={this.state.data.objectPropertyRange} />
            </Card>,
            <Card title="Object Property Characteristics" >
                <ListItem data={objectPropertyCharacteristics} />
            </Card>,
            <Card title="Object Property Individuals" >
                <ListItem entity predicateType={predicateTypes.op} data={this.state.data.objectPropertyIndividuals} />
            </Card>,
        ]

        return (
            <div>
                <div style={{ textAlign: 'center' }}>
                    <h1 >{renderEntity(this.state.data.currentEntity)}</h1>
                    <Popover content={this.state.data.currentEntity.entityIRI}>
                        <h3>{this.state.data.currentEntity.entityPrefixIRI}</h3>
                    </Popover>
                </div>
                <div style={{ padding: '16px 0px 16px 0px' }}>
                    <Card title="Descriptions">
                        <ListItem  data={this.state.data.objectPropertyDescriptions} />
                    </Card>
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

export default ObjectPropertyPage;
