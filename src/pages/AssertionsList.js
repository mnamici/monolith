import React from 'react';
import { List } from 'antd';
import Assertion from './Assertion';

export default class AssertionsList extends React.Component {
    render() {

        return (
            <div>
                <List
                style={{padding: '0px 8px'}}
                    rowKey="ontologiesView"
                    grid={{ column: 1 }}
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
