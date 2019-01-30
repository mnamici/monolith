import { message } from 'antd'
import axios from 'axios';

const mastroUrl = 'http://192.168.0.59:8080/mws/rest/mwsx'
const headers = {
    'Authorization': 'Basic bWFzdHJvOmRhc2lsYWI='
}

const dev = false
const fakeDataGO = [
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
const fakeDataOI = {
    ontologyIRI: "http://www.example.com/ACI",
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
const mastroData = {
    "hierarchyTree": {
        "classTree": {
            "children": [{
                "children": [],
                "entity": {
                    "entityRender": "http://www.obdasystems.com/demo/superheroes/#Superhero",
                    "entityID": "CL_3"
                }
            }, {
                "children": [],
                "entity": {
                    "entityRender": "http://www.w3.org/2002/07/owl#Thing",
                    "entityID": "CL_5"
                }
            }, {
                "children": [],
                "entity": {
                    "entityRender": "http://www.obdasystems.com/demo/superheroes/#Extraterrestrial",
                    "entityID": "CL_8"
                }
            }, {
                "children": [],
                "entity": {
                    "entityRender": "http://www.obdasystems.com/demo/superheroes/#Human",
                    "entityID": "CL_9"
                }
            }, {
                "children": [],
                "entity": {
                    "entityRender": "http://www.obdasystems.com/demo/superheroes/#Meta_human",
                    "entityID": "CL_2"
                }
            }, {
                "children": [],
                "entity": {
                    "entityRender": "http://www.obdasystems.com/demo/superheroes/#Villain",
                    "entityID": "CL_4"
                }
            }, {
                "children": [],
                "entity": {
                    "entityRender": "http://www.obdasystems.com/demo/superheroes/#Character",
                    "entityID": "CL_1"
                }
            }, {
                "children": [{
                    "children": [],
                    "entity": {
                        "entityRender": "http://www.obdasystems.com/demo/superheroes/#Superpower",
                        "entityID": "CL_7"
                    }
                }],
                "entity": {
                    "entityRender": "http://www.obdasystems.com/demo/superheroes/#Ability",
                    "entityID": "CL_6"
                }
            }],
            "entity": {
                "entityRender": "ROOT",
                "entityID": "ROOT"
            }
        },
        "objectPropertyTree": {
            "children": [{
                "children": [],
                "entity": {
                    "entityRender": "http://www.obdasystems.com/demo/superheroes/#has_ability",
                    "entityID": "OP_10"
                }
            }, {
                "children": [],
                "entity": {
                    "entityRender": "http://www.obdasystems.com/demo/superheroes/#is_enemy_of",
                    "entityID": "OP_11"
                }
            }],
            "entity": {
                "entityRender": "ROOT",
                "entityID": "ROOT"
            }
        },
        "dataPropertyTree": {
            "children": [{
                "children": [],
                "entity": {
                    "entityRender": "http://www.obdasystems.com/demo/superheroes/#name",
                    "entityID": "DP_12"
                }
            }, {
                "children": [],
                "entity": {
                    "entityRender": "http://www.obdasystems.com/demo/superheroes/#origin_planet_name",
                    "entityID": "DP_13"
                }
            }],
            "entity": {
                "entityRender": "ROOT",
                "entityID": "ROOT"
            }
        }
    }
}

function reportError(msg) {
    console.error(msg)
    message.error(msg)
}

export function getOntologies(callback) {
    if (dev) return callback(fakeDataGO);
    const url = mastroUrl + '/owlOntology'
    const method = 'GET'
    axios({
        url: url,
        method: method,
        headers: headers,
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url)
    });
}

export function putOntology(ontology, callback) {
    const url = mastroUrl + '/owlOntology'
    const method = 'PUT'
    axios({
        url: url,
        method: method,
        data: ontology,
        headers: headers,
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url)
    });
}

export function deleteOntology(ontologyID, callback) {
    const url = mastroUrl + '/owlOntology/' + ontologyID
    const method = 'DELETE'
    axios({
        url: url,
        method: method,
        headers: headers,
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url)
    });
}

export function deleteOntologyVersion(ontologyID, version, callback) {
    const url = mastroUrl + '/owlOntology/' + ontologyID + '/version'
    const method = 'DELETE'
    axios({
        url: url,
        method: method,
        data: version,
        headers: headers
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url)
    });
}

export function uploadFile(file, ontologyID, callback) {
    const url = mastroUrl + '/owlOntology/' + ontologyID
    const method = 'PUT'
    axios({
        url: url,
        method: method,
        data: file,
        headers: headers,
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url)
    });
}

export function getOntologyVersionInfo(name, version, callback) {
    if (dev) return callback(fakeDataOI);
    const url = mastroUrl + '/owlOntology/' + name + '/version/info'
    const method = 'GET'
    const encodedVersion = version//encodeURIComponent(version)
    axios({
        url: url,
        method: method,
        params: { version: encodedVersion },
        headers: headers,
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url)
    });
}

export function getOntologyVersionHierarchy(name, version, callback) {
    if (dev) callback(mastroData)
    const url = mastroUrl + '/owlOntology/' + name + '/version/hierarchy'
    const method = 'GET'
    const encodedVersion = version//encodeURIComponent(version)
    axios({
        url: url,
        method: method,
        params: { version: encodedVersion },
        headers: headers,
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url)
    });
}