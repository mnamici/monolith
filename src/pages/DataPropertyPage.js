import React from 'react'
import { Card, Popover, List } from 'antd';
import { getDataPropertyPage } from '../api/MastroApi';

import { renderEntity, predicateTypes } from '../utils/utils'
import ListItem from './ListItem';

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

            <Card title="Equivalent Data Properties" >
                <ListItem entity predicateType={predicateTypes.op} data={this.state.data.equivalentDataProperties} />
            </Card>,
            <Card title="Sub Data Properties" >
                <ListItem entity predicateType={predicateTypes.op} data={this.state.data.subDataProperties} />
            </Card>,
            <Card title="Super Data Properties" >
                <ListItem entity predicateType={predicateTypes.op} data={this.state.data.superDataProperties} />
            </Card>,
            <Card title="Disjoint Data Properties" >
                <ListItem entity predicateType={predicateTypes.op} data={this.state.data.disjointDataProperties} />
            </Card>,
            <Card title="Domain" >
                <ListItem entity predicateType={predicateTypes.c} data={this.state.data.dataPropertyDomain} />
            </Card>,
            <Card title="Range" >
                <ListItem entity predicateType={predicateTypes.c} data={this.state.data.dataPropertyRange} />
            </Card>,
            <Card title="Data Property Characteristics" >
                <ListItem data={dataPropertyCharacteristics} />
            </Card>,
            <Card title="Data Property Individuals" >
                <ListItem entity predicateType={predicateTypes.op} data={this.state.data.dataPropertyIndividuals} />
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
                    <Card title="Descriptions" data={this.state.data.dataPropertyDescriptions} />
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
