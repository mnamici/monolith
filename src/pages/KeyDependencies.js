import React from 'react';
import { List, Card, } from 'antd';

class KeyDependencies extends React.Component {
    render() {
        return (
            <div>
                <Card title="Key Dependencies">
                    <List
                        grid={{ gutter: 4, column: 1 }}
                        dataSource={this.props.keys}
                        renderItem={item => (
                            <List.Item>
                                {item.keyHead}
                            </List.Item>
                        )}
                    />
                </Card>
            </div>
        );
    }
}

export default KeyDependencies;