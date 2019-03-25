import React from 'react';
import { Card, List, Divider } from 'antd'
import AssertionsList from './AssertionsList';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/styles/hljs';
import sqlFormatter from 'sql-formatter'
import Dependencies from './Dependencies'
import { getMappingView } from '../api/MastroApi';
import ListMapItem from './ListMapItem'


export default class SQLViewsPage extends React.Component {

    state = {
        data: null
    }

    componentDidMount() {
        getMappingView(
            this.props.ontology.name,
            this.props.ontology.version,
            this.props.mappingID,
            this.props.viewID,
            this.loaded)
    }

    componentWillReceiveProps(props) {
        getMappingView(
            props.ontology.name,
            props.ontology.version,
            props.mappingID,
            props.viewID,
            this.loaded)
    }

    loaded = (data) => {
        this.setState({ data: data })
    }

    render() {
        const data = this.state.data
        if (data === null) return null

        const first = [
            {
                mapKey: "Description",
                mapValue: data.sqlView.sqlViewDescription
            },
            {
                mapKey: "Body",
                mapValue: <SyntaxHighlighter language='sql' style={darcula}>
                    {sqlFormatter.format(data.sqlView.sqlViewCode)}
                </SyntaxHighlighter>
            },
        ]
        const elements = [
            <Card className='mappingAssertion' title={data.sqlView.sqlViewID} >
                <ListMapItem data={first} />
            </Card>,
            <Divider>{"Ontology Mappings"}</Divider>,
            <AssertionsList entity list={data.mappingAssertions} />,
            <Divider>{'Dependencies'}</Divider>,
            <Dependencies dependencies={data.mappingDependencies} />

        ]


        return (
            <div style={{ paddingTop: 12 }}>
                <List
                    grid={{ gutter: 12, column: 1 }}
                    dataSource={elements}
                    renderItem={item => (
                        <List.Item>
                            {item}
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}
