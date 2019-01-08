import React from 'react';
import { List, Card, Collapse } from 'antd';
import Assertion from './Assertion';

const Panel = Collapse.Panel;

class AssertionsList extends React.Component {
    render() {

        return (
            <div>
                <Collapse defaultActiveKey="1">
                    <Panel header="Assertions" key="1">
                        <List
                            rowKey="ontologiesView"
                            grid={{ gutter: 24, column: 1 }}
                            dataSource={this.props.list}
                            renderItem={(item, index) =>
                                <List.Item key={index}>
                                    <Card>
                                        <Assertion entity={this.props.entity} assertion={item} />
                                    </Card>
                                </List.Item>
                            }
                        />
                    </Panel>
                </Collapse>
            </div>
        );
    }
}

export default AssertionsList;