import React from 'react';
import { Switch, Button, Progress, List, Popover, Modal } from 'antd';
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

const POLLING_TIME = 1000

class MastroSPARQLTabPane extends React.Component {
    state = {
        loading: false,
        selectedMappingID: this.props.mappings[0] !== undefined && this.props.mappings[0].mappingID,
        status: {},
        interval: 0,
        modalVisible: false,
        modalConfirmLoading: false,
        reasoning: true
    }

    componentWillUnmount() {
        this.stopPolling()
    }

    componentDidMount() {
        this.setState({ oldQueryID: this.props.query.queryID, newQueryID: this.props.query.queryID })
        this.changeDescription({ target: { value: this.props.query.queryDescription } })
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

    showModal = () => {
        this.setState({
            modalVisible: true,
        });
    }
    handleOk = () => {
        this.setState({
            modalConfirmLoading: true,
        });
        this.save()
    }
    handleCancel = () => {
        this.setState({
            modalVisible: false,
        });
    }

    onSelectMapping(value) {
        this.setState({ selectedMapping: value })
    }

    start() {
        if (!this.props.new)
            startQuery(
                this.props.ontology.name,
                this.props.ontology.version,
                this.state.selectedMappingID,
                this.state.oldQueryID,
                this.state.reasoning,
                this.startPolling.bind(this))
        else {
            const query = {
                queryID: this.state.oldQueryID,
                queryDescription: this.state.queryDescription || '',
                queryCode: this.yasqe.getValue()
            }
            startNewQuery(
                this.props.ontology.name,
                this.props.ontology.version,
                this.state.selectedMappingID,
                query,
                this.state.reasoning,
                this.startPolling.bind(this))
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
        this.setState({ executionID: executionID, interval: setInterval(this.polling.bind(this), POLLING_TIME) })
    }

    stopPolling() {
        clearInterval(this.state.interval)
        this.setState({ loading: false })
    }

    checkStatus(status) {
        this.setState({ status: status })
        if (status.status === 'FINISHED') {
            this.stopPolling()
        }
    }

    save() {
        const query = {
            queryID: this.state.newQueryID,
            queryDescription: this.state.queryDescription || '',
            queryCode: this.yasqe.getValue()
        }
        putInQueryCatalog(this.props.ontology.name, this.props.ontology.version, query, () => {
            this.props.renameTab(this.state.oldQueryID, this.state.newQueryID)
            this.setState({
                modalVisible: false,
                modalConfirmLoading: false,
                oldQueryID: this.state.newQueryID
            })
            this.props.renameTab(this.state.oldQueryID, this.state.newQueryID)
        })
    }

    changeQueryID = (e) => {
        this.setState({ newQueryID: e.target.value })
    }

    changeDescription = (e) => {
        this.setState({ queryDescription: e.target.value })
    }

    toggleReasoning = () => {
        this.setState({reasoning: !this.state.reasoning})
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
                <Button
                    type='primary'
                    style={{ marginRight: 10 }}
                    icon="save"
                    onClick={this.showModal}
                >
                    Store in catalog
                </Button>
                <Modal title="Title"
                    visible={this.state.modalVisible}
                    onOk={this.handleOk}
                    confirmLoading={this.state.modalConfirmLoading}
                    onCancel={this.handleCancel}
                >
                    <Input placeholder='Specify query ID' value={this.state.newQueryID} onChange={this.changeQueryID} />
                </Modal>
                <Popover content='Toggle Reasoning'>
                    <Switch checked={this.state.reasoning} onClick={this.toggleReasoning}/>
                </Popover>



            </div>,
            <Progress percent={this.state.status.percentage} />,
            <div id={"sparql_" + this.props.num} />,
            <TextArea
                style={{ margin: '12px 0px 4px 0px' }}
                placeholder="Description"
                autosize
                value={this.state.queryDescription}
                onChange={this.changeDescription}
            />,
        ]

        if (this.state.showResults) {
            elements.push(
                <Results
                    ontology={this.props.ontology}
                    mappingID={this.state.selectedMappingID}
                    executionID={this.state.executionID}
                    numberOfResults={this.state.status.numResults}
                    running={this.state.loading}
                />,
                <QueryExecutionReport
                    ontology={this.props.ontology}
                    mappingID={this.state.selectedMappingID}
                    executionID={this.state.executionID}
                    running={this.state.loading}
                    status={this.state.status} />)
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