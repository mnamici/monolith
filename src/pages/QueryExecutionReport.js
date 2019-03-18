import React from 'react'
import { Card } from 'antd';
import QueryInfo from './QueryInfo'
import OntologyRewritings from './OntologyRewritings';
import MappingRewritings from './MappingRewritings';
import ViewRewritings from './ViewRewritings';

class QueryExecutionReport extends React.Component {
    state = {
        tabKey: 'qi',
    }

    onTabChange = (key, type) => {
        // console.log(key, type);
        this.setState({ [type]: key });
    }

    render() {

        const tabList = [
            { key: "qi", tab: "Query Info" },
            { key: "or", tab: "Ontology Rewritings" },
            { key: "mr", tab: "Mapping Rewritings" },
            { key: "vr", tab: "View Rewritings" },
        ];

        const contentList = {
            qi: <QueryInfo status={this.props.status} />,
            or: <OntologyRewritings />,
            mr: <MappingRewritings />,
            vr: <ViewRewritings />,
        }

        return (
            <div>
                <Card
                    className='queryExecutionReport'
                    style={{ width: '100%' }}
                    tabList={tabList}
                    activeTabKey={this.state.tabKey}
                    onTabChange={(key) => { this.onTabChange(key, 'tabKey'); }}
                >
                    {contentList[this.state.tabKey]}
                </Card>
            </div>
        );
    }
}

export default QueryExecutionReport;