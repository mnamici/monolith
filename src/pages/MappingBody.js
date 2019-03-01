import React from 'react';
import { Popover } from 'antd';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/styles/hljs';
import sqlFormatter from 'sql-formatter'

class MappingBody extends React.Component {
    render() {
        const from = this.props.body.bodyFrom.map((e,i) => 
            <Popover content={
                    <SyntaxHighlighter language='sql' style={darcula}>
                        {sqlFormatter.format(e.sqlViewCode)}
                    </SyntaxHighlighter>} key={i}>
                {e.sqlViewID}
                {this.props.body.bodyFrom.length !== i+1 && ","}
            </Popover>
        )

        return (
            <code style={{color: 'rgb(186, 186, 186)'}}>
                <span style={{color: 'rgb(203, 120, 50)'}}>select</span> {this.props.body.bodySelect} <br/>
                <span style={{color: 'rgb(203, 120, 50)'}}>from</span> {from} <br/>
                <span style={{color: 'rgb(203, 120, 50)'}}>where</span> {this.props.body.bodyWhere}
            </code>
        );
    }
}

export default MappingBody;