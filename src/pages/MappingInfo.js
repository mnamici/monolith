import React from 'react';
import { List, Card } from 'antd';

import DownloadFile from './DownloadFile'
import MapItem from './MapItem';

const data =
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
        mappingDBConnection: {
            jdbcURL: 'jdbc:mysql://localhost/books',
            dbUser: 'root',
            dbPassword: '........'
        },
        mappingTemplates: [
            'http://www.obdasystems.com/books/author-{_}',
            'http://www.obdasystems.com/books/book-{_}',
            'http://www.obdasystems.com/books/edition-{_}',
            'http://www.obdasystems.com/books/editor-{_}',
        ]
    }

class MappingInfo extends React.Component {
    render() {
        const elements = [
            <Card title="Name"> {data.mapping.mappingID} </Card>,
            <Card title="Description"> {data.mapping.mappingDescription} </Card>,
            <Card title="Database"> 
                <MapItem mapKey="URL" mapValue={data.mappingDBConnection.jdbcURL}/>
                <MapItem mapKey="User" mapValue={data.mappingDBConnection.dbUser}/>
                <MapItem mapKey="Password" mapValue={data.mappingDBConnection.dbPassword}/>
            </Card>,
            <Card title="Templates"> {data.mappingTemplates.map((item,index) => <p key={index}>{item}</p>)} </Card>,
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
                <div style={{float:"right"}}>
                    <DownloadFile/>
                </div>
                
            </div>
        );
    }
}

export default MappingInfo;