import React from 'react';
import { Layout } from 'antd';
import AddCloseTabs from './AddCloseTabs';
import QueryCatalog from './QueryCatalog';
import MappingSelector from './MappingSelector';
import MastroSPARQLTabPane from './MastroSPARQLTabPane';

const {
    Sider, Content,
} = Layout;

const data = {
    queryCatalog: [
        {
            queryID: 'q1',
            queryDescription: 'Take all the cars',
            queryCode: 'select ?x where { ?x a :Car }'
        },
        {
            queryID: 'q2',
            queryDescription: 'Take all the bars',
            queryCode: 'select ?x where { ?x a :Bar }'
        },
        {
            queryID: 'q3',
            queryDescription: 'Take all the zars',
            queryCode: 'select ?x where { ?x a :Zar }'
        }
    ],
    mappings: [

        {
            "mappingID": "MAPPING 1",
            "mappingDescription": "Wonderful mappings",
            "mappingDate": "25/12/0",
            "numAssertions": 20,
            "numViews": 23,
            "numKeyDependencies": 34,
            "numInclusionDependencies": 34,
            "numDenials": 34,   
        },
        {
            "mappingID": "MAPPING 2",
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

class SPARQLEndpoint extends React.Component {
    state = {
        current: 'info',
        panes : [
            { 
                title: 'New Tab', 
                content: <MastroSPARQLTabPane num={1}/> , 
                key: '1', 
                closable: false,
            },
        ]
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    render() {
        
        return (
            <Layout >
                <Sider
                    style={{ background: '#fff' }}
                > 
                    <MappingSelector mappings={data.mappings} />
                    <QueryCatalog queryCatalog={data.queryCatalog} />
                </Sider>
                <Layout>
                    <Content >
                        <div style={{ marginLeft:0, background: '#fff', minHeight: '100%' }}>
                            <AddCloseTabs panes={this.state.panes}/>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}


export default SPARQLEndpoint;