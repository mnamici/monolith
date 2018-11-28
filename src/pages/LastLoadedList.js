import React from 'react';
import { List, Card, Divider } from 'antd';

class LastLoadedList extends React.Component {
    render() {
        return (
            <div>
                <Divider>{this.props.title}</Divider>
                <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={this.props.data}
                    renderItem={item => (
                        <List.Item>
                            <Card title={item.title}>{item.description}</Card>
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default LastLoadedList;