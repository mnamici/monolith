import React from 'react'
import { Popover, List } from 'antd';
import CollapsibleList from './CollapsibleList';

const data = {
    currentEntity: {
        entityRender: 'Person',
        entityID: 12
    },
    iri: {
        shortIRI: 'obda:Person',
        extendedIRI: 'http://www.example.com/#Person'
    },
    entityDiagrams: [
        {
            nodeID: 'n1223',
            diagrameName: 'Persons'
        },
        {
            nodeID: 'n1843',
            diagrameName: 'Cities'
        }
    ],
    classDescriptions: [
        "Persons are beautiful! YEEEEEEEEEEEEEEEEEEEEEEEEEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHHHHHHHHHHH!!! YUPPYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY YUPPYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYUPPYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYUPPYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYUPPYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYUPPYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYUPPYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYUPPYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYUPPYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYUPPYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY",
        "Persons are evil"
    ],
    equivalentClasses: [
        {
            entityRender: 'BadPerson',
            entityID: 134
        },
        {
            entityRender: 'BeautifulPerson',
            entityID: 1324
        }
    ],
    subClasses: [
        {
            entityRender: 'Student',
            entityID: 1341
        },
        {
            entityRender: 'Professor',
            entityID: 131324
        }
    ],
    superClasses: [
        {
            entityRender: 'Mammifer',
            entityID: 1245
        }
    ],
    disjointClasses: [
        {
            entityRender: 'Dog',
            entityID: 153
        },
        {
            entityRender: 'Pig',
            entityID: 8868
        }
    ],
    objectProperties: [
        {
            entityRender: 'liveIn',
            entityID: 1341556
        },
        {
            entityRender: 'wasBornIn',
            entityID: 13132455
        }
    ],
    dataProperties: [
        {
            entityRender: 'yearOfBirth',
            entityID: 134221556
        },
        {
            entityRender: 'personName',
            entityID: 113245556
        }
    ],
    disjointUnions: [
        [
            {
                entityRender: 'Male',
                entityID: 1341556
            },
            {
                entityRender: 'Female',
                entityID: 13132455
            }
        ],
        [
            {
                entityRender: 'Student',
                entityID: 1341556
            },
            {
                entityRender: 'Professor',
                entityID: 13132455
            }
        ]
    ],
    classIndividuals: [
        {
            entityRender: 'Valerio',
            entityID: 1341556
        },
        {
            entityRender: 'Marco',
            entityID: 13132455
        }
    ]
}

class ClassPage extends React.Component {

    render() {
        const components = [

            <CollapsibleList title="Equivalent Classes" list={data.equivalentClasses} />,
            <CollapsibleList title="Sub Classes" list={data.subClasses} />,
            <CollapsibleList title="Super Classes" list={data.superClasses} />,
            <CollapsibleList title="Disjoint Classes" list={data.disjointClasses} />,
            <CollapsibleList title="Object Properties" list={data.objectProperties} />,
            <CollapsibleList title="Data Properties" list={data.dataProperties} />,
            <CollapsibleList title="Disjoint Unions" list={data.disjointUnions} />,
            <CollapsibleList title="Individuals" list={data.classIndividuals} />,
        ]
        return (
            <div style={{ padding: 12 }}>
                <div style={{ textAlign: 'center'}}>
                    <h1 >{data.currentEntity.entityRender}</h1>
                    <Popover content={data.iri.extendedIRI}>
                        <a href={"#class?q=" + data.currentEntity.entityID}>{data.iri.shortIRI}</a>
                    </Popover>
                </div>
                <div style={{ padding: '16px 0px 16px 0px' }}>
                    <CollapsibleList title="Descriptions" list={data.classDescriptions} />
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
