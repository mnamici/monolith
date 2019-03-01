import React from 'react'
import { Card, Popover, List } from 'antd';
import { getClassPage } from '../api/MastroApi';

import { renderEntity, predicateTypes } from '../utils/utils'
import ListItem from './ListItem';

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
            <Card title="Equivalent Classes">
                <ListItem entity predicateType={predicateTypes.c} data={this.state.data.equivalentClasses} />
            </Card>,
            <Card title="Sub Classes">
                <ListItem entity predicateType={predicateTypes.c} data={this.state.data.subClasses} />
            </Card>,
            <Card title="Super Classes">
                <ListItem entity predicateType={predicateTypes.c} data={this.state.data.superClasses} />
            </Card>,
            <Card title="Disjoint Classes">
                <ListItem entity predicateType={predicateTypes.c} data={this.state.data.disjointClasses} />
            </Card>,
            <Card title="Object Properties">
                <ListItem partecipation predicateType={predicateTypes.op} data={this.state.data.objectPropertiesParticipations} />
            </Card>,
            <Card title="Data Properties">
                <ListItem partecipation predicateType={predicateTypes.dp} data={this.state.data.dataPropertiesParticipations} />
            </Card>,
            <Card title="Disjoint Unions">
                <ListItem entity predicateType={predicateTypes.c} data={this.state.data.disjointUnions} />
            </Card>,
            <Card title="Individuals">
                <ListItem entity predicateType={predicateTypes.i} data={this.state.data.classIndividuals} />
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
                        <ListItem data={this.state.data.classDescriptions} />
                    </Card>,
                </div>
                <List
                    grid={{ gutter: 12, column: 4 }}
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
