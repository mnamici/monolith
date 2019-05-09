export function fakeLogin(username, password, callback) {
    if (username === 'santaroni' && password === 'ronconelli') {
        const h = {
            'Access-Control-Allow-Origin': '*',
            // 'Authorization': 'Basic ' + btoa(username + ':' + password)
        }
        localStorage.setItem('headers', JSON.stringify(h))
        return callback();
    }
    else {
        throw Error('Wrong username or password');
    }
}

export const fakeDataGO = [
    {
        "ontologyID": "FIRST",
        "ontologyDescription": "Description for ontology FIRST, loooooooooooooooooooooooooooooo oooooooooooooooooooooooooooooooooooooong oooooooooooooooooooooooooooooooooooooong oooooooooooooooooooooooooooooooooooooong oooooooooooooooooooooooooooooooooooooong",
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
export const fakeDataOI = {
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
        { content: "First descritpion" },
        { content: "Second descritpion" },
        { content: "Last descritpion: this time it is very long because i have to test long descriptions. Everything start when i was 4 years old. My mother blamed to brun the table. It was not a brand new table but my mother was very affectionated to it. It was not my fault, and my brother's neither, so I started thinking how to solve the question. \nThere was a fish bowl on the table and it ws very well lightened by the sun. I stare at the bowl, I stare at the fish, I stare at the bowl... EUREKA! The bowl act as a magnifing glass and burn the table. I went to tell my mother my discover, but first she didn't believe me because the fish in the bowl was still alive and not boiled. When my father came back home, I told the explaination of the fact to him trying to explain that the water act as a magnifying glass and does not become hot in this kind of work. \nFinally he listen to my point, the mystery was solved." }
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

export const mastroData = { "hierarchyTree": { "classTree": { "children": [{ "children": [{ "children": [], "entity": { "entityIRI": "http://www.obdasystems.com/books/PrintedBook", "entityID": "CL_6", "entityPrefixIRI": ":PrintedBook", "entityRemainder": "PrintedBook", "entityLabels": [{ "lang": "", "content": "LibroStampato" }], "entityType": "CLASS" } }, { "children": [], "entity": { "entityIRI": "http://www.obdasystems.com/books/E_Book", "entityID": "CL_1", "entityPrefixIRI": ":E_Book", "entityRemainder": "E_Book", "entityLabels": [{ "lang": "", "content": "LibroElettronico" }], "entityType": "CLASS" } }, { "children": [], "entity": { "entityIRI": "http://www.obdasystems.com/books/UneditedBook", "entityID": "CL_12", "entityPrefixIRI": ":UneditedBook", "entityRemainder": "UneditedBook", "entityLabels": [{ "lang": "", "content": "LibroInedito" }], "entityType": "CLASS" } }, { "children": [], "entity": { "entityIRI": "http://www.obdasystems.com/books/AudioBook", "entityID": "CL_4", "entityPrefixIRI": ":AudioBook", "entityRemainder": "AudioBook", "entityLabels": [{ "lang": "", "content": "AudioLibro" }], "entityType": "CLASS" } }], "entity": { "entityIRI": "http://www.obdasystems.com/books/Book", "entityID": "CL_7", "entityPrefixIRI": ":Book", "entityRemainder": "Book", "entityLabels": [{ "lang": "", "content": "Libro" }], "entityType": "CLASS" } }, { "children": [], "entity": { "entityIRI": "http://www.obdasystems.com/books/Editor", "entityID": "CL_2", "entityPrefixIRI": ":Editor", "entityRemainder": "Editor", "entityLabels": [{ "lang": "", "content": "Editore" }], "entityType": "CLASS" } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.obdasystems.com/books/EconomicEdition", "entityID": "CL_3", "entityPrefixIRI": ":EconomicEdition", "entityRemainder": "EconomicEdition", "entityLabels": [{ "lang": "", "content": "EdizioneEconomica" }], "entityType": "CLASS" } }, { "children": [], "entity": { "entityIRI": "http://www.obdasystems.com/books/SpecialEdition", "entityID": "CL_8", "entityPrefixIRI": ":SpecialEdition", "entityRemainder": "SpecialEdition", "entityLabels": [{ "lang": "", "content": "EdizioneSpeciale" }], "entityType": "CLASS" } }], "entity": { "entityIRI": "http://www.obdasystems.com/books/Edition", "entityID": "CL_5", "entityPrefixIRI": ":Edition", "entityRemainder": "Edition", "entityLabels": [{ "lang": "", "content": "Edizione" }], "entityType": "CLASS" } }, { "children": [{ "children": [], "entity": { "entityIRI": "http://www.obdasystems.com/books/EmergingWriter", "entityID": "CL_11", "entityPrefixIRI": ":EmergingWriter", "entityRemainder": "EmergingWriter", "entityLabels": [{ "lang": "", "content": "AutoreEmergente" }], "entityType": "CLASS" } }], "entity": { "entityIRI": "http://www.obdasystems.com/books/Author", "entityID": "CL_10", "entityPrefixIRI": ":Author", "entityRemainder": "Author", "entityLabels": [{ "lang": "", "content": "Autore" }], "entityType": "CLASS" } }], "entity": { "entityIRI": "ROOT", "entityID": "ROOT", "entityPrefixIRI": null, "entityRemainder": null, "entityLabels": null, "entityType": null } }, "objectPropertyTree": { "children": [{ "children": [], "entity": { "entityIRI": "http://www.obdasystems.com/books/editedBy", "entityID": "OP_1", "entityPrefixIRI": ":editedBy", "entityRemainder": "editedBy", "entityLabels": [{ "lang": "", "content": "editatoDa" }], "entityType": "OBJECT_PROPERTY" } }, { "children": [], "entity": { "entityIRI": "http://www.obdasystems.com/books/hasEdition", "entityID": "OP_2", "entityPrefixIRI": ":hasEdition", "entityRemainder": "hasEdition", "entityLabels": [{ "lang": "", "content": "haEdizione" }], "entityType": "OBJECT_PROPERTY" } }, { "children": [], "entity": { "entityIRI": "http://www.obdasystems.com/books/writtenBy", "entityID": "OP_3", "entityPrefixIRI": ":writtenBy", "entityRemainder": "writtenBy", "entityLabels": [{ "lang": "", "content": "scrittoDa" }], "entityType": "OBJECT_PROPERTY" } }], "entity": { "entityIRI": "ROOT", "entityID": "ROOT", "entityPrefixIRI": null, "entityRemainder": null, "entityLabels": null, "entityType": null } }, "dataPropertyTree": { "children": [{ "children": [], "entity": { "entityIRI": "http://www.obdasystems.com/books/editionNumber", "entityID": "DL_3", "entityPrefixIRI": ":editionNumber", "entityRemainder": "editionNumber", "entityLabels": [{ "lang": "", "content": "numeroDiEdizione" }], "entityType": "DATA_PROPERTY" } }, { "children": [], "entity": { "entityIRI": "http://www.obdasystems.com/books/genre", "entityID": "DL_4", "entityPrefixIRI": ":genre", "entityRemainder": "genre", "entityLabels": [{ "lang": "", "content": "genere" }], "entityType": "DATA_PROPERTY" } }, { "children": [], "entity": { "entityIRI": "http://www.obdasystems.com/books/name", "entityID": "DL_5", "entityPrefixIRI": ":name", "entityRemainder": "name", "entityLabels": [{ "lang": "", "content": "nome" }], "entityType": "DATA_PROPERTY" } }, { "children": [], "entity": { "entityIRI": "http://www.obdasystems.com/books/dateOfPublication", "entityID": "DL_2", "entityPrefixIRI": ":dateOfPublication", "entityRemainder": "dateOfPublication", "entityLabels": [{ "lang": "", "content": "dataDiPubblicazione" }], "entityType": "DATA_PROPERTY" } }, { "children": [], "entity": { "entityIRI": "http://www.obdasystems.com/books/title", "entityID": "DL_1", "entityPrefixIRI": ":title", "entityRemainder": "title", "entityLabels": [{ "lang": "", "content": "titolo" }], "entityType": "DATA_PROPERTY" } }], "entity": { "entityIRI": "ROOT", "entityID": "ROOT", "entityPrefixIRI": null, "entityRemainder": null, "entityLabels": null, "entityType": null } } } }

export const classData = {
    currentEntity: {
        entityIRI: 'http://www.example.com/Person',
        entityID: 'Person',
        entityPrefixIRI: ':Person',
        entityRemainder: 'Person',
        entityLabels: [{
            lang: 'it',
            content: 'Persona'
        }],
        entityType: 'Person',
    },

    entityDiagrams: [
        {
            nodeID: 'n1223',
            diagrameName: 'Females'
        },
        {
            nodeID: 'n1843',
            diagrameName: 'Cities'
        }
    ],
    classDescriptions: [
        { content: "Persons are beautiful! YEEEEEEEEEEEEEEEEEEEEEEEEEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHHHHHHHHHHH!!! YUPPYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY YUPPYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYUPPYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYUPPYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYUPPYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYUPPYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYUPPYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYUPPYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYUPPYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYUPPYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY" },
        { content: "Persons are evil" }
    ],
    equivalentClasses: [
        {
            entityIRI: 'http://www.example.com/BadFemale',
            entityID: 'BadFemale',
            entityPrefixIRI: ':BadFemale',
            entityRemainder: 'BadFemale',
            entityLabels: [{
                lang: 'it',
                content: 'BadFemalea'
            }],
            entityType: 'BadFemale',
        },
        {
            entityIRI: 'http://www.example.com/BeautifulFemale',
            entityID: 'BeautifulFemale',
            entityPrefixIRI: ':BeautifulFemale',
            entityRemainder: 'BeautifulFemale',
            entityLabels: [{
                lang: 'it',
                content: 'BeautifulFemalea'
            }],
            entityType: 'BeautifulFemale',
        }
    ],
    subClasses: [
        {
            entityIRI: 'http://www.example.com/Student',
            entityID: 'Student',
            entityPrefixIRI: ':Student',
            entityRemainder: 'Student',
            entityLabels: [{
                lang: 'it',
                content: 'Studenta'
            }],
            entityType: 'Student',
        },
        {
            entityIRI: 'http://www.example.com/Professor',
            entityID: 'Professor',
            entityPrefixIRI: ':Professor',
            entityRemainder: 'Professor',
            entityLabels: [{
                lang: 'it',
                content: 'Professora'
            }],
            entityType: 'Professor',
        }
    ],
    superClasses: [
        {
            entityIRI: 'http://www.example.com/Mammifer',
            entityID: 'Mammifer',
            entityPrefixIRI: ':Mammifer',
            entityRemainder: 'Mammifer',
            entityLabels: [{
                lang: 'it',
                content: 'Mammifera'
            }],
            entityType: 'Mammifer',
        }
    ],
    disjointClasses: [
        {
            entityIRI: 'http://www.example.com/Dog',
            entityID: 'Dog',
            entityPrefixIRI: ':Dog',
            entityRemainder: 'Dog',
            entityLabels: [{
                lang: 'it',
                content: 'Doga'
            }],
            entityType: 'Dog',
        },
        {
            entityIRI: 'http://www.example.com/Pig',
            entityID: 'Pig',
            entityPrefixIRI: ':Pig',
            entityRemainder: 'Pig',
            entityLabels: [{
                lang: 'it',
                content: 'Piga'
            }],
            entityType: 'Pig',
        }
    ],
    objectPropertiesParticipations: [
        {
            property: {
                entityIRI: 'http://www.example.com/livesIn',
                entityID: 'livesIn',
                entityPrefixIRI: ':livesIn',
                entityRemainder: 'livesIn',
                entityLabels: [{
                    lang: 'it',
                    content: 'livesIna'
                }],
                entityType: 'livesIn',
            },
            filler: {
                entityIRI: 'http://www.example.com/livesIn',
                entityID: 'livesIn',
                entityPrefixIRI: ':livesIn',
                entityRemainder: 'livesIn',
                entityLabels: [{
                    lang: 'it',
                    content: 'livesIna'
                }],
                entityType: 'livesIn',
            }
        },
        {
            property: {
                entityIRI: 'http://www.example.com/wasBornIn',
                entityID: 'wasBornIn',
                entityPrefixIRI: ':wasBornIn',
                entityRemainder: 'wasBornIn',
                entityLabels: [{
                    lang: 'it',
                    content: 'wasBornIna'
                }],
                entityType: 'wasBornIn',
            },
            filler: {
                entityIRI: 'http://www.example.com/livesIn',
                entityID: 'livesIn',
                entityPrefixIRI: ':livesIn',
                entityRemainder: 'livesIn',
                entityLabels: [{
                    lang: 'it',
                    content: 'livesIna'
                }],
                entityType: 'livesIn',
            }
        }
    ],
    dataPropertiesParticipations: [
        {
            property: {

                entityIRI: 'http://www.example.com/yearOfBirth',
                entityID: 'yearOfBirth',
                entityPrefixIRI: ':yearOfBirth',
                entityRemainder: 'yearOfBirth',
                entityLabels: [{
                    lang: 'it',
                    content: 'yearOfBirtha'
                }],
                entityType: 'yearOfBirth',
            },
            filler: {
                entityIRI: 'http://www.example.com/livesIn',
                entityID: 'livesIn',
                entityPrefixIRI: ':livesIn',
                entityRemainder: 'livesIn',
                entityLabels: [{
                    lang: 'it',
                    content: 'livesIna'
                }],
                entityType: 'livesIn',
            }
        },
        {
            property: {
                entityIRI: 'http://www.example.com/FemaleName',
                entityID: 'FemaleName',
                entityPrefixIRI: ':FemaleName',
                entityRemainder: 'FemaleName',
                entityLabels: [{
                    lang: 'it',
                    content: 'FemaleNamea'
                }],
                entityType: 'FemaleName',
            },
            filler: {
                entityIRI: 'http://www.example.com/livesIn',
                entityID: 'livesIn',
                entityPrefixIRI: ':livesIn',
                entityRemainder: 'livesIn',
                entityLabels: [{
                    lang: 'it',
                    content: 'livesIna'
                }],
                entityType: 'livesIn',
            }
        }
    ],
    disjointUnions: [
        [
            {
                entityIRI: 'http://www.example.com/Male',
                entityID: 'Male',
                entityPrefixIRI: ':Male',
                entityRemainder: 'Male',
                entityLabels: [{
                    lang: 'it',
                    content: 'Malea'
                }],
                entityType: 'Male',
            },
            {
                entityIRI: 'http://www.example.com/Female',
                entityID: 'Female',
                entityPrefixIRI: ':Female',
                entityRemainder: 'Female',
                entityLabels: [{
                    lang: 'it',
                    content: 'Femalea'
                }],
                entityType: 'Female',
            }
        ],
        [
            {
                entityIRI: 'http://www.example.com/Student',
                entityID: 'Student',
                entityPrefixIRI: ':Student',
                entityRemainder: 'Student',
                entityLabels: [{
                    lang: 'it',
                    content: 'Studenta'
                }],
                entityType: 'Student',
            },
            {
                entityIRI: 'http://www.example.com/Professor',
                entityID: 'Professor',
                entityPrefixIRI: ':Professor',
                entityRemainder: 'Professor',
                entityLabels: [{
                    lang: 'it',
                    content: 'Professora'
                }],
                entityType: 'Professor',
            }
        ]
    ],
    classIndividuals: [
        {
            entityIRI: 'http://www.example.com/Valerio',
            entityID: 'Valerio',
            entityPrefixIRI: ':Valerio',
            entityRemainder: 'Valerio',
            entityLabels: [{
                lang: 'it',
                content: 'Valerioa'
            }],
            entityType: 'Valerio',
        },
        {
            entityIRI: 'http://www.example.com/Marco',
            entityID: 'Marco',
            entityPrefixIRI: ':Marco',
            entityRemainder: 'Marco',
            entityLabels: [{
                lang: 'it',
                content: 'Marcoa'
            }],
            entityType: 'Marco',
        }
    ]
}

export const mappings = {
    mappingList: [

        {
            "mappingID": "MAPPING_1",
            "mappingDescription": "Wonderful mappings",
            "mappingDate": "25/12/0",
            "numAssertions": 20,
            "numViews": 23,
            "numKeyDependencies": 34,
            "numInclusionDependencies": 34,
            "numDenials": 34,
        },
        {
            "mappingID": "MAPPING_2",
            "mappingDescription": "Added some dependencies",
            "mappingDate": "25/12/0122",
            "numAssertions": 20,
            "numViews": 23,
            "numKeyDependencies": 12122134,
            "numInclusionDependencies": 3212124,
            "numDenials": 312124,
        },
        {
            "mappingID": "MAPPING_20000000000000000000000000000000000000000000000000000000000000000000000000000",
            "mappingDescription": "Added some dependencies",
            "mappingDate": "25/12/0122",
            "numAssertions": 20,
            "numViews": 23,
            "numKeyDependencies": 12122134,
            "numInclusionDependencies": 3212124,
            "numDenials": 312124,
        },


    ]
}

export const mappingInfo =
{
    mapping: {
        "mappingID": "MAPPING 1",
        "mappingDescription": "Wonderful mappings",
        "mappingDate": "25/12/0",
        "numAssertions": 20,
        "numViews": 23,
        "numKeyDependencies": 34,
        "numInclusionDependencies": 34,
        "numDenials": 34,
    },
    mappingDBConnections: [{
        jdbcURL: 'jdbc:mysql://localhost/books',
        dbUser: 'root',
        dbPassword: 'verySecretPassword'
    }],
    mappingTemplates: [
        'http://www.obdasystems.com/books/q-{_}',
        'http://www.obdasystems.com/books/s-{_}',
        'http://www.obdasystems.com/books/s2-{_}',
        'http://www.obdasystems.com/books/d-{_}',
    ]
}

export const assertions =
    [
        {
            currentEntity: {
                entityIRI: 'http://www.example.com/Person',
                entityID: 'Person',
                entityPrefixIRI: ':Person',
                entityRemainder: 'Person',
                entityLabels: [{
                    lang: 'it',
                    content: 'Persona'
                }],
                entityType: 'class',
            },
            mappingHead: {
                firstArg: 'http://www.example.com/person_{ssn}',
            },
            mappingDescription: 'Data from main table',
            mappingBody: {
                bodySelect: 'ssn',
                bodyWhere: 'ssn is not null',
                bodyFrom: [
                    {
                        sqlViewID: 'personsView',
                        sqlViewDescription: 'Main table for persons',
                        sqlViewCode: 'select ssn, birthDate, livesIn from persona_table'
                    }
                ]
            }
        },
        {
            currentEntity: {
                entityIRI: 'http://www.example.com/Person',
                entityID: 'Person',
                entityPrefixIRI: ':Person',
                entityRemainder: 'Person',
                entityLabels: [{
                    lang: 'it',
                    content: 'Persona'
                }],
                entityType: 'class',
            },
            mappingHead: {
                firstArg: 'http://www.example.com/{person_name}-{surname}',
            },
            mappingDescription: 'Data from names and surnames tables',
            mappingBody: {
                bodySelect: 'namesView.person_name, surnameView.surname',
                bodyWhere: 'namesView.person_id = surnameView.person_id',
                bodyFrom: [
                    {
                        sqlViewID: 'namesView',
                        sqlViewDescription: 'Main table for names',
                        sqlViewCode: 'select person_id, person_name from names_table'
                    },
                    {
                        sqlViewID: 'surnamesView',
                        sqlViewDescription: 'Main table for surnames',
                        sqlViewCode: 'select person_id, person_surname from surnames_table'
                    },
                ]
            }
        },
    ]

export const sqlView =
{
    sqlView: {
        sqlViewID: 'namesView',
        sqlViewDescription: 'Main table for names',
        sqlViewCode: 'select person_id, person_name from names_table'
    },
    mappingAssertions: [
        {
            currentEntity: {
                entityIRI: 'http://www.example.com/Person',
                entityID: 'Person',
                entityPrefixIRI: ':Person',
                entityRemainder: 'Person',
                entityLabels: [{
                    lang: 'it',
                    content: 'Persona'
                }],
                entityType: 'class',
            },
            mappingHead: {
                firstArg: 'http://www.example.com/{person_name}-{surname}',
            },
            mappingDescription: 'Data from names and surnames tables',
            mappingBody: {
                bodySelect: 'namesView.person_name, surnameView.surname',
                bodyWhere: 'namesView.person_id = surnameView.person_id',
                bodyFrom: [
                    {
                        sqlViewID: 'namesView',
                        sqlViewDescription: 'Main table for names',
                        sqlViewCode: 'select person_id, person_name from names_table'
                    },
                    {
                        sqlViewID: 'surnamesView',
                        sqlViewDescription: 'Main table for surnames',
                        sqlViewCode: 'select person_id, person_surname from surnames_table'
                    },
                ]
            }
        },
        {
            currentEntity: {
                entityIRI: 'http://www.example.com/Name',
                entityID: 'Name',
                entityPrefixIRI: ':Name',
                entityRemainder: 'Name',
                entityLabels: [{
                    lang: 'it',
                    content: 'Nome'
                }],
                entityType: 'dataProperty',
            },
            mappingHead: {
                firstArg: 'http://www.example.com/{person_name}-{surname}',
                secondArg: 'person_name'
            },
            mappingDescription: 'Data from names table',
            mappingBody: {
                bodySelect: 'person_name',
                bodyWhere: 'person_name is not null',
                bodyFrom: [
                    {
                        sqlViewID: 'namesView',
                        sqlViewDescription: 'Main table for names',
                        sqlViewCode: 'select person_id, person_name from names_table'
                    },
                ]
            }
        }
    ],
    mappingDependencies: {
        keyDependencies: [
            {
                keyHead: 'person_id',
                sqlViewID: 'namesView'
            }
        ],
        inclusionDependencies: [
            {
                includedView: {
                    sqlViewID: 'namesView',
                    termsList: ['person_id', 'person_name']
                },
                includingView: {
                    sqlViewID: 'surnamesView',
                    termsList: ['person_id', 'person_surname']
                },
                inclusionMap: [
                    {
                        leftHandTerm: 'person_id',
                        rightHandTerm: 'person_id'
                    }
                ]
            },
            {
                includingView: {
                    sqlViewID: 'namesView',
                    termsList: ['person_id', 'person_name']
                },
                includedView: {
                    sqlViewID: 'surnamesView',
                    termsList: ['person_id', 'person_surname']
                },
                inclusionMap: [
                    {
                        leftHandTerm: 'person_id',
                        rightHandTerm: 'person_id'
                    }
                ]
            },
            {
                includedView: {
                    sqlViewID: 'namesView',
                    termsList: ['person_id', 'person_name']
                },
                includingView: {
                    sqlViewID: 'allTheWorldView',
                    termsList: ['names', 'ids']
                },
                inclusionMap: [
                    {
                        leftHandTerm: 'person_name',
                        rightHandTerm: 'names'
                    },
                    {
                        leftHandTerm: 'person_id',
                        rightHandTerm: 'ids'
                    }
                ]
            }
        ],
        denials: [
            'SELECT * FROM namesView, courseNamesView WHERE person_name = course_name',
            'SELECT * FROM namesView, cityNamesView WHERE person_name = city_name',
        ]
    }
}

export const sqlViews = [
    {
        sqlViewID: 'namesView',
        sqlViewDescription: 'Main table for names',
        sqlViewCode: 'select person_id, person_name from names_table'
    },
    {
        sqlViewID: 'namesView1',
        sqlViewDescription: 'Main table for names',
        sqlViewCode: 'select person_id, person_name from names_table'
    },
    {
        sqlViewID: 'namesView2',
        sqlViewDescription: 'Main table for names',
        sqlViewCode: 'select person_id, person_name from names_table'
    },
    {
        sqlViewID: 'namesView3',
        sqlViewDescription: 'Main table for names',
        sqlViewCode: 'select person_id, person_name from names_table'
    },
    {
        sqlViewID: 'namesView4',
        sqlViewDescription: 'Main table for names',
        sqlViewCode: 'select person_id, person_name from names_table'
    },
    {
        sqlViewID: 'longNameViewwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
        sqlViewDescription: 'Main table for names',
        sqlViewCode: 'select person_id, person_name from names_table'
    },
]

export const queryCatalog = [
    {
        queryID: 'q1',
        queryDescription: 'Take all the cars, \n and have a drive',
        queryCode: 'prefix : <cicciopuccio> \nselect ?x where { ?x a :Car }'
    },
    {
        queryID: 'q2',
        queryDescription: 'Take all the bars',
        queryCode: 'prefix : <cicciopuccio> \nselect ?x where { ?x a :Bar }'
    },
    {
        queryID: 'q3',
        queryDescription: 'Take all the zars',
        queryCode: 'prefix : <cicciopuccio> \nselect ?x where { ?x a :Zar }'
    }
]

export const results = {
    construct: false,
    headTerms: ['name', 'gender', 'height',],
    results: [
        [
            {
                type: 'string',
                shortIRI: 'Luke',
                value: 'Luke'
            },
            {
                type: 'string',
                shortIRI: 'male',
                value: 'male'
            },
            {
                type: 'string',
                shortIRI: '183',
                value: '183'
            }
        ],
        [
            {
                type: 'string',
                shortIRI: 'Anakin',
                value: 'Anakin'
            },
            {
                type: 'string',
                shortIRI: 'male',
                value: 'male'
            },
            {
                type: 'string',
                shortIRI: '181',
                value: '181'
            }
        ]
    ]

}

var fakeInit = 2;

export const status = () => {
    fakeInit++;
    if (fakeInit > 3) fakeInit = 0;
    return { status: fakeInit === 3 ? 'RUNNING' : 'LOADING' }
}

export const queryStatus = () => {
    fakeInit += 0.5;
    if (fakeInit > 3) fakeInit = 0;
    return {
        status: fakeInit === 3 ? 'FINISHED' : 'Running',
        percentage: fakeInit === 3 ? 100 : fakeInit * 33,
        numOntologyRewritings: 2,
        numHighLevelQueries: 133,
        numOptimizedQueries: 21,
        numLowLevelQueries: 21,
        executionTime: 1248,
        numResults: 1204871245097
    }
}

// simulate results loading
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function queryResults(callback) {
    await sleep(100);
    if (fakeInit === 1)
        for (let i = 0; i < 5; i++) {
            results.results.push(...results.results)
        }
    callback(results)
}

export const ontoRews = [
    "select ?x ?y ?z where {?x ?y ?z}",
    "select ?x ?y ?z where {?x owl:topObjectProperty ?z}",
    "select ?x ?y ?z where {?x owl:topDataProperty ?z}"
]

export const mapRews = [
    "select x from view_01",
    "select y from view_01",
    "select z from view_01",
]

export const viewRews = [
    {
        query: "select person_name from person_table",
        numResults: 12,
        time: 121234
    },
    {
        query: "select person_name from names_table",
        numResults: 212,
        time: 121232334
    },
    {
        query: "select person_name from other_table",
        numResults: 142,
        time: 55555
    }
]

export const datasources = [
    {
        "id": "S1",
        "description": "test data source",
        "dataSourceUsername": "utente-mastro",
        "jdbcUrl": "jdbc:mysql://localhost/books",
        "jdbcDriver": "com.mysql.jdbc.Driver",
        "jdbcUsername": "root",
        "jdbcPassword": "the-password"
    },
    {
        "id": "S2",
        "description": "test data source",
        "dataSourceUsername": "utente-mastro",
        "jdbcUrl": "jdbc:mysql://localhost/books",
        "jdbcDriver": "com.mysql.jdbc.Driver",
        "jdbcUsername": "root",
        "jdbcPassword": "the-password"
    },
    {
        "id": "S3",
        "description": "test data source",
        "dataSourceUsername": "utente-mastro",
        "jdbcUrl": "jdbc:mysql://localhost/books",
        "jdbcDriver": "com.mysql.jdbc.Driver",
        "jdbcUsername": "root",
        "jdbcPassword": "the-password"
    }
]

export const kgs = [
    {
        kgIri: 'http://mykg.com',
        kgTitle: [
            { lang: '', content: 'My First Knowledge Graph' }
        ],
        kgCreator: { username: 'santaroni' },
        kgPublisher: {
            agentIri: 'http://aci.com',
            agentLabels: [
                { lang: '', content: 'AUTOMOBIL CLUB ITALIA' }
            ],
            agentWebsite: 'lod.aci.it',
            agentEmail: 'd.caltabiano@aci.it',
            agentAddress: 'Vicino casa di Valerio'
        },
        kgContributors: [{ username: 'mastro' }, { username: 'deRuzzacomo' }],
        kgRightsHolder: {
            agentIri: 'http://aci.com',
            agentLabels: [
                { lang: '', content: 'AUTOMOBIL CLUB ITALIA' }
            ],
            agentWebsite: 'lod.aci.it',
            agentEmail: 'd.caltabiano@aci.it',
            agentAddress: 'Vicino casa di Valerio'
        },
        kgCreationTs: 0,
        kgLastModifiedTs: 1556872819361,
        kgDescriptions: [
            { lang: '', content: 'Automobili che non possiedo' }
        ],
        kgTriples: 50000000000
    }
]

export const getInstanceLabelType = {
    "iri_short": "aod:DataSet_statistico/2018DS2",
    "label": "Radiazioni per demolizione nel 2018 - autovetture per ente territoriale e classe euro",
    "type": "http://lod.aci.it/opendataontology/DataSet_statistico",
    "type_short": "aod:DataSet_statistico"
}

export const getInstanceSubjectTripsGroup = {
    "subject_data_properties": [
        {
            "predicate": "http://lod.aci.it/opendataontology/anno_statistica",
            "objects": [
                {
                    "object_literal": "2018"
                }
            ],
            "predicate_short": "aod:anno_statistica",
            "instance_count": 1,
            "page_count": 1
        },
        {
            "predicate": "http://dublincore.org/2012/06/14/dcterms#available",
            "objects": [
                {
                    "object_literal": "2019-04-01"
                }
            ],
            "predicate_short": "http://dublincore.org/2012/06/14/dcterms#available",
            "instance_count": 1,
            "page_count": 1
        },
        {
            "predicate": "http://dublincore.org/2012/06/14/dcterms#description",
            "objects": [
                {
                    "object_literal": "Radiazioni di autovetture per demolizione aggregate per ente territoriale di residenza dell'utilizzatore e per Euro nel 2018"
                }
            ],
            "predicate_short": "http://dublincore.org/2012/06/14/dcterms#description",
            "instance_count": 1,
            "page_count": 1
        },
        {
            "predicate": "http://dublincore.org/2012/06/14/dcterms#title",
            "objects": [
                {
                    "object_literal": "Radiazioni per demolizione nel 2018 - autovetture per ente territoriale e classe euro"
                }
            ],
            "predicate_short": "http://dublincore.org/2012/06/14/dcterms#title",
            "instance_count": 1,
            "page_count": 1
        },
        {
            "predicate": "http://dublincore.org/2012/06/14/dcterms#identifier",
            "objects": [
                {
                    "object_literal": "http://lod.aci.it/opendataontology/DataSet_statistico/2018DS2"
                }
            ],
            "predicate_short": "http://dublincore.org/2012/06/14/dcterms#identifier",
            "instance_count": 1,
            "page_count": 1
        }
    ],
    "subject_object_properties": [
        {
            "predicate": "http://lod.aci.it/opendataontology/contiene_osservazione",
            "predicate_short": "aod:contiene_osservazione",
            "objects_types": [
                {
                    "object_type": "http://lod.aci.it/opendataontology/Demolizioni_annuali_di_autovetture_per_ente_territoriale_per_euro",
                    "object_type_short": "aod:Demolizioni_annuali_di_autovetture_per_ente_territoriale_per_euro",
                    "instance_count": 45770,
                    "page_count": 4577
                }
            ],
            "instance_count": 45770,
            "page_count": 4577
        },
        {
            "predicate": "http://dublincore.org/2012/06/14/dcterms#rightsHolder",
            "predicate_short": "http://dublincore.org/2012/06/14/dcterms#rightsHolder",
            "objects_types": [
                {
                    "object_type": "http://lod.aci.it/ontology/Persona_giuridica",
                    "object_type_short": "aci:Persona_giuridica",
                    "instance_count": 1,
                    "page_count": 1
                }
            ],
            "instance_count": 1
        },
        {
            "predicate": "http://dublincore.org/2012/06/14/dcterms#creator",
            "predicate_short": "http://dublincore.org/2012/06/14/dcterms#creator",
            "objects_types": [
                {
                    "object_type": "http://lod.aci.it/ontology/Persona_giuridica",
                    "object_type_short": "aci:Persona_giuridica",
                    "instance_count": 1,
                    "page_count": 1
                }
            ],
            "instance_count": 1
        },
        {
            "predicate": "http://dublincore.org/2012/06/14/dcterms#contributor",
            "predicate_short": "http://dublincore.org/2012/06/14/dcterms#contributor",
            "objects_types": [
                {
                    "object_type": "http://lod.aci.it/ontology/Persona_giuridica",
                    "object_type_short": "aci:Persona_giuridica",
                    "instance_count": 1,
                    "page_count": 1
                }
            ],
            "instance_count": 1
        },
        {
            "predicate": "http://dublincore.org/2012/06/14/dcterms#publisher",
            "predicate_short": "http://dublincore.org/2012/06/14/dcterms#publisher",
            "objects_types": [
                {
                    "object_type": "http://lod.aci.it/ontology/Persona_giuridica",
                    "object_type_short": "aci:Persona_giuridica",
                    "instance_count": 1,
                    "page_count": 1
                }
            ],
            "instance_count": 1
        }
    ]
}

export const getInstanceObjectTripsGroup = {
    "object_triples": [
        {
            "predicate": "http://lod.aci.it/opendataontology/compare_in_dataset",
            "subjects_types": [
                {
                    "subject_type": "http://lod.aci.it/ontology/Comune",
                    "subject_type_short": "aci:Comune",
                    "instance_count": 7928,
                    "page_count": 793
                },
                {
                    "subject_type": "http://lod.aci.it/ontology/Provincia",
                    "subject_type_short": "aci:Provincia",
                    "instance_count": 94,
                    "page_count": 10
                },
                {
                    "subject_type": "http://lod.aci.it/ontology/Regione",
                    "subject_type_short": "aci:Regione",
                    "instance_count": 21,
                    "page_count": 3
                },
                {
                    "subject_type": "http://lod.aci.it/ontology/Classe_Euro",
                    "subject_type_short": "aci:Classe_Euro",
                    "instance_count": 8,
                    "page_count": 1
                },
                {
                    "subject_type": "http://lod.aci.it/ontology/Nazione",
                    "subject_type_short": "aci:Nazione",
                    "instance_count": 1,
                    "page_count": 1
                },
                {
                    "subject_type": "http://lod.aci.it/ontology/CittaMetropolitana",
                    "subject_type_short": "aci:CittaMetropolitana",
                    "instance_count": 14,
                    "page_count": 2
                }
            ],
            "predicate_short": "aod:compare_in_dataset",
            "instance_count": 8066,
            "page_count": 807
        }
    ]
}

export const getObjectPredicatePageTypeVariato = {
    "object_triples": [
        {
            "predicate": "http://lod.aci.it/opendataontology/compare_in_dataset",
            "subjects": [
                {
                    "subject_resource": "http://lod.aci.it/ontology/Comune/023007",
                    "subject_label": "Belfiore",
                    "subject_resource_short": "aci:Comune/023007"
                },
                {
                    "subject_resource": "http://lod.aci.it/ontology/Comune/061010",
                    "subject_label": "Calvi Risorta",
                    "subject_resource_short": "aci:Comune/061010"
                },
                {
                    "subject_resource": "http://lod.aci.it/ontology/Comune/070068",
                    "subject_label": "San Giuliano di Puglia",
                    "subject_resource_short": "aci:Comune/070068"
                },
                {
                    "subject_resource": "http://lod.aci.it/ontology/Comune/004144",
                    "subject_label": "Morozzo",
                    "subject_resource_short": "aci:Comune/004144"
                },
                {
                    "subject_resource": "http://lod.aci.it/ontology/Comune/098010",
                    "subject_label": "Casalpusterlengo",
                    "subject_resource_short": "aci:Comune/098010"
                },
                {
                    "subject_resource": "http://lod.aci.it/ontology/Comune/004187",
                    "subject_label": "Roccabruna",
                    "subject_resource_short": "aci:Comune/004187"
                },
                {
                    "subject_resource": "http://lod.aci.it/ontology/Comune/096073",
                    "subject_label": "Valle Mosso",
                    "subject_resource_short": "aci:Comune/096073"
                },
                {
                    "subject_resource": "http://lod.aci.it/ontology/Comune/078009",
                    "subject_label": "Altomonte",
                    "subject_resource_short": "aci:Comune/078009"
                },
                {
                    "subject_resource": "http://lod.aci.it/ontology/Comune/083079",
                    "subject_label": "San Marco d'Alunzio",
                    "subject_resource_short": "aci:Comune/083079"
                },
                {
                    "subject_resource": "http://lod.aci.it/ontology/Comune/063037",
                    "subject_label": "Ischia",
                    "subject_resource_short": "aci:Comune/063037"
                }
            ],
            "predicate_short": "aod:compare_in_dataset"
        }
    ]
}

export const getSubjectPredicatePageType = {
    "subject_data_properties": [],
    "subject_object_properties": [
        {
            "predicate": "http://lod.aci.it/opendataontology/contiene_osservazione",
            "objects": [
                {
                    "object_resource_short": "aod:Osservazione_statistica/2018DS2OS44163",
                    "object_resource": "http://lod.aci.it/opendataontology/Osservazione_statistica/2018DS2OS44163",
                    "object_label": "Radiazioni per demolizione nel 2018 - autovetture per ente territoriale e classe euro: Canino, Euro 1"
                },
                {
                    "object_resource_short": "aod:Osservazione_statistica/2018DS2OS24064",
                    "object_resource": "http://lod.aci.it/opendataontology/Osservazione_statistica/2018DS2OS24064",
                    "object_label": "Radiazioni per demolizione nel 2018 - autovetture per ente territoriale e classe euro: Sorrento, Euro 6"
                },
                {
                    "object_resource_short": "aod:Osservazione_statistica/2018DS2OS28475",
                    "object_resource": "http://lod.aci.it/opendataontology/Osservazione_statistica/2018DS2OS28475",
                    "object_label": "Radiazioni per demolizione nel 2018 - autovetture per ente territoriale e classe euro: Montecatini-Terme, Euro 3"
                },
                {
                    "object_resource_short": "aod:Osservazione_statistica/2018DS2OS38240",
                    "object_resource": "http://lod.aci.it/opendataontology/Osservazione_statistica/2018DS2OS38240",
                    "object_label": "Radiazioni per demolizione nel 2018 - autovetture per ente territoriale e classe euro: Lusiglie', Euro 3"
                },
                {
                    "object_resource_short": "aod:Osservazione_statistica/2018DS2OS5641",
                    "object_resource": "http://lod.aci.it/opendataontology/Osservazione_statistica/2018DS2OS5641",
                    "object_label": "Radiazioni per demolizione nel 2018 - autovetture per ente territoriale e classe euro: Pralungo, Euro non disponibile"
                },
                {
                    "object_resource_short": "aod:Osservazione_statistica/2018DS2OS40840",
                    "object_resource": "http://lod.aci.it/opendataontology/Osservazione_statistica/2018DS2OS40840",
                    "object_label": "Radiazioni per demolizione nel 2018 - autovetture per ente territoriale e classe euro: Talmassons, Euro 2"
                },
                {
                    "object_resource_short": "aod:Osservazione_statistica/2018DS2OS14103",
                    "object_resource": "http://lod.aci.it/opendataontology/Osservazione_statistica/2018DS2OS14103",
                    "object_label": "Radiazioni per demolizione nel 2018 - autovetture per ente territoriale e classe euro: Verbicaro, Euro non disponibile"
                },
                {
                    "object_resource_short": "aod:Osservazione_statistica/2018DS2OS9246",
                    "object_resource": "http://lod.aci.it/opendataontology/Osservazione_statistica/2018DS2OS9246",
                    "object_label": "Radiazioni per demolizione nel 2018 - autovetture per ente territoriale e classe euro: Cercepiccola, Euro 3"
                },
                {
                    "object_resource_short": "aod:Osservazione_statistica/2018DS2OS11827",
                    "object_resource": "http://lod.aci.it/opendataontology/Osservazione_statistica/2018DS2OS11827",
                    "object_label": "Radiazioni per demolizione nel 2018 - autovetture per ente territoriale e classe euro: Santo Stefano Roero, Euro non disponibile"
                },
                {
                    "object_resource_short": "aod:Osservazione_statistica/2018DS2OS15",
                    "object_resource": "http://lod.aci.it/opendataontology/Osservazione_statistica/2018DS2OS15",
                    "object_label": "Radiazioni per demolizione nel 2018 - autovetture per ente territoriale e classe euro: Aragona, Euro 0"
                }
            ],
            "predicate_short": "aod:contiene_osservazione"
        }
    ]
}
