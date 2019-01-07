import React from 'react';
import { List, Card, Popover } from 'antd';
import Entity from './Entity';
import AssertionsList from './AssertionsList';

const data =
    [
        {
            currentEntity: {
                entityRender: 'Person',
                entityID: 12
            },
            iri: {
                shortIRI: 'obda:Person',
                extendedIRI: 'http://www.example.com/#Person'
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
                entityRender: 'Person',
                entityID: 12
            },
            iri: {
                shortIRI: 'obda:Person',
                extendedIRI: 'http://www.example.com/#Person'
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
        }
    ]

class AssertionsPage extends React.Component {
    render() {
        const elements = [
            <Card title="Label"> <Entity entity={data[0].currentEntity} /> </Card>,
            <Card title="IRI">
                <Popover content={data[0].iri.extendedIRI}>
                    <a href={"#class?q=" + data[0].currentEntity.entityID}>{data[0].iri.shortIRI}</a>
                </Popover>
            </Card>,

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
                <AssertionsList list={data} />
            </div>
        );
    }
}

export default AssertionsPage;