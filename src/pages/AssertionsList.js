import React from 'react';
import { List, Card } from 'antd';
import Assertion from './Assertion';

class AssertionsList extends React.Component {
    render() {

        return (
            <div>
                <List
                    rowKey="ontologiesView"
                    grid={{ gutter: 24, column:1 }}
                    dataSource={this.props.list}
                    renderItem={(item, index) =>
                        <List.Item key={index}>
                            <Card>
                                <Assertion entity={this.props.entity} assertion={item} />
                            </Card>
                        </List.Item>
                    }
                />

            </div>
        );
    }
}

export default AssertionsList;