import React from 'react';
import { Switch, Button, Progress, List, Popover } from 'antd';
import YASQE from 'yasgui-yasqe'
import '../css/yasqe.min.css'
import { Input } from 'antd';
// import Results from './ResultsInfiniteList';
// import Results from './ResultsGriddle';
import Results from './ResultsTable'
import QueryExecutionReport from './QueryExecutionReport';
import MappingSelector from './MappingSelector'


const { TextArea } = Input;

const status = {
    status: 'Running',
    percentage: 82,
    numOntologyRewritings: 2,
    numHighLevelQueries: 133,
    numOptimizedQueries: 21,
    numLowLevelQueries: 21,
    executionTime: 1248,
    numResults: 1204871245097
}

class MastroSPARQLTabPane extends React.Component {
    state = {
        current: 'info',
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    componentDidMount() {
        this.yasqe = YASQE(document.getElementById('sparql_' + this.props.num),
            {
                // Disable share link
                createShareLink: null,
                sparql: {
                    // Disable query execution button
                    showQueryButton: false
                }
            });
        this.props.query.queryCode !== undefined && this.yasqe.setValue(this.props.query.queryCode)
        this.yasqe.refresh();
    }

    componentDidUpdate() {
        this.yasqe.refresh();
    }
    render() {

        const elements = [
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <MappingSelector ontology={this.props.ontology} mappings={this.props.mappings}/>
                <Button.Group style={{ margin: '0px 10px' }}>
                    <Button type="primary" icon="play-circle">Run</Button>
                    <Button type="danger" icon="stop">Stop</Button>
                </Button.Group>
                <Button type='primary' style={{ marginRight: 10 }} icon="save">Store in catalog</Button>
                <Popover content='Toggle Resoning'>
                    <Switch defaultChecked />
                </Popover>
            


            </div>,
            <Progress percent={status.percentage} />,
            <div id={"sparql_" + this.props.num} />,
            <TextArea style={{ margin: '12px 0px 4px 0px' }} placeholder="Description" autosize defaultValue={this.props.query.queryDescription} />,
            <p className='results'>{status.numResults} results</p>,
            <Results />,
            <QueryExecutionReport status={status} />,
        ]
        return (
            <div style={{ margin: '0px 8px 0px 8px' }}>
                <List
                    grid={{ gutter: 8, column: 1 }}
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


export default MastroSPARQLTabPane;