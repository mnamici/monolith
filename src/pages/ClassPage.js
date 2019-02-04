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
        // console.log(data)
        this.setState({ data: data })
    }

    render() {
        if (this.state.data.currentEntity === undefined) return null
        const components = [

            <CollapsibleList title="Equivalent Classes" predicateType="Classes" list={this.state.data.equivalentClasses} />,
            <CollapsibleList title="Sub Classes" predicateType="Classes" list={this.state.data.subClasses} />,
            <CollapsibleList title="Super Classes" predicateType="Classes" list={this.state.data.superClasses} />,
            <CollapsibleList title="Disjoint Classes" predicateType="Classes" list={this.state.data.disjointClasses} />,
            <CollapsibleList title="Object Properties" list={this.state.data.objectProperties} />,
            <CollapsibleList title="Data Properties" list={this.state.data.dataProperties} />,
            <CollapsibleList title="Disjoint Unions" list={this.state.data.disjointUnions} />,
            <CollapsibleList title="Individuals" list={this.state.data.classIndividuals} />,
        ]
        return (
            <div style={{ padding: 12 }}>
                <div style={{ textAlign: 'center' }}>
                    <h1 >{this.state.data.currentEntity.entityPrefixIRI}</h1>
                    <Popover content={this.state.data.currentEntity.entityIRI}>
                        <span>{this.state.data.currentEntity.entityPrefixIRI}</span>
                    </Popover>
                </div>
                <div style={{ padding: '16px 0px 16px 0px' }}>
                    <CollapsibleList title="Descriptions" list={this.state.data.classDescriptions} />
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
