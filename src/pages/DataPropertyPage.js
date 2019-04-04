import React from 'react'
import { Card, Popover, List } from 'antd';
import { getDataPropertyPage } from '../api/MastroApi';
import svg from '../css/attr.svg'
import { renderEntity, predicateTypes } from '../utils/utils'
import ListItem from './ListItem';

export default class DataPropertyPage extends React.Component {
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

            <Card className='dataPropertyCard' title="Equivalent Data Properties" >
                <ListItem entity predicateType={predicateTypes.op} data={this.state.data.equivalentDataProperties} />
            </Card>,
            <Card className='dataPropertyCard' title="Sub Data Properties" >
                <ListItem entity predicateType={predicateTypes.op} data={this.state.data.subDataProperties} />
            </Card>,
            <Card className='dataPropertyCard' title="Super Data Properties" >
                <ListItem entity predicateType={predicateTypes.op} data={this.state.data.superDataProperties} />
            </Card>,
            <Card className='dataPropertyCard' title="Disjoint Data Properties" >
                <ListItem entity predicateType={predicateTypes.op} data={this.state.data.disjointDataProperties} />
            </Card>,
            <Card className='dataPropertyCard' title="Domain" >
                <ListItem entity predicateType={predicateTypes.c} data={this.state.data.dataPropertyDomain} />
            </Card>,
            <Card className='dataPropertyCard' title="Range" >
                <ListItem entity predicateType={predicateTypes.c} data={this.state.data.dataPropertyRange} />
            </Card>,
            <Card className='dataPropertyCard' title="Data Property Characteristics" >
                <ListItem data={dataPropertyCharacteristics} />
            </Card>,
            <Card className='dataPropertyCard' title="Data Property Individuals" >
                <ListItem entity predicateType={predicateTypes.op} data={this.state.data.dataPropertyIndividuals} />
            </Card>,
        ]
        return (
            <div>
                <div style={{ textAlign: 'center' }}>
                    <h1><img src={svg} alt='' style={{height: 30}}/><span>{renderEntity(this.state.data.currentEntity)}</span></h1>
                    <Popover content={this.state.data.currentEntity.entityIRI}>
                        <h3>{this.state.data.currentEntity.entityPrefixIRI}</h3>
                    </Popover>
                </div>
                <div style={{ paddingBottom: '16px' }}>
                    <Card title="Description" className='description'>
                        <ListItem label data={this.state.data.dataPropertyDescriptions} />
                    </Card>
                </div>
                <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={components}
                    renderItem={item => (
                        <List.Item style={{paddingBottom: 8}}>
                            {item}
                        </List.Item>
                    )}
                />
            </div>

        );
    }
}

