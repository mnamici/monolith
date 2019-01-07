import React from 'react';
import { List, Card } from 'antd';

import OntologyMetricsTabs from './OntologyMetricsTabs'
import DownloadFile from './DownloadFile'

const data = {
    ontolgogyIRI: "http://www.example.com/ACI",
    ontologyImports: [
        "http://www.aci.it/ACI",
        "http://www.lod-aci.com/ACI"
    ],
    ontologyPrefixManager: [{
        mapKey: 'aci:',
        mapValue: 'http://www.example.com/ACI#'
    }, {
        mapKey: 'rdf:',
        mapValue: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
    }],
    ontologyDescriptions: [
        "First descritpion",
        "Second descritpion",
        "Last descritpion"
    ],
    ontologyMetrics: {
        metrics: [{
            mapKey: 'Axioms:',
            mapValue: '234500'
        }, {
            mapKey: 'Classes:',
            mapValue: '2345'
        }, {
            mapKey: 'Object Properties:',
            mapValue: '2'
        }, {
            mapKey: 'Data Properties:',
            mapValue: '2000000'
        }],
        classAxioms: [{
            mapKey: 'SubClassOf:',
            mapValue: '99999'
        }, {
            mapKey: 'DisjointClasses',
            mapValue: '3'
        }],
        objectPropertyAxioms: [{
            mapKey: 'SubObjectPropertyOf:',
            mapValue: '99999'
        }, {
            mapKey: 'DisjointObjectProperties',
            mapValue: '3'
        }],
        dataPropertyAxioms: [{
            mapKey: 'SubDataPropertyOf:',
            mapValue: '99999'
        }, {
            mapKey: 'DisjointDataProperty',
            mapValue: '3'
        }],
        individualAxioms: [{
            mapKey: 'ClassAssertion:',
            mapValue: '99999'
        }, {
            mapKey: 'ObjectPropertyAssertion',
            mapValue: '3'
        }],
        annotationAxioms: [{
            mapKey: 'AnnotationAssertion:',
            mapValue: '99999'
        }],
    }
}

class OntologyInfo extends React.Component {
    render() {
        const elements = [
            <Card title="IRI">{data.ontolgogyIRI}</Card>,
            <OntologyMetricsTabs titles={[{ key: "imports", tab: "Imports" }]} data={data.ontologyImports} />,
            <OntologyMetricsTabs titles={[{ key: "pm", tab: "Prefix Manager" }]} data={data.ontologyPrefixManager} />,
            <OntologyMetricsTabs titles={[{ key: "desc", tab: "Descriptions" }]} data={data.ontologyDescriptions} />,

        ]
        return (
            <div>
                <List
                    grid={{ gutter: 12, column: 2 }}
                    dataSource={elements}
                    renderItem={item => (
                        <List.Item>
                            {item}
                        </List.Item>
                    )}
                />
                <OntologyMetricsTabs titles={[
                    { key: "metrics", tab: "Metrics" },
                    { key: "classAxioms", tab: "Class Axioms" },
                    { key: "objectPropertyAxioms", tab: "Object Properties Axioms" },
                    { key: "dataPropertyAxioms", tab: "Data Properties Axioms" },
                    { key: "individualAxioms", tab: "Individual Axioms" },
                    { key: "annotationAxioms", tab: "Annotation Axioms" }
                ]}
                    data={data.ontologyMetrics}
                />,
                <DownloadFile/>
            </div>
        );
    }
}

export default OntologyInfo;