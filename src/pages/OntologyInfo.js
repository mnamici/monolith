import React from 'react';
import { List, Card } from 'antd';
import OntologyMetricsTabs from './OntologyMetricsTabs'
import DownloadFile from './DownloadFile'
import { getOntologyVersionInfo } from '../api/MastroApi';
import ListItem from './ListItem';

export default class OntologyInfo extends React.Component {
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
        let metriscAxioms = {}

        if (this.state.data.ontologyMetrics !== undefined) {
            let axioms = []
            axioms.push(...this.state.data.ontologyMetrics.classAxioms)
            axioms.push(...this.state.data.ontologyMetrics.objectPropertyAxioms)
            axioms.push(...this.state.data.ontologyMetrics.dataPropertyAxioms)
            axioms.push(...this.state.data.ontologyMetrics.individualAxioms)
            axioms.push(...this.state.data.ontologyMetrics.annotationAxioms)

            metriscAxioms = {
                metrics: this.state.data.ontologyMetrics.metrics,
                axioms: axioms
            }
        }


        const elements = [
            <OntologyMetricsTabs titles={[
                { key: "pm", tab: "Prefixes" }, { key: "imports", tab: "Imports" },
            ]}
                data={{ imports: this.state.data.ontologyImports, pm: this.state.data.ontologyPrefixManager }} />,
            <OntologyMetricsTabs titles={[
                { key: "metrics", tab: "Metrics" },
                { key: "axioms", tab: "Axioms" },
            ]}
                data={metriscAxioms} />,

        ]

        return (
            <div style={{ paddingRight: '1vw' }} >
                <div style={{ textAlign: 'center', padding: 16 }}>
                    <h1 >{this.props.ontology.name}</h1>
                    <div><h3>{this.state.data.ontologyIRI}</h3></div>
                    <h3>{this.props.ontology.version}</h3>
                </div>
                <div style={{ paddingBottom: 12 }}>
                    {/* <OntologyMetricsTabs titles={[{ key: "desc", tab: "Descriptions" }]} data={this.state.data.ontologyDescriptions} /> */}
                    <Card title='Description' className='description'>
                        <ListItem label data={this.state.data.ontologyDescriptions} />
                    </Card>
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

                <div style={{ display: 'flex', paddingTop: 12 }}>
                    <DownloadFile ontology={this.props.ontology}
                    />
                </div>
            </div>
        );
    }
}