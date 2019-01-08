import React from 'react';
import { List, Card, } from 'antd';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/styles/hljs';
import sqlFormatter from 'sql-formatter'

class Denials extends React.Component {
    render() {
        return (
            <div>
                <Card title="Denials">
                    <List
                        grid={{ gutter: 4, column: 1 }}
                        dataSource={this.props.dens}
                        renderItem={item => (
                            <List.Item>
                                <Card>
                                    <SyntaxHighlighter language='sql' style={docco}>
                                        {sqlFormatter.format(item)}
                                    </SyntaxHighlighter>
                                </Card>
                            </List.Item>
                        )}
                    />
                </Card>
            </div>
        );
    }
}

export default Denials;