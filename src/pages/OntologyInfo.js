import React from 'react';
import { List } from 'antd';

import OntologyMetricsTabs from './OntologyMetricsTabs'
import DownloadFile from './DownloadFile'
import { getOntologyVersionInfo } from '../api/MastroApi';

class OntologyInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = { data: {} }
    }

    componentDidMount() {
        //console.log(props.ontology.name + "    " + props.ontology.version)
        getOntologyVersionInfo(
            this.props.ontology.name,
            this.props.ontology.version,
            this.loaded)
    }

    componentWillReceiveProps(props) {
        //console.log(props.ontology.name + "    " + props.ontology.version)
        getOntologyVersionInfo(
            props.ontology.name,
            props.ontology.version,
            this.loaded)
    }

    loaded = (data) => {
        if (data === undefined)
            data = []
        this.setState({
            data: data
        });
    }

    render() {
        const elements = [
            // <Card title="IRI">{this.state.data.ontologyIRI}</Card>,
            <OntologyMetricsTabs titles={[{ key: "imports", tab: "Imports" }]} data={this.state.data.ontologyImports} />,
            <OntologyMetricsTabs titles={[{ key: "pm", tab: "Prefixes" }]} data={this.state.data.ontologyPrefixManager} />,
            <OntologyMetricsTabs titles={[{ key: "desc", tab: "Descriptions" }]} data={this.state.data.ontologyDescriptions} />,
            <OntologyMetricsTabs titles={[
                { key: "metrics", tab: "Metrics" },
                { key: "classAxioms", tab: "Class Axioms" },
                { key: "objectPropertyAxioms", tab: "Object Properties Axioms" },
                { key: "dataPropertyAxioms", tab: "Data Properties Axioms" },
                { key: "individualAxioms", tab: "Individual Axioms" },
                { key: "annotationAxioms", tab: "Annotation Axioms" }
            ]}
                data={this.state.data.ontologyMetrics}
            />,
            <DownloadFile />

        ]
        return (
            <div>
                <div style={{ textAlign: 'center', padding:16 }}>
                    <h1 >{this.props.ontology.name}</h1>
                    <div><a href={"#class?q="}>{this.state.data.ontologyIRI}</a></div>
                    <a href={"#class?q="}>{this.props.ontology.version}</a>
                </div>
                <List
                    grid={{ gutter: 12, column: 2 }}
                    dataSource={elements}
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

export default OntologyInfo;