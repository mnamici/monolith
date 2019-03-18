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
import { startQuery, getQueryStatus, startNewQuery, putInQueryCatalog } from '../api/MastroApi';

const { TextArea } = Input;



class MastroSPARQLTabPane extends React.Component {
    state = {
        loading: false,
        selectedMappingID: this.props.mappings[0] !== undefined && this.props.mappings[0].mappingID,
        status: {},
        interval: 0,
    }

    componentWillUnmount() {
        this.stopPolling()
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

    onSelectMapping(value) {
        this.setState({ selectedMapping: value })
    }

    start() {
        if (!this.props.new)
            startQuery(this.props.ontology.name, this.props.ontology.version, this.state.selectedMappingID, this.props.query.queryID, this.startPolling.bind(this))
        else {
            startNewQuery(this.props.ontology.name, this.props.ontology.version, this.state.selectedMappingID, this.props.query, this.startPolling.bind(this))
        }
        this.setState({ showResults: true, loading: true })
    }

    stop() {
        this.stopPolling()
    }

    polling() {
        getQueryStatus(this.props.ontology.name, this.props.ontology.version, this.state.selectedMappingID, this.state.executionID, this.checkStatus.bind(this))
    }

    startPolling(executionID) {
        this.setState({ executionID: executionID, interval: setInterval(this.polling.bind(this), 1000) })
    }

    stopPolling() {
        clearInterval(this.state.interval)
        this.setState({ loading: false })
    }

    checkStatus(status) {
        this.setState({ status: status })
        if (status.percentage === 100) {
            this.stopPolling()
        }
    }

    save() {
        putInQueryCatalog(this.props.ontology.name, this.props.ontology.version, this.props.query, () => { })
    }

    render() {

        const elements = [
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <MappingSelector
                    ontology={this.props.ontology}
                    mappings={this.props.mappings}
                    onSelection={this.onSelectMapping.bind(this)}
                    selected={this.state.selectedMappingID} />
                <Button.Group style={{ margin: '0px 10px' }}>
                    <Button
                        type="primary"
                        icon="play-circle"
                        loading={this.state.loading}
                        onClick={this.start.bind(this)}>Run</Button>
                    <Button type="danger" icon="stop" onClick={this.stop.bind(this)}>Stop</Button>
                </Button.Group>
                <Button type='primary' style={{ marginRight: 10 }} icon="save" onClick={this.save.bind(this)}>Store in catalog</Button>
                <Popover content='Toggle Reasoning'>
                    <Switch defaultChecked />
                </Popover>



            </div>,
            <Progress percent={this.state.status.percentage} />,
            <div id={"sparql_" + this.props.num} />,
            <TextArea style={{ margin: '12px 0px 4px 0px' }} placeholder="Description" autosize defaultValue={this.props.query.queryDescription} />,
        ]

        if (this.state.showResults) {
            elements.push(
                <Results ontology={this.props.ontology}
                    mappingID={this.state.selectedMappingID}
                    executionID={this.state.executionID}
                    numberOfResults={this.state.status.numResults}
                    running={this.state.loading}
                />,
                <QueryExecutionReport status={this.state.status} />)
        }

        return (
            <div style={{ padding: '0px 12px 8px 8px', height: 'calc(100vh - 81px)', overflow: 'auto' }}>
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