import React from 'react'
import { Card, Popover, List, Spin } from 'antd';
import { getClassPage } from '../api/MastroApi';
import svg from '../css/class.svg'
import { renderEntity, predicateTypes } from '../utils/utils'
import ListItem from './ListItem';

export default class ClassPage extends React.Component {
    _isMounted = false;
    state = {
        data: {},
        loading: false
    }

    componentDidMount() {
        this._isMounted = true;
        // console.log(this.props)
        if (this.props.match.params.entityID !== undefined) {
            this.setState({ loading: true })
            getClassPage(
                this.props.ontology.name,
                this.props.ontology.version,
                this.props.match.params.entityID,
                this.loaded)
        }
    }

    componentWillReceiveProps(props) {
        // console.log(props)
        if (props.match.params.entityID !== undefined) {
            this.setState({ loading: true })
            getClassPage(
                props.ontology.name,
                props.ontology.version,
                props.match.params.entityID,
                this.loaded)
        }
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    loaded = (data) => {
        // console.log(data)
        this._isMounted && this.setState({ data: data, loading: false })
    }

    render() {
        // console.log("CLASS PAGE", this.props)
        const spin = <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 36 }}> <Spin size='large' /></div>

        if (this.state.data.currentEntity === undefined) return spin

        const components = [
            <Card className='classCard' title="Equivalent Classes">
                <ListItem
                    entity
                    axiom={{ owl: 'EquivalentClasses', first: this.state.data.currentEntity }}
                    predicateType={predicateTypes.c}
                    data={this.state.data.equivalentClasses} />
            </Card>,
            <Card className='classCard' title="Sub Classes">
                <ListItem
                    entity
                    axiom={{ owl: 'SubClassOf', first: this.state.data.currentEntity }}
                    predicateType={predicateTypes.c}
                    data={this.state.data.subClasses} />
            </Card>,
            <Card className='classCard' title="Super Classes">
                <ListItem
                    entity
                    axiom={{ owl: 'SubClassOf', second: this.state.data.currentEntity }}
                    predicateType={predicateTypes.c}
                    data={this.state.data.superClasses} />
            </Card>,
            <Card className='classCard' title="Disjoint Classes">
                <ListItem
                    entity
                    axiom={{ owl: 'DisjoinClasses', first: this.state.data.currentEntity }}
                    predicateType={predicateTypes.c}
                    data={this.state.data.disjointClasses} />
            </Card>,
            <Card className='classCard' title="Object Properties">
                <ListItem
                    partecipation
                    axiom={{ owl: 'SubClassOf', first: this.state.data.currentEntity }}
                    predicateType={predicateTypes.op}
                    data={this.state.data.objectPropertiesParticipations} />
            </Card>,
            <Card className='classCard' title="Data Properties">
                <ListItem
                    partecipation
                    axiom={{ owl: 'SubClassOf', first: this.state.data.currentEntity }}
                    predicateType={predicateTypes.dp}
                    data={this.state.data.dataPropertiesParticipations} />
            </Card>,
            <Card className='classCard' title="Disjoint Unions">
                <ListItem
                    union
                    predicateType={predicateTypes.c}
                    data={this.state.data.disjointUnions} />
            </Card>,
            <Card className='classCard' title="Individuals">
                <ListItem
                    entity
                    predicateType={predicateTypes.i} data={this.state.data.classIndividuals} />
            </Card>,
        ]
        return (
            this.state.loading ? spin :

                <div>
                    <div style={{ textAlign: 'center' }}>
                        <h1><img src={svg} alt='' style={{ height: 35, paddingBottom: 4 }} /><span>{renderEntity(this.state.data.currentEntity)}</span></h1>
                        <Popover content={this.state.data.currentEntity.entityIRI} placement='bottom'>
                            <h3>{this.state.data.currentEntity.entityPrefixIRI}</h3>
                        </Popover>
                    </div>
                    <div>
                        <div style={{ paddingBottom: '16px' }}>
                            <Card title="Description" className='description'>
                                <ListItem label data={this.state.data.classDescriptions} />
                            </Card>
                        </div>
                        <List
                            grid={{ gutter: 12, lg: 3, md: 2, sm: 1, xs: 1 }}
                            dataSource={components}
                            renderItem={item => (
                                <List.Item style={{ paddingBottom: 8 }}>
                                    {item}
                                </List.Item>
                            )}
                        />
                    </div>
                </div>

        );
    }
}

