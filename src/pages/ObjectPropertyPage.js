import React from 'react'
import { Popover, List } from 'antd';
import CollapsibleList from './CollapsibleList';
import { getObjectPropertyPage } from '../api/MastroApi';

class ClassPage extends React.Component {
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
        const components = [

            <CollapsibleList title="Equivalent Object Properties" list={this.state.data.equivalentObjectProperties} />,
            <CollapsibleList title="Sub Object Properties" list={this.state.data.subObjectProperties} />,
            <CollapsibleList title="Super Object Properties" list={this.state.data.superObjectProperties} />,
            <CollapsibleList title="Disjoint Object Properties" list={this.state.data.disjointObjectProperties} />,
            <CollapsibleList title="Inverse Object Properties" list={this.state.data.inverseObjectProperties} />,
            <CollapsibleList title="Domain" list={this.state.data.objectPropertyDomain} />,
            <CollapsibleList title="Range" list={this.state.data.objectPropertyRange} />,
            <CollapsibleList title="Equivalent Object Properties" list={this.state.data.equivalentObjectProperties} />,
            <CollapsibleList title="Object Property Characteristics" list={this.state.data.objectPropertyCharacteristics} />,
            <CollapsibleList title="Object Property Individuals" list={this.state.data.objectPropertyIndividuals} />,
        ]
        return (
            <div>
                <div style={{ textAlign: 'center' }}>
                    <h1 >{this.state.data.currentEntity.entityPrefixIRI}</h1>
                    <Popover content={this.state.data.currentEntity.entityIRI}>
                        <span>{this.state.data.currentEntity.entityPrefixIRI}</span>
                    </Popover>
                </div>
                <div style={{ padding: '16px 0px 16px 0px' }}>
                    <CollapsibleList title="Descriptions" list={this.state.data.objectPropertyDescriptions} />
                </div>
                <List
                    grid={{ gutter: 16, column: 2 }}
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
