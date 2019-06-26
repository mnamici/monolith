import React from 'react'
import { Tabs } from 'antd';
import ImportKnowledgeGraphRDF from './KnowledgeGraphImportRDF';

export default class KnowledgeGraphImport extends React.Component {
    state = { currentTab: 'rdf' }


    tabClick = (key) => {
        this.setState({ currentTab: key })
    }


    render() {
        return (
            <div style={{ padding: 8 }}>
                <Tabs 
                    onTabClick={this.tabClick}
                    tabBarStyle={{backgroundColor: 'transparent'}}>
                    <Tabs.TabPane
                        tab='RDF'
                        key='rdf'>
                        <ImportKnowledgeGraphRDF kg={this.props.kg} />
                    </Tabs.TabPane>
                    <Tabs.TabPane
                        tab='Knowledge Graph'
                        key='kg'>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        )
    }
}