import React from 'react'
import RenderAuthorized from 'ant-design-pro/lib/Authorized'
import { Collapse, List } from 'antd';
import DownloadFile from './DownloadFile'
import QueryInfo from './QueryInfo'
import OntologyRewritings from './OntologyRewritings';
import MappingRewritings from './MappingRewritings';
import ViewRewritings from './ViewRewritings';

const Panel = Collapse.Panel;
class QueryExecutionReport extends React.Component {

    render() {
        const Authorized = RenderAuthorized('admin');
        const noMatch = '';

        const elements  = [
            <QueryInfo status={this.props.status} />,
            <OntologyRewritings />,
            <MappingRewritings />,
            <ViewRewritings />,
            <DownloadFile />
        ]

        return (
            <div>
                <Authorized authority="admin" noMatch={noMatch}>
                    <Collapse>
                        <Panel header='Execution Report'>
                            <List
                                grid={{ gutter: 4, column: 2 }}
                                dataSource={elements}
                                renderItem={item => (
                                    <List.Item>
                                        {item}
                                    </List.Item>
                                )}
                            />
                        </Panel>
                    </Collapse>
                </Authorized>
            </div>
                    );
                }
            }
            
export default QueryExecutionReport;