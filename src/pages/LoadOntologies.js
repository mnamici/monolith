import React from 'react'
import {Button} from 'antd'
import OntologiesList from './OntologiesList'
import OntologyVersionsList from './OntologyVersionsList'
const data = [
    {
        "ontologyID": "FIRST",
        "ontologyDescription": "Description for ontology FIRST",
        "ontologyVersions": [
            {
                "ontologyID": "FIRST",
                "versionID": "1.0",
                "versionDescription": "Fisrt of first",
                "versionDate": "25/12/0",
                "numClasses": 20, 
                "numObjectProperties": 23, 
                "numDataProperties": 34, 
                "numAxioms": 1000
            },
            {
                "ontologyID": "FIRST",
                "versionID": "3.0",
                "versionDescription": "Last of first",
                "versionDate": "25/12/0",
                "numClasses": 20, 
                "numObjectProperties": 23, 
                "numDataProperties": 34, 
                "numAxioms": 1000
            },
        ]
    },
    {
        "ontologyID": "ACI",
        "ontologyDescription": "Description for ontology ACI",
        "ontologyVersions": [
            {
                "ontologyID": "ACI",
                "versionID": "1.0",
                "versionDescription": "Fisrt of ACI",
                "versionDate": "25/12/0",
                "numClasses": 20, 
                "numObjectProperties": 23, 
                "numDataProperties": 34, 
                "numAxioms": 1000
            },
            {
                "ontologyID": "ACI",
                "versionID": "1.1",
                "versionDescription": "Second of ACI",
                "versionDate": "25/12/0",
                "numClasses": 20, 
                "numObjectProperties": 23, 
                "numDataProperties": 34, 
                "numAxioms": 1000
            },
            {
                "ontologyID": "ACI",
                "versionID": "323.0",
                "versionDescription": "LAST of ACI",
                "versionDate": "25/12/0",
                "numClasses": 20, 
                "numObjectProperties": 23, 
                "numDataProperties": 34, 
                "numAxioms": 1000
            },
        ]
    },
]

class LoadOntologies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            ontologyID: null
        };

        this.prev = this.prev.bind(this)
    }

    next(ontologyID) {
        const current = this.state.current + 1;
        this.setState({ current, ontologyID });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    render() {
        return (
            <div>
                {
                    this.state.current===0 ?
                        <OntologiesList data={data} next={this.next.bind(this)}/>:
                        <OntologyVersionsList data={data} current={this.state.ontologyID} previous={this.prev.bind(this)}/>
                }
                {
                    this.state.current > 0 && (
                        <Button style={{ marginLeft: 8 }} onClick={this.prev}>
                            Previous
                        </Button>
                    )
                }
            </div>);
    }
}

export default LoadOntologies;