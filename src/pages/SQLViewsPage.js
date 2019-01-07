import React from 'react';
import { Card, List } from 'antd'
import AssertionsList from './AssertionsList';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/styles/hljs';
import sqlFormatter from 'sql-formatter'


const data =
{
    sqlView: {
        sqlViewID: 'namesView',
        sqlViewDescription: 'Main table for names',
        sqlViewCode: 'select person_id, person_name from names_table'
    },
    mappingAssertions: [
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
        },
        {
            currentEntity: {
                entityRender: 'Name',
                entityID: 1211
            },
            iri: {
                shortIRI: 'obda:name',
                extendedIRI: 'http://www.example.com/#Name'
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
    ]
}

class SQLViewsPage extends React.Component {
    render() {
        const elements = [
            <Card title="Name">{data.sqlView.sqlViewID}</Card>,
            <Card title="Description">{data.sqlView.sqlViewDescription}</Card>,


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
                <Card title="Code">
                    <SyntaxHighlighter language='sql' style={docco}>
                        {sqlFormatter.format(data.sqlView.sqlViewCode)}
                    </SyntaxHighlighter>
                </Card>,
                <AssertionsList entity list={data.mappingAssertions} />
            </div>
        );
    }
}

export default SQLViewsPage;