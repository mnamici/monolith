import React from 'react';
import { Popover } from 'antd';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/styles/hljs';
import sqlFormatter from 'sql-formatter'

class MappingBody extends React.Component {
    render() {
        const from = this.props.body.bodyFrom.map((e,i) => 
            <Popover content={
                    <SyntaxHighlighter language='sql' style={docco}>
                        {sqlFormatter.format(e.sqlViewCode)}
                    </SyntaxHighlighter>} key={i}>
                {e.sqlViewID}
                {this.props.body.bodyFrom.length !== i+1 && ", "}
            </Popover>
        )

        return (
            <div>
                <b>SELECT</b> {this.props.body.bodySelect} <br/>
                <b>FROM</b> {from} <br/>
                <b>WHERE</b> {this.props.body.bodyWhere}
            </div>
        );
    }
}

export default MappingBody;