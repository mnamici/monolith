import React from 'react'
import { Popover, List } from 'antd';
import CollapsibleList from './CollapsibleList';
import { getClassPage } from '../api/MastroApi';

class ClassPage extends React.Component {
    state = {
        data: {}
    }

    componentDidMount() {
        // console.log(this.props)
        if (this.props.currentClass !== undefined)
            getClassPage(
                this.props.ontology.name,
                this.props.ontology.version,
                this.props.currentClass,
                this.loaded)
    }

    componentWillReceiveProps(props) {
        // console.log(props)
        if (props.currentClass !== undefined)
            getClassPage(props.ontology.name, props.ontology.version, props.currentClass, this.loaded)
    }

    loaded = (data) => {
        this.setState({ data: data })
    }

    render() {
        if (this.state.data.currentEntity === undefined) return <h3 style={{ textAlign: 'center' }}>ERROR IN THE RESPONSE!</h3>
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
            <div style={{ padding: 12 }}>
                <div style={{ textAlign: 'center' }}>
                    <h1 >{this.state.data.currentEntity.entityRender}</h1>
                    <Popover content={this.state.data.iri.extendedIRI}>
                        <a href={"#class?q=" + this.state.data.currentEntity.entityID}>{this.state.data.iri.shortIRI}</a>
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
