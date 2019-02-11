import React from 'react'
import { Popover, List } from 'antd';
import CollapsibleList from './CollapsibleList';
import { getDataPropertyPage } from '../api/MastroApi';

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
            getDataPropertyPage(
                this.props.ontology.name,
                this.props.ontology.version,
                this.props.match.params.entityID,
                this.loaded)
    }

    componentWillReceiveProps(props) {
        // console.log(props)
        if (props.match.params.entityID !== undefined)
            getDataPropertyPage(
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

        let dataPropertyCharacteristics = []

        this.state.data.dataPropertyFunctional && dataPropertyCharacteristics.push("Functional")

        const components = [

            <CollapsibleList title="Equivalent Data Properties" predicateType={predicateTypes.op} list={this.state.data.equivalentDataProperties} />,
            <CollapsibleList title="Sub Data Properties" predicateType={predicateTypes.op} list={this.state.data.subDataProperties} />,
            <CollapsibleList title="Super Data Properties" predicateType={predicateTypes.op} list={this.state.data.superDataProperties} />,
            <CollapsibleList title="Disjoint Data Properties" predicateType={predicateTypes.op} list={this.state.data.disjointDataProperties} />,
            <CollapsibleList title="Domain" predicateType={predicateTypes.c} list={this.state.data.dataPropertyDomain} />,
            <CollapsibleList title="Range" predicateType={predicateTypes.c} list={this.state.data.dataPropertyRange} />,
            <CollapsibleList title="Data Property Characteristics" list={dataPropertyCharacteristics} />,
            <CollapsibleList title="Data Property Individuals" predicateType={predicateTypes.op} list={this.state.data.dataPropertyIndividuals} />,
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
                    <CollapsibleList title="Descriptions" list={this.state.data.dataPropertyDescriptions} />
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
