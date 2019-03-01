import React from 'react';
import { List } from 'antd';
import Assertion from './Assertion';

class AssertionsList extends React.Component {
    render() {

        return (
            <div>
                <List
                    rowKey="ontologiesView"
                    grid={{ gutter: 24, column: 1 }}
                    dataSource={this.props.list}
                    renderItem={(item, index) =>
                        <List.Item key={index}>
                            <Assertion entity={this.props.entity} assertion={item} />
                        </List.Item>
                    }
                />
            </div>
        );
    }
}

export default AssertionsList;